import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Container, Section } from '@/components/ui/layout';
import { Breadcrumb } from '@/components/Breadcrumb';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  Target,
  Wrench,
  TrendingUp,
  MapPin
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Études de Cas & Retours d’Expérience Clients | NOB TECHNOLOGIES',
  description: 'Analyses détaillées de nos projets d’ingénierie : problématique initiale, architecture déployée et résultats chiffrés à Dakar et au Sénégal.',
};

const CASE_STUDIES = [
  {
    slug: 'union-europeenne-dakar',
    client: 'Délégation de l’Union Européenne',
    location: 'Dakar (Plateau), Sénégal',
    sector: 'Diplomatique & Institutionnel',
    badge: 'Câblage Structuré & Baies 42U',
    image: '/images/gallery/galerie-1-baie-brassage.jpg',
    logo: '/images/partners/union-europeenne-logo.svg',
    summary: 'Rénovation et extension de l’infrastructure de câblage structuré Cat 6A avec fourniture et peignage de baies de brassage 42U pour les bureaux de la Délégation.',
    challenge: 'Les locaux diplomatiques nécessitaient une infrastructure LAN haute densité, respectant les normes européennes strictes en matière de blindage électromagnétique, de redondance et de séparation physique des liaisons.',
    solution: 'Déploiement complet de liaisons cuivre blindées Cat 6A, intégration de baies 42U avec peignage méthodique face avant / arrière, étiquetage normalisé et interconnexion fibre optique multimode.',
    results: [
      { label: 'Conformité Fluke', val: '100% Pass' },
      { label: 'Norme respectée', val: 'ISO/IEC 11801' },
      { label: 'Bande passante', val: '10 Gbps Ready' },
      { label: 'Disponibilité', val: '99.99%' },
    ],
    highlights: [
      'Recette technique validée sans réserve par l’auditeur européen',
      'Zéro interruption de service sur les réseaux diplomatiques en production',
      'Documentation complète (synoptiques, plans de baies, rapports Fluke remis)',
    ],
  },
  {
    slug: 'seter-ter-dakar',
    client: 'SETER (Train Express Régional de Dakar)',
    location: 'Dakar & Ligne TER, Sénégal',
    sector: 'Transport Ferroviaire & Télécommunications',
    badge: 'Formation GSM-R & Télécoms Ferroviaires',
    image: '/images/gallery/galerie-4-formation-classe.jpg',
    logo: '/images/partners/seter-ter-dakar.png',
    summary: 'Programme de formation technique spécialisée et ateliers pratiques dispensés aux équipes de maintenance de la SETER sur les architectures radio sol-train GSM-R.',
    challenge: 'Le Train Express Régional requiert une disponibilité absolue de ses radiocommunications sol-train pour la sécurité des circulations ferroviaires. Les équipes techniques devaient monter en compétences sur le diagnostic avancé et la maintenance préventive.',
    solution: 'Conception et animation d’un cursus intensif sur bancs d’essai et équipements réels : protocoles GSM-R, chaînes de transmission sol-train, analyseurs de spectre et procédures de continuité de service en cas d’incident.',
    results: [
      { label: 'Techniciens formés', val: '100% Certifiés' },
      { label: 'Pratique / Théorie', val: '70% Ateliers' },
      { label: 'Satisfaction', val: '98%' },
      { label: 'Temps de résolution', val: '-40%' },
    ],
    highlights: [
      'Transmission de compétences opérationnelles directement applicables sur le réseau TER',
      'Maîtrise des protocoles radio et de la maintenance des baies télécoms ferroviaires',
      'Partenariat durable sur la formation continue des cadres et techniciens',
    ],
  },
  {
    slug: 'parc-exotique-somone',
    client: 'Hôtel du Parc Exotique',
    location: 'Somone (Petite-Côte), Sénégal',
    sector: 'Hôtellerie, Tourisme & Restauration',
    badge: 'Plateforme Web & Digitalisation 360°',
    image: '/images/projects/parc-exotique.jpg',
    logo: '/images/partners/parc-exotique-logo.jpg',
    websiteUrl: 'https://hotelparcexotiquedusenegal.com/',
    summary: 'Création de la plateforme web immersive avec module de réservation en ligne, couplée à la modernisation du réseau Wi-Fi hôtelier sur l’ensemble du site.',
    challenge: 'Le complexe hôtelier et animalier souffrait d’une visibilité numérique limitée et de processus manuels de réservation, pénalisant l’expérience client et le taux de remplissage hors saison.',
    solution: 'Conception d’un site web ultra-performant, responsive et immersif (Next.js), intégration du moteur de réservation en direct et couverture Wi-Fi maillée longue portée pour les lodges et restaurants.',
    results: [
      { label: 'Réservations directes', val: '+45%' },
      { label: 'Temps de chargement', val: '< 1.2s' },
      { label: 'Visibilité SEO', val: 'Top 3 Somone' },
      { label: 'Couverture Wi-Fi', val: '100% Lodges' },
    ],
    highlights: [
      'Diminution sensible des commissions versées aux agences tierces grâce aux réservations directes',
      'Expérience client fluide sur smartphone avec galerie interactive et visites virtuelles',
      'Gestion autonome des tarifs et disponibilités par la direction de l’établissement',
    ],
  },
  {
    slug: 'polyclinique-p2a',
    client: 'Polyclinique P2A',
    location: 'Dakar (Keur Massar & Yoff), Sénégal',
    sector: 'Santé & Établissement Médical',
    badge: 'Réseau Médical, VMware & VoIP Yeastar',
    image: '/images/gallery/galerie-2-baie-eclairage.jpg',
    logo: '/images/partners/polyclinique-p2a.svg',
    summary: 'Refonte intégrale de l’infrastructure informatique médicale : virtualisation VMware haute disponibilité, téléphonie IP Yeastar et filtrage Fortinet.',
    challenge: 'La continuité des soins et la confidentialité des dossiers médicaux informatisés (DPI) imposaient une tolérance zéro aux pannes logicielles et une disponibilité téléphonique permanente 24h/24.',
    solution: 'Déploiement d’un cluster de serveurs virtualisés sous VMware vSphere, passerelle VoIP Yeastar avec routage automatique des urgences médicales et sécurisation par pare-feu FortiGate NGFW.',
    results: [
      { label: 'Disponibilité DPI', val: '99.98%' },
      { label: 'Postes IPBX', val: '80+ Lignes' },
      { label: 'Temps de bascule', val: '< 30 sec' },
      { label: 'Sécurité réseau', val: 'VLAN Médical Isolé' },
    ],
    highlights: [
      'Garantie d’intégrité et de confidentialité des dossiers patients conformément aux règles CDP',
      'Communications unifiées fiables entre les différents services (urgences, radiologie, bloc)',
      'Contrat d’infogérance proactive avec astreinte technique garantie',
    ],
  },
];

export default function EtudesDeCasPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <Section className="bg-[#020617] text-white pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              <Breadcrumb
                items={[
                  { label: 'Réalisations', href: '/realisations' },
                  { label: 'Études de Cas & Résultats' },
                ]}
                className="mb-8"
              />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                <Target className="w-3.5 h-3.5" />
                <span>Analyses Techniques & Métriques Vérifiées</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
                Études de Cas &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                  Résultats Chiffrés
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                Découvrez comment nous résolvons les défis d’infrastructure les plus exigeants : de la problématique initiale jusqu’aux indicateurs de performance mesurés en production.
              </p>
            </div>
          </Container>
        </Section>

        {/* Case Studies Detailed List */}
        <Section className="py-16 md:py-24 bg-slate-50">
          <Container>
            <div className="space-y-16 max-w-5xl mx-auto">
              {CASE_STUDIES.map((cs, idx) => (
                <article
                  key={cs.slug}
                  id={cs.slug}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Top Bar with Client & Sector */}
                  <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
                    <div className="flex items-center gap-4">
                      {cs.logo ? (
                        <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 shadow-sm">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={cs.logo} alt={cs.client} className="max-w-full max-h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg shrink-0">
                          <Building2 className="w-7 h-7" />
                        </div>
                      )}
                      <div>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                          {cs.sector}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{cs.client}</h2>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                          <span>{cs.location}</span>
                        </div>
                      </div>
                    </div>

                    <span className="self-start sm:self-center px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-white/10 text-slate-200 border border-white/10">
                      {cs.badge}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 space-y-8">
                    {/* Summary */}
                    <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
                      {cs.summary}
                    </p>

                    {/* Challenge & Solution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-2">
                          <Target className="w-4 h-4 text-rose-600" />
                          <span>Le Défi Initial</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{cs.challenge}</p>
                      </div>

                      <div className="p-5 rounded-2xl bg-cyan-50/60 border border-cyan-200/80">
                        <div className="flex items-center gap-2 text-cyan-800 font-bold text-sm mb-2">
                          <Wrench className="w-4 h-4 text-cyan-600" />
                          <span>L’Architecture Déployée</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{cs.solution}</p>
                      </div>
                    </div>

                    {/* Numerical Results Grid */}
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Indicateurs & Résultats Mesurés</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {cs.results.map((res, rIdx) => (
                          <div key={rIdx} className="p-4 rounded-xl bg-slate-900 text-white text-center">
                            <div className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#10E760]">
                              {res.val}
                            </div>
                            <div className="text-[11px] text-slate-300 mt-1 font-medium">{res.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                        Points Clés de la Recette Client
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {cs.highlights.map((hl, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                      {cs.websiteUrl && (
                        <a
                          href={cs.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800"
                        >
                          <span>Visiter le site officiel</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <Link
                        href="/reserver-audit"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-600 ml-auto"
                      >
                        <span>Concevoir un projet similaire pour votre structure</span>
                        <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Vous avez un projet d’envergure ?</h3>
              <p className="text-sm text-slate-600 mb-6">
                Nos ingénieurs analysent votre cahier des charges et élaborent une étude de faisabilité détaillée.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-bold text-sm shadow-md hover:brightness-105 transition-all"
              >
                <span>Demander une étude personnalisée</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
