import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { ArticleListClient } from './ArticleListClient'
import { Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog & Décryptages Tech | NOB TECHNOLOGIES',
  description: 'Chroniques d’ingénierie, retours d’expérience d’infrastructures réelles, cybersécurité et cloud par les ingénieurs NOB TECHNOLOGIES.',
}

export default async function ArticlesPage() {
  let articles: any[] = [];
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      sort: '-publishedDate',
    });
    articles = res?.docs || [];
  } catch (err) {
    // Fallback if db is unseeded
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#050A14] text-slate-100 min-h-screen">
        {/* Silicon Valley Tech Publication Hero Section with Precision Alignment */}
        <section className="relative overflow-hidden pt-32 sm:pt-36 md:pt-40 pb-20 md:pb-24 border-b border-white/10 bg-gradient-to-b from-[#020617] via-[#050C1B] to-[#050A14]">
          {/* Ambient Tech Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-12 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15] text-balance">
                Chroniques d&apos;Ingénierie :{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                  Retours d&apos;Expérience &amp; Décryptages
                </span>
              </h1>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl text-balance">
                Autopsies d&apos;infrastructures réelles, cyber-résilience pragmatique, cloud hybride et analyses sans filtre par les ingénieurs de terrain de NOB TECHNOLOGIES.
              </p>

              {/* Key Stats Bar */}
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-mono text-slate-400">
                <div>{articles.length} ANALYSES PUBLIÉES</div>
                <div>•</div>
                <div>EXPÉRIENCE TERRAIN 100% VÉRIFIÉE</div>
                <div className="hidden sm:block">•</div>
                <div className="hidden sm:block">ZÉRO CONTENU SPONSORISÉ</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Articles Section with Interactive Filter and Modern Cards */}
        <Section className="py-16 md:py-24">
          <Container>
            <ArticleListClient articles={articles} />
          </Container>
        </Section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}

