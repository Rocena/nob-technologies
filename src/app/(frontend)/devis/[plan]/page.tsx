import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Section, Container } from "@/components/ui/layout";
import { FadeUp, TextReveal } from "@/components/animations";
import { DevisForm } from "./form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Demander un devis | NOB TECHNOLOGIES",
  description: "Obtenez un devis personnalisé pour vos besoins en infrastructure IT et cybersécurité.",
};

const VALID_PLANS = ["essentiel", "business", "enterprise"];

export default async function DevisPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan } = await params;
  
  if (!VALID_PLANS.includes(plan.toLowerCase())) {
    notFound();
  }

  const formattedPlan = plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#020617] selection:bg-accent/30">
        <Section className="pt-32 pb-20 relative overflow-hidden">
          {/* Background Grid & Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/20 rounded-full blur-[150px] pointer-events-none" />
          
          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto">
              <FadeUp>
                <div className="text-center mb-12">
                  <p className="font-mono text-accent text-xs tracking-[0.3em] uppercase mb-6 font-bold">
                    &gt;_ DEVIS PERSONNALISÉ
                  </p>
                  <TextReveal>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
                      Plan{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                        {formattedPlan}
                      </span>
                    </h1>
                  </TextReveal>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                    Détaillez vos besoins pour ce plan. Nos experts vous feront un retour rapide avec une proposition sur mesure.
                  </p>
                </div>
              </FadeUp>

              <DevisForm plan={formattedPlan} />
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
