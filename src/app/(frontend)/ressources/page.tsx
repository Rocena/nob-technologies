import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Container, Section } from '@/components/ui/layout';
import { Breadcrumb } from '@/components/Breadcrumb';
import { 
  FileText, 
  Download, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ressources & Guides Techniques IT | NOB TECHNOLOGIES',
  description: 'Livres blancs, fiches pratiques de cybersécurité, guides de câblage structuré et checklists d’audit pour DSI et responsables IT au Sénégal.',
};

const RESOURCES = [
  {
    type: 'Livre Blanc',
    tag: 'Cybersécurité 2025',
    title: 'Guide Pratique : Protéger son Entreprise contre les Ransomwares au Sénégal',
    desc: 'Les 10 mesures indispensables de cyber-hygiène, le choix d’un pare-feu NGFW adapté et les obligations de déclaration d’incidents selon la Commission des Données Personnelles (CDP).',
    pages: '24 pages • PDF',
    downloadUrl: '/contact?type=quote&service=Livre+Blanc+Cybersecurite',
  },
  {
    type: 'Fiche Technique',
    tag: 'Câblage Structuré',
    title: 'Câblage Cat 6A vs Cat 7 : Comment Choisir l’Infrastructure Idéale pour ses Baies 42U ?',
    desc: 'Comparatif d’ingénierie, blindage U/FTP vs S/FTP, limitation des diaphonies exogènes et critères de certification Fluke Networks ISO/IEC 11801.',
    pages: '12 pages • PDF',
    downloadUrl: '/contact?type=quote&service=Fiche+Technique+Cablage',
  },
  {
    type: 'Checklist DSI',
    tag: 'Audit Interne',
    title: 'Grille d’Auto-Évaluation de la Résilience Informatique & Sauvegardes 3-2-1',
    desc: 'Un questionnaire exhaustif pour auditer vos serveurs, vos tests de restauration de sauvegardes Acronis/Veeam et vos plans de reprise d’activité (PRA/PCA).',
    pages: '8 pages • PDF interactif',
    downloadUrl: '/contact?type=quote&service=Checklist+DSI+Resilience',
  },
  {
    type: 'Guide Opérationnel',
    tag: 'Téléphonie IP',
    title: 'Migrer son Télécom d’Entreprise vers la VoIP Yeastar & les Communications Unifiées',
    desc: 'Calcul du retour sur investissement (ROI), sélection des liaisons SIP opérateurs au Sénégal et interconnexion télétravail / smartphones.',
    pages: '16 pages • PDF',
    downloadUrl: '/contact?type=quote&service=Guide+VoIP+Yeastar',
  },
];

export default function RessourcesPage() {
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
                  { label: 'Entreprise', href: '/a-propos' },
                  { label: 'Ressources & Guides DSI' },
                ]}
                className="mb-8"
              />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Documentation Technique & Veille Stratégique</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
                Ressources Techniques &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                  Livres Blancs DSI
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                Accédez à nos analyses d’ingénieurs, comparatifs d’architectures et guides pratiques pour accélérer vos décisions technologiques.
              </p>
            </div>
          </Container>
        </Section>

        {/* Resources Cards Grid */}
        <Section className="py-16 md:py-24 bg-slate-50">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {RESOURCES.map((res, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-400/80 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
                        {res.type}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {res.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug hover:text-cyan-600 transition-colors">
                      {res.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {res.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">{res.pages}</span>
                    <Link
                      href={res.downloadUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-cyan-600 group"
                    >
                      <span>Demander l’accès</span>
                      <Download className="w-3.5 h-3.5 text-cyan-600 group-hover:translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter / Direct Inquiry Bar */}
            <div className="mt-16 p-8 rounded-3xl bg-[#020617] text-white max-w-4xl mx-auto text-center relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Vous souhaitez un guide spécifique pour votre secteur ?</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-6">
                  Nos consultants rédigent régulièrement des mémos d’ingénierie adaptés aux besoins de nos partenaires.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-bold text-xs sm:text-sm hover:brightness-105 transition-all shadow-md"
                >
                  <span>Échanger avec un consultant</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
