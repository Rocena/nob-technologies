import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { FadeUp } from "@/components/animations";

export const metadata = {
  title: 'Politique de confidentialité | NOB TECHNOLOGIES',
  description: 'Politique de confidentialité et traitement des données personnelles de NOB TECHNOLOGIES.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <Section className="bg-[#020617] pt-32 pb-24 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <Container className="relative z-10 max-w-4xl">
            <FadeUp>
              <h1 className="text-sm font-mono tracking-widest text-accent mb-6 uppercase">Legal & Privacy</h1>
              <Heading level={1} className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                Politique de Confidentialité
              </Heading>
              <Text className="text-slate-400 text-lg md:text-xl leading-relaxed">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}. Chez <a href="https://nobtech.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">NOB TECHNOLOGIES</a>, la sécurité et la confidentialité de vos données sont au cœur de notre infrastructure.
              </Text>
            </FadeUp>
          </Container>
        </Section>

        <Section className="py-24 bg-white">
          <Container className="max-w-4xl">
            <FadeUp delay={0.1} className="prose prose-slate prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">1. Collecte des données personnelles</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Nous collectons les données que vous nous fournissez volontairement lors de l'utilisation de nos formulaires de contact, de demande de devis ou lors d'échanges avec nos ingénieurs. Ces données incluent généralement votre nom, votre adresse e-mail professionnelle, votre numéro de téléphone et les informations relatives à votre infrastructure technique.
              </p>
              
              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">2. Utilisation de vos données</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                NOB TECHNOLOGIES traite vos données exclusivement pour :
              </p>
              <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
                <li>Répondre à vos demandes de contact et établir des propositions commerciales ou techniques.</li>
                <li>Assurer le suivi et la maintenance de vos infrastructures (infogérance).</li>
                <li>Vous informer sur des failles de sécurité critiques ou des mises à jour majeures de nos services.</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">3. Sécurité et Hébergement</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                En tant qu'experts en cybersécurité, nous appliquons les standards les plus stricts pour protéger vos données contre l'accès non autorisé, l'altération, la divulgation ou la destruction. Nos serveurs et bases de données sont sécurisés et surveillés en permanence.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">4. Partage des données</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Nous ne vendons, ne louons, ni ne partageons vos données personnelles avec des tiers à des fins commerciales. Elles peuvent être transmises à des prestataires techniques de confiance uniquement dans le cadre de l'exécution de nos services, sous des accords de confidentialité stricts.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">5. Vos droits</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Conformément à la réglementation en vigueur (notamment le RGPD si applicable, ou les lois locales de protection des données au Sénégal), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données. Pour exercer ces droits, veuillez nous contacter à l'adresse <a href="mailto:contact@nobtech.fr" className="text-accent font-semibold hover:underline">contact@nobtech.fr</a>.
              </p>
            </FadeUp>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
