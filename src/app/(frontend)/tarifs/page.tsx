import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { Section, Container } from "@/components/ui/layout";
import { FadeUp, TextReveal } from "@/components/animations";
import { Check, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarifs & Plans | NOB TECHNOLOGIES",
  description:
    "Découvrez nos plans tarifaires adaptÃ©s Ã  chaque taille d'entreprise. Solutions IT sur mesure pour PME, entreprises en croissance et grandes structures.",
};

const plans = [
  {
    name: "Essentiel",
    tagline: "PME & Startups",
    price: "Sur devis",
    slug: "essentiel",
    dark: false,
    features: [
      "Audit réseau initial",
      "Installation & câblage",
      "Support email 5j/7",
      "Maintenance préventive trimestrielle",
    ],
  },
  {
    name: "Business",
    tagline: "Entreprises en croissance",
    price: "Sur devis",
    slug: "business",
    dark: true,
    badge: "POPULAIRE",
    features: [
      "Tout Essentiel inclus",
      "Cybersécurité avancée",
      "VPN & firewall managé",
      "Infogérance complète",
      "Support téléphone 6j/7",
      "SLA 4h d'intervention",
    ],
  },
  {
    name: "Enterprise",
    tagline: "Grandes structures",
    price: "Sur devis",
    slug: "enterprise",
    dark: false,
    features: [
      "Tout Business inclus",
      "RSSI externalisé",
      "SOC monitoring 24/7",
      "Architecture cloud dédiée",
      "SLA 1h d'intervention",
      "Interlocuteur dédié",
      "Audit annuel offert",
    ],
  },
];

const faqs = [
  {
    question: "Comment sont établis les devis ?",
    answer:
      "Nos devis sont personnalisés en fonction de votre infrastructure existante, de votre taille d'entreprise et de vos besoins spécifiques. Un audit initial gratuit est réalisé avant toute proposition commerciale.",
  },
  {
    question: "Y a-t-il des engagements de durée minimale ?",
    answer:
      "Nos contrats de maintenance et d'infogérance sont généralement proposés sur 12 mois avec possibilité de renouvellement. Nous proposons également des missions ponctuelles sans engagement.",
  },
  {
    question: "Puis-je changer de plan en cours de contrat ?",
    answer:
      "Oui, vous pouvez évoluer vers un plan supérieur a tout moment. Un avenant contractuel sera établi pour intégrer les nouvelles prestations dans les meilleurs délais.",
  },
  {
    question: "Les déplacements sur site sont-ils inclus ?",
    answer:
      "Les interventions sur site a Dakar sont incluses dans les plans Business et Enterprise selon les SLA definis. Pour d'autres régions du Sénégal ou de l'Afrique de l'Ouest, des frais de deplacement peuvent s'appliquer.",
  },
];

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof plans)[0];
  index: number;
}) {
  return (
    <FadeUp delay={index * 0.1}>
      <div
        className={`relative rounded-2xl border flex flex-col h-full transition-all duration-300 group ${
          plan.dark
            ? "bg-[#020617] border-accent/40 shadow-[0_0_60px_rgba(0,212,255,0.15)]"
            : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xl"
        }`}
      >
        {plan.badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full text-xs font-black tracking-widest bg-accent text-[#020617] shadow-[0_0_20px_rgba(0,212,255,0.5)]">
              {plan.badge}
            </span>
          </div>
        )}

        <div className="p-8 flex flex-col flex-1">
          {/* Header */}
          <div className="mb-8">
            <p
              className={`text-xs font-bold tracking-[0.2em] uppercase mb-2 ${
                plan.dark ? "text-accent" : "text-slate-400"
              }`}
            >
              {plan.tagline}
            </p>
            <h3
              className={`text-2xl font-extrabold tracking-tight mb-4 ${
                plan.dark ? "text-white" : "text-slate-900"
              }`}
            >
              {plan.name}
            </h3>
            <div
              className={`text-3xl font-black ${
                plan.dark ? "text-white" : "text-slate-900"
              }`}
            >
              {plan.price}
            </div>
          </div>

          {/* Divider */}
          <div
            className={`h-px mb-8 ${
              plan.dark ? "bg-white/10" : "bg-slate-100"
            }`}
          />

          {/* Features */}
          <ul className="space-y-3 flex-1 mb-10">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    plan.dark
                      ? "bg-accent/20 text-accent"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                <span
                  className={`text-sm leading-relaxed ${
                    plan.dark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={`/devis/${plan.slug}`}
            className={`w-full text-center py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
              plan.dark
                ? "bg-accent text-[#020617] hover:bg-[#00B4D8] shadow-[0_0_25px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]"
                : "bg-[#020617] text-white hover:bg-slate-800"
            }`}
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </FadeUp>
  );
}

function FAQItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[0];
  index: number;
}) {
  return (
    <FadeUp delay={index * 0.08}>
      <details className="group border border-slate-200 rounded-xl overflow-hidden">
        <summary className="flex items-center justify-between p-6 cursor-pointer list-none gap-4 hover:bg-slate-50 transition-colors">
          <span className="font-semibold text-slate-900 text-sm md:text-base">
            {faq.question}
          </span>
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
          {faq.answer}
        </div>
      </details>
    </FadeUp>
  );
}

export default function TarifsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <Section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[#020617] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
          <Container className="relative z-10 text-center">
            <FadeUp>
              <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-6 font-bold">
                &gt;_ TARIFS & PLANS
              </p>
              <TextReveal>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                  Des solutions{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                    adaptées à chaque ambition
                  </span>
                </h1>
              </TextReveal>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Chaque entreprise est unique. Nous concevons des offres sur
                mesure après un audit initial gratuit de votre infrastructure.
              </p>
            </FadeUp>
          </Container>
        </Section>

        {/* Pricing Cards */}
        <Section className="py-20 md:py-28 bg-slate-50">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 items-start">
              {plans.map((plan, i) => (
                <PricingCard key={plan.slug} plan={plan} index={i} />
              ))}
            </div>

            <FadeUp delay={0.4}>
              <p className="text-center text-sm text-slate-500 mt-10">
                Tous les plans incluent un audit initial gratuit.{" "}
                <Link
                  href="/contact"
                  className="text-accent hover:underline font-medium"
                >
                  Contactez-nous
                </Link>{" "}
                pour une étude personnalisée.
              </p>
            </FadeUp>
          </Container>
        </Section>

        {/* FAQ */}
        <Section className="py-20 md:py-28 bg-white">
          <Container>
            <FadeUp>
              <div className="text-center mb-14">
                <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                  FAQ
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
                  Questions fréquentes
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto">
                  Tout ce que vous devez savoir sur nos offres et notre
                  fonctionnement.
                </p>
              </div>
            </FadeUp>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </Container>
        </Section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
