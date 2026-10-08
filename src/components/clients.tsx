import React from "react";
import { Container, Section } from "@/components/ui/layout";
import { FadeUp } from "@/components/animations";
import { ClientLogoImg } from "./ClientLogoImg";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";

export const defaultTrustedBrands = [
  {
    name: "Sophos",
    category: "Firewalls XGS & Sécurité",
    badge: "Pare-feu",
    url: "https://www.sophos.com/",
    logo: "/images/partners/sophos.svg",
  },
  {
    name: "Fortinet",
    category: "Next-Gen Firewall FortiGate",
    badge: "NGFW",
    url: "https://www.fortinet.com/",
    logo: "/images/partners/fortinet.svg",
  },
  {
    name: "Microsoft 365",
    category: "Licences ESD & CSP",
    badge: "Cloud & Office",
    url: "https://www.microsoft.com/microsoft-365",
    logo: "/images/partners/microsoft.svg",
  },
  {
    name: "Cisco",
    category: "Réseaux & Commutation",
    badge: "Réseaux",
    url: "https://www.cisco.com/",
    logo: "/images/partners/cisco-color.svg",
  },
  {
    name: "Dell Technologies",
    category: "Serveurs & Stockage",
    badge: "Hardware",
    url: "https://www.dell.com/",
    logo: "/images/partners/dell-color.svg",
  },
  {
    name: "VMware",
    category: "Virtualisation d'Entreprise",
    badge: "Virtualisation",
    url: "https://www.vmware.com/",
    logo: "/images/partners/vmware.svg",
  },
  {
    name: "Acronis",
    category: "Sauvegarde & Anti-Ransomware",
    badge: "Backup",
    url: "https://www.acronis.com/",
    logo: "/images/partners/acronis.svg",
  },
  {
    name: "Kaspersky",
    category: "Cyberdéfense Applicative",
    badge: "Sécurité",
    url: "https://www.kaspersky.com/",
    logo: "/images/partners/kaspersky.svg",
  },
  {
    name: "Wallix",
    category: "Gestion des Accès à Privilèges",
    badge: "IAM / PAM",
    url: "https://www.wallix.com/",
    logo: "/images/partners/wallix.svg",
  },
  {
    name: "Yeastar",
    category: "Téléphonie IP d'Entreprise",
    badge: "VoIP",
    url: "https://www.yeastar.com/",
    logo: "/images/partners/yeastar.svg",
  },
  {
    name: "Sangoma",
    category: "Télécoms Unifiées",
    badge: "VoIP",
    url: "https://www.sangoma.com/",
    logo: "/images/partners/sangoma.svg",
  },
  {
    name: "HP Enterprise",
    category: "Infrastructures IT",
    badge: "Hardware",
    url: "https://www.hpe.com/",
    logo: "/images/partners/hpe.svg",
  },
];

export function Clients({ clients = [] }: { clients: any[] }) {
  const dynamicClients = clients.filter((c: any) => c.displayStatus !== false);

  return (
    <Section className="py-14 md:py-20 bg-slate-50/80 border-b border-slate-200/80 overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <FadeUp>
            <p className="font-mono text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-4 opacity-90 font-bold">
              &gt;_ CONFIANCE & ÉCOSYSTÈME
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              Ils nous ont fait confiance
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Des partenariats technologiques mondiaux et des solutions certifiées pour garantir la fiabilité, la sécurité et la performance de votre système d’information.
            </p>
          </FadeUp>
        </div>

        {/* 12 Partner Brands with Authentic Logos & Outbound Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 md:gap-4 mb-14">
          {defaultTrustedBrands.map((brand, idx) => (
            <FadeUp key={brand.name} delay={0.03 * idx}>
              <a
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visiter le site officiel de ${brand.name}`}
                className="group relative bg-white hover:bg-slate-50/90 rounded-2xl border border-slate-200/90 hover:border-cyan-500/80 p-3.5 sm:p-4 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full min-h-[140px]"
              >
                {/* Top Badge & External Link Icon */}
                <div className="w-full flex items-center justify-between gap-1 mb-2.5">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/60 group-hover:bg-cyan-50 group-hover:text-cyan-700 group-hover:border-cyan-200 transition-colors truncate max-w-[85px]">
                    {brand.badge}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 transition-colors opacity-70 group-hover:opacity-100 shrink-0" />
                </div>

                {/* Real Authentic Logo */}
                <div className="relative h-14 w-full flex items-center justify-center py-1">
                  <Image
                    src={brand.logo}
                    alt={`Logo officiel ${brand.name}`}
                    width={130}
                    height={42}
                    unoptimized
                    className="max-h-9 sm:max-h-10 max-w-[125px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Brand Name Footer */}
                <div className="mt-2.5 pt-2 w-full border-t border-slate-100 flex flex-col items-center">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors truncate max-w-full">
                    {brand.name}
                  </span>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>

        {/* Dynamic CMS Client References if any are published */}
        {dynamicClients.length > 0 && (
          <div className="mb-14 pt-8 border-t border-slate-200/80">
            <div className="text-center mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Références Clients & Déploiements
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 md:gap-4">
              {dynamicClients.map((client: any, idx: number) => {
                const logoUrl = client.logo?.url || "";
                return (
                  <FadeUp key={client.id || idx} delay={0.03 * (idx % 6)}>
                    <div className="group h-20 bg-white rounded-xl border border-slate-200 hover:border-cyan-400 p-4 flex items-center justify-center transition-all duration-300 hover:shadow-md">
                      {logoUrl ? (
                        <ClientLogoImg
                          src={logoUrl}
                          alt={client.name || "Client"}
                          className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-700 group-hover:text-cyan-600 text-center">
                          {client.name}
                        </span>
                      )}
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        )}

        {/* Featured Project Showcase: Parc Exotique du Sénégal */}
        <FadeUp delay={0.2}>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Screenshot Preview */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md bg-slate-950 group">
                  {/* Browser Chrome Header */}
                  <div className="bg-slate-900 px-3 py-2 flex items-center gap-1.5 border-b border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    <span className="text-[10px] font-mono text-slate-400 ml-2 truncate">
                      parcexotique.sn/fr
                    </span>
                  </div>
                  
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src="/images/parc-exotique-preview.png"
                      alt="Aperçu officiel du site Hôtel du Parc Exotique du Sénégal"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Text Description & Actions */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold text-cyan-800 bg-cyan-50 border border-cyan-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Conçu et déployé par Nob Technologies
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Tourisme & Hôtellerie
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    Parc Exotique du Sénégal &mdash; Hôtel, Parc Animalier & Restaurant
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Développement de la plateforme numérique officielle de l’Hôtel du Parc à Somone : architecture web responsive, présentation des chambres et du restaurant La Plume, catalogue animalier et module de réservation avec temps de chargement optimisé pour mobile.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                  <a
                    href="https://parcexotique.sn/fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-cyan-600 transition-colors shadow-sm"
                  >
                    <span>Visiter parcexotique.sn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href="/realisations"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-300 font-semibold text-xs transition-colors"
                  >
                    <span>Explorer toutes nos réalisations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
