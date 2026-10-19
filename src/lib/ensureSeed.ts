import { FORMATIONS_DATA, getDefaultSessionsForFormation } from '@/data/formations';
import type { Payload } from 'payload';

export async function ensureCompleteSeed(payload: Payload) {
  try {
    // 1. SEED FORMATIONS
    const formationsCount = await payload.count({ collection: 'formations' }).catch(() => ({ totalDocs: 0 }));
    if (formationsCount.totalDocs < 13) {
      console.log(`[SEED] Formations actuelles : ${formationsCount.totalDocs}/13. Synchronisation du catalogue...`);
      let idx = 1;
      for (const item of Object.values(FORMATIONS_DATA)) {
        const existing = await payload.find({
          collection: 'formations',
          where: { slug: { equals: item.slug } },
          limit: 1,
        }).catch(() => ({ docs: [] }));

        const defaultSessions = getDefaultSessionsForFormation(item.slug);

        const formationPayload: any = {
          title: item.title,
          slug: item.slug,
          badge: item.badge,
          shortDesc: item.shortDesc,
          heroHeadline: item.heroHeadline,
          heroDescription: item.heroDescription,
          duration: item.duration,
          hours: item.hours,
          format: item.format,
          published: true,
          order: idx++,
          targetAudience: (item.targetAudience || []).map((a) => ({ item: a })),
          prerequisites: (item.prerequisites || []).map((p) => ({ item: p })),
          targetCertifications: (item.targetCertifications || []).map((c) => ({
            title: c.title,
            organization: c.organization,
            level: c.level,
            desc: c.desc,
          })),
          months: (item.months || []).map((m) => ({
            month: m.month,
            title: m.title,
            duration: m.duration,
            objectives: m.objectives,
            topics: (m.topics || []).map((t) => ({ topic: t })),
            practicalLab: m.practicalLab,
            deliverable: m.deliverable,
          })),
          keyOutcomes: (item.keyOutcomes || []).map((o) => ({ outcome: o })),
          sessions: defaultSessions.map((s) => ({
            name: s.name,
            startDate: s.startDate,
            schedule: s.schedule,
            format: s.format || 'hybride',
            status: s.status || 'open',
            availableSeats: s.availableSeats || 10,
            location: s.location || 'Campus NOB TECHNOLOGIES — Dakar',
          })),
        };

        if (existing.docs.length === 0) {
          await (payload as any).create({
            collection: 'formations',
            data: formationPayload,
          });
        } else {
          // If existing doc has no sessions, add them
          const existingDoc = existing.docs[0] as any;
          if (!existingDoc.sessions || existingDoc.sessions.length === 0) {
            await (payload as any).update({
              collection: 'formations',
              id: existingDoc.id,
              data: {
                sessions: formationPayload.sessions,
              },
            });
          }
        }
      }
      console.log('[SEED] Toutes les 13 formations et sessions ont été synchronisées dans le CMS !');
    }

    // 2. SEED TESTIMONIALS
    const testimonialsCount = await payload.count({ collection: 'testimonials' }).catch(() => ({ totalDocs: 0 }));
    if (testimonialsCount.totalDocs === 0) {
      console.log('[SEED] Aucun témoignage trouvé. Insertion des retours clients réels...');
      const fallbackTestimonials = [
        {
          authorName: "Saad Diakhité",
          authorRole: "DGA, Hôtel du Parc",
          content: "Excellent travail franchement, très professionnel et surtout très réactif. Je ne pourrais pas trouver mieux ailleurs.",
        },
        {
          authorName: "Abdourakhmane Ly",
          authorRole: "Responsable Informatique, Union européenne",
          content: "Travail de pro, très bonne réactivité, good job.",
        },
        {
          authorName: "Orcel Mouanda",
          authorRole: "Logistique, Union européenne",
          content: "Travail très propre, équipes très professionnelles.",
        },
        {
          authorName: "Mbaye Diop",
          authorRole: "Logistique, Union européenne",
          content: "Très satisfait, travail excellent.",
        },
      ];

      for (const t of fallbackTestimonials) {
        await payload.create({
          collection: 'testimonials',
          data: t,
        });
      }
      console.log('[SEED] 4 témoignages réels ajoutés dans le CMS !');
    }

    // 3. SEED SERVICES
    const servicesCount = await payload.count({ collection: 'services' }).catch(() => ({ totalDocs: 0 }));
    if (servicesCount.totalDocs === 0) {
      console.log('[SEED] Aucun service trouvé. Insertion des services officiels...');
      const initialServices = [
        {
          title: 'Infogérance & Infogérance Cloud',
          slug: 'infogerance',
          description: "Supervision proactive 24/7, maintenance préventive et corrective, gestion des incidents en temps réel et support helpdesk. Vous bénéficiez d'un interlocuteur unique et d'une infrastructure toujours opérationnelle.",
          status: 'published',
          availability: 'available',
          problem: "Votre équipe perd un temps précieux à gérer les pannes et les mises à jour au lieu de se concentrer sur votre cœur de métier.",
          prestations: [
            { name: 'Surveillance et monitoring 24/7' },
            { name: 'Maintenance préventive et corrective' },
            { name: 'Gestion des incidents et tickets d\'intervention' },
            { name: 'Support utilisateurs (Helpdesk N1/N2/N3)' },
            { name: 'Gestion des mises à jour et correctifs de sécurité' },
            { name: 'Rapport mensuel d\'activité et indicateurs SLA' },
          ],
        },
        {
          title: 'Câblage Réseau & Électrique Haute Performance',
          slug: 'cablage',
          description: "Conception et déploiement d'infrastructures de câblage structuré conformes aux normes TIA-568-D et ISO/IEC 11801. Cuivre Cat. 6A/7 et fibre optique pour vos réseaux LAN/WAN, baies de brassage et onduleurs.",
          status: 'published',
          availability: 'available',
          problem: "Un câblage vétuste ou non structuré est la cause de plus de 70% des lenteurs et pannes réseau en entreprise.",
          prestations: [
            { name: 'Câblage cuivre Catégorie 6A et Catégorie 7' },
            { name: 'Fibre optique monomode et multimode' },
            { name: 'Montage et réorganisation de baies de brassage' },
            { name: 'Étiquetage normé TIA-606 et schéma de câblage' },
            { name: 'Certification réflectométrique et tests de performance' },
          ],
        },
        {
          title: 'Sécurité des Données & Continuité d\'Activité',
          slug: 'securite-des-donnees',
          description: "Protection complète de vos données sensibles contre les ransomwares, les fuites et les sinistres. Chiffrement AES-256, gestion des identités (IAM), politique 3-2-1 et plans de reprise d'activité (PRA/PCA).",
          status: 'published',
          availability: 'available',
          problem: "Une seule cyberattaque ou panne matérielle peut interrompre définitivement les activités d'une organisation non préparée.",
          prestations: [
            { name: 'Audit de sécurité des données et cartographie des risques' },
            { name: 'Chiffrement des postes et des disques de stockage' },
            { name: 'Stratégie de sauvegarde 3-2-1 automatisée et chiffrée' },
            { name: 'Mise en œuvre de Plan de Reprise d\'Activité (PRA)' },
            { name: 'Sensibilisation et formation anti-phishing des équipes' },
          ],
        },
        {
          title: 'Protection Réseau & Firewalls NGFW',
          slug: 'protection-de-reseau',
          description: "Déploiement de pare-feu de nouvelle génération (Fortinet FortiGate, Sophos XGS), systèmes de détection et prévention des intrusions (IDS/IPS), VPN sécurisés et segmentation réseau Zero Trust.",
          status: 'published',
          availability: 'available',
          problem: "L'ouverture des systèmes au télétravail et au Cloud multiplie les vecteurs d'intrusion opportunistes.",
          prestations: [
            { name: 'Déploiement de pare-feu NGFW Fortinet et Sophos' },
            { name: 'Inspection SSL approfondie et filtrage Web dynamique' },
            { name: 'Mise en place de VPN IPsec et VPN SSL nomades' },
            { name: 'Segmentation réseau VLANs et politiques Zero Trust' },
            { name: 'Protection antivirus de passerelle et blocage des botnets' },
          ],
        },
      ];

      for (const s of initialServices) {
        await payload.create({
          collection: 'services',
          data: s as any,
        });
      }
      console.log('[SEED] 4 services majeurs ajoutés dans le CMS !');
    }

    // 4. SEED PAGES
    const pagesCount = await payload.count({ collection: 'pages' }).catch(() => ({ totalDocs: 0 }));
    if (pagesCount.totalDocs < 6) {
      console.log('[SEED] Synchronisation des pages du site web...');
      const pagesToSeed = [
        {
          title: 'Accueil',
          slug: 'accueil',
          layout: [
            {
              blockType: 'hero',
              headline: 'NOB TECHNOLOGIES',
              subhead: 'Architecte de vos infrastructures réseaux, télécoms, cybersécurité et formation de haut niveau.',
              buttons: [
                { label: 'Découvrir nos Services', link: '/services', style: 'primary' },
                { label: 'Formations Certifiantes', link: '/formations', style: 'secondary' },
              ],
            },
          ],
        },
        {
          title: 'À Propos de NOBTECH',
          slug: 'a-propos',
          layout: [
            {
              blockType: 'hero',
              headline: 'Excellence & Intégrité Technologique',
              subhead: 'Fondée à Dakar par des ingénieurs certifiés, NOB TECHNOLOGIES accompagne les institutions et entreprises dans leurs projets numériques les plus exigeants.',
            },
          ],
        },
        {
          title: 'Nos Services & Expertises',
          slug: 'services',
          layout: [
            {
              blockType: 'hero',
              headline: 'Services Informatiques & Télécoms',
              subhead: 'Infogérance proactive, câblage certifié, cybersécurité offensive et défensive pour les entreprises du Sénégal et de la sous-région.',
            },
          ],
        },
        {
          title: 'Formations & Académie',
          slug: 'formations',
          layout: [
            {
              blockType: 'hero',
              headline: 'Formations Professionnelles & Certifications',
              subhead: 'Des cursus pratiques calibrés sur matériel réel pour ingénieurs, techniciens et cadres IT.',
            },
          ],
        },
        {
          title: 'Partenaires & Certifications',
          slug: 'certifications',
          layout: [
            {
              blockType: 'hero',
              headline: 'Partenariats Technologiques Internationaux',
              subhead: 'Agréments et synergies avec les plus grands constructeurs mondiaux : Cisco, Fortinet, Microsoft, Sophos et VMware.',
            },
          ],
        },
        {
          title: 'Contact & Siège',
          slug: 'contact',
          layout: [
            {
              blockType: 'cta',
              headline: 'Parlons de vos Projets Technologiques',
              buttonLabel: 'Contacter nos Ingénieurs',
              buttonLink: '/contact',
            },
          ],
        },
      ];

      for (const p of pagesToSeed) {
        const existing = await payload.find({
          collection: 'pages',
          where: { slug: { equals: p.slug } },
          limit: 1,
        }).catch(() => ({ docs: [] }));

        if (existing.docs.length === 0) {
          await payload.create({
            collection: 'pages',
            data: p as any,
          });
        }
      }
      console.log('[SEED] Pages principales synchronisées dans le CMS !');
    }

    return { success: true };
  } catch (err: any) {
    console.error('[SEED ERROR]', err);
    return { success: false, error: err.message };
  }
}
