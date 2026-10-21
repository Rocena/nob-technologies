import React from "react";
import { Container, Section } from "@/components/ui/layout";
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
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { QuoteRequestButton } from "@/components/QuoteRequestButton";

function isRecentlyCreated(createdAt?: string | Date) {
  if (!createdAt) return false;
  const created = new Date(createdAt).getTime();
  if (isNaN(created)) return false;
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  return now - created >= 0 && now - created <= ONE_WEEK_MS;
}

const defaultServices = [
  {
    id: "cybersecurite-firewall",
    title: "Cybersécurité & Firewalls",
    slug: "cybersecurite",
    spec: "Sophos XGS · Fortinet NGFW · Acronis",
    description:
      "Déploiement de pare-feux nouvelle génération, segmentation réseau, protection anti-ransomware Acronis et audits de conformité.",
    icon: Shield,
  },
  {
    id: "reseaux-cablage",
    title: "Câblage Structuré & Réseaux Télécoms",
    slug: "reseaux-telecoms",
    spec: "Cat 6A/7 · Fibre Optique · Fluke",
    description:
      "Ingénierie LAN/WAN, montage et peignage méthodique de baies 42U, interconnexion optique et Wi-Fi professionnel haute densité.",
    icon: Wifi,
  },
  {
    id: "erp-digitalisation",
    title: "Conception & Intégration d’ERP",
    slug: "erp-digitalisation",
    spec: "Odoo · Dolibarr · Workflows B2B",
    description:
      "Déploiement d’ERP sur-mesure pour unifier facturation, gestion des stocks, CRM, ressources humaines et comptabilité d’entreprise.",
    icon: Code,
  },
  {
    id: "developpement-web-mobile",
    title: "Développement Web & Mobile",
    slug: "developpement-web-mobile",
    spec: "Next.js · Portails Métier · iOS/Android",
    description:
      "Architecture de plateformes web institutionnelles, moteurs de réservation directs, portails B2B et applications mobiles sécurisées.",
    icon: Smartphone,
  },
  {
    id: "licences-materiel",
    title: "Licences Microsoft 365 & Matériels IT",
    slug: "licences-materiels",
    spec: "Microsoft CSP · Dell EMC · Cisco",
    description:
      "Distribution officielle de licences Microsoft 365, fourniture de serveurs Dell PowerEdge, commutateurs Cisco et postes de travail.",
    icon: Key,
  },
  {
    id: "telephonie-videosurveillance",
    title: "Téléphonie IP & Vidéosurveillance IP",
    slug: "telephonie-videosurveillance",
    spec: "Yeastar Série P · SIP · Caméras IP",
    description:
      "Standards IPBX Yeastar, terminaux VoIP d'entreprise, interconnexion multi-sites et vidéosurveillance haute résolution.",
    icon: MonitorCheck,
  },
  {
    id: "formations-certifications",
    title: "Formations, IA & Certifications IT",
    slug: "formations-ia",
    spec: "CCNA · NSE 4 · Power BI · IA",
    description:
      "Programmes pratiques sur équipements réels en cybersécurité, réseaux, Business Intelligence et préparation aux examens officiels.",
    icon: GraduationCap,
  },
  {
    id: "marketing-digital",
    title: "Acquisition & Stratégie Digitale",
    slug: "marketing-digital",
    spec: "SEO Technique · Analytics · Médias",
    description:
      "Référencement naturel et payant, pilotage des canaux sociaux officiels et optimisation des taux de conversion B2B/B2C.",
    icon: BarChart3,
  },
  {
    id: "infogerance-support",
    title: "Infogérance & Maintenance 24/7",
    slug: "infogerance",
    spec: "Supervision PRTG · SLA 24h · Dakar",
    description:
      "Maintenance préventive et curative sur site, supervision continue des serveurs et assistance technique dédiée aux équipes.",
    icon: Phone,
  },
];

export function Expertises({ services = [] }: { services: any[] }) {
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <Section
      id="solutions"
      className="bg-white dark:bg-[#060B14] py-20 md:py-28 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <Container>
        {/* Editorial Split Section Header — Left-aligned, zero generic AI eyebrow */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14 md:mb-16 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold text-sky-700 dark:text-sky-400 mb-2.5">
              Domaines d&apos;intervention &amp; Ingénierie
            </div>
            <h2
              className="font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
              style={{ fontSize: "clamp(1.85rem, 1.3rem + 2vw, 3rem)" }}
            >
              Une architecture complète, du câblage physique à la sécurité applicative.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Chaque infrastructure est conçue, documentée et maintenue par nos ingénieurs à Dakar selon les normes constructeurs (Cisco, Sophos, Fortinet, Dell, Microsoft).
            </p>
          </div>
        </div>

        {/* Architectural Specification Grid (Hairline 1px borders instead of floating SaaS cards) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
          {displayServices.map((service: any, idx: number) => {
            const Icon = service.icon || Shield;
            const href = service.slug ? `/services/${service.slug}` : "/services";
            const showNewBadge = isRecentlyCreated(service.createdAt);
            const fallbackSpec = defaultServices[idx % defaultServices.length]?.spec;

            return (
              <div
                key={service.id || idx}
                className="group flex flex-col justify-between bg-white hover:bg-slate-50/80 dark:bg-[#0B132B] dark:hover:bg-[#0F1B38] border-r border-b border-slate-200 dark:border-slate-800 p-7 md:p-8 transition-colors duration-200 relative"
              >
                {showNewBadge && (
                  <span className="absolute top-5 right-5 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                    Nouveau
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-sky-400 group-hover:bg-[#0284C7] group-hover:text-white group-hover:border-[#0284C7] transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    {(service.spec || fallbackSpec) && (
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {service.spec || fallbackSpec}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-[#0284C7] dark:group-hover:text-sky-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    {service.description || service.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 mt-7 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <QuoteRequestButton
                    service={service.title}
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#0284C7] dark:hover:text-sky-400 transition-colors cursor-pointer text-left"
                  >
                    Demander un chiffrage
                  </QuoteRequestButton>

                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-[#0284C7] dark:text-sky-400 hover:text-[#0369A1] text-xs font-semibold"
                  >
                    <span>Détails</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
