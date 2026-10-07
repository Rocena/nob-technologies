import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { Section, Container } from "@/components/ui/layout";
import { FadeUp, TextReveal } from "@/components/animations";
import { Award, ShieldCheck } from "lucide-react";
import { StatsSection } from "./client-stats";

export const metadata: Metadata = {
  title: "Certifications & Partenaires | NOB TECHNOLOGIES",
  description:
    "Decouvrez les certifications et partenariats technologiques de NOB TECHNOLOGIES : Cisco, Microsoft, Fortinet, Ubiquiti, VMware, Dell Technologies.",
};

const partners = [
  {
    name: "Cisco",
    role: "Partenaire Revendeur Agree",
    desc: "Leader mondial des reseaux d'entreprise. Nous deploiements des solutions Cisco pour les LAN, WAN, routage et commutation dans les infrastructures critiques.",
    badge: "RESEAU",
    color: "from-blue-500/20 to-blue-600/10",
    accent: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    name: "Microsoft",
    role: "Partenaire Certifie",
    desc: "Deploiement et gestion de l'ecosysteme Microsoft 365, Azure, Active Directory et solutions de collaboration pour entreprises.",
    badge: "CLOUD",
    color: "from-sky-500/20 to-sky-600/10",
    accent: "text-sky-400",
    border: "border-sky-500/20",
  },
  {
    name: "Fortinet",
    role: "Specialiste Securite Reseau",
    desc: "Expertise avancee en cybersecurite avec les solutions FortiGate (NGFW), FortiSIEM et FortiEDR pour une protection totale de votre SI.",
    badge: "SECURITE",
    color: "from-red-500/20 to-red-600/10",
    accent: "text-red-400",
    border: "border-red-500/20",
  },
  {
    name: "Ubiquiti",
    role: "Integrateur Reseau Sans-fil",
    desc: "Conception et deploiement de reseaux WiFi d'entreprise haute performance avec les solutions UniFi et EdgeMAX pour couvertures complexes.",
    badge: "WIFI",
    color: "from-cyan-500/20 to-cyan-600/10",
    accent: "text-cyan-400",
    border: "border-cyan-500/20",
  },
  {
    name: "VMware",
    role: "Partenaire Virtualisation",
    desc: "Virtualisation de serveurs, postes de travail (VDI) et infrastructure hyperconvergee avec vSphere, vSAN et NSX pour une IT agile.",
    badge: "VIRTUALISATION",
    color: "from-purple-500/20 to-purple-600/10",
    accent: "text-purple-400",
    border: "border-purple-500/20",
  },
  {
    name: "Dell Technologies",
    role: "Revendeur Agree",
    desc: "Fourniture et integration de serveurs PowerEdge, solutions de stockage PowerStore et infrastructure hyperconvergee VxRail.",
    badge: "HARDWARE",
    color: "from-emerald-500/20 to-emerald-600/10",
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/8 rounded-full blur-[150px] pointer-events-none" />

          <Container className="relative z-10 text-center">
            <FadeUp>
              <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-6 font-bold">
                &gt;_ CERTIFICATIONS & PARTENAIRES
              </p>
            </FadeUp>
            <TextReveal>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Expertise{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                  certifiee
                </span>
                , partenaires{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent">
                  de reference
                </span>
              </h1>
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                NOB TECHNOLOGIES s'appuie sur les meilleures technologies du
                marche et des certifications reconnues mondialement pour
                garantir l'excellence de ses deployements.
              </p>
            </FadeUp>

            {/* Trust badges */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <Award className="w-4 h-4 text-accent" />
                  Ingenieurs certifies
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  Technologies tier-1
                </div>
              </div>
            </FadeUp>
          </Container>
        </Section>

        {/* Partner Cards */}
        <Section className="py-20 md:py-28 bg-slate-50">
          <Container>
            <FadeUp>
              <div className="text-center mb-16">
                <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                  NOS PARTENAIRES
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Un ecosysteme technologique complet
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                  Des partenariats officiels avec les leaders mondiaux de
                  l'industrie IT pour vous garantir les meilleures solutions.
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, i) => (
                <FadeUp key={partner.name} delay={i * 0.08}>
                  <div
                    className={`group relative rounded-2xl border bg-white p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${partner.border} hover:border-opacity-60`}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    />

                    <div className="relative z-10">
                      {/* Badge */}
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest border bg-slate-50 mb-4 ${partner.accent} ${partner.border}`}
                      >
                        {partner.badge}
                      </span>

                      {/* Name */}
                      <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                        {partner.name}
                      </h3>
                      <p className={`text-xs font-bold mb-4 ${partner.accent}`}>
                        {partner.role}
                      </p>

                      {/* Divider */}
                      <div
                        className={`h-px mb-4 bg-gradient-to-r from-transparent ${partner.accent.replace("text", "via")} to-transparent opacity-30`}
                      />

                      <p className="text-sm text-slate-500 leading-relaxed">
                        {partner.desc}
                      </p>
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
