import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { FadeUp } from "@/components/animations";

export const metadata = {
  title: 'Mentions Légales | NOB TECHNOLOGIES',
  description: 'Mentions légales et informations juridiques concernant l\'éditeur du site NOB TECHNOLOGIES.',
};

export default function LegalMentionsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <Section className="bg-[#020617] pt-32 pb-24 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <Container className="relative z-10 max-w-4xl">
            <FadeUp>
              <h1 className="text-sm font-mono tracking-widest text-accent mb-6 uppercase">Legal & Compliance</h1>
              <Heading level={1} className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                Mentions Légales
              </Heading>
              <Text className="text-slate-400 text-lg md:text-xl leading-relaxed">
                Informations juridiques concernant l'éditeur du site <a href="https://nobtech.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">NOB TECHNOLOGIES</a> et les conditions générales d'utilisation.
              </Text>
            </FadeUp>
          </Container>
        </Section>

        <Section className="py-24 bg-white">
          <Container className="max-w-4xl">
            <FadeUp delay={0.1} className="prose prose-slate prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">1. Éditeur du site</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Le présent site est édité et géré par <strong>NOB TECHNOLOGIES</strong>.<br />
                <strong>Siège social :</strong> Routes de l'aéroport Léopold Sédar Senghor, Dakar, Sénégal.<br />
                <strong>Email de contact :</strong> <a href="mailto:contact@nobtech.fr" className="text-accent hover:underline">contact@nobtech.fr</a><br />
                <strong>Téléphone :</strong> +221 33 814 04 35 / +221 77 301 08 38
              </p>
              
              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">2. Hébergement</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Ce site est hébergé sur les infrastructures de <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">Vercel Inc.</a><br />
                Siège social : 340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">3. Propriété intellectuelle</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                L'ensemble du contenu (textes, images, architectures techniques, vidéos, code source) présent sur ce site est la propriété exclusive de NOB TECHNOLOGIES. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'éditeur.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">4. Responsabilité</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                NOB TECHNOLOGIES s'efforce de fournir sur son site des informations aussi précises que possible. Toutefois, l'entreprise ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations. L'utilisation des informations et contenus disponibles sur l'ensemble du site ne saurait en aucun cas engager la responsabilité de NOB TECHNOLOGIES.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">5. Liens hypertextes</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Ce site web peut contenir des liens hypertextes menant vers d'autres sites internet (tels que des partenaires, fournisseurs ou éditeurs de logiciels tiers). NOB TECHNOLOGIES n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leurs politiques de confidentialité.
              </p>
            </FadeUp>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
