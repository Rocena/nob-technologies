import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { verifyTOTP } from '@/lib/totp';
import { getUserMfaState } from '@/lib/mfaDb';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { email, password, code } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    const payload = await getPayloadClient();

    // 1. Find user by email
    const usersResult = await payload.find({
      collection: 'users',
      where: {
        email: { equals: email.toLowerCase().trim() },
      },
      limit: 1,
      showHiddenFields: true,
      overrideAccess: true,
    });

    if (!usersResult.docs || usersResult.docs.length === 0) {
      return NextResponse.json({ error: 'Identifiants incorrects ou accès refusé.' }, { status: 401 });
    }

    const user = usersResult.docs[0] as any;

    // 2. Validate password by attempting login with Payload
    let loginResult;
    try {
      loginResult = await payload.login({
        collection: 'users',
        data: {
          email: user.email,
          password,
        },
      });
    } catch {
      return NextResponse.json({ error: 'Identifiants incorrects ou accès refusé.' }, { status: 401 });
    }

    if (!loginResult || !loginResult.token) {
      return NextResponse.json({ error: 'Identifiants incorrects.' }, { status: 401 });
    }

    // 3. Lire l'état MFA garanti depuis mfaDb (SQL direct + Payload)
    const mfaState = await getUserMfaState(payload, user.id);

    if (mfaState?.mfaEnabled && mfaState?.mfaSecret) {
      if (!code) {
        return NextResponse.json({
          mfaRequired: true,
          message: 'Veuillez saisir votre code d’authentification à deux facteurs (6 chiffres).',
        });
      }

      const isValid = verifyTOTP(mfaState.mfaSecret, String(code));
      if (!isValid) {
        return NextResponse.json(
          {
            error: 'Code de sécurité à 6 chiffres incorrect ou expiré. Veuillez réessayer.',
          },
          { status: 400 }
        );
      }
    }

    // 4. Set the Payload JWT cookie
    const cookieStore = await cookies();
    cookieStore.set('payload-token', loginResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 2, // 2 hours
    });

    try {
      await payload.create({
        collection: 'activity-logs',
        data: {
          action: 'LOGIN_SUCCESS',
          details: `Connexion réussie${mfaState?.mfaEnabled ? ' avec validation MFA' : ''} pour ${user.email}`,
          user: user.id,
        },
      });
    } catch {}

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Erreur interne de connexion' }, { status: 500 });
  }
}
