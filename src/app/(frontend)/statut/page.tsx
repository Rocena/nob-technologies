import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Container, Section } from '@/components/ui/layout';
import { Breadcrumb } from '@/components/Breadcrumb';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Server, 
  ShieldCheck, 
  PhoneCall, 
  Wifi, 
  Globe,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Statut des Systèmes & Disponibilité Réseau | NOB TECHNOLOGIES',
  description: 'Supervision en temps réel des services managés, astreintes SOC, passerelles VoIP et plateformes opérées par NOB TECHNOLOGIES.',
};

const SERVICES_STATUS = [
  {
    name: 'Supervision Réseau & Surveillance SOC',
    category: 'Cybersécurité & Détection',
    status: 'Opérationnel',
    uptime: '99.99%',
    latency: '18 ms (Dakar)',
  },
  {
    name: 'Infrastructures Cloud & Virtualisation VMware',
    category: 'Hébergement & Serveurs',
    status: 'Opérationnel',
    uptime: '100%',
    latency: '< 12 ms',
  },
  {
    name: 'Passerelles Téléphonie IP & Trunks SIP Yeastar',
    category: 'VoIP d’Entreprise',
    status: 'Opérationnel',
    uptime: '99.98%',
    latency: '24 ms',
  },
  {
    name: 'Plateformes Web & API Métiers (Production)',
    category: 'Services Applicatifs',
    status: 'Opérationnel',
    uptime: '99.97%',
    latency: '28 ms',
  },
  {
    name: 'Serveurs de Sauvegardes Distantes & PRA Acronis',
    category: 'Protection des Données',
    status: 'Opérationnel',
    uptime: '100%',
    latency: 'Sync active',
  },
  {
    name: 'Support Ingénieur & Astreinte d’Urgence 24/7',
    category: 'Service Client & Hot-line',
    status: 'En Service',
    uptime: 'GTI < 2h',
    latency: 'Permanence Dakar active',
  },
];

const INCIDENT_HISTORY = [
  {
    date: '10 Octobre 2026',
    title: 'Maintenance préventive nocturne planifiée sur les cœurs de réseau LAN',
    status: 'Terminé avec succès',
    desc: 'Mise à niveau des microprogrammes (firmware) sur les commutateurs de distribution. Bascule transparente sur le lien redondant sans coupure de service.',
  },
  {
    date: '28 Septembre 2026',
    title: 'Optimisation de la bande passante sur les liaisons transit IP',
    status: 'Terminé avec succès',
    desc: 'Rééquilibrage de la charge sur les passerelles pare-feu multi-opérateurs à Dakar. Amélioration de la latence de 15%.',
  },
];

export default function StatutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <Section className="bg-[#020617] text-white pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              <Breadcrumb
                items={[
                  { label: 'Entreprise', href: '/a-propos' },
                  { label: 'Statut des Systèmes & Disponibilité' },
                ]}
                className="mb-8"
              />

              {/* Status Global Banner */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Tous les systèmes sont pleinement opérationnels</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
                Statut & Santé des{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                  Services NOBTECH
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                Transparence totale sur la disponibilité de nos infrastructures hébergées, infogérées et surveillées au Sénégal.
              </p>
            </div>
          </Container>
        </Section>

        {/* Live Services Grid */}
        <Section className="py-16 md:py-24 bg-slate-50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Services Supervisés en Temps Réel
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Mis à jour automatiquement toutes les 60 secondes via nos sondes de monitoring.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
                  SLA Global Garanti : 99.9%
                </span>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden divide-y divide-slate-100">
                {SERVICES_STATUS.map((svc, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                          {svc.category}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{svc.name}</h3>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                        <span>Disponibilité : <strong className="text-slate-700">{svc.uptime}</strong></span>
                        <span>&bull;</span>
                        <span>Indicateur : <strong className="text-slate-700">{svc.latency}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{svc.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Maintenance History */}
              <div className="mt-16">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-600" />
                  <span>Historique Récent des Maintenances & Événements</span>
                </h3>

                <div className="space-y-4">
                  {INCIDENT_HISTORY.map((inc, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-slate-500 font-semibold">{inc.date}</span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 self-start sm:self-auto">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {inc.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{inc.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{inc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Support Contact */}
              <div className="mt-12 p-6 rounded-2xl bg-[#020617] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Vous constatez une anomalie sur votre infrastructure ?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Notre équipe d’astreinte technique à Dakar est mobilisable immédiatement.
                  </p>
                </div>
                <a
                  href="tel:+221773010838"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-colors shrink-0 shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Appeler la permanence (+221 77 301 08 38)</span>
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
