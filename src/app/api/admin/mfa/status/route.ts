import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { getUserMfaState } from '@/lib/mfaDb';

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayloadClient();
    const { user } = await payload.auth({ headers: req.headers });

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const mfaState = await getUserMfaState(payload, user.id);

    return NextResponse.json({
      mfaEnabled: Boolean(mfaState?.mfaEnabled && mfaState?.mfaSecret),
      email: mfaState?.email || user.email,
      name: mfaState?.name || (user as any).name,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erreur interne' }, { status: 500 });
  }
}
