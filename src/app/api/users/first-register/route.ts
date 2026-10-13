import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { migrations } from '@/migrations';

export async function POST(request: Request) {
  try {
    const payload = await getPayloadClient();
    let totalDocs = 0;

    try {
      const result = await payload.count({
        collection: 'users',
      });
      totalDocs = result.totalDocs;
    } catch (countError: any) {
      console.warn('Could not count users (schema may need initialization):', countError?.message);
      try {
        const { ensureDatabaseSchema } = await import('@/lib/ensureSchema');
        await ensureDatabaseSchema(payload);
        const retryCount = await payload.count({ collection: 'users' });
        totalDocs = retryCount.totalDocs;
      } catch (schemaErr) {
        console.warn('Auto schema sync warning during user count:', schemaErr);
        totalDocs = 0;
      }
    }

    if (totalDocs > 0) {
      return NextResponse.json(
        { errors: [{ message: 'Un compte administrateur a déjà été configuré. Veuillez vous connecter.' }] },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { errors: [{ message: 'Email et mot de passe requis.' }] },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { errors: [{ message: 'Le mot de passe doit comporter au moins 8 caractères.' }] },
        { status: 400 }
      );
    }

    const fullName = typeof name === 'string' && name.trim() ? name.trim() : 'Super Admin';

    let user;
    try {
      user = await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'super_admin',
          name: fullName,
        },
        overrideAccess: true,
      });
    } catch (createError: any) {
      console.warn('Initial user create failed, attempting schema sync:', createError?.message);
      const { ensureDatabaseSchema } = await import('@/lib/ensureSchema');
      await ensureDatabaseSchema(payload);
      user = await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'super_admin',
          name: fullName,
        },
        overrideAccess: true,
      });
    }

    // Auto-login immédiat pour configurer la session et générer le token JWT
    let token = null;
    let expSeconds = 7200;
    try {
      const loginRes = await payload.login({
        collection: 'users',
        data: { email, password },
      });
      if (loginRes?.token) {
        token = loginRes.token;
        if (loginRes.exp) {
          expSeconds = loginRes.exp - Math.floor(Date.now() / 1000);
        }
      }
    } catch (loginErr) {
      console.warn('Auto-login during first-register warning:', loginErr);
    }

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    });

    if (token) {
      response.cookies.set('payload-token', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: expSeconds > 0 ? expSeconds : 7200,
      });
    }

    return response;
  } catch (error: any) {
    console.error('Error in first-register:', error);
    return NextResponse.json(
      { errors: [{ message: error?.message || 'Erreur lors de la création du compte administrateur.' }] },
      { status: 500 }
    );
  }
}

