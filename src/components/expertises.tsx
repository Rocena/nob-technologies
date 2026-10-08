import React from "react";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { 
  ArrowRight, 
  Shield, 
  Wifi, 
  Cloud, 
  Code, 
  MonitorCheck, 
  Phone, 
  BarChart3, 
  Cpu, 
  Key, 
  GraduationCap, 
  Smartphone
} from "lucide-react";
import { FadeUp } from "@/components/animations";
import Link from "next/link";

const defaultServices = [
  {
    id: "developpement-web-mobile",
    title: "Développement Web & Mobile",
    slug: "developpement-web-mobile",
    description: "Conception de sites internet institutionnels, portails d'entreprise sur-mesure et applications mobiles iOS & Android fluides et sécurisées.",
    icon: Smartphone,
    highlight: "NOUVEAU",
  },
  {
    id: "erp-digitalisation",
    title: "ERP & Digitalisation (Odoo, Dolibarr)",
    slug: "erp-digitalisation",
    description: "Déploiement et intégration d’ERP complets (Odoo, Dolibarr) pour unifier facturation, stocks, CRM, RH et comptabilité d’entreprise.",
    icon: Code,
    highlight: "POPULAIRE",
  },
  {
    id: "marketing-digital",
    title: "Marketing Digital & Stratégie Web",
    slug: "marketing-digital",
    description: "SEO/SEA, gestion de campagnes publicitaires, acquisition de leads et renforcement de l’autorité de votre marque sur les canaux digitaux.",
    icon: BarChart3,
    highlight: "ESSENTIEL",
  },
  {
    id: "cybersecurite-firewall",
    title: "Cybersécurité & Firewalls",
    slug: "cybersecurite",
    description: "Solutions leaders Sophos et Fortinet (NGFW), protection des données Acronis, surveillance des menaces et audit de vulnérabilités.",
    icon: Shield,
    highlight: "PRIORITÉ 1",
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
    description: "PABX/IPBX (Sangoma, Yeastar), postes VoIP Cisco et caméras de vidéosurveillance intelligentes haute résolution.",
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
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <Section id="solutions" className="bg-white py-16 md:py-24 lg:py-32 border-b border-slate-100">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <FadeUp>
            <p className="font-mono text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-4 opacity-90 font-bold">
              &gt;_ CATALOGUE COMPLET DE SERVICES
            </p>
            <Heading level={2} className="mb-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Des solutions 360&deg; pour propulser votre entreprise
            </Heading>
            <Text className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Du développement de vos applications et ERP jusqu’à la sécurisation complète de vos réseaux et la formation de vos équipes.
            </Text>
          </FadeUp>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayServices.map((service: any, idx: number) => {
            const Icon = service.icon || Shield;
            const href = service.slug ? `/services/${service.slug}` : "/services";
            return (
              <FadeUp key={service.id || idx} delay={0.04 * idx}>
                <div className="group flex flex-col h-full bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-cyan-400 rounded-2xl p-7 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                  {service.highlight && (
                    <span className="absolute top-4 right-4 text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 border border-cyan-200">
                      {service.highlight}
                    </span>
                  )}
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm flex-1">
                    {service.description || service.excerpt}
                  </p>
                  <div className="flex items-center justify-between gap-2 mt-6 pt-4 border-t border-slate-200/60">
                    <Link href="/contact" className="text-xs font-bold text-slate-700 hover:text-cyan-600 transition-colors">
                      Demander un devis &rarr;
                    </Link>
                    <Link href="/services" className="flex items-center gap-1 text-cyan-600 text-xs font-semibold hover:underline">
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