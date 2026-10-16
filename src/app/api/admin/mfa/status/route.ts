import { NextRequest, NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { ensureCompleteSeed } from '@/lib/ensureSeed';

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayloadClient();
    const { user } = await payload.auth({ headers: req.headers });

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    // Proactive background content seeding check
    ensureCompleteSeed(payload).catch((err) => console.warn('[SEED CHECK]', err));

    const currentUser = await payload.findByID({
      collection: 'users',
      id: user.id,
    }) as any;

    return NextResponse.json({
      mfaEnabled: Boolean(currentUser?.mfaEnabled),
      email: currentUser?.email,
      name: currentUser?.name,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Erreur interne' }, { status: 500 });
  }
}
