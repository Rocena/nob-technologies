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
    // 5. SEED SERVICES (Catalogue complet des 10 expertises officielles)
    // =========================================================================
    try {
      const servicesCount = await payload.count({ collection: 'services' }).catch(() => ({ totalDocs: 0 }));
      if (servicesCount.totalDocs < 10) {
        console.log('[SEED] Synchronisation du catalogue complet des services officiels...');
        const initialServices = [
          {
            title: 'Développement Web & Mobile',
            slug: 'developpement-web-mobile',
            description: "Conception de sites internet institutionnels, portails d'entreprise sur-mesure et applications mobiles iOS & Android fluides et sécurisées.",
            status: 'published',
            availability: 'available',
            problem: "Des outils digitaux obsolètes freinent votre visibilité commerciale et l'expérience de vos clients.",
            prestations: [
              { name: 'Plateformes web modernes et responsives (Next.js, React)' },
              { name: 'Applications mobiles natives et hybrides iOS & Android (Flutter)' },
              { name: 'Portails de réservation en ligne et extranets clients' },
              { name: 'Intégration API, paiement en ligne et hébergement haute disponibilité' },
            ],
          },
          {
            title: 'Conception & Intégration d’ERP (Sur-Mesure, Odoo, Dolibarr)',
            slug: 'erp-digitalisation',
            description: "Conception d’ERP sur-mesure et intégration experte (Odoo, Dolibarr) pour unifier facturation, stocks, CRM, RH et comptabilité d’entreprise.",
            status: 'published',
            availability: 'available',
            problem: "La dispersion des données entre fichiers Excel et logiciels isolés génère des erreurs et ralentit la prise de décision.",
            prestations: [
              { name: 'Conception et développement d\'ERP sur-mesure' },
              { name: 'Intégration et paramétrage Odoo & Dolibarr' },
              { name: 'Gestion commerciale, devis, facturation, stocks et achats' },
              { name: 'Comptabilité, RH, tableaux de bord et formation des équipes' },
            ],
          },
          {
            title: 'Marketing Digital & Stratégie Web',
            slug: 'marketing-digital',
            description: "SEO/SEA, gestion de campagnes publicitaires, animation des réseaux sociaux, acquisition de leads et renforcement de l’autorité de votre marque.",
            status: 'published',
            availability: 'available',
            problem: "Même la meilleure offre reste invisible sans une stratégie d'acquisition digitale structurée et mesurable.",
            prestations: [
              { name: 'Référencement naturel SEO et campagnes Google Ads (SEA)' },
              { name: 'Gestion et animation professionnelle des réseaux sociaux (Instagram, Facebook, LinkedIn)' },
              { name: 'Stratégie de contenu, identité visuelle et génération de leads' },
              { name: 'Analyse d\'audience, suivi des conversions et reporting' },
            ],
          },
          {
            title: 'Cybersécurité, Protection des Données & Firewalls',
            slug: 'cybersecurite',
            description: "Solutions leaders Sophos et Fortinet (NGFW), protection des données anti-ransomware Acronis, gestion des accès à privilèges (Wallix) et audits de vulnérabilités.",
            status: 'published',
            availability: 'available',
            problem: "Une seule cyberattaque ou fuite de données peut interrompre durablement les opérations d'une organisation.",
            prestations: [
              { name: 'Déploiement de pare-feux NGFW Sophos XGS et Fortinet FortiGate' },
              { name: 'Sauvegardes cloud hybrides anti-ransomware Acronis & PRA/PCA' },
              { name: 'Gestion des identités et accès à privilèges (PAM/IAM Wallix)' },
              { name: 'Segmentation réseau Zero Trust, VPN IPsec/SSL et audits de sécurité' },
            ],
          },
          {
            title: 'Licences Office 365 (ESD & CSP) & Matériels IT',
            slug: 'licences-materiels',
            description: "Distribution officielle de licences Microsoft 365 (ESD & CSP), fourniture de serveurs Dell PowerEdge, équipements Cisco et parcs informatiques complets.",
            status: 'published',
            availability: 'available',
            problem: "L'utilisation de licences non conformes ou de matériel non garanti expose l'entreprise à des risques juridiques et opérationnels.",
            prestations: [
              { name: 'Licences officielles Microsoft 365 Business & Enterprise (ESD & CSP)' },
              { name: 'Serveurs rackables Dell Technologies et solutions de stockage' },
              { name: 'Postes de travail professionnels, onduleurs APC/Eaton et périphériques' },
              { name: 'Équipements actifs Cisco, HP Enterprise et Ubiquiti sous garantie' },
            ],
          },
          {
            title: 'Formations, IA & Préparation aux Certifications',
            slug: 'formations-ia',
            description: "Formations pratiques sur matériel réel en cybersécurité, réseaux (Cisco CCNA, Fortinet NSE 4), Power BI, automatisation et Intelligence Artificielle.",
            status: 'published',
            availability: 'available',
            problem: "La montée en compétences des équipes techniques nécessite un apprentissage pratique sur de véritables équipements d'entreprise.",
            prestations: [
              { name: 'Préparation officielle aux certifications Cisco CCNA, Fortinet NSE 4, Sophos et ISO 27001' },
              { name: 'Cursus Microsoft Power BI, analyse de données et Business Intelligence' },
              { name: 'Ateliers d\'automatisation des processus et Intelligence Artificielle en entreprise' },
              { name: 'Sensibilisation anti-phishing et hygiène numérique des collaborateurs' },
            ],
          },
          {
            title: 'Câblage Structuré, Fibre Optique & Réseaux Télécoms',
            slug: 'reseaux-telecoms',
            description: "Conception et déploiement d'infrastructures LAN/WAN, câblage cuivre Cat 6A/7, liaisons fibre optique, baies de brassage 42U et Wi-Fi haute densité.",
            status: 'published',
            availability: 'available',
            problem: "Un câblage vétuste ou mal organisé est la cause de plus de 70% des lenteurs et coupures réseau en entreprise.",
            prestations: [
              { name: 'Câblage cuivre structuré Catégorie 6A et Catégorie 7' },
              { name: 'Raccordement, épissurage et réflectométrie fibre optique' },
              { name: 'Montage, peignage méthodique et étiquetage de baies 42U' },
              { name: 'Architecture Wi-Fi professionnelle haute densité et certification Fluke' },
            ],
          },
          {
            title: 'Téléphonie IP (VoIP) & Vidéosurveillance IP',
            slug: 'telephonie-videosurveillance',
            description: "Standards IPBX Yeastar Série P, postes VoIP Cisco, communications unifiées, caméras de vidéosurveillance IP haute définition et contrôle d’accès.",
            status: 'published',
            availability: 'available',
            problem: "Des systèmes de téléphonie et de sécurité physique vieillissants alourdissent vos coûts et réduisent votre réactivité.",
            prestations: [
              { name: 'Standards téléphoniques IPBX Yeastar Série P et postes VoIP Cisco' },
              { name: 'Serveur vocal interactif (SVI), interconnexion multi-sites et softphones' },
              { name: 'Caméras de vidéosurveillance IP jour/nuit et enregistreurs NVR RAID' },
              { name: 'Contrôle d\'accès biométrique et par badges RFID' },
            ],
          },
          {
            title: 'Infogérance, Maintenance & Support 24/7',
            slug: 'infogerance',
            description: "Supervision proactive 24/7 (PRTG), maintenance préventive et curative sur site, gestion des incidents en temps réel et support helpdesk dédié.",
            status: 'published',
            availability: 'available',
            problem: "Votre équipe perd un temps précieux à gérer les pannes et les mises à jour au lieu de se concentrer sur votre cœur de métier.",
            prestations: [
              { name: 'Supervision réseau et serveurs proactive 24/7 (PRTG / Paessler)' },
              { name: 'Maintenance préventive et curative sur site et à distance' },
              { name: 'Support utilisateurs réactif (Helpdesk N1/N2/N3)' },
              { name: 'Gestion des sauvegardes, correctifs de sécurité et rapports SLA' },
            ],
          },
        ];

        for (const s of initialServices) {
          const existing = await payload.find({
            collection: 'services',
            where: { slug: { equals: s.slug } },
            limit: 1,
          }).catch(() => ({ docs: [] }));

          if (existing.docs.length === 0) {
            await payload.create({
              collection: 'services',
              data: s as any,
            });
          }
        }
        console.log('[SEED] Catalogue complet des services synchronisé dans le CMS !');
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
            title: 'Partenaires Technologiques',
            slug: 'partenaires',
            addToNav: false,
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
