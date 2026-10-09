import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { FadeUp, TextReveal } from '@/components/animations'
import { ProjectCard, ProjectItem } from '@/components/ProjectCard'
import { VercelSitePreview } from '@/components/VercelSitePreview'
import { ExternalLink, CheckCircle2, Globe, Server, ShieldCheck, Cpu, Building2, Network } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Nos Réalisations & Références Clients | NOB TECHNOLOGIES',
  description: 'Découvrez les projets informatiques, plateformes web (Parc Exotique du Sénégal) et déploiements ERP réalisés par NOB TECHNOLOGIES.',
}

const secondaryProjects: ProjectItem[] = [
  {
    id: 'union-europeenne-dakar',
    title: 'Délégation de l’Union Européenne à Dakar — Infrastructure Réseau & Baies 42U',
    sector: 'Institutionnel & Diplomatique',
    description: 'Déploiement complet du câblage réseau structuré Cat 6A/7, pose de baies de brassage 42U, peignage méthodique des liaisons et certification de conformité pour le bureau de l’Union Européenne à Dakar.',
    tags: ['Union Européenne', 'Dakar', 'Câblage Cat 6A/7', 'Baies 42U', 'Certification Fluke'],
    coverImage: '/images/projects/union-europeenne-baie-42u.jpg',
    clientLogo: '/images/partners/union-europeenne-logo.svg',
  },
  {
    id: 'seter-ter-dakar',
    title: 'SETER (TER de Dakar) — Formation des Techniciens au Réseau Télécoms GSM-R',
    sector: 'Transport Ferroviaire & Télécommunications Critiques',
    description: 'Programme de formation technique spécialisée et ateliers pratiques dispensés aux techniciens de la SETER sur les technologies de radiocommunications ferroviaires GSM-R : architectures sol-train, maintenance du réseau radio, diagnostic et sûreté de fonctionnement pour l’exploitation du Train Express Régional de Dakar.',
    tags: ['SETER', 'TER Dakar', 'Formation GSM-R', 'Télécoms Ferroviaires', 'Radio Sol-Train', 'Maintenance Critique'],
    coverImage: '/images/projects/seter-ter-datacenter.jpg',
    clientLogo: '/images/partners/seter-ter-dakar.png',
  },
  {
    id: 'polyclinique-p2a',
    title: 'Polyclinique P2A (Dakar) — Infrastructure Réseau, VMware, VoIP Yeastar & FortiGate',
    sector: 'Santé & Établissement Médical',
    description: 'Installation complète de l’infrastructure réseau physique et baies, virtualisation des serveurs médicaux sous VMware, téléphonie d’entreprise VoIP Yeastar et pare-feu Fortinet FortiGate (NGFW).',
    tags: ['Polyclinique P2A', 'Réseau Médical', 'VMware', 'VoIP Yeastar', 'Fortinet FortiGate'],
    coverImage: '/images/projects/polyclinique-medical.jpg',
    clientLogo: '/images/partners/polyclinique-p2a.svg',
  },
  {
    id: 'dolima-senegal',
    title: 'Dolima (La Laiterie du Berger) — Ingénierie & Infrastructure Réseau d’Entreprise',
    sector: 'Agro-Industrie & Production',
    description: 'Ingénierie et déploiement de l’infrastructure réseau locale, commutation LAN haute densité, segmentation VLAN et fiabilisation de la connectivité pour les flux industriels de Dolima.',
    tags: ['Dolima', 'Infrastructure Réseau', 'Switching LAN', 'Connectivité', 'Haute Disponibilité'],
    coverImage: '/images/projects/reseau-switching-datacenter.jpg',
    clientLogo: '/images/partners/dolima.png',
  },
  {
    id: 'simplon-senegal',
    title: 'Simplon Sénégal — Formation Professionnelle & Accompagnement Apprenants',
    sector: 'Formation & Éducation Numérique',
    description: 'Animation de modules intensifs et ateliers pratiques pour les apprenants de Simplon : architectures réseaux d’entreprise, administration système Linux/Windows, cybersécurité et préparation aux certifications.',
    tags: ['Simplon', 'Dakar', 'Formation Apprenants', 'Réseaux & Systèmes', 'Cybersécurité'],
    coverImage: '/images/projects/simplon-formation-lab.jpg',
    clientLogo: '/images/partners/simplon.svg',
  },
  {
    id: 'erp-gestion',
    title: 'Conception & Déploiement d’ERP d’Entreprise (Sur-Mesure / Odoo / Dolibarr)',
    sector: 'ERP, Digitalisation & Gestion Commerciale',
    description: 'Conception d’ERP sur-mesure pour des flux métiers spécifiques, ainsi qu’installation et paramétrage d’ERP de référence (Odoo, Dolibarr) pour la gestion des stocks, facturation, devis et comptabilité de structures sénégalaises et sous-régionales.',
    tags: ['ERP Sur-Mesure', 'Odoo & Dolibarr', 'Gestion Commerciale', 'Facturation', 'Comptabilité'],
    coverImage: '/images/projects/erp-dashboard.jpg',
  },
  {
    id: 'infra-firewall',
    title: 'Sécurisation Réseau & Pare-feu de Nouvelle Génération (NGFW)',
    sector: 'Cybersécurité Périmétrique',
    description: 'Mise en place de passerelles de sécurité Sophos et Fortinet (NGFW) avec filtrage applicatif, VPN IPsec multi-sites pour le travail à distance et politiques de segmentation réseau LAN/VLAN.',
    tags: ['Sophos XGS', 'Fortinet FortiGate', 'VPN IPsec', 'Segmentation VLAN'],
    coverImage: '/images/projects/datacenter-firewall.jpg',
  },
];

export default async function ProjectsPage() {
  let cmsProjects: any[] = [];
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'projects',
      where: { status: { equals: 'published' } },
    });
    cmsProjects = res?.docs || [];
  } catch (err) {
    // Fallback if db is unseeded
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Silicon Valley Hero */}
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <TextReveal>
                <h1 className="text-white mb-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
                  Nos Réalisations :{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                    L&apos;Ingénierie Réelle à l&apos;Épreuve du Terrain
                  </span>
                </h1>
              </TextReveal>
              <FadeUp delay={0.2}>
                <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
                  Découvrez nos déploiements majeurs en Afrique de l&apos;Ouest : plateformes web haute performance, réseaux d&apos;entreprise certifiés et systèmes de gestion unifiés.
                </p>
              </FadeUp>
            </div>
          </Container>
        </Section>
        
        {/* Flagship Reference: Parc Exotique du Sénégal with Vercel Preview */}
        <Section id="parc-exotique" className="scroll-mt-20 py-16 md:py-24 bg-white border-b border-slate-200">
          <Container>
            <FadeUp>
              <div className="mb-10 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-semibold mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Conçu et déployé par Nob Technologies
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                  Parc Exotique du Sénégal &mdash; Plateforme Web Officielle
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Développement et mise en production de la vitrine numérique complète de l’Hôtel du Parc, du restaurant La Plume et du parc animalier à Somone.
                </p>
              </div>
            </FadeUp>

            {/* Vercel-Style Interactive Deployment Preview */}
            <div className="mb-14">
              <VercelSitePreview
                url="https://parcexotique.sn/fr/"
                previewUrl="/api/preview/parcexotique"
                title="Hôtel du Parc Exotique du Sénégal"
                fallbackImage="/images/parc-exotique-preview.png"
              />
            </div>

            {/* Grounded Technical Case Study Specifications */}
            <div className="grid lg:grid-cols-3 gap-8 p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-600 font-bold mb-2">
                  01. Contexte & Objectifs
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  L’établissement avait besoin d'une plateforme moderne pour valoriser ses 12 chambres d'hôtel, son restaurant et son parc animalier (90+ espèces), avec un système de réservation directe accessible sur mobile et un référencement Google optimisé.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-600 font-bold mb-2">
                  02. Réalisations Techniques
                </h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Interface web responsive et optimisée pour smartphone.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Module de présentation des chambres & réservation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Catalogue interactif des espèces et galeries photos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Hébergement sécurisé SSL et temps de chargement &lt; 1.2s.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-600 font-bold mb-2">
                  03. Accès & Résultat
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Le site est actuellement en ligne et opérationnel à l’adresse officielle <strong>parcexotique.sn</strong>, générant des demandes de réservations directes pour l’hôtel et le restaurant.
                </p>
                <a
                  href="https://parcexotique.sn/fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] hover:brightness-105 text-[#020617] font-bold text-xs shadow-[0_4px_14px_0_rgba(0,212,255,0.35)] hover:shadow-[0_6px_20px_rgba(16,231,96,0.35)] transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Visiter le site en direct</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </Container>
        </Section>

        {/* Flagship Reference 2: Délégation de l'Union Européenne au Sénégal (Bureau de Dakar) */}
        <Section id="union-europeenne-dakar" className="scroll-mt-20 py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          
          <Container className="relative z-10">
            <FadeUp>
              <div className="mb-12 text-center max-w-3xl mx-auto flex flex-col items-center">
                {/* Official Logo */}
                <div className="bg-white rounded-2xl px-6 py-3.5 mb-6 shadow-xl border border-white/20 inline-flex items-center justify-center">
                  <Image
                    src="/images/partners/union-europeenne-logo.svg"
                    alt="Logo officiel Délégation de l'Union Européenne au Sénégal"
                    width={280}
                    height={65}
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 text-cyan-300 border border-blue-500/30 text-xs font-semibold mb-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Référence Diplomatique &bull; Bureau de Dakar (12, Av. Hassan II)
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Délégation de l’Union Européenne &mdash; Câblage Réseau &amp; Salles Serveurs
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Conception, pose et certification de l’infrastructure réseau physique : armoires de brassage 42U, peignage méthodique des liaisons cuivre Cat 6A/7, raccordement optique et distribution sécurisée pour le bureau de l&apos;UE à Dakar.
                </p>
              </div>
            </FadeUp>

            {/* Photo Showcase of the Installation */}
            <div className="grid lg:grid-cols-12 gap-6 mb-12">
              {/* Main Feature Photo */}
              <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl group">
                <Image
                  src="/images/projects/union-europeenne-baie-42u.jpg"
                  alt="Délégation de l'Union Européenne à Dakar — Baie 42U, peignage Cat 6A et testeur Fluke PASS"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800 inline-block mb-1.5">
                      Baie 42U &amp; Tests Fluke
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Recette Technique &amp; Certification de Câblage Cat 6A
                    </h3>
                  </div>
                  <Link
                    href="/galerie"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shrink-0 shadow-lg"
                  >
                    <span>Galerie complète</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* 4 Supporting Photo Cards */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {[
                  {
                    src: "/images/gallery/galerie-1-baie-brassage.jpg",
                    title: "Pose Goulottes & Déroulage Câbles",
                    tag: "Équipe Chantier",
                  },
                  {
                    src: "/images/gallery/galerie-7-salle-serveurs.jpg",
                    title: "Passage en Faux-Plafond Couloir",
                    tag: "Tirage en Hauteur",
                  },
                  {
                    src: "/images/gallery/galerie-3-rack-infrastructure.jpg",
                    title: "Coffret Mural FINEN & Brassage",
                    tag: "Coffret Réseau",
                  },
                  {
                    src: "/images/gallery/galerie-2-cablage-serveurs.jpg",
                    title: "Boîtes de Sol Legrand & Prises Repérées",
                    tag: "Boîtes de Sol",
                  },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href="/galerie"
                    className="group relative aspect-square rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md hover:border-cyan-500/60 transition-all"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[9px] font-mono text-cyan-300 uppercase tracking-wider block mb-0.5">
                        {item.tag}
                      </span>
                      <p className="text-xs font-semibold text-white truncate">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Grounded Technical Case Study Specifications */}
            <div className="grid lg:grid-cols-3 gap-6 p-7 sm:p-8 rounded-2xl bg-slate-800/60 border border-slate-700/80 backdrop-blur-xs">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  01. Contexte &amp; Exigences Diplomatiques
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Le bureau de la Délégation de l&apos;Union Européenne à Dakar (12, Avenue Hassan II) exigeait une infrastructure réseau d&apos;une fiabilité absolue et répondant aux normes internationales les plus rigoureuses pour supporter les opérations diplomatiques et l&apos;interconnexion permanente de ses équipes.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  02. Réalisations Techniques &amp; Normes
                </h4>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Câblage cuivre certifié Cat 6A / 7 à blindage renforcé (S/FTP).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Fourniture et équipement de baies de brassage 42U avec peignage au peigne.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Repérage normalisé et étiquetage millimétré de chaque prise.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Tests de réflectométrie et certification Fluke de l&apos;ensemble des liens.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  03. Résultats &amp; Réception de Chantier
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Livraison clé en main conforme aux standards européens ISO/IEC 11801 avec transmission du dossier de récolement et plan de câblage technique. Débit 10 Gbps certifié et disponibilité maximale.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href="/galerie"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all active:scale-95 shadow-sm"
                  >
                    <span>Voir toutes les photos</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-all"
                  >
                    <span>Demander une étude</span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Other Realized Projects */}
        <Section className="py-16 md:py-24 bg-slate-50">
          <Container>
            <div className="mb-12">
              <FadeUp>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Infrastructures, ERP & Réseaux
                    </h2>
                  </div>
                  <Link
                    href="/galerie"
                    className="text-xs sm:text-sm font-semibold text-cyan-600 hover:underline flex items-center gap-1.5"
                  >
                    Voir nos photos d'installations en galerie &rarr;
                  </Link>
                </div>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {secondaryProjects.map((project, index) => (
                <FadeUp key={project.id} delay={index * 0.1}>
                  <div id={String(project.id)} className="scroll-mt-28 h-full">
                    <ProjectCard project={project} />
                  </div>
                </FadeUp>
              ))}

              {/* Any dynamically added CMS projects */}
              {cmsProjects.map((project, index) => (
                <FadeUp key={project.id} delay={0.3 + index * 0.1}>
                  <ProjectCard
                    project={{
                      id: project.id,
                      title: project.title,
                      sector: project.sector || 'Technologie',
                      description: project.description,
                      websiteUrl: project.websiteUrl,
                      previewScreenshotUrl: project.previewScreenshotUrl,
                      coverImage: project.coverImage,
                      tags: project.tags || ['Projet Client'],
                    }}
                  />
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
