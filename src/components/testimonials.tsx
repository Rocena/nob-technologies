import React from "react";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Quote, BadgeCheck } from "lucide-react";
import { FadeUp } from "@/components/animations";
import { ShieldWatermark } from "./ShieldWatermark";

const fallbackTestimonials = [
  {
    id: "fallback-1",
    content: "Très satisfait, travail excellent.",
    authorName: "Mbaye Diop",
    authorRole: "Logistique Union européenne"
  },
  {
    id: "fallback-2",
    content: "Travail très propre, équipes très professionnel.",
    authorName: "Orcel Mouanda",
    authorRole: "Logistique Union européenne"
  },
  {
    id: "fallback-3",
    content: "Travail de pro, très bonne réactivité, good job.",
    authorName: "Abdourakhmane Ly",
    authorRole: "Responsable Informatique, Union européenne"
  }
];

export function Testimonials({ testimonials = [] }: { testimonials: any[] }) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <Section className="bg-[#020617] py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      {/* Strategic Brand Shield Watermark */}
      <ShieldWatermark size={520} opacity={0.04} glow={true} />
      
      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <FadeUp>
            <p className="font-mono text-accent text-sm md:text-base tracking-[0.25em] uppercase mb-6 font-bold">
              &gt;_ RETOURS CLIENTS
            </p>
            <Heading level={2} className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Ce que disent nos clients.
            </Heading>
            <Text className="text-lg sm:text-xl text-slate-400 leading-relaxed font-light">
              Retours d'expérience et témoignages de nos partenaires et clients institutionnels sur la qualité de nos interventions.
            </Text>
          </FadeUp>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {displayTestimonials.map((t, idx) => (
            <FadeUp key={t.id || idx} delay={0.1 * idx} className="flex">
              {/* Ultra-minimalist B2B Card - Brighter */}
              <div className="relative flex flex-col bg-white/[0.12] p-8 rounded-xl w-full border border-white/20 hover:bg-white/[0.18] hover:border-white/30 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
                
                <Quote className="h-8 w-8 text-white/20 mb-6 transform rotate-180" />
                
                <p className="text-lg text-slate-200 mb-10 font-sans leading-relaxed flex-1 font-light">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/20">
                    <span className="text-white font-medium text-sm">
                      {t.authorName?.charAt(0) || "C"}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-slate-200 text-sm">{t.authorName}</p>
                      <BadgeCheck className="w-4 h-4 text-emerald-500/80" aria-label="Client vérifié" />
                    </div>
                    {t.authorRole && <p className="text-xs text-slate-400 mt-0.5">{t.authorRole}</p>}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
