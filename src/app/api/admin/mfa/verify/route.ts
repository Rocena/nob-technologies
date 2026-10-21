import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { verifyTOTP } from '@/lib/totp';
import { getUserMfaState, setUserMfaState } from '@/lib/mfaDb';

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadClient();
    const { user } = await payload.auth({ headers: req.headers });

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const code = String(body.code || '').replace(/\D/g, '').trim();
    let secret = String(body.secret || '').trim();
    const action = body.action || 'enable';

    if (!secret) {
      const mfaState = await getUserMfaState(payload, user.id);
      if (mfaState?.mfaSecret) {
        secret = mfaState.mfaSecret;
      }
    }

    if (!secret || code.length !== 6) {
      return NextResponse.json(
        { error: 'Clé secrète et code à 6 chiffres requis.' },
        { status: 400 }
      );
    }

    const isValid = verifyTOTP(secret, code);
    if (!isValid) {
      return NextResponse.json(
        {
          error:
            'Code Google Authenticator invalide ou expiré. Vérifiez que l’heure de votre téléphone est synchronisée automatiquement.',
        },
        { status: 400 }
      );
    }

    if (action === 'test_live') {
      return NextResponse.json({
        success: true,
        message: 'Code Google Authenticator vérifié avec succès ! Votre synchronisation TOTP est 100% fonctionnelle.',
      });
    }

    // Enregistrer de façon garantie dans la base de données (SQL direct + Payload ORM)
    await setUserMfaState(payload, user.id, true, secret);

    try {
      await payload.create({
        collection: 'activity-logs',
        data: {
          action: 'MFA_ENABLED',
          details: `Authentification à deux facteurs (TOTP Google Authenticator) activée pour ${user.email}`,
          user: user.id,
        },
      });
    } catch {}

    return NextResponse.json({
      success: true,
      mfaEnabled: true,
      message: 'Protection Google Authenticator (2FA) activée avec succès sur votre compte !',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erreur interne' }, { status: 500 });
  }
}
