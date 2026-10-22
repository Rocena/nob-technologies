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
      limit: 50,
    });

    const pages = res.docs
      .filter((p) => {
        const slug = (p.slug || '').toLowerCase().trim();
        const title = (p.title || '').toLowerCase().trim();
        return (
          slug !== 'home' &&
          slug !== 'accueil' &&
          slug !== 'certifications' &&
          slug !== 'partenaires' &&
          slug !== '' &&
          title !== 'home' &&
          title !== 'accueil' &&
          !title.includes('partenaires & certifications')
        );
      })
      .map((p) => ({
        name: p.title,
        href: `/${p.slug}`,
        desc: p.shortDescription || p.metaDescription || `Découvrez notre page ${p.title}.`,
        placement: (p as any).menuPlacement || 'main',
        parent: (p as any).parentItem || 'solutions',
        order: (p as any).navOrder ?? 10,
      }));

    return NextResponse.json({ pages });
  } catch (error) {
    return NextResponse.json({ pages: [] });
  }
}
