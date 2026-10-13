import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Container, Section } from '@/components/ui/layout';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ShieldCheck, Award, Lock, FileCheck, CheckCircle2, ArrowRight, Download, Server, Network } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Centre de Confiance & Conformité IT | NOB TECHNOLOGIES',
  description: 'Gouvernance, cybersécurité, certifications constructeurs et conformité ISO/IEC de NOB TECHNOLOGIES à Dakar.',
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Cybersécurité & Normes ISO/IEC',
    badge: 'Standard International',
    desc: 'Alignement méthodologique sur les référentiels ISO/IEC 27001 (SMSI) et ISO/IEC 11801 pour l’infrastructure de câblage structuré.',
    points: [
      'Audits de vulnérabilités et pentests périmétriques',
      'Segmentation réseau Zero-Trust & pare-feux NGFW certifiés',
      'Conformité RGPD et législation sénégalaise CDP (Loi 2008-12)',
    ],
  },
  {
    icon: Award,
    title: 'Certifications Officielles Constructeurs',
    badge: 'Élites Technologiques',
    desc: 'Nos ingénieurs et architectes détiennent des certifications constructeurs de référence internationale.',
    points: [
      'Fortinet Network Security Expert (NSE 4/7)',
      'Cisco Certified Network Associate & Professional (CCNA / CCNP)',
      'Sophos Certified Engineer & Architecte XGS',
      'Dell Technologies Solutions Partner & Microsoft 365 Cloud Certified',
    ],
  },
  {
    icon: Server,
    title: 'Engagements de Service (SLA & Haute Dispo)',
    badge: 'Garanties Contractuelles',
    desc: 'Contrats de maintenance préventive et curative avec engagements stricts de rétablissement (GTR / GTI).',
    points: [
      'GTI (Garantie de Temps d’Intervention) sous 2h à 4h sur site à Dakar',
      'Astreinte technique et hotline ingénieur 24/7 pour les environnements critiques',
      'Remplacement matériel express garanti constructeur (J+1)',
    ],
  },
  {
    icon: FileCheck,
    title: 'Recette & Certification Fluke Networks',
    badge: 'Traçabilité 100%',
    desc: 'Toutes nos liaisons cuivre Cat 6A/7 et fibre optique sont systématiquement testées et certifiées par réflectométrie et testeurs Fluke.',
    points: [
      'Rapports de certification Fluke complets (Atténuation, NEXT, Return Loss)',
      'Cahier de recette technique et plans d’adressage IP remis au client',
      'Schémas d’architecture réseau (Visio / PDF) et synoptiques des baies',
    ],
  },
];

const COMPLIANCES = [
  { name: 'Loi sénégalaise 2008-12 sur les Données Personnelles', org: 'Commission des Données Personnelles (CDP Sénégal)', status: 'Conforme' },
  { name: 'ISO/IEC 11801 & ANSI/TIA-568', org: 'Câblage structuré pour télécommunications d’entreprise', status: 'Certifié Fluke' },
  { name: 'Bonnes Pratiques de Cyberdéfense ANSSI / NIST', org: 'Sécurité périmétrique & gestion des incidents', status: 'Appliqué' },
  { name: 'Engagements Clés en Main & Non-Divulgation (NDA)', org: 'Confidentialité absolue des données et infrastructures', status: 'Systématique' },
];

export default function CentreDeConfiancePage() {
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
                  { label: 'Centre de Confiance & Conformité' },
                ]}
                className="mb-8"
              />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                <Lock className="w-3.5 h-3.5" />
                <span>Sécurité • Transparence • Garanties</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
                Centre de Confiance,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                  Gouvernance & Sécurité
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                La confiance de nos clients institutionnels, diplomatiques et bancaires repose sur une rigueur d’ingénierie absolue, des accréditations officielles et une transparence contractuelle totale.
              </p>
            </div>
          </Container>
        </Section>

        {/* 4 Pillars Grid */}
        <Section className="py-16 md:py-24 bg-slate-50">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Les 4 Piliers de l’Excellence NOB TECHNOLOGIES
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Chaque déploiement est encadré par des processus stricts et des engagements vérifiables sur le terrain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={i}
                    className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                          {pillar.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2">{pillar.title}</h3>
                      <p className="text-sm text-slate-600 mb-6 leading-relaxed">{pillar.desc}</p>

                      <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                        {pillar.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Regulatory & Compliance Framework Table */}
        <Section className="py-16 md:py-20 bg-white border-t border-slate-200">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="mb-10 text-center sm:text-left">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700">
                  Cadre Légal & Réglementaire
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                  Conformité & Engagements de Non-Divulgation
                </h2>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-200">
                  {COMPLIANCES.map((c, idx) => (
                    <div key={idx} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">{c.name}</h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{c.org}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Callout */}
              <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#020617] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Besoin d’un audit de sécurité ou d’un accord NDA ?</h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Nos équipes vous transmettent notre engagement de confidentialité sous 24 heures.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    href="/reserver-audit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] text-slate-950 font-bold text-xs sm:text-sm hover:brightness-105 transition-all shadow-md"
                  >
                    <span>Réserver un audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
