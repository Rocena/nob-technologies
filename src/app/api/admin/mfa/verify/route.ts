import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { verifyTOTP } from '@/lib/totp';

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient();
    const { user } = await payload.auth({ headers: req.headers });

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const code = (body.code || '').trim();
    let secret = (body.secret || '').trim();

    if (!secret) {
      const currentUser = await payload.findByID({
        collection: 'users',
        id: user.id,
      }) as any;
      if (currentUser?.mfaSecret) {
        secret = currentUser.mfaSecret;
      }
    }

    if (!secret || !code) {
      return NextResponse.json({ error: 'Clé secrète et code à 6 chiffres requis' }, { status: 400 });
    }

    const isValid = verifyTOTP(secret, code);
    if (!isValid) {
      return NextResponse.json({ error: 'Code de vérification Google Authenticator invalide ou expiré. Assurez-vous que l’heure de votre smartphone est synchronisée automatiquement.' }, { status: 400 });
    }

    // Update user with MFA enabled
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        mfaEnabled: true,
        mfaSecret: secret,
      } as any,
    });

    // Log security activity
    try {
      await payload.create({
        collection: 'activity-logs',
        data: {
          action: 'MFA_ENABLED',
          details: `Authentification à deux facteurs (TOTP) activée pour ${user.email}`,
          user: user.id,
        },
      });
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'Authentification à deux facteurs activée avec succès !',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erreur interne' }, { status: 500 });
  }
}
