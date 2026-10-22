import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Container, Section } from '@/components/ui/layout';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ContactForm } from '../contact/form';
import { 
  ShieldCheck, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  HelpCircle,
  Network,
  Server,
  Lock,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Réserver un Audit Réseau & Cybersécurité | NOB TECHNOLOGIES',
  description: 'Planifiez un diagnostic sur site à Dakar ou à distance pour évaluer vos baies, pare-feux, débit et conformité de sécurité.',
};

const AUDIT_STEPS = [
  {
    step: '01',
    title: 'Cadrage Préliminaire & NDA',
    desc: 'Signature d’un accord de confidentialité et collecte du périmètre cible (nombre de baies, équipements, postes, sites distants).',
  },
  {
    step: '02',
    title: 'Inspection Physique & Logique sur Site',
    desc: 'Visite d’un ingénieur à Dakar : test de connectivité Fluke, analyse des règles firewall, inspection des baies 42U et des onduleurs.',
  },
  {
    step: '03',
    title: 'Rapport d’Audit & Matrice des Vulnérabilités',
    desc: 'Remise d’un livrable exécutif avec scoring de sécurité (CVE), schéma réseau à jour et recommandations budgétées par ordre de priorité.',
  },
];

const INCLUDED_CHECKS = [
  'Cartographie des switchs, routeurs et segmentation VLAN',
  'Audit des politiques de filtrage Sophos / Fortinet NGFW',
  'Contrôle physique des baies : peignage, brassage, température et secours électrique',
  'Analyse des accès distants VPN et de la gestion des mots de passe admin',
  'Mesure des performances de bande passante et des points de saturation LAN/WAN',
  'Conformité avec les exigences de la CDP et recommandations ISO 27001',
];

export default function ReserverAuditPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white dark:bg-[#020617]">
        {/* Hero Section */}
        <Section className="bg-[#020617] text-white pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              <Breadcrumb
                items={[
                  { label: 'Services', href: '/services' },
                  { label: 'Réserver un Audit' },
                ]}
                className="mb-8"
              />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
                Réservez Votre{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                  Audit Réseau & Sécurité
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                Identifiez les failles de votre architecture, fiabilisez vos liaisons critiques et recevez un plan d’action opérationnel chiffré rédigé par nos ingénieurs certifiés.
              </p>
            </div>
          </Container>
        </Section>

        {/* 2-Columns: Left = Details & Process, Right = Booking Form */}
        <Section className="py-16 md:py-24 bg-slate-50 dark:bg-[#020617]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-6xl mx-auto">
              
              {/* Left Column: Scope & Benefits */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                    Pourquoi faire auditer vos infrastructures par Nob Technologies ?
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    Un réseau mal structuré ou une passerelle mal configurée expose votre entreprise aux pannes paralysantes, aux pertes de données et aux cyberattaques. Nos audits apportent un regard d’ingénieur indépendant et constructif.
                  </p>
                </div>

                {/* Steps Timeline */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                    Déroulement de l’intervention
                  </h3>
                  <div className="space-y-4">
                    {AUDIT_STEPS.map((st, i) => (
                      <div key={i} className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0b1329] border border-slate-200/90 dark:border-slate-800 shadow-2xs flex gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                          {st.step}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{st.title}</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scope Card */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Contrôles inclus dans le rapport de diagnostic</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {INCLUDED_CHECKS.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Help */}
                <div className="p-5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/80 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                  <p className="font-semibold text-cyan-900 dark:text-cyan-300 mb-1">Urgence ou panne en cours ?</p>
                  <p className="text-cyan-800/90 dark:text-cyan-200/90">
                    Pour une intervention d’urgence immédiate à Dakar, appelez notre permanence technique au{' '}
                    <a href="tel:+221773010838" className="font-bold underline text-cyan-900 dark:text-cyan-300">
                      +221 77 301 08 38
                    </a>.
                  </p>
                </div>
              </div>

              {/* Right Column: Form Container */}
              <div className="lg:col-span-6 bg-white dark:bg-[#0b1329] p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl relative">
                <div className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Formulaire de Réservation d’Audit</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Renseignez vos coordonnées ci-dessous. Un ingénieur senior prend contact avec vous pour convenir de la date et des modalités d’accès.
                  </p>
                </div>

                <ContactForm formType="engineer" initialService="Audit Réseau & Cybersécurité" />
              </div>

            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
