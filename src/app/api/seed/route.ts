import { requireSuperAdmin } from '@/lib/requireAdmin'
import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

export async function GET() {
  const denied = await requireSuperAdmin()
  if (denied) return denied
  const payload = await getPayloadClient();
  
  // Seed Pages
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Accueil',
      slug: 'accueil',
      layout: [
        {
          blockType: 'hero',
          headline: 'NOB TECHNOLOGIES',
          subhead: 'Solutions informatiques et télécoms de pointe.',
          buttons: [{ label: 'Nos Services', link: '/services', style: 'primary' }]
        }
      ]
    }
  });

  await payload.create({
    collection: 'pages',
    data: {
      title: 'À Propos',
      slug: 'a-propos',
      layout: [
        {
          blockType: 'richText',
          content: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  children: [
                    {
                      text: 'Notre histoire commence en 2010...',
                      type: 'text',
                      version: 1,
                    },
                  ],
                },
              ],
            },
          } as any,
        }
      ]
    }
  });

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Contact',
      slug: 'contact',
      layout: [
        {
          blockType: 'cta',
          headline: 'Prêt à démarrer ?',
          buttonLabel: 'Nous contacter',
          buttonLink: '/contact'
        }
      ]
    }
  });

  return NextResponse.json({ success: true });
}
