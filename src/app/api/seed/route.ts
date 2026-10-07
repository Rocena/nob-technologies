import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

export async function GET() {
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
          content: [
            { children: [{ text: 'Notre histoire commence en 2010...' }] }
          ]
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
