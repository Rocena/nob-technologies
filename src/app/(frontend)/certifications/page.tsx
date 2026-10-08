import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { Section, Container } from "@/components/ui/layout";
import { FadeUp, TextReveal } from "@/components/animations";
import { Award, ShieldCheck, GraduationCap, CheckCircle2, ArrowRight, ShieldAlert, Cpu, Sparkles, ExternalLink } from "lucide-react";
import { StatsSection } from "./client-stats";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Partenaires & Formations | NOB TECHNOLOGIES",
  description:
    "Découvrez les partenaires technologiques et programmes de préparation aux certifications de NOB TECHNOLOGIES : Sophos, Fortinet, Microsoft 365, Acronis, Kaspersky, Wallix.",
};

const featuredPartners = [
  {
    name: "Sophos",
    role: "Partenaire Pare-feu & Cyberdéfense Synchronisée",
    desc: "Déploiement de firewalls de nouvelle génération (Sophos XGS), protection endpoint synchronisée avec Intercept X et détection anti-ransomware automatisée.",
    badge: "FIREWALL & SÉCURITÉ",
    color: "from-blue-600/25 to-cyan-500/15",
    accent: "text-cyan-400",
    border: "border-cyan-500/40",
    isFlagship: true,
    logo: "/images/partners/sophos.svg",
    url: "https://www.sophos.com/",
  },
  {
    name: "Fortinet",
    role: "Spécialiste Sécurité Réseau & Next-Gen Firewall",
    desc: "Expertise avancée en cybersécurité périmétrique : passerelles FortiGate (NGFW), segmentation réseau, SD-WAN sécurisé, FortiSIEM et protection FortiEDR.",
    badge: "NEXT-GEN FIREWALL",
    color: "from-red-600/25 to-rose-500/15",
    accent: "text-rose-400",
    border: "border-rose-500/40",
    isFlagship: true,
    logo: "/images/partners/fortinet.svg",
    url: "https://www.fortinet.com/",
  },
  {
    name: "Microsoft 365",
    role: "Vente de Licences (ESD & CSP) & Modern Workplace",
    desc: "Distribution officielle de licences Microsoft 365 pour entreprises (ESD & CSP), déploiement collaboratif Teams, Exchange Online, SharePoint et sécurisation Entra ID.",
    badge: "LICENCES ESD & CSP",
    color: "from-sky-600/25 to-blue-500/15",
    accent: "text-sky-400",
    border: "border-sky-500/40",
    isFlagship: true,
    logo: "/images/partners/microsoft.svg",
    url: "https://www.microsoft.com/microsoft-365",
  },
];

const partners = [
  {
    name: "Cisco",
    role: "Réseaux d'Entreprise, Commutation & Routage",
    desc: "Solutions d'infrastructure réseau haute disponibilité, commutateurs Catalyst, routeurs d'entreprise et architectures Wi-Fi professionnelles.",
    badge: "RÉSEAUX",
    color: "from-cyan-500/20 to-blue-600/10",
    accent: "text-cyan-400",
    border: "border-cyan-500/20",
    logo: "/images/partners/cisco-color.svg",
    url: "https://www.cisco.com/",
  },
  {
    name: "Dell Technologies",
    role: "Serveurs PowerEdge, Stockage & Matériel",
    desc: "Infrastructures matérielles sur-mesure : serveurs d'entreprise Dell PowerEdge, baies de stockage SAN/NAS et stations de travail haute performance.",
    badge: "HARDWARE",
    color: "from-blue-500/20 to-sky-600/10",
    accent: "text-sky-400",
    border: "border-blue-500/20",
    logo: "/images/partners/dell-color.svg",
    url: "https://www.dell.com/",
  },
  {
    name: "VMware",
    role: "Virtualisation d'Entreprise & Cloud Hybride",
    desc: "Optimisation et consolidation de serveurs avec VMware vSphere, gestion unifiée du multi-cloud et continuité opérationnelle.",
    badge: "VIRTUALISATION",
    color: "from-slate-500/20 to-slate-600/10",
    accent: "text-slate-400",
    border: "border-slate-500/20",
    logo: "/images/partners/vmware.png",
    url: "https://www.vmware.com/",
  },
  {
    name: "Acronis",
    role: "Protection Complète des Données & Cyber Protect",
    desc: "Sauvegardes cloud hybrides, restauration instantanée après sinistre (Disaster Recovery) et bouclier anti-ransomware actif.",
    badge: "BACKUP",
    color: "from-blue-500/20 to-blue-600/10",
    accent: "text-blue-400",
    border: "border-blue-500/20",
    logo: "/images/partners/acronis.svg",
    url: "https://www.acronis.com/",
  },
  {
    name: "Kaspersky",
    role: "Sécurité des Applications Web & Périmètres",
    desc: "Protection multicouche des serveurs, des conteneurs et des terminaux contre les attaques zero-day et les menaces persistantes (APT).",
    badge: "SÉCURITÉ",
    color: "from-emerald-500/20 to-teal-600/10",
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
    logo: "/images/partners/kaspersky.svg",
    url: "https://www.kaspersky.com/",
  },
  {
    name: "Wallix",
    role: "Gestion des Identités & Accès à Privilèges (IAM / PAM)",
    desc: "Sécurisation stricte de l'accès aux ressources critiques de l'entreprise, enregistrement des sessions administrateurs et gouvernance d'accès.",
    badge: "IAM / PAM",
    color: "from-orange-500/20 to-amber-600/10",
    accent: "text-orange-400",
    border: "border-orange-500/20",
    logo: "/images/partners/wallix.svg",
    url: "https://www.wallix.com/",
  },
  {
    name: "Yeastar",
    role: "Centrales Téléphoniques IP & VoIP d'Entreprise",
    desc: "Systèmes IP-PBX nouvelle génération Série P, communications unifiées, intégration softphones et collaboration d'entreprise fluide.",
    badge: "VOIP",
    color: "from-rose-500/20 to-red-600/10",
    accent: "text-rose-400",
    border: "border-rose-500/20",
    logo: "/images/partners/yeastar.png",
    url: "https://www.yeastar.com/",
  },
  {
    name: "Sangoma",
    role: "Passerelles VoIP & Téléphonie Ouverte",
    desc: "Équipements et solutions de communications unifiées, cartes VoIP, passerelles voix et standards téléphoniques résilients.",
    badge: "VOIP",
    color: "from-red-500/20 to-rose-600/10",
    accent: "text-red-400",
    border: "border-red-500/20",
    logo: "/images/partners/sangoma.png",
    url: "https://www.sangoma.com/",
  },
  {
    name: "HP Enterprise",
    role: "Infrastructures Serveurs & Réseaux HPE Aruba",
    desc: "Serveurs ProLiant de référence, solutions réseau d'entreprise intelligentes et stockage sécurisé pour environnements critiques.",
    badge: "HARDWARE",
    color: "from-teal-500/20 to-emerald-600/10",
    accent: "text-teal-400",
    border: "border-teal-500/20",
    logo: "/images/partners/hpe.svg",
    url: "https://www.hpe.com/",
  },
  {
    name: "Allot",
    role: "Visibilité & Sécurité Réseau",
    desc: "Détection et mitigation en temps réel des attaques DDoS, analyse granulaire du trafic et optimisation de bande passante.",
    badge: "ANTI-DDOS",
    color: "from-amber-500/20 to-orange-600/10",
    accent: "text-amber-400",
    border: "border-amber-500/20",
  },
  {
    name: "BeyondTrust",
    role: "Protection Avancée des Terminaux & PAM",
    desc: "Gestion unifiée des privilèges (PAM), sécurisation des postes de travail et protection contre les cybermenaces internes et externes.",
    badge: "PAM",
    color: "from-indigo-500/20 to-purple-600/10",
    accent: "text-indigo-400",
    border: "border-indigo-500/20",
  },
  {
    name: "GateWatcher",
    role: "Détection des Menaces Avancées & NDR par IA",
    desc: "Plateforme souveraine de Network Detection and Response (NDR) analysant le trafic réseau en temps réel avec contre-offensive IA.",
    badge: "NDR & IA",
    color: "from-purple-500/20 to-violet-600/10",
    accent: "text-purple-400",
    border: "border-purple-500/20",
  },
];

const trainingTracks = [
  {
    title: "Préparation aux Certifications Internationales",
    desc: "NOB TECHNOLOGIES accompagne vos ingénieurs et techniciens avec des cycles intensifs de préparation aux examens de certification reconnus (Cisco CCNA/CCNP, Fortinet NSE, Sophos Certified Engineer, CompTIA Security+). Nous préparons efficacement vos équipes pour maximiser leur taux de réussite.",
    topics: ["Labs pratiques en conditions réelles", "Examens blancs & corrections personnalisées", "Maîtrise des standards industriels", "Coaching par des formateurs certifiés"],
    badge: "COACHING CERTIFICATIONS",
  },
  {
    title: "Sensibilisation & Audit Cybersécurité d'Entreprise",
    desc: "Parce que l'humain reste le premier rempart face aux menaces, nous formons l'ensemble de vos collaborateurs aux bonnes pratiques d'hygiène numérique, à la détection des attaques de phishing et aux réflexes en cas d'incident de sécurité.",
    topics: ["Campagnes de simulation de phishing", "Protection des mots de passe & MFA", "Gestion sécurisée des données sensibles", "Audit de maturité cyber & plan d'action"],
    badge: "CYBER-HYGIÈNE & AUDIT",
  },
  {
    title: "Automatisation & Intelligence Artificielle en Entreprise",
    desc: "Formations pratiques pour moderniser vos opérations internes : automatisation des tâches chronophages, intégration d'outils IA générative, scripting d'administration réseau et optimisation des flux de travail.",
    topics: ["Introduction aux workflows automatisés", "IA appliquée aux processus métiers", "Automatisation de la gestion réseau", "Gains de productivité mesurables"],
    badge: "IA & PRODUCTIVITÉ",
  },
];

export default function CertificationsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <Section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#020617] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

          <Container className="relative z-10 text-center">
            <FadeUp>
              <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-6 font-bold">
                &gt;_ PARTENAIRES & FORMATIONS PROFESSIONNELLES
              </p>
            </FadeUp>
            <TextReveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Alliances technologiques{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                  de référence
                </span>{" "}
                & transmission du savoir
              </h1>
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                NOB TECHNOLOGIES s'associe aux éditeurs leaders mondiaux de la cybersécurité et des infrastructures pour garantir des solutions ultra-sécurisées, tout en proposant des programmes d'excellence de préparation aux certifications pour vos équipes.
              </p>
            </FadeUp>

            {/* Trust badges */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  Solutions officielles certifiées
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  Préparation aux examens internationaux
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Vente de licences officielles (ESD & CSP)
                </div>
              </div>
            </FadeUp>
          </Container>
        </Section>

        {/* Flagship Partners (Sophos, Fortinet, Office 365) */}
        <Section className="py-16 md:py-24 bg-slate-900 border-y border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.06),transparent_70%)] pointer-events-none" />
          <Container className="relative z-10">
            <FadeUp>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> À LA UNE &bull; SOLUTIONS CLÉS
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                  Partenaires Majeurs Mis en Évidence
                </h2>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPartners.map((partner, i) => (
                <FadeUp key={partner.name} delay={i * 0.1}>
                  <div className={`h-full rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border ${partner.border} p-7 md:p-8 flex flex-col justify-between shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-cyan-400/80 transition-all duration-300`}>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-black/40 border border-white/10 text-cyan-300">
                          {partner.badge}
                        </span>
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Site officiel de ${partner.name}`}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {partner.logo && (
                        <div className="h-12 w-fit max-w-[140px] mb-4 bg-white/95 rounded-xl px-3 py-1 flex items-center justify-center">
                          <Image
                            src={partner.logo}
                            alt={`Logo ${partner.name}`}
                            width={120}
                            height={36}
                            unoptimized
                            className="max-h-8 w-auto object-contain"
                          />
                        </div>
                      )}

                      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {partner.name}
                      </h3>
                      <p className={`text-xs font-semibold mb-4 ${partner.accent}`}>
                        {partner.role}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {partner.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">
                      <a
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:underline text-cyan-300"
                      >
                        <span>Visiter le site officiel</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-white"
                      >
                        <span>Devis</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>

        {/* All Partners Grid */}
        <Section className="py-20 md:py-28 bg-slate-50">
          <Container>
            <FadeUp>
              <div className="text-center mb-16">
                <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                  CATALOGUE DE SOLUTIONS
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Un écosystème technologique complet
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                  Des solutions de pointe pour la sécurité des données, la protection de réseau, la gestion des accès et la supervision informatique.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, i) => (
                <FadeUp key={partner.name} delay={i * 0.05}>
                  <div
                    className={`group relative rounded-2xl border bg-white p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${partner.border} hover:border-opacity-60 flex flex-col justify-between`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest border bg-slate-50 ${partner.accent} ${partner.border}`}
                        >
                          {partner.badge}
                        </span>
                        {partner.url && (
                          <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Visiter le site officiel de ${partner.name}`}
                            className="p-1 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-slate-100 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {partner.logo && (
                        <div className="h-10 w-fit max-w-[130px] mb-3 flex items-center">
                          <Image
                            src={partner.logo}
                            alt={`Logo ${partner.name}`}
                            width={110}
                            height={32}
                            unoptimized
                            className="max-h-7 w-auto object-contain"
                          />
                        </div>
                      )}

                      <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                        {partner.name}
                      </h3>
                      <p className={`text-xs font-bold mb-3 ${partner.accent}`}>
                        {partner.role}
                      </p>

                      <div
                        className={`h-px mb-4 bg-gradient-to-r from-transparent ${partner.accent.replace("text", "via")} to-transparent opacity-30`}
                      />

                      <p className="text-sm text-slate-500 leading-relaxed">
                        {partner.desc}
                      </p>
                    </div>

                    {partner.url && (
                      <div className="relative z-10 pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-cyan-600 transition-colors"
                        >
                          <span>Site officiel ({partner.name})</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>

        {/* Section Formations & Préparation aux Certifications */}
        <Section className="py-20 md:py-28 bg-white border-t border-slate-200">
          <Container>
            <FadeUp>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="font-mono text-cyan-600 text-xs tracking-[0.3em] uppercase mb-3 font-bold block">
                  &gt;_ FORMATION & MONTEE EN COMPETENCES
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
                  Formations Professionnelles & Préparation aux Certifications
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                  Nous ne délivrons pas directement les titres de certification, mais nous formons et accompagnons méthodiquement vos équipes pour réussir les certifications internationales et maîtriser les technologies d’avenir.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {trainingTracks.map((track, idx) => (
                <FadeUp key={track.title} delay={idx * 0.1}>
                  <div className="h-full bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300">
                    <div>
                      <span className="inline-block text-[10px] font-mono font-bold tracking-widest px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full mb-5">
                        {track.badge}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">
                        {track.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {track.desc}
                      </p>
                      
                      <div className="space-y-2.5 pt-4 border-t border-slate-200">
                        {track.topics.map((topic, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200">
                      <Link 
                        href="/contact" 
                        className="inline-flex items-center justify-center w-full py-3 px-4 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-cyan-600 transition-colors"
                      >
                        Demander un programme de formation
                      </Link>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>

        {/* Stats with animated counters */}
        <StatsSection />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
