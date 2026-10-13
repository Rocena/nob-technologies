import React from "react";
import { Container, Section } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Quote, BadgeCheck } from "lucide-react";
import { FadeUp } from "@/components/animations";

const fallbackTestimonials = [
  {
    id: "testimonial-saad-diakhite",
    content: "Excellent travail franchement, très professionnel et surtout très réactif. Je ne pourrais pas trouver mieux ailleurs.",
    authorName: "Saad Diakhité",
    authorRole: "DGA, Hôtel du Parc"
  },
  {
    id: "fallback-3",
    content: "Travail de pro, très bonne réactivité, good job.",
    authorName: "Abdourakhmane Ly",
    authorRole: "Responsable Informatique, Union européenne"
  },
  {
    id: "fallback-2",
    content: "Travail très propre, équipes très professionnelles.",
    authorName: "Orcel Mouanda",
    authorRole: "Logistique, Union européenne"
  },
  {
    id: "fallback-1",
    content: "Très satisfait, travail excellent.",
    authorName: "Mbaye Diop",
    authorRole: "Logistique, Union européenne"
  }
];

export function Testimonials({ testimonials = [] }: { testimonials: any[] }) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <Section className="bg-[#020617] py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] lg:w-[1300px] h-[450px] lg:h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none"></div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <FadeUp>
            <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
              RETOURS CLIENTS &bull; TÉMOIGNAGES
            </p>
            <Heading level={2} className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Ce que disent nos clients.
            </Heading>
            <Text className="text-lg sm:text-xl text-slate-400 leading-relaxed font-light">
              Retours d'expérience et témoignages de nos partenaires et clients institutionnels sur la qualité de nos interventions.
            </Text>
          </FadeUp>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
