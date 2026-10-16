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

    const { code } = await req.json().catch(() => ({ code: '' }));

    // Fetch user to get current secret
    const currentUser = await payload.findByID({
      collection: 'users',
      id: user.id,
    }) as any;

    if (!currentUser.mfaEnabled) {
      return NextResponse.json({ success: true, message: 'MFA déjà désactivé' });
    }

    if (currentUser.mfaSecret && code) {
      const isValid = verifyTOTP(currentUser.mfaSecret, code);
      if (!isValid) {
        return NextResponse.json({ error: 'Code de confirmation invalide' }, { status: 400 });
      }
    }

    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        mfaEnabled: false,
        mfaSecret: '',
      } as any,
    });

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
      message: 'MFA désactivé avec succès',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erreur interne' }, { status: 500 });
  }
}
