import React from "react";
import { Container, Section } from "@/components/ui/layout";
import { BadgeCheck } from "lucide-react";

const fallbackTestimonials = [
  {
    id: "testimonial-saad-diakhite",
    content:
      "Excellent travail franchement, très professionnel et surtout très réactif. Je ne pourrais pas trouver mieux ailleurs.",
    authorName: "Saad Diakhité",
    authorRole: "Directeur Général Adjoint (DGA), Hôtel du Parc",
  },
  {
    id: "fallback-3",
    content: "Travail de pro, très bonne réactivité, good job.",
    authorName: "Abdourakhmane Ly",
    authorRole: "Responsable Informatique, Union européenne",
  },
  {
    id: "fallback-2",
    content: "Travail très propre, équipes très professionnelles.",
    authorName: "Orcel Mouanda",
    authorRole: "Logistique, Union européenne",
  },
  {
    id: "fallback-1",
    content: "Très satisfait, travail excellent.",
    authorName: "Mbaye Diop",
    authorRole: "Logistique, Union européenne",
  },
];

export function Testimonials({ testimonials = [] }: { testimonials: any[] }) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <Section className="bg-[#060B14] py-20 md:py-28 relative overflow-hidden border-b border-slate-800/80">
      <Container className="relative z-10">
        {/* Editorial Left-Aligned Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-14 pb-8 border-b border-slate-800">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold text-sky-400 mb-2">
              Retours d&apos;expérience vérifiés
            </div>
            <h2
              className="font-extrabold tracking-tight text-white leading-[1.12]"
              style={{ fontSize: "clamp(1.85rem, 1.3rem + 2vw, 3rem)" }}
            >
              L&apos;appréciation des directions informatiques et générales.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Appréciations recueillies à l&apos;issue de nos déploiements réseaux, audits de sécurité et mises en production applicatives.
            </p>
          </div>
        </div>

        {/* Architectural Grid of Verbatims */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-800 rounded-xl overflow-hidden">
          {displayTestimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="flex flex-col justify-between bg-[#0B1528] hover:bg-[#0E1B33] border-r border-b border-slate-800 p-7 transition-colors"
            >
              <div>
                <div className="font-mono text-xs text-sky-400 mb-4">
                  0{idx + 1}
                </div>
                <blockquote className="text-[15px] text-slate-200 mb-8 leading-relaxed font-normal">
                  &laquo; {t.content} &raquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-800/80 mt-auto">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                  <span className="text-white font-semibold text-xs">
                    {t.authorName?.charAt(0) || "C"}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-white text-sm">{t.authorName}</p>
                    <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-label="Client vérifié" />
                  </div>
                  {t.authorRole && (
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">{t.authorRole}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
