import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { ensureCompleteSeed } from '@/lib/ensureSeed';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const result = await ensureCompleteSeed(payload);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
