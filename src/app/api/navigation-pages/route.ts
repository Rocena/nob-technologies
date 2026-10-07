import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'pages',
      where: {
        addToNav: {
          equals: true,
        },
      },
      sort: 'navOrder',
      limit: 20,
    });

    const pages = res.docs.map((p) => ({
      name: p.title,
      href: `/${p.slug}`,
      desc: p.shortDescription || p.metaDescription || `Découvrez notre page ${p.title}.`,
    }));

    return NextResponse.json({ pages });
  } catch (error) {
    return NextResponse.json({ pages: [] });
  }
}
