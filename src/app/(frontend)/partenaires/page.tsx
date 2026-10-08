import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { Section, Container } from "@/components/ui/layout";
import { FadeUp, TextReveal } from "@/components/animations";
import { ShieldCheck, Award, ExternalLink, ArrowRight, Cpu, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partenaires Technologiques & Constructeurs | NOB TECHNOLOGIES",
  description:
    "Découvrez les alliances technologiques mondiales de NOB TECHNOLOGIES : Sophos, Fortinet, Microsoft 365, Cisco, Dell, VMware, Acronis, Kaspersky, Wallix, GateWatcher.",
};

const flagshipPartners = [
  {
    name: "Sophos",
    role: "Pare-feu & Cyberdéfense Synchronisée",
    desc: "Déploiement d'appliances firewall nouvelle génération Sophos XGS, protection endpoint synchronisée Intercept X et détection anti-ransomware automatisée.",
    badge: "FIREWALL & SÉCURITÉ",
    border: "border-cyan-500/40",
    accent: "text-cyan-400",
    logo: "/images/partners/sophos.svg",
    url: "https://www.sophos.com/",
  },
  {
    name: "Fortinet",
    role: "Sécurité Réseau & Next-Gen Firewall (NGFW)",
    desc: "Expertise de pointe en cybersécurité périmétrique : passerelles FortiGate (NGFW), segmentation réseau, SD-WAN sécurisé, FortiSIEM et EDR.",
    badge: "NEXT-GEN FIREWALL",
    border: "border-rose-500/40",
    accent: "text-rose-400",
    logo: "/images/partners/fortinet.svg",
    url: "https://www.fortinet.com/",
  },
  {
    name: "Microsoft 365",
    role: "Vente de Licences Officielles (ESD & CSP)",
    desc: "Distribution certifiée de licences Microsoft 365 pour entreprises (ESD & CSP), déploiement collaboratif Teams, Exchange Online, SharePoint et sécurité Entra ID.",
    badge: "LICENCES ESD & CSP",
    border: "border-sky-500/40",
    accent: "text-sky-400",
    logo: "/images/partners/microsoft.svg",
    url: "https://www.microsoft.com/microsoft-365",
  },
];

const allPartners = [
  {
    name: "Cisco",
    role: "Réseaux d'Entreprise, Commutation & Routage",
    desc: "Commutateurs Catalyst, routeurs d'entreprise et architectures Wi-Fi professionnelles haute disponibilité.",
    badge: "RÉSEAUX",
    accent: "text-cyan-400",
    border: "border-cyan-500/20",
    logo: "/images/partners/cisco-color.svg",
    url: "https://www.cisco.com/",
  },
  {
    name: "Dell Technologies",
    role: "Serveurs PowerEdge, Baies SAN & Matériel",
    desc: "Infrastructures matérielles sur-mesure : serveurs d'entreprise PowerEdge, baies de stockage SAN/NAS et stations de travail.",
    badge: "HARDWARE",
    accent: "text-sky-400",
    border: "border-blue-500/20",
    logo: "/images/partners/dell-color.svg",
    url: "https://www.dell.com/",
  },
  {
    name: "VMware",
    role: "Virtualisation d'Entreprise & Cloud Hybride",
    desc: "Consolidation et optimisation de serveurs physiques avec VMware vSphere, gestion multi-cloud et continuité opérationnelle.",
    badge: "VIRTUALISATION",
    accent: "text-slate-400",
    border: "border-slate-500/20",
    logo: "/images/partners/vmware.svg",
    url: "https://www.vmware.com/",
  },
  {
    name: "Acronis",
    role: "Sauvegarde Hybride & Protection Anti-Ransomware",
    desc: "Sauvegardes cloud hybrides, Disaster Recovery instantané après sinistre et bouclier anti-malware actif.",
    badge: "BACKUP & RECOVERY",
    accent: "text-blue-400",
    border: "border-blue-500/20",
    logo: "/images/partners/acronis.svg",
    url: "https://www.acronis.com/",
  },
  {
    name: "Kaspersky",
    role: "Protection Périmétrique & Endpoint Security",
    desc: "Sécurité multicouche des postes et serveurs contre les menaces persistantes (APT) et attaques zero-day.",
    badge: "CYBERSÉCURITÉ",
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
    logo: "/images/partners/kaspersky.svg",
    url: "https://www.kaspersky.com/",
  },
  {
    name: "Wallix",
    role: "Gestion des Accès à Privilèges (IAM / PAM)",
    desc: "Sécurisation stricte de l'accès aux ressources critiques, traçabilité des sessions administrateurs et gouvernance d'accès.",
    badge: "IAM / PAM",
    accent: "text-orange-400",
    border: "border-orange-500/20",
    logo: "/images/partners/wallix.svg",
    url: "https://www.wallix.com/",
  },
  {
    name: "Yeastar",
    role: "Centrales Téléphoniques IP & VoIP d'Entreprise",
    desc: "Systèmes IP-PBX Série P, communications unifiées, intégration softphones et collaboration d'entreprise fluide.",
    badge: "VOIP & TÉLÉCOMS",
    accent: "text-rose-400",
    border: "border-rose-500/20",
    logo: "/images/partners/yeastar.svg",
    url: "https://www.yeastar.com/",
  },
  {
    name: "Sangoma",
    role: "Passerelles VoIP & Téléphonie Ouverte",
    desc: "Passerelles voix, cartes VoIP et standards téléphoniques résilients pour communications unifiées.",
    badge: "VOIP",
    accent: "text-red-400",
    border: "border-red-500/20",
    logo: "/images/partners/sangoma.svg",
    url: "https://www.sangoma.com/",
  },
  {
    name: "HP Enterprise",
    role: "Infrastructures Serveurs & Réseaux HPE Aruba",
    desc: "Serveurs ProLiant de référence, switches d'accès intelligents et stockage sécurisé pour environnements critiques.",
    badge: "HARDWARE",
    accent: "text-teal-400",
    border: "border-teal-500/20",
    logo: "/images/partners/hpe.svg",
    url: "https://www.hpe.com/",
  },
  {
    name: "Allot",
    role: "Visibilité & Sécurité Réseau Anti-DDoS",
    desc: "Détection et mitigation en temps réel des attaques DDoS volumétriques et optimisation de bande passante.",
    badge: "ANTI-DDOS",
    accent: "text-amber-400",
    border: "border-amber-500/20",
    logo: "/images/partners/allot.svg",
    url: "https://www.allot.com/",
  },
  {
    name: "BeyondTrust",
    role: "Protection Avancée des Terminaux & PAM",
    desc: "Gestion unifiée des privilèges (PAM) et sécurisation des postes de travail contre les intrusions internes et externes.",
    badge: "PAM",
    accent: "text-indigo-400",
    border: "border-indigo-500/20",
    logo: "/images/partners/beyondtrust.svg",
    url: "https://www.beyondtrust.com/",
  },
  {
    name: "GateWatcher",
    role: "Détection des Menaces & NDR par IA Souveraine",
    desc: "Plateforme Network Detection and Response (NDR) analysant le trafic réseau en temps réel avec contre-offensive IA.",
    badge: "NDR & IA",
    accent: "text-purple-400",
    border: "border-purple-500/20",
    logo: "/images/partners/gatewatcher.svg",
    url: "https://www.gatewatcher.com/",
  },
  {
    name: "Symantec",
    role: "Suites de Sécurité Avancées & Endpoint",
    desc: "Passerelles Web sécurisées (SWG), protection antivirus avancée et prévention des fuites de données d'entreprise.",
    badge: "ENDPOINT & SECURITY",
    accent: "text-amber-400",
    border: "border-yellow-500/20",
    logo: "/images/partners/symantec.svg",
    url: "https://www.broadcom.com/products/cybersecurity",
  },
  {
    name: "Veritas",
    role: "Résilience Cyber des Données & Sauvegardes",
    desc: "Continuité d'activité, protection multicloud contre les ransomwares et gouvernance des sauvegardes d'entreprise.",
    badge: "RÉSILIENCE & BACKUP",
    accent: "text-rose-400",
    border: "border-rose-500/20",
    logo: "/images/partners/veritas.svg",
    url: "https://www.veritas.com/",
  },
  {
    name: "Tufin",
    role: "Orchestration & Automatisation des Règles Firewall",
    desc: "Gestion unifiée des politiques de sécurité multi-fournisseurs, conformité continue et audit des règles de pare-feu.",
    badge: "FIREWALL ORCHESTRATION",
    accent: "text-cyan-400",
    border: "border-cyan-500/20",
    logo: "/images/partners/tufin.svg",
    url: "https://www.tufin.com/",
  },
  {
    name: "Varonis",
    role: "Sécurité & Gouvernance des Données Sensibles",
    desc: "Classification automatique des données critiques, détection des menaces internes et réduction des surfaces d'attaque.",
    badge: "DATA SECURITY",
    accent: "text-red-400",
    border: "border-red-500/20",
    logo: "/images/partners/varonis.svg",
    url: "https://www.varonis.com/",
  },
  {
    name: "UBIKA / Paessler",
    role: "Supervision Réseau & Monitoring Proactif PRTG",
    desc: "Surveillance centralisée en temps réel des équipements réseaux, serveurs, bande passante et applications d'entreprise.",
    badge: "SUPERVISION PRTG",
    accent: "text-cyan-400",
    border: "border-blue-500/20",
    logo: "/images/partners/ubika-paessler.svg",
    url: "https://www.paessler.com/",
  },
];

export default function PartenairesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-slate-100">
        {/* Hero Section */}
        <Section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#020617] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

          <Container className="relative z-10 text-center">
            <FadeUp>
              <p className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase mb-6 font-bold">
                &gt;_ ÉCOSYSTÈME &amp; ALLIANCES CONSTRUCTEURS
              </p>
            </FadeUp>
            <TextReveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Alliances technologiques{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  de référence mondiale
                </span>
              </h1>
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
                NOB TECHNOLOGIES collabore avec les leaders mondiaux de la cybersécurité, des réseaux et des infrastructures pour garantir des solutions certifiées, pérennes et hautement résilientes à vos entreprises.
              </p>
            </FadeUp>

            {/* Badges */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Intégrations officielles certifiées
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Vente de licences officielles (ESD &amp; CSP)
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  Support technique &amp; maintenance 24/7
                </div>
              </div>
            </FadeUp>
          </Container>
        </Section>

        {/* Flagship Partners */}
        <Section className="py-16 md:py-24 bg-slate-900 border-y border-white/10 relative overflow-hidden">
          <Container className="relative z-10">
            <FadeUp>
              <div className="text-center mb-12">
                <p className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3 font-bold">
                  &gt;_ ALLIANCES CLÉS &bull; INFRASTRUCTURE &amp; CYBERDÉFENSE
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                  Alliances Technologiques Stratégiques
                </h2>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {flagshipPartners.map((partner, i) => (
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
                        <div className="h-12 w-fit max-w-[140px] mb-4 bg-white/95 rounded-xl px-3 py-1 flex items-center justify-center shadow-md">
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

                    <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-end text-xs font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-white"
                      >
                        <span>Demander une étude &amp; devis</span>
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
        <Section className="py-20 md:py-28 bg-white text-slate-900">
          <Container>
            <FadeUp>
              <div className="text-center mb-16">
                <p className="font-mono text-cyan-600 text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                  &gt;_ CATALOGUE DE PARTENAIRES OFFICIELS
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Un écosystème technologique d&apos;élite
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-base">
                  Des solutions éprouvées pour la sécurité des données, la protection de réseau, la gestion des accès, la virtualisation et la supervision PRTG.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPartners.map((partner, i) => (
                <FadeUp key={partner.name} delay={i * 0.04}>
                  <div
                    className={`group relative rounded-2xl border bg-slate-50/80 p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden border-slate-200 hover:border-cyan-500/50 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest border bg-white text-cyan-700 border-slate-200">
                          {partner.badge}
                        </span>
                        {partner.url && (
                          <a
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Visiter le site officiel de ${partner.name}`}
                            className="p-1 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-slate-200/50 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {partner.logo && (
                        <div className="h-12 w-fit min-w-[130px] max-w-[160px] mb-4 bg-white rounded-xl px-3.5 py-1.5 flex items-center justify-center shadow-sm border border-slate-200/80">
                          <Image
                            src={partner.logo}
                            alt={`Logo ${partner.name}`}
                            width={120}
                            height={36}
                            unoptimized
                            className="max-h-8 sm:max-h-9 w-auto object-contain"
                          />
                        </div>
                      )}

                      <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                        {partner.name}
                      </h3>
                      <p className="text-xs font-bold mb-3 text-cyan-600">
                        {partner.role}
                      </p>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {partner.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>

        {/* Formation Crosslink Banner */}
        <Section className="py-16 bg-slate-900 border-t border-white/10">
          <Container>
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2 block">
                  &gt;_ MONTÉE EN COMPÉTENCES
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Découvrez nos Formations Certifiantes sur 6 Mois
                </h3>
                <p className="text-sm text-slate-300 max-w-xl">
                  Accompagnement intensif pour ingénieurs et équipes IT : préparation aux certifications Cisco, Fortinet, Sophos, gouvernance cyber ISO 27001 et automatisation IA.
                </p>
              </div>

              <Link
                href="/formations"
                className="shrink-0 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
              >
                <span>Voir le catalogue Formations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Container>
        </Section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
