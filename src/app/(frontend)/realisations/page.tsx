import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { FadeUp, TextReveal } from '@/components/animations'
import { ProjectCard, ProjectItem } from '@/components/ProjectCard'
import { VercelSitePreview } from '@/components/VercelSitePreview'
import { ExternalLink, CheckCircle2, Globe, Server, ShieldCheck, Cpu } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Nos Réalisations & Références Clients | NOB TECHNOLOGIES',
  description: 'Découvrez les projets informatiques, plateformes web (Parc Exotique du Sénégal) et déploiements ERP réalisés par NOB TECHNOLOGIES.',
}

const secondaryProjects: ProjectItem[] = [
  {
    id: 'erp-gestion',
    title: 'Déploiement ERP d’Entreprise (Odoo / Dolibarr)',
    sector: 'ERP & Gestion Commerciale',
    description: 'Installation et paramétrage d’ERP complets pour la gestion des stocks, facturation, devis et comptabilité de PME sénégalaises. Centralisation des flux et formation des équipes utilisatrices.',
    tags: ['ERP Odoo / Dolibarr', 'Gestion Commerciale', 'Facturation', 'Comptabilité'],
  },
  {
    id: 'infra-firewall',
    title: 'Sécurisation Réseau & Pare-feu de Nouvelle Génération',
    sector: 'Cybersécurité Périmétrique',
    description: 'Mise en place de passerelles de sécurité Sophos et Fortinet (NGFW) avec filtrage applicatif, VPN IPsec multi-sites pour le travail à distance et politiques de segmentation réseau LAN/VLAN.',
    tags: ['Sophos XGS', 'Fortinet FortiGate', 'VPN IPsec', 'Segmentation VLAN'],
  },
  {
    id: 'cablage-telecom',
    title: 'Câblage Réseau Structuré & Baies de Brassage',
    sector: 'Infrastructures Câblage & Télécoms',
    description: 'Pose de câblage informatique catégorie 6A/7, installation et peignage de baies de brassage 42U, raccordement de liaisons fibre optique et déploiement de standard téléphonique IP (VoIP).',
    tags: ['Câblage Cat 6A', 'Baies 42U', 'Fibre Optique', 'Téléphonie IP'],
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
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 uppercase mb-4">
                PROJETS & RÉALISATIONS TECHNIQUES
              </span>
              <TextReveal>
                <Heading level={1} className="text-white mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1]">
                  Nos Réalisations
                </Heading>
              </TextReveal>
              <FadeUp delay={0.2}>
                <Text className="text-slate-400 text-base sm:text-xl font-light max-w-2xl leading-relaxed">
                  Découvrez les solutions concrètes déployées par NOB TECHNOLOGIES : plateformes web en production, interconnexions d'infrastructures et intégrations ERP.
                </Text>
              </FadeUp>
            </div>
          </Container>
        </Section>
        
        {/* Flagship Reference: Parc Exotique du Sénégal with Vercel Preview */}
        <Section className="py-16 md:py-24 bg-white border-b border-slate-200">
          <Container>
            <FadeUp>
              <div className="mb-10 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Conçu et déployé par Nob Technologies
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
                title="Parc Exotique du Sénégal"
                fallbackImage="/images/parc-exotique-preview.jpg"
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-cyan-600 transition-colors shadow-sm"
                >
                  <span>Visiter le site en direct</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
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
                    <p className="font-mono text-cyan-600 text-xs tracking-[0.25em] uppercase font-bold mb-2">
                      &gt;_ AUTRES PROJETS DÉPLOYÉS
                    </p>
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
                  <ProjectCard project={project} />
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
