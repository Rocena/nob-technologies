import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { ensureDatabaseSchema } from '@/lib/ensureSchema';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const result = await ensureDatabaseSchema(payload);

    let usersCount = null;
    let verifyError = null;

    try {
      const countRes = await payload.count({ collection: 'users' });
      usersCount = countRes.totalDocs;
    } catch (err: any) {
      verifyError = err?.message || String(err);
    }

    return NextResponse.json({
      success: result.success,
      message: result.message,
      usersCount,
      verifyError,
      nextStep: usersCount === 0 ? 'Ouvrez /create-first-user pour créer votre compte Super-Admin' : 'Ouvrez /admin pour vous connecter',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || String(error),
        stack: error?.stack,
      },
      { status: 500 }
    );
  }
}
