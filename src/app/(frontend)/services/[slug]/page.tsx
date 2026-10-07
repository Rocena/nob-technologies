import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { Section, Container } from "@/components/ui/layout";
import { FadeUp, TextReveal } from "@/components/animations";
import { GlowButton } from "@/components/GlowButton";
import { CheckCircle2, ArrowRight, Shield, Server, Cloud, Code, Video, Headphones } from "lucide-react";

// --- Données des services ---
const SERVICES_DATA = {
  "cybersecurite": {
    title: "Cybersécurité & Protection",
    short: "Cybersécurité",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    description: "Pare-feux de nouvelle génération, audit de vulnérabilité et protection proactive contre les intrusions pour sécuriser vos données critiques.",
    content: "Dans un monde où les menaces numériques évoluent chaque jour, la sécurité de votre système d'information ne peut être laissée au hasard. NOB TECHNOLOGIES déploie des architectures de sécurité Zero Trust, des pare-feux de nouvelle génération (NGFW) et assure un monitoring 24/7 de vos infrastructures.",
    features: [
      "Audit de sécurité et tests d'intrusion (Pentest)",
      "Déploiement de Pare-feux (Fortinet, Cisco, Sophos)",
      "Protection des Endpoints (EDR/XDR)",
      "Mise en place de VPN sécurisés pour le télétravail",
      "Gouvernance et conformité des données"
    ],
    tech: ["Fortinet", "Cisco", "Palo Alto", "Bitdefender", "Sophos"]
  },
  "reseaux-telecoms": {
    title: "Réseaux & Télécoms",
    short: "Réseaux",
    icon: Server,
    color: "from-blue-500 to-cyan-500",
    description: "Architectures réseau redondantes, câblage structuré et téléphonie IP pour une connectivité fiable, rapide et performante.",
    content: "Le réseau est la colonne vertébrale de votre entreprise. Nous concevons et déployons des infrastructures filaires et sans-fil hautes performances, garantissant une haute disponibilité et une tolérance aux pannes maximale pour soutenir votre croissance.",
    features: [
      "Câblage structuré (Cuivre & Fibre Optique)",
      "Réseaux sans-fil Wi-Fi Enterprise Haute Densité",
      "Architecture LAN/WAN et SD-WAN",
      "Téléphonie IP (VoIP) et Communications unifiées",
      "Supervision réseau proactive 24/7"
    ],
    tech: ["Cisco", "Ubiquiti", "Aruba", "MikroTik", "3CX"]
  },
  "cloud-virtualisation": {
    title: "Cloud & Virtualisation",
    short: "Cloud",
    icon: Cloud,
    color: "from-sky-400 to-indigo-500",
    description: "Migration cloud, virtualisation de serveurs et PRA pour optimiser vos infrastructures, gagner en flexibilité et réduire vos coûts.",
    content: "Accélérez votre transformation digitale en migrant vers le Cloud ou en consolidant vos serveurs locaux via la virtualisation. Nous vous accompagnons dans la création d'environnements hybrides agiles, résilients et scalables, tout en mettant en place des Plans de Reprise d'Activité (PRA) robustes.",
    features: [
      "Virtualisation de serveurs (VMware, Hyper-V, Proxmox)",
      "Déploiement Cloud (Public, Privé, Hybride)",
      "Stockage centralisé (SAN, NAS) et Sauvegardes",
      "Plan de Continuité (PCA) et Reprise d'Activité (PRA)",
      "Conteneurisation (Docker, Kubernetes)"
    ],
    tech: ["VMware", "Microsoft Hyper-V", "Proxmox", "AWS", "Microsoft Azure", "Veeam"]
  },
  "developpement-erp": {
    title: "Développement & ERP",
    short: "Développement",
    icon: Code,
    color: "from-emerald-400 to-teal-500",
    description: "Applications métier web/mobiles et ERP sur-mesure pour automatiser vos processus et centraliser la gestion de votre entreprise.",
    content: "L'innovation passe par des outils conçus spécifiquement pour votre métier. Nos développeurs créent des applications web et mobiles modernes, et intègrent des solutions ERP open-source puissantes pour digitaliser l'ensemble de votre chaîne de valeur.",
    features: [
      "Intégration et paramétrage d'ERP (Odoo)",
      "Développement d'applications Web (Next.js, React)",
      "Développement d'applications Mobiles (Flutter)",
      "Création d'API et interconnexion de systèmes",
      "Digitalisation des processus métiers"
    ],
    tech: ["Odoo", "Next.js", "React", "Node.js", "Flutter", "PostgreSQL"]
  },
  "videosurveillance": {
    title: "Vidéosurveillance IP",
    short: "Sécurité Physique",
    icon: Video,
    color: "from-amber-400 to-orange-500",
    description: "Installation et supervision de systèmes de vidéosurveillance IP haute définition et contrôle d'accès pour sécuriser vos locaux.",
    content: "La sécurité physique est indissociable de la sécurité logique. NOB TECHNOLOGIES déploie des systèmes de vidéosurveillance intelligents et de contrôle d'accès pour protéger vos bureaux, entrepôts et datacenters, avec une visualisation accessible partout dans le monde.",
    features: [
      "Caméras IP Haute Définition (PTZ, Thermique, Infrarouge)",
      "Enregistreurs NVR avec intelligence artificielle",
      "Contrôle d'accès (Badges, Biométrie, Reconnaissance faciale)",
      "Systèmes anti-intrusion et alarmes",
      "Salle de contrôle (Mur d'images) et supervision"
    ],
    tech: ["Dahua", "Hikvision", "Axis", "ZKTeco"]
  },
  "infogerance": {
    title: "Support & Infogérance",
    short: "Infogérance",
    icon: Headphones,
    color: "from-fuchsia-500 to-purple-600",
    description: "Maintenance préventive, support utilisateurs et infogérance totale pour que vous puissiez vous concentrer sur votre cœur de métier.",
    content: "Ne perdez plus de temps avec les pannes informatiques. Notre service d'infogérance prend en charge l'ensemble de votre parc IT. De l'assistance aux utilisateurs finaux jusqu'à la gestion des serveurs critiques, nous agissons comme votre département informatique externalisé.",
    features: [
      "Support technique aux utilisateurs (Helpdesk N1/N2/N3)",
      "Maintenance préventive et curative",
      "Supervision globale de l'infrastructure",
      "Gestion de parc informatique (inventaire, cycle de vie)",
      "Directeur Systèmes d'Information (DSI) externalisé"
    ],
    tech: ["GLPI", "Zabbix", "AnyDesk", "Microsoft 365", "Google Workspace"]
  }
};

const ALL_SLUGS = Object.keys(SERVICES_DATA);

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug as keyof typeof SERVICES_DATA];
  
  if (!service) return { title: 'Service non trouvé' };

  return {
    title: `${service.title} | Services | NOB TECHNOLOGIES`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug as keyof typeof SERVICES_DATA];

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Service Hero */}
        <Section className="relative overflow-hidden bg-[#020617] pt-32 pb-20 md:pt-40 md:pb-24">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3`} />
          
          <Container className="relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="max-w-2xl">
                <FadeUp>
                  <div className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300 mb-6 backdrop-blur-sm">
                    <Icon className="w-4 h-4 text-accent" />
                    <span>NOS EXPERTISES</span>
                  </div>
                  <TextReveal>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                      {service.title}
                    </h1>
                  </TextReveal>
                  <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </FadeUp>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="py-20 md:py-28">
          <Container>
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Main Content */}
              <div className="flex-1 space-y-16">
                <FadeUp delay={0.1}>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">L'approche NOB TECHNOLOGIES</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {service.content}
                  </p>
                </FadeUp>

                <FadeUp delay={0.2}>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                    Ce que nous proposons
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Technologies & Partenaires</h3>
                  <div className="flex flex-wrap gap-3">
                    {service.tech.map((tech, idx) => (
                      <span key={idx} className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </FadeUp>
              </div>

              {/* Sidebar */}
              <div className="w-full lg:w-80 shrink-0 space-y-8">
                {/* Need Help Card */}
                <FadeUp delay={0.4}>
                  <div className="bg-[#020617] rounded-2xl p-8 relative overflow-hidden border border-white/10 shadow-2xl text-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent pointer-events-none" />
                    <h4 className="text-xl font-bold text-white mb-4 relative z-10">Un projet en tête ?</h4>
                    <p className="text-slate-400 text-sm mb-8 relative z-10">
                      Nos ingénieurs sont prêts à étudier votre infrastructure et vous proposer une solution adaptée.
                    </p>
                    <GlowButton href="/devis/business" className="w-full justify-center">
                      Demander un devis
                    </GlowButton>
                  </div>
                </FadeUp>

                {/* Other Services Navigation */}
                <FadeUp delay={0.5}>
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                    <h4 className="text-lg font-bold text-slate-900 mb-6">Découvrez aussi</h4>
                    <ul className="space-y-2">
                      {ALL_SLUGS.map((otherSlug) => {
                        if (otherSlug === slug) return null;
                        const otherService = SERVICES_DATA[otherSlug as keyof typeof SERVICES_DATA];
                        return (
                          <li key={otherSlug}>
                            <Link 
                              href={`/services/${otherSlug}`}
                              className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                            >
                              <span className="text-sm font-semibold text-slate-600 group-hover:text-primary transition-colors">
                                {otherService.short}
                              </span>
                              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-accent transition-all group-hover:translate-x-1" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </FadeUp>
              </div>

            </div>
          </Container>
        </Section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
