import { FORMATIONS_DATA, getDefaultSessionsForFormation } from '@/data/formations';
import { GALLERY_ITEMS } from '@/components/GalleryGrid';
import type { Payload } from 'payload';

export async function ensureCompleteSeed(payload: Payload) {
  try {
    // =========================================================================
    // 0. GARANTIE D'ACCÈS DU COMPTE SUPER-ADMIN (rolva.iqra@gmail.com)
    // =========================================================================
    try {
      const targetEmail = 'rolva.iqra@gmail.com';
      const allUsers = await payload.find({
        collection: 'users',
        limit: 50,
        showHiddenFields: true,
        overrideAccess: true,
      }).catch(() => ({ docs: [] as any[] }));

      const existingRolva = (allUsers.docs || []).find(
        (u: any) => String(u.email || '').trim().toLowerCase() === targetEmail
      );

      if (existingRolva) {
        if (existingRolva.role !== 'super_admin' || existingRolva.email !== targetEmail) {
          await payload.update({
            collection: 'users',
            id: existingRolva.id,
            data: {
              email: targetEmail,
              role: 'super_admin',
            } as any,
            overrideAccess: true,
          }).catch(() => {});
        }
      } else if ((allUsers.docs || []).length > 0) {
        // Créer le compte rolva.iqra@gmail.com et synchroniser le hash/salt de l'admin existant si disponible
        const created = await payload.create({
          collection: 'users',
          data: {
            email: targetEmail,
            password: process.env.ADMIN_DEFAULT_PASSWORD || 'Nobtech2026!',
            name: 'Super Administrateur',
            role: 'super_admin',
          } as any,
          overrideAccess: true,
        }).catch(() => null);

        const primaryAdmin = allUsers.docs[0];
        const adapter: any = payload.db;
        if (created && primaryAdmin && primaryAdmin.id !== created.id) {
          if (adapter?.pool?.query) {
            await adapter.pool
              .query(
                `UPDATE "users" SET "salt" = COALESCE((SELECT "salt" FROM "users" WHERE "id" = $1), "salt"), "hash" = COALESCE((SELECT "hash" FROM "users" WHERE "id" = $1), "hash"), "login_attempts" = 0, "lock_until" = NULL WHERE "id" = $2`,
                [primaryAdmin.id, created.id]
              )
              .catch(() => {});
          } else if (adapter?.client?.execute) {
            await adapter.client
              .execute({
                sql: `UPDATE \`users\` SET \`salt\` = COALESCE((SELECT \`salt\` FROM \`users\` WHERE \`id\` = ?), \`salt\`), \`hash\` = COALESCE((SELECT \`hash\` FROM \`users\` WHERE \`id\` = ?), \`hash\`), \`login_attempts\` = 0, \`lock_until\` = NULL WHERE \`id\` = ?`,
                args: [primaryAdmin.id, primaryAdmin.id, created.id],
              })
              .catch(() => {});
          }
        }
      }
    } catch (userCheckErr: any) {
      console.warn('[SEED USER CHECK WARNING]:', userCheckErr?.message || userCheckErr);
    }

    // =========================================================================
    // 1. SEED FORMATIONS (Catalogue complet des 13 formations)
    // =========================================================================
    try {
      const formationsCount = await payload.count({ collection: 'formations' }).catch(() => ({ totalDocs: 0 }));
      if (formationsCount.totalDocs < 13) {
        console.log(`[SEED] Formations en base : ${formationsCount.totalDocs}/13. Synchronisation intégrale du catalogue...`);
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
        console.log('[SEED] Toutes les 13 formations ont été synchronisées dans le Back-Office.');
      }
    } catch (err: any) {
      console.warn('[SEED FORMATIONS WARNING]:', err?.message || err);
    }

    // =========================================================================
    // 2. SEED PROJECTS / RÉALISATIONS (Références terrain & déploiements)
    // =========================================================================
    try {
      const projectsCount = await payload.count({ collection: 'projects' }).catch(() => ({ totalDocs: 0 }));
      if (projectsCount.totalDocs < 8) {
        console.log(`[SEED] Réalisations en base : ${projectsCount.totalDocs}/8. Synchronisation des projets réels...`);
        const officialProjects = [
          {
            title: "Parc Exotique du Sénégal — Plateforme Web Officielle & Réseaux Sociaux",
            slug: "parc-exotique",
            sector: "Hôtellerie & Web",
            description: "Développement et mise en production de la vitrine numérique complète de l’Hôtel du Parc, du restaurant La Plume et du parc animalier à Somone, ainsi que la gestion et l’animation continue de leurs réseaux sociaux (Instagram et Facebook).",
            websiteUrl: "https://parcexotique.sn/fr/",
            previewScreenshotUrl: "/images/parc-exotique-preview.png",
            status: "published",
          },
          {
            title: "Délégation de l’Union Européenne à Dakar — Infrastructure Réseau & Baies 42U",
            slug: "union-europeenne-dakar",
            sector: "Institutionnel & Diplomatique",
            description: "Déploiement complet du câblage réseau structuré Cat 6A/7, pose de baies de brassage 42U, peignage méthodique des liaisons et certification de conformité pour le bureau de l’Union Européenne à Dakar.",
            status: "published",
          },
          {
            title: "SETER (TER de Dakar) — Formation des Techniciens au Réseau Télécoms GSM-R",
            slug: "seter-ter-dakar",
            sector: "Transport Ferroviaire & Télécommunications Critiques",
            description: "Programme de formation technique spécialisée et ateliers pratiques dispensés aux techniciens de la SETER sur les technologies de radiocommunications ferroviaires GSM-R : architectures sol-train, maintenance du réseau radio, diagnostic et sûreté de fonctionnement pour l’exploitation du Train Express Régional de Dakar.",
            status: "published",
          },
          {
            title: "Polyclinique P2A (Dakar) — Infrastructure Réseau, VMware, VoIP Yeastar & FortiGate",
            slug: "polyclinique-p2a",
            sector: "Santé & Établissement Médical",
            description: "Installation complète de l’infrastructure réseau physique et baies, virtualisation des serveurs médicaux sous VMware, téléphonie d’entreprise VoIP Yeastar et pare-feu Fortinet FortiGate (NGFW).",
            status: "published",
          },
          {
            title: "Dolima (La Laiterie du Berger) — Ingénierie & Infrastructure Réseau d’Entreprise",
            slug: "dolima-senegal",
            sector: "Agro-Industrie & Production",
            description: "Ingénierie et déploiement de l’infrastructure réseau locale, câblage structuré cuivre Cat 6, coffret de brassage FINEN, commutation LAN haute densité et fiabilisation de la connectivité continue pour les flux industriels de Dolima (La Laiterie du Berger).",
            status: "published",
          },
          {
            title: "Formation des Apprenants aux Réseaux Informatiques & Systèmes",
            slug: "simplon-senegal",
            sector: "Formation Professionnelle & Éducation Numérique",
            description: "Animation de modules intensifs, cours magistraux et ateliers pratiques pour les apprenants : architectures réseaux d’entreprise, protocoles de routage/commutation, administration système Linux/Windows, câblage et préparation aux certifications.",
            status: "published",
          },
          {
            title: "Conception & Déploiement d’ERP d’Entreprise (Sur-Mesure / Odoo / Dolibarr)",
            slug: "erp-gestion",
            sector: "ERP, Digitalisation & Gestion Commerciale",
            description: "Conception d’ERP sur-mesure pour des flux métiers spécifiques, ainsi qu’installation et paramétrage d’ERP de référence (Odoo, Dolibarr) pour la gestion des stocks, facturation, devis et comptabilité de structures sénégalaises et sous-régionales.",
            status: "published",
          },
          {
            title: "Sécurisation Réseau & Pare-feu de Nouvelle Génération (NGFW)",
            slug: "infra-firewall",
            sector: "Cybersécurité Périmétrique",
            description: "Mise en place de passerelles de sécurité Sophos et Fortinet (NGFW) avec filtrage applicatif, VPN IPsec multi-sites pour le travail à distance et politiques de segmentation réseau LAN/VLAN.",
            status: "published",
          },
        ];

        for (const p of officialProjects) {
          const existing = await payload.find({
            collection: 'projects',
            where: { slug: { equals: p.slug } },
            limit: 1,
          }).catch(() => ({ docs: [] }));

          if (existing.docs.length === 0) {
            await (payload as any).create({
              collection: 'projects',
              data: p,
            });
          }
        }
        console.log('[SEED] 8 réalisations majeures ont été synchronisées dans le Back-Office.');
      }
    } catch (err: any) {
      console.warn('[SEED PROJECTS WARNING]:', err?.message || err);
    }

    // =========================================================================
    // 3. SEED TESTIMONIALS / TÉMOIGNAGES
    // =========================================================================
    try {
      const testimonialsCount = await payload.count({ collection: 'testimonials' }).catch(() => ({ totalDocs: 0 }));
      if (testimonialsCount.totalDocs < 4) {
        console.log('[SEED] Témoignages en base : synchronisation des avis clients...');
        const fallbackTestimonials = [
          {
            authorName: "Saad Diakhité",
            authorRole: "DGA, Hôtel du Parc Exotique",
            content: "Excellent travail franchement, très professionnel et surtout très réactif. Je ne pourrais pas trouver mieux ailleurs.",
          },
          {
            authorName: "Abdourakhmane Ly",
            authorRole: "Responsable Informatique, Délégation de l'Union Européenne",
            content: "Travail de pro, très bonne réactivité, good job sur l'infrastructure de câblage et les baies.",
          },
          {
            authorName: "Orcel Mouanda",
            authorRole: "Logistique & Infrastructures, Union Européenne",
            content: "Travail très propre, équipes très professionnelles et délais respectés.",
          },
          {
            authorName: "Mbaye Diop",
            authorRole: "Supervision Technique, Union Européenne",
            content: "Très satisfait du déploiement réseau, travail excellent et conformité validée.",
          },
        ];

        for (const t of fallbackTestimonials) {
          const existing = await payload.find({
            collection: 'testimonials',
            where: { authorName: { equals: t.authorName } },
            limit: 1,
          }).catch(() => ({ docs: [] }));

          if (existing.docs.length === 0) {
            await payload.create({
              collection: 'testimonials',
              data: t,
            });
          }
        }
        console.log('[SEED] 4 témoignages clients réels ajoutés dans le CMS !');
      }
    } catch (err: any) {
      console.warn('[SEED TESTIMONIALS WARNING]:', err?.message || err);
    }

    // =========================================================================
    // 4. SEED GALLERIES / PHOTOS DE CHANTIERS
    // =========================================================================
    try {
      const galleriesCount = await (payload as any).count({ collection: 'galleries' }).catch(() => ({ totalDocs: 0 }));
      if (galleriesCount.totalDocs < 10) {
        console.log(`[SEED] Galerie en base : ${galleriesCount.totalDocs}/19. Synchronisation des photos d'installations...`);
        let order = 1;
        for (const g of GALLERY_ITEMS) {
          const existing = await (payload as any).find({
            collection: 'galleries',
            where: { title: { equals: g.title } },
            limit: 1,
          }).catch(() => ({ docs: [] }));

          if (existing.docs.length === 0) {
            await (payload as any).create({
              collection: 'galleries',
              data: {
                title: g.title,
                category: g.category === 'tous' ? 'cablage' : g.category,
                categoryLabel: g.categoryLabel,
                imageUrl: g.image,
                description: g.description,
                order: order++,
                published: true,
              },
            });
          }
        }
        console.log('[SEED] Photos de la galerie synchronisées dans le Back-Office.');
      }
    } catch (err: any) {
      console.warn('[SEED GALLERIES WARNING]:', err?.message || err);
    }

    // =========================================================================
    // 5. SEED SERVICES
    // =========================================================================
    try {
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
    } catch (err: any) {
      console.warn('[SEED SERVICES WARNING]:', err?.message || err);
    }

    // =========================================================================
    // 6. SEED PAGES
    // =========================================================================
    try {
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
    } catch (err: any) {
      console.warn('[SEED PAGES WARNING]:', err?.message || err);
    }

    return { success: true };
  } catch (err: any) {
    console.error('[SEED ERROR]', err);
    return { success: false, error: err.message };
  }
}
