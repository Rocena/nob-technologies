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

    const { code } = await req.json().catch(() => ({ code: '' }));

    const mfaState = await getUserMfaState(payload, user.id);

    if (!mfaState?.mfaEnabled) {
      await setUserMfaState(payload, user.id, false, null);
      return NextResponse.json({ success: true, message: 'MFA déjà désactivé' });
    }

    if (mfaState.mfaSecret && code) {
      const isValid = verifyTOTP(mfaState.mfaSecret, code);
      if (!isValid) {
        return NextResponse.json({ error: 'Code de confirmation invalide' }, { status: 400 });
      }
    }

    await setUserMfaState(payload, user.id, false, null);

    try {
      await payload.create({
        collection: 'activity-logs',
        data: {
          action: 'MFA_DISABLED',
          details: `Authentification à deux facteurs désactivée pour ${user.email}`,
          user: user.id,
        },
      });
    } catch {}

    return NextResponse.json({
      success: true,
      mfaEnabled: false,
      message: 'La double authentification a été désactivée avec succès.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erreur interne' }, { status: 500 });
  }
}
