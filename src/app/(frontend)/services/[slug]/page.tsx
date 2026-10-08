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
import { QuoteRequestButton } from "@/components/QuoteRequestButton";
import { 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Network, 
  Server, 
  Cloud, 
  Code, 
  Video, 
  Headphones, 
  Phone, 
  Key, 
  Smartphone, 
  Database, 
  BarChart3, 
  GraduationCap 
} from "lucide-react";

// --- Données complètes des services NOB TECHNOLOGIES ---
const SERVICES_DATA: Record<string, {
  title: string;
  short: string;
  icon: any;
  color: string;
  description: string;
  content: string;
  features: string[];
  tech: string[];
}> = {
  "cybersecurite": {
    title: "Cybersécurité, Protection des Données & Firewalls",
    short: "Cybersécurité",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    description: "Pare-feux de nouvelle génération (Sophos, Fortinet), audit de vulnérabilité et sauvegardes cloud hybrides pour sécuriser votre capital informationnel.",
    content: "Dans un contexte de menaces numériques croissantes, la protection du système d’information des entreprises requiert une approche multicouche. NOB TECHNOLOGIES déploie des pare-feux de nouvelle génération (NGFW) Sophos et Fortinet, met en place des politiques Zero Trust, sécurise les accès à privilèges avec Wallix et protège vos données contre les ransomwares grâce aux solutions Acronis.",
    features: [
      "Déploiement et paramétrage de Firewalls Sophos XGS & Fortinet FortiGate",
      "Protection contre les ransomwares et sauvegardes immuables Acronis",
      "Gestion des identités et accès à privilèges (PAM/IAM Wallix)",
      "Audit de vulnérabilités, tests d'intrusion et durcissement des systèmes",
      "Mise en place de VPN IPsec/SSL hautement chiffrés pour le télétravail"
    ],
    tech: ["Sophos", "Fortinet", "Acronis", "Wallix", "Kaspersky", "BeyondTrust", "GateWatcher"]
  },
  "reseaux-telecoms": {
    title: "Câblage Structuré, Fibre Optique & Réseaux",
    short: "Câblage & Réseaux",
    icon: Network,
    color: "from-blue-500 to-cyan-500",
    description: "Infrastructures filaires cuivre et fibre optique, baies de brassage normalisées et réseaux d’entreprise haute disponibilité.",
    content: "Le réseau informatique constitue les fondations de toutes vos opérations. Nos équipes d'ingénieurs et techniciens conçoivent et réalisent le câblage structuré de vos locaux (Cat 6A, 7), raccordent vos bâtiments par liaisons en fibre optique et installent des baies de brassage peignées selon les règles de l'art.",
    features: [
      "Câblage informatique structuré certifié Catégorie 6A et 7",
      "Pose, épissurage et réflectométrie de fibre optique monomode/multimode",
      "Fourniture et organisation de baies de brassage 42U et coffrets muraux",
      "Déploiement de switchs managés et routeurs d'agrégation d’entreprise",
      "Réseaux Wi-Fi professionnels haute densité avec contrôleur centralisé"
    ],
    tech: ["Cisco", "HP Enterprise", "Ubiquiti", "Legrand", "Schneider"]
  },
  "telephone-ip": {
    title: "Téléphonie IP d’Entreprise (VoIP) & PABX",
    short: "Téléphonie IP",
    icon: Phone,
    color: "from-sky-500 to-blue-600",
    description: "Migration vers la voix sur IP, installation d’IPBX d’entreprise, postes téléphoniques Cisco et visioconférence unifiée.",
    content: "Réduisez vos coûts de communication tout en augmentant la productivité de vos collaborateurs. Nous mettons en place des standards téléphoniques IPBX modernes (Sangoma, Yeastar), configurons vos files d’attente, messageries vocales et serveurs vocaux interactifs (SVI), avec intégration fluide sur smartphones et ordinateurs.",
    features: [
      "Installation et configuration d’IPBX IP (Yeastar, Sangoma, Asterisk)",
      "Fourniture et raccordement de postes téléphoniques IP et sans-fil",
      "Configuration de standards d’accueil, SVI et transferts d’appels",
      "Interconnexion multi-sites et réduction des coûts de communication",
      "Messagerie unifiée et intégration de softphones sur mobile/PC"
    ],
    tech: ["Yeastar", "Sangoma", "Cisco", "Fanvil", "Grandstream"]
  },
  "videosurveillance": {
    title: "Vidéosurveillance IP & Contrôle d’Accès",
    short: "Vidéosurveillance",
    icon: Video,
    color: "from-amber-400 to-orange-500",
    description: "Caméras réseau haute définition, analyse vidéo intelligente, enregistreurs NVR sécurisés et contrôle d’accès biométrique.",
    content: "La sécurité physique de vos locaux d'entreprise, entrepôts et points de vente est essentielle. Nous concevons des systèmes de vidéosurveillance IP complets, avec caméras jour/nuit à analyse intelligente (détection de franchissement de ligne, reconnaissance), enregistreurs NVR redondants et contrôle d’accès par badges ou biométrie.",
    features: [
      "Caméras IP haute résolution (PTZ, dôme, infrarouge et thermique)",
      "Enregistreurs NVR en réseau avec stockage RAID sécurisé",
      "Contrôle d’accès par badges RFID, reconnaissance faciale ou empreinte",
      "Gestion centralisée et visionnage en temps réel sur smartphone et PC",
      "Audit des zones à risques et maintenance préventive du parc de caméras"
    ],
    tech: ["Hikvision", "Dahua", "Axis", "ZKTeco"]
  },
  "infogerance": {
    title: "Infogérance, Maintenance & Support Informatique 24/7",
    short: "Infogérance",
    icon: Headphones,
    color: "from-fuchsia-500 to-purple-600",
    description: "Maintenance préventive et curative, assistance utilisateurs réactive et supervision continue de vos serveurs et équipements.",
    content: "Externalisez la gestion de votre informatique pour vous concentrer pleinement sur votre cœur de métier. NOB TECHNOLOGIES assure la supervision proactive de vos serveurs avec des outils de monitoring avancés (PRTG), réalise les mises à jour de sécurité et intervient rapidement sur site ou à distance en cas d’incident technique.",
    features: [
      "Supervision proactive 24/7 des serveurs, réseaux et services critiques",
      "Support utilisateurs et helpdesk technique avec prise en main rapide",
      "Maintenance préventive régulière et vérification des sauvegardes",
      "Gestion des licences, renouvellements et inventaire du parc matériel",
      "Conseil stratégique et rôle de DSI externalisé pour votre entreprise"
    ],
    tech: ["UBIKA PAESSLER", "PRTG", "GLPI", "AnyDesk", "Microsoft 365"]
  },
  "vente-materiels-licences": {
    title: "Vente de Licences Office 365 (ESD & CSP) & Matériels IT",
    short: "Licences & Matériels",
    icon: Key,
    color: "from-emerald-500 to-teal-600",
    description: "Distribution officielle de licences Microsoft 365 (ESD & CSP) et fourniture d’équipements informatiques professionnels d’origine.",
    content: "Équipez votre entreprise avec des logiciels légaux et du matériel performant sous garantie constructeur. En tant que partenaire revendeur officiel, NOB TECHNOLOGIES distribue les licences Microsoft Office 365 (licences perpétuelles ESD et abonnements d'entreprise CSP), des serveurs Dell, des ordinateurs portables professionnels et des switchs/routeurs d’origine.",
    features: [
      "Vente officielle de licences Microsoft 365 Business, Standard & Enterprise",
      "Fourniture de licences ESD (Electronic Software Delivery) et CSP",
      "Serveurs d'entreprise Dell PowerEdge et baies de stockage",
      "Postes de travail PC portables et de bureau pour collaborateurs",
      "Onduleurs de protection électrique et périphériques réseau"
    ],
    tech: ["Microsoft", "Dell Technologies", "Lenovo", "APC", "Eaton"]
  },
  "developpement-web-mobile": {
    title: "Développement d’Applications Web & Mobiles",
    short: "Web & Mobile",
    icon: Smartphone,
    color: "from-cyan-500 to-blue-500",
    description: "Conception sur-mesure de plateformes web institutionnelles, portails connectés et applications mobiles iOS & Android.",
    content: "Donnez vie à vos projets digitaux avec des solutions logicielles performantes, élégantes et sécurisées. Notre équipe de développement conçoit des plateformes web modernes et sur-mesure, des portails clients, des extranets d'entreprise et des applications mobiles performantes adaptées aux usages locaux et internationaux.",
    features: [
      "Développement de plateformes web rapides et responsives (Next.js, React)",
      "Applications mobiles pour iOS et Android (Flutter)",
      "Création de portails de réservation, espaces clients et extranets",
      "Intégration d’API, passerelles de paiement sécurisées et services tiers",
      "Hébergement cloud haute disponibilité avec certificat SSL et sauvegarde"
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "Flutter", "PostgreSQL"]
  },
  "erp-gestion": {
    title: "Conception & Intégration d’ERP (Sur-Mesure, Odoo, Dolibarr)",
    short: "ERP & Gestion",
    icon: Database,
    color: "from-indigo-500 to-purple-500",
    description: "Conception de logiciels ERP sur-mesure et intégration d'ERP de référence pour unifier et digitaliser la facturation, stocks, comptabilité, CRM et RH.",
    content: "La transformation digitale de votre entreprise exige des outils qui collent parfaitement à votre réalité opérationnelle. Chez NOB TECHNOLOGIES, nous concevons des ERP sur-mesure développés selon vos logiques métiers spécifiques, tout en assurant l'intégration et le paramétrage avancé des solutions reconnues comme Odoo et Dolibarr. Nous modélisons vos flux, développons vos modules personnalisés, migrons vos données existantes et formons vos équipes pour une adoption fluide et immédiate.",
    features: [
      "Conception et développement d'ERP sur-mesure adaptés à vos processus métiers",
      "Paramétrage et intégration d’ERP open-source Dolibarr et Odoo (serveurs locaux ou cloud)",
      "Gestion commerciale unifiée : devis, commandes, facturation conforme et relances",
      "Gestion avancée des stocks, inventaires multi-dépôts, achats et fournisseurs",
      "Comptabilité générale, trésorerie prévisionnelle et tableaux de bord décisionnels",
      "Connecteurs API personnalisés avec votre site e-commerce, application mobile et outils tiers",
      "Gestion des ressources humaines, congés, plannings et notes de frais"
    ],
    tech: ["Développement Sur-Mesure", "Odoo", "Dolibarr", "PostgreSQL", "Python", "Node.js", "Linux"]
  },
  "marketing-digital": {
    title: "Marketing Digital & Visibilité de Marque",
    short: "Marketing Digital",
    icon: BarChart3,
    color: "from-pink-500 to-rose-500",
    description: "Stratégie de présence numérique, référencement naturel SEO, campagnes publicitaires ciblées et communication d’entreprise.",
    content: "Attirez de nouveaux clients et valorisez l’image de votre entreprise sur internet. NOB TECHNOLOGIES élabore votre stratégie de visibilité digitale : optimisation du référencement naturel sur les moteurs de recherche (SEO), gestion de campagnes publicitaires sponsorisées et création de contenus d'entreprise pour renforcer votre autorité.",
    features: [
      "Audit et optimisation du référencement naturel (SEO local et international)",
      "Gestion de campagnes publicitaires Google Ads et réseaux sociaux",
      "Création de pages professionnelles et stratégie de notoriété de marque",
      "Production de contenus visuels et éditoriaux d’entreprise",
      "Analyse d'audience, suivi des conversions et rapports de performance"
    ],
    tech: ["Google Ads", "Google Analytics", "Meta Ads", "SEO"]
  },
  "formations-ia": {
    title: "Formations Professionnelles, IA & Préparation aux Certifications",
    short: "Formations & IA",
    icon: GraduationCap,
    color: "from-teal-500 to-emerald-600",
    description: "Cycles intensifs de préparation aux certifications internationales, sensibilisation à la cybersécurité et intégration de l’IA en entreprise.",
    content: "Le capital humain est votre premier facteur de réussite. NOB TECHNOLOGIES propose des programmes de formation sur-mesure pour les entreprises : cycles intensifs de préparation et de révision aux examens de certification (Cisco, Fortinet, Sophos), sessions de sensibilisation des collaborateurs aux cyberattaques (phishing) et ateliers pratiques d’automatisation et d’Intelligence Artificielle.",
    features: [
      "Préparation ciblée aux examens de certification réseaux et cybersécurité",
      "Ateliers pratiques avec labs techniques simulant des cas réels d’entreprise",
      "Sensibilisation de l'ensemble du personnel à l'hygiène informatique et au phishing",
      "Formation à l’automatisation des processus répétitifs et à l'IA générative",
      "Accompagnement personnalisé et validation des acquis techniques"
    ],
    tech: ["Cisco Labs", "Fortinet Training", "Sophos Academy", "IA & Automatisation"]
  },
  // Backward compatibility aliases
  "developpement-erp": {
    title: "Conception & Développement ERP",
    short: "ERP Sur-Mesure",
    icon: Code,
    color: "from-emerald-400 to-teal-500",
    description: "Applications métier et ERP sur-mesure pour centraliser et digitaliser la gestion d'entreprise.",
    content: "Conception d'ERP sur-mesure, développement d'applications web/mobiles et intégration experte de progiciels Odoo et Dolibarr.",
    features: ["Conception ERP Sur-Mesure", "Intégration Odoo & Dolibarr", "Applications Web & Mobiles", "Gestion commerciale & stocks"],
    tech: ["Sur-Mesure", "Odoo", "Dolibarr", "Next.js", "Flutter", "PostgreSQL"]
  },
  "cloud-virtualisation": {
    title: "Cloud & Virtualisation",
    short: "Cloud",
    icon: Cloud,
    color: "from-sky-400 to-indigo-500",
    description: "Virtualisation de serveurs et solutions cloud hybrides.",
    content: "Consolidation de serveurs physiques, virtualisation VMware et sauvegardes sécurisées.",
    features: ["VMware vSphere", "Sauvegardes cloud", "PCA/PRA", "Hyper-V"],
    tech: ["VMware", "Microsoft Hyper-V", "Acronis"]
  },
  "cablage": {
    title: "Câblage Structuré & Baies",
    short: "Câblage",
    icon: Network,
    color: "from-blue-500 to-cyan-500",
    description: "Câblage cuivre et fibre optique pour entreprises.",
    content: "Raccordement réseau, pose de baies de brassage et certification de liens.",
    features: ["Catégorie 6A", "Fibre optique", "Baies 42U", "Certification"],
    tech: ["Cisco", "HP Enterprise"]
  },
  "securite-des-donnees": {
    title: "Sécurité des Données",
    short: "Sécurité Données",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    description: "Sauvegarde cloud et protection contre les pertes de données.",
    content: "Mise en place de solutions de sauvegarde Acronis et Veritas.",
    features: ["Sauvegarde hybride", "Restauration rapide", "Anti-ransomware"],
    tech: ["Acronis", "Veritas"]
  },
  "protection-de-reseau": {
    title: "Protection de Réseau",
    short: "Protection Réseau",
    icon: Shield,
    color: "from-red-500 to-rose-600",
    description: "Pare-feux de nouvelle génération et filtrage réseau.",
    content: "Déploiement de firewalls Sophos et Fortinet.",
    features: ["Pare-feu NGFW", "VPN d'entreprise", "Filtrage web"],
    tech: ["Sophos", "Fortinet"]
  }
};

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];
  
  if (!service) return { title: 'Service non trouvé | NOB TECHNOLOGIES' };

  return {
    title: `${service.title} | NOB TECHNOLOGIES`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Silicon Valley Hero */}
        <Section className="relative overflow-hidden bg-[#020617] pt-32 pb-20 md:pt-40 md:pb-24">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3`} />
          
          <Container className="relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="max-w-3xl">
                <FadeUp>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 uppercase mb-5 backdrop-blur-sm shadow-sm">
                    <Icon className="w-3.5 h-3.5 text-cyan-400" /> &gt;_ SOLUTION D&apos;INGÉNIERIE &bull; {service.short.toUpperCase()}
                  </span>
                  <TextReveal>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 text-balance">
                      {service.title}
                    </h1>
                  </TextReveal>
                  <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                </FadeUp>
              </div>
            </div>
          </Container>
        </Section>

        {/* Detailed Specs & Features */}
        <Section className="py-16 md:py-24">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* Main Content Details */}
              <div className="lg:col-span-8 space-y-12">
                <FadeUp delay={0.1}>
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                      Approche & Spécifications Techniques
                    </h2>
                    <p className="text-slate-600 text-base leading-relaxed mb-8">
                      {service.content}
                    </p>

                    <h3 className="text-lg font-bold text-slate-900 mb-4 pt-6 border-t border-slate-100">
                      Prestations & Livrables Inclus
                    </h3>
                    <div className="grid sm:grid-cols-1 gap-3.5">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-800 font-medium leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>

                {/* Technologies and Brands */}
                {service.tech && service.tech.length > 0 && (
                  <FadeUp delay={0.2}>
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                      <h3 className="text-base font-bold text-slate-900 mb-4">
                        Technologies & Marques Partenaires
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.tech.map((t, i) => (
                          <span
                            key={i}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </FadeUp>
                )}
              </div>

              {/* Sidebar Action Card */}
              <div className="lg:col-span-4 sticky top-28">
                <FadeUp delay={0.2}>
                  <div className="bg-slate-900 text-white rounded-2xl p-7 md:p-8 border border-slate-800 shadow-xl">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase block mb-2">
                      &gt;_ DEVIS RAPIDE & ACCOMPAGNEMENT
                    </span>
                    <h3 className="text-xl font-bold mb-3">
                      Besoin d’un devis pour ce service ?
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      Nos ingénieurs analysent votre infrastructure et vous transmettent une proposition chiffrée sous 24 à 48 heures.
                    </p>

                    <QuoteRequestButton
                      service={service.title}
                      className="flex items-center justify-center w-full py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg mb-4 text-center cursor-pointer"
                    >
                      Demander un devis personnalisé
                    </QuoteRequestButton>

                    <div className="pt-4 border-t border-slate-800 text-center">
                      <p className="text-[11px] text-slate-400 mb-1">Assistance directe :</p>
                      <a
                        href="tel:+221773108318"
                        className="text-xs font-mono font-bold text-cyan-400 hover:underline"
                      >
                        +221 77 310 83 18
                      </a>
                    </div>
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
