import React from "react";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { ArrowRight, Shield, Wifi, Cloud, Code, MonitorCheck, Phone } from "lucide-react";
import { FadeUp } from "@/components/animations";
import Link from "next/link";

const defaultServices = [
  {
    id: "cybersecurite",
    title: "Cybersécurité",
    slug: "cybersecurite",
    description: "Pare-feux nouvelle génération, audit de vulnérabilité et protection contre les intrusions pour sécuriser vos données critiques.",
    icon: Shield,
  },
  {
    id: "reseaux",
    title: "Réseaux & Télécoms",
    slug: "reseaux-telecoms",
    description: "Architectures réseau redondantes, câblage structuré et téléphonie IP pour une connectivité fiable et performante.",
    icon: Wifi,
  },
  {
    id: "cloud",
    title: "Cloud & Virtualisation",
    slug: "cloud-virtualisation",
    description: "Migration cloud, virtualisation de serveurs et infogérance pour optimiser vos infrastructures et réduire vos coûts.",
    icon: Cloud,
  },
  {
    id: "erp",
    title: "Développement ERP",
    slug: "developpement-erp",
    description: "Applications métier et ERP sur-mesure pour automatiser vos processus et centraliser la gestion de votre entreprise.",
    icon: Code,
  },
  {
    id: "videosurveillance",
    title: "Vidéosurveillance IP",
    slug: "videosurveillance",
    description: "Installation et supervision de systèmes de vidéosurveillance IP haute définition pour sécuriser vos locaux.",
    icon: MonitorCheck,
  },
  {
    id: "support",
    title: "Support & Infogérance",
    slug: "infogerance",
    description: "Maintenance préventive, support utilisateurs et infogérance totale pour que vous vous concentriez sur votre cœur de métier.",
    icon: Phone,
  },
];

export function Expertises({ services = [] }: { services: any[] }) {
  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <Section id="solutions" className="bg-white py-16 md:py-24 lg:py-32 border-b border-slate-100">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <FadeUp>
            <p className="font-mono text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-6 font-bold">
              &gt;_ NOS EXPERTISES
            </p>
            <Heading level={2} className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              L'Ingénierie à l'état pur.
            </Heading>
            <Text className="text-lg sm:text-xl text-slate-500 leading-relaxed">
              Des solutions technologiques complètes, pensées pour les entreprises qui ne transigent pas avec la performance et la sécurité.
            </Text>
          </FadeUp>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayServices.map((service: any, idx: number) => {
            const Icon = service.icon || Shield;
            const href = service.slug ? `/services/${service.slug}` : "/services";
            return (
              <FadeUp key={service.id || idx} delay={0.05 * idx}>
                <Link href={href} className="group flex flex-col h-full bg-slate-50 hover:bg-white border border-slate-100 hover:border-accent/20 rounded-xl p-7 md:p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] cursor-pointer">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm flex-1">
                    {service.description || service.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-6 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}