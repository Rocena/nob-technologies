import React from "react";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { 
  ArrowRight, 
  Shield, 
  Wifi, 
  Code, 
  MonitorCheck, 
  Phone, 
  BarChart3, 
  Key, 
  GraduationCap, 
  Smartphone
} from "lucide-react";
import { FadeUp } from "@/components/animations";
import Link from "next/link";
import { QuoteRequestButton } from "@/components/QuoteRequestButton";

const LEGACY_SEED_SLUGS = new Set([
  "protection-de-reseau",
  "securite-des-donnees",
  "cablage",
  "infogerance",
  "cloud-virtualisation",
  "developpement-erp",
]);

const defaultServices = [
  {
    id: "developpement-web-mobile",
    title: "Développement Web & Mobile",
    slug: "developpement-web-mobile",
    description: "Conception de sites internet institutionnels, portails d'entreprise sur-mesure et applications mobiles iOS & Android fluides et sécurisées.",
    icon: Smartphone,
  },
  {
    id: "erp-digitalisation",
    title: "Conception & Intégration d’ERP",
    slug: "erp-digitalisation",
    description: "Conception d’ERP sur-mesure et intégration experte (Odoo, Dolibarr) pour unifier facturation, stocks, CRM, RH et comptabilité d’entreprise.",
    icon: Code,
  },
  {
    id: "marketing-digital",
    title: "Marketing Digital & Stratégie Web",
    slug: "marketing-digital",
    description: "SEO/SEA, gestion de campagnes publicitaires, acquisition de leads et renforcement de l’autorité de votre marque sur les canaux digitaux.",
    icon: BarChart3,
  },
  {
    id: "cybersecurite-firewall",
    title: "Cybersécurité & Firewalls",
    slug: "cybersecurite",
    description: "Solutions leaders Sophos et Fortinet (NGFW), protection des données Acronis, surveillance des menaces et audit de vulnérabilités.",
    icon: Shield,
  },
  {
    id: "licences-materiel",
    title: "Licences Office 365 & Matériels IT",
    slug: "licences-materiels",
    description: "Distribution officielle de licences Microsoft 365 (ESD & CSP), fourniture de serveurs Dell, routeurs Cisco et parcs informatiques complets.",
    icon: Key,
  },
  {
    id: "formations-certifications",
    title: "Formations, IA & Préparation Certifications",
    slug: "formations-ia",
    description: "Formations personnalisées en cybersécurité, intégration d’IA & automatisation, et coaching intensif de préparation aux certifications internationales.",
    icon: GraduationCap,
  },
  {
    id: "reseaux-cablage",
    title: "Câblage Structuré & Réseaux Télécoms",
    slug: "reseaux-telecoms",
    description: "Réseaux locaux LAN/WAN, baies de brassage, liaisons fibre optique et architecture Wi-Fi professionnelle haute densité.",
    icon: Wifi,
  },
  {
    id: "telephonie-videosurveillance",
    title: "Téléphonie IP & Vidéosurveillance IP",
    slug: "telephonie-videosurveillance",
    description: "IPBX Yeastar Série P, postes VoIP Cisco, visioconférence et caméras de vidéosurveillance intelligentes haute résolution.",
    icon: MonitorCheck,
  },
  {
    id: "infogerance-support",
    title: "Infogérance & Support 24/7",
    slug: "infogerance",
    description: "Maintenance préventive, supervision proactive de vos serveurs et support technique réactif pour une disponibilité sans interruption.",
    icon: Phone,
  },
];

export function Expertises({ services = [] }: { services: any[] }) {
  const defaultSlugs = new Set(defaultServices.map((s) => s.slug));
  const extraCmsServices = (services || []).filter(
    (s: any) =>
      s?.slug &&
      !LEGACY_SEED_SLUGS.has(s.slug) &&
      !defaultSlugs.has(s.slug) &&
      s.status !== "draft"
  );
  const displayServices = [...defaultServices, ...extraCmsServices];

  return (
    <Section id="solutions" className="bg-white dark:bg-[#020617] py-16 md:py-24 lg:py-32 border-b border-slate-100 dark:border-slate-800/80 transition-colors">
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <FadeUp>
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold flex items-center justify-center gap-2 flex-wrap">
              <span className="text-[#00D4FF] font-black select-none text-sm sm:text-base font-mono tracking-tighter inline-flex items-center">&gt;<span className="text-[#10E760] animate-pulse">_</span></span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                SOLUTIONS &bull; PÔLES D&apos;EXPERTISE
              </span>
            </p>
            <Heading level={2} className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Nous construisons les fondations numériques des leaders de demain.
            </Heading>
            <Text className="text-base sm:text-lg lg:text-xl text-slate-800 md:text-slate-700 dark:text-slate-300 font-medium sm:font-normal leading-relaxed max-w-3xl mx-auto">
              Chez NOB TECHNOLOGIES, nous ne nous contentons pas de fournir des services IT. Nous architecturons des écosystèmes complets, résilients et évolutifs. Face à la complexité croissante des réseaux et à l&apos;évolution des cybermenaces, notre mission est de vous offrir un socle technologique infaillible.
            </Text>
          </FadeUp>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayServices.map((service: any, idx: number) => {
            const Icon = typeof service.icon === "function" || typeof service.icon === "object" ? service.icon : Shield;
            const href = service.slug ? `/services/${service.slug}` : "/services";
            return (
              <FadeUp key={service.id || service.slug || idx} delay={0.04 * idx}>
                <div className="group flex flex-col h-full bg-slate-50 hover:bg-white dark:bg-[#0b1329] dark:hover:bg-[#0f1d3d] border border-slate-200/80 hover:border-cyan-400 dark:border-slate-800 dark:hover:border-cyan-400/80 rounded-2xl p-7 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm flex-1">
                    {service.description || service.excerpt}
                  </p>
                  <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                    <QuoteRequestButton
                      service={service.title}
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-left"
                    >
                      Demander un devis &rarr;
                    </QuoteRequestButton>
                    <Link 
                      href={href} 
                      className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-xs font-semibold hover:underline"
                    >
                      En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
