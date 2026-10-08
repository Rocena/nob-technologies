import React from "react";
import { Container, Section } from "./ui/layout";
import { Heading, Text } from "./ui/typography";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedHeroText } from "./AnimatedHeroText";
import { TypewriterText } from "./TypewriterText";
import { FadeUp } from "./animations";
import Link from "next/link";
import { TalkToEngineerButton } from "./TalkToEngineerButton";

export function Hero() {
  return (
    <Section data-cursor-binary="true" className="relative overflow-hidden bg-[#020617] pt-28 sm:pt-32 pb-28 sm:pb-40 min-h-[90vh] flex items-center justify-center">
      {/* Silicon Valley Style Backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      <Container className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          <FadeUp delay={0.1}>
            <AnimatedHeroText />
          </FadeUp>

          <FadeUp delay={0.2}>
            <Text className="mt-6 mb-12 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Nous concevons, déployons et sécurisons des infrastructures informatiques et télécoms de niveau entreprise pour accélérer votre transformation digitale.
            </Text>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-8">
              <Button size="lg" variant="light" asChild className="group h-14 px-8 text-base shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                <Link href="/services">
                  Découvrir nos expertises
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <TalkToEngineerButton />
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
