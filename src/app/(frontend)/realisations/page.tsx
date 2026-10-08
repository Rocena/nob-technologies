import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { FadeUp, TextReveal } from '@/components/animations'
import { ProjectCard, ProjectItem } from '@/components/ProjectCard'
import { Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Nos Réalisations & Références Clients | NOB TECHNOLOGIES',
  description: 'Découvrez les projets conçus et déployés par NOB TECHNOLOGIES : applications web et mobiles, sites sur-mesure (Parc Exotique du Sénégal), ERP d’entreprise et infrastructures sécurisées.',
}

const defaultProjects: ProjectItem[] = [
  {
    id: 'parc-exotique',
    title: 'Parc Exotique du Sénégal — Hôtel, Parc Animalier & Restaurant',
    sector: 'Développement Web & Réservation',
    description: 'Conception et développement sur-mesure de la plateforme officielle du Parc Exotique à Somone : présentation de l’hôtel 12 chambres, du restaurant La Plume et du parc animalier de 90+ espèces, avec module de réservation, référencement multilingue et optimisation mobile ultra-rapide.',
    websiteUrl: 'https://parcexotique.sn/fr/',
    previewScreenshotUrl: '/images/parc-exotique-preview.jpg',
    tags: ['Next.js / Django', 'Réservation en Ligne', 'SEO International', 'Design Responsive'],
    isFlagship: true,
  },
  {
    id: 'erp-gestion',
    title: 'Digitalisation des Entreprises & Déploiement ERP (Odoo / Dolibarr)',
    sector: 'ERP & Transformation Digitale',
    description: 'Intégration d’ERP complets pour la gestion commerciale, stocks, facturation et comptabilité des PME/PMI. Automatisation des flux administratifs et interconnexion avec les passerelles bancaires et mobiles money locales.',
    tags: ['ERP Odoo / Dolibarr', 'Gestion Commerciale & Stocks', 'Facturation Automatisée', 'Sécurisation des Données'],
  },
  {
    id: 'infra-firewall',
    title: 'Architecture Réseau Sécurisée & Pare-feu Nouvelle Génération',
    sector: 'Cybersécurité & Réseaux',
    description: 'Déploiement d’architectures réseaux haut débit avec basculement automatique multi-FAI, pare-feux Sophos et Fortinet (NGFW), segmentation VLAN et accès VPN distants ultra-sécurisés pour collaborateurs nomades.',
    tags: ['Firewalls Sophos / Fortinet', 'LAN / WAN Haute Disponibilité', 'VPN IPSec / SSL', 'Supervision PRTG'],
  },
  {
    id: 'cablage-telecom',
    title: 'Câblage Structuré, Fibre Optique & Téléphonie IP',
    sector: 'Infrastructures Télécoms',
    description: 'Installation de baies de brassage normalisées, liaisons inter-bâtiments en fibre optique et serveurs de téléphonie IP (VoIP Sangoma / Yeastar / Cisco) pour unifier les communications voix et vidéo d’entreprise.',
    tags: ['Fibre Optique', 'Câblage Cat 6A / 7', 'Téléphonie IP / VoIP', 'Vidéosurveillance IP'],
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

  // Combine default showcase with CMS projects
  const allProjects: ProjectItem[] = [
    ...defaultProjects,
    ...cmsProjects.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      sector: p.sector || 'Technologie',
      description: p.description,
      websiteUrl: p.websiteUrl,
      previewScreenshotUrl: p.previewScreenshotUrl,
      coverImage: p.coverImage,
      tags: p.tags || ['Projet Client'],
    })),
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" /> PORTFOLIO & PROJETS CLIENTS
              </span>
              <TextReveal>
                <Heading level={1} className="text-white mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1]">
                  Nos Réalisations
                </Heading>
              </TextReveal>
              <FadeUp delay={0.2}>
                <Text className="text-slate-400 text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
                  Découvrez nos réalisations concrètes : plateformes web, solutions logicielles, déploiements ERP et infrastructures télécoms haute performance.
                </Text>
              </FadeUp>
            </div>
          </Container>
        </Section>
        
        {/* Projects Grid */}
        <Section className="py-16 md:py-24 bg-slate-50">
          <Container>
            <div className="mb-12">
              <FadeUp>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                  <div>
                    <p className="font-mono text-cyan-600 text-xs tracking-[0.25em] uppercase font-bold mb-2">
                      &gt;_ ÉTUDES DE CAS & PREUVES DE SAVOIR-FAIRE
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Projets Livrés & Sites en Ligne
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                    Cliquez sur les cartes pour visiter directement les plateformes web actives ou explorer l’architecture mise en place.
                  </p>
                </div>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {allProjects.map((project, index) => (
                <FadeUp key={project.id} delay={(index % 2) * 0.1}>
                  <ProjectCard project={project} />
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
