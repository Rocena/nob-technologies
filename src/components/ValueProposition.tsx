import React from "react";
import { Container, Section } from "./ui/layout";
import { ShieldCheck, Cpu, Globe2, Activity, ArrowRight } from "lucide-react";
import { FadeUp, MagneticElement } from "./animations";
import Link from "next/link";

export function ValueProposition() {
  return (
    <Section className="py-12 md:py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <Container>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-10 md:mb-16 lg:mb-24">
          <FadeUp>
            <p className="font-mono text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-6 opacity-90 font-bold">
              &gt;_ L'Ingénierie à l'état pur
            </p>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-[1.15]">
              Nous construisons les fondations numériques des leaders de demain.
            </h3>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Chez NOB TECHNOLOGIES, nous ne nous contentons pas de fournir des services IT. Nous architecturons des écosystèmes complets, résilients et évolutifs. Face à la complexité croissante des réseaux et à l'évolution des cybermenaces, notre mission est de vous offrir un socle technologique infaillible.
            </p>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeUp delay={0.1}>
            <Link href="/expertises/cyber-resilience" className="group block bg-white p-6 md:p-8 lg:p-12 rounded-sm border border-slate-200 hover:border-accent/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 h-full relative overflow-hidden flex flex-col">
              <MagneticElement className="inline-block mb-8">
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <ShieldCheck className="w-8 h-8 text-slate-900 group-hover:text-accent transition-colors duration-500 relative z-10" />
                </div>
              </MagneticElement>
              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-accent transition-colors">Cyber-Résilience Maximale</h4>
              <p className="text-slate-600 leading-relaxed text-lg mb-8 flex-1">
                Des pare-feux de nouvelle génération à l'audit de vulnérabilité, nous verrouillons vos données contre toute intrusion externe.
              </p>
              <div className="mt-auto flex items-center text-accent font-semibold text-sm tracking-wide">
                DÉCOUVRIR <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <Link href="/expertises/haute-disponibilite" className="group block bg-white p-6 md:p-8 lg:p-12 rounded-sm border border-slate-200 hover:border-accent/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 h-full relative overflow-hidden flex flex-col">
              <MagneticElement className="inline-block mb-8">
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Activity className="w-8 h-8 text-slate-900 group-hover:text-accent transition-colors duration-500 relative z-10" />
                </div>
              </MagneticElement>
              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-accent transition-colors">Haute Disponibilité</h4>
              <p className="text-slate-600 leading-relaxed text-lg mb-8 flex-1">
                Des architectures réseau redondantes garantissant un uptime de 99.9%, pour que votre activité ne s'arrête jamais.
              </p>
              <div className="mt-auto flex items-center text-accent font-semibold text-sm tracking-wide">
                DÉCOUVRIR <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </FadeUp>

          <FadeUp delay={0.3}>
            <Link href="/expertises/innovation-logicielle" className="group block bg-white p-6 md:p-8 lg:p-12 rounded-sm border border-slate-200 hover:border-accent/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 h-full relative overflow-hidden flex flex-col">
              <MagneticElement className="inline-block mb-8">
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Cpu className="w-8 h-8 text-slate-900 group-hover:text-accent transition-colors duration-500 relative z-10" />
                </div>
              </MagneticElement>
              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-accent transition-colors">Innovation Logicielle</h4>
              <p className="text-slate-600 leading-relaxed text-lg mb-8 flex-1">
                Développement d'ERP et d'applications sur-mesure pour automatiser vos processus les plus complexes.
              </p>
              <div className="mt-auto flex items-center text-accent font-semibold text-sm tracking-wide">
                DÉCOUVRIR <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </FadeUp>

          <FadeUp delay={0.4}>
            <Link href="/expertises/vision-globale" className="group block bg-white p-6 md:p-8 lg:p-12 rounded-sm border border-slate-200 hover:border-accent/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 h-full relative overflow-hidden flex flex-col">
              <MagneticElement className="inline-block mb-8">
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Globe2 className="w-8 h-8 text-slate-900 group-hover:text-accent transition-colors duration-500 relative z-10" />
                </div>
              </MagneticElement>
              <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-accent transition-colors">Vision Globale</h4>
              <p className="text-slate-600 leading-relaxed text-lg mb-8 flex-1">
                Une approche 360° allant du simple câblage physique jusqu'à l'infogérance totale de votre parc informatique.
              </p>
              <div className="mt-auto flex items-center text-accent font-semibold text-sm tracking-wide">
                DÉCOUVRIR <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
