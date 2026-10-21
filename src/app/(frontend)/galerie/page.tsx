import React from "react";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/cta";
import { Section, Container } from "@/components/ui/layout";
import { FadeUp, TextReveal } from "@/components/animations";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

import { getPayloadClient } from "@/lib/payload";
import { GALLERY_ITEMS, GalleryItem } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Galerie & Chantiers Réalisés | NOB TECHNOLOGIES",
  description:
    "Découvrez les photos réelles de nos installations informatiques au Sénégal : baies de brassage, câblage structuré, salles serveurs et équipements réseaux déployés.",
};

export default async function GaleriePage() {
  let galleryItems: GalleryItem[] = GALLERY_ITEMS;
  try {
    const payload = await getPayloadClient();
    const res = await (payload as any).find({
      collection: 'galleries' as any,
      where: { published: { equals: true } },
      sort: 'order',
      limit: 100,
    });
    if (res?.docs && res.docs.length > 0) {
      galleryItems = res.docs.map((doc: any) => ({
        id: String(doc.id),
        title: doc.title,
        category: (doc.category || 'cablage') as any,
        categoryLabel: doc.categoryLabel || 'Chantier Réalisé',
        image: doc.imageUpload?.url || doc.imageUrl || '/images/gallery/galerie-1-baie-brassage.jpg',
        description: doc.description,
        date: doc.date,
      }));
    }
  } catch {
    // Fallback if db is unavailable
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Silicon Valley Hero */}
        <Section className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#020617] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

          <Container className="relative z-10 text-center">
            <TextReveal>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 text-balance">
                Galerie de nos Déploiements :{" "}
                <span className="text-[#0284C7] dark:text-sky-400">
                  L&apos;Ingénierie en Images
                </span>
              </h1>
            </TextReveal>
            <FadeUp delay={0.2}>
              <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
                Photos authentiques de nos installations en production au Sénégal : câblage structuré, baies de brassage 42U, salles serveurs climatisées et liaisons fibre optique aux normes internationales.
              </p>
            </FadeUp>

            {/* Quality Badges */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Câblage certifié Cat 6A / 7
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Baies normalisées 19 pouces
                </div>
              </div>
            </FadeUp>
          </Container>
        </Section>

        {/* Gallery Interactive Component */}
        <Section className="py-16 md:py-24">
          <Container>
            <GalleryGrid items={galleryItems} />
          </Container>
        </Section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
