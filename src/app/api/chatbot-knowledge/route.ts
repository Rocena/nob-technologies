import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    });

    const chatbot = (settings as any)?.chatbot;
    const greeting = chatbot?.botGreeting || null;
    const customEntries = (chatbot?.knowledgeBase || []).map((kb: any) => ({
      keywords: (kb.keywords || '')
        .split(',')
        .map((k: string) => k.trim().toLowerCase())
        .filter(Boolean),
      response: kb.response,
    }));

    return NextResponse.json({
      greeting,
      knowledgeBase: customEntries,
    });
  } catch (error) {
    return NextResponse.json({ greeting: null, knowledgeBase: [] });
  }
}
