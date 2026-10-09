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
      if (payload.db?.migrate && typeof payload.db.migrate === 'function') {
        try {
          await payload.db.migrate({ migrations: migrations as any });
          const retryCount = await payload.count({ collection: 'users' });
          totalDocs = retryCount.totalDocs;
        } catch (migErr) {
          console.warn('Migration attempt warning:', migErr);
          totalDocs = 0;
        }
      } else {
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
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { errors: [{ message: 'Email et mot de passe requis.' }] },
        { status: 400 }
      );
    }

    let user;
    try {
      user = await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'super_admin',
          name: 'Super Admin',
        },
      });
    } catch (createError: any) {
      if (payload.db?.migrate && typeof payload.db.migrate === 'function') {
        await payload.db.migrate({ migrations: migrations as any });
        user = await payload.create({
          collection: 'users',
          data: {
            email,
            password,
            role: 'super_admin',
            name: 'Super Admin',
          },
        });
      } else {
        throw createError;
      }
    }

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error: any) {
    console.error('Error in first-register:', error);
    return NextResponse.json(
      { errors: [{ message: error?.message || 'Erreur lors de la création du compte administrateur.' }] },
      { status: 500 }
    );
  }
}

