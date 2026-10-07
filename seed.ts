import { getPayload } from 'payload';
import configPromise from './src/payload.config';

async function run() {
  const payload = await getPayload({ config: configPromise });
  
  console.log('Seeding Pages...');
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Accueil',
      slug: 'accueil',
      layout: [
        {
          blockType: 'hero',
          headline: 'Bienvenue chez NOB TECHNOLOGIES',
          buttons: [{ label: 'Découvrir', link: '/services', style: 'primary' }]
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
          blockType: 'cta',
          headline: 'Notre Histoire',
          buttonLabel: 'Nous Contacter',
          buttonLink: '/contact'
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
          headline: 'Contactez-nous',
          buttonLabel: 'Envoyer',
          buttonLink: '/contact'
        }
      ]
    }
  });

  console.log('Pages seeded!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
