import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { RichText } from '@/components/rich-text'
import { CTA } from '@/components/cta'
import Link from 'next/link'
import { ArrowLeft, Clock, BookOpen, Share2, ShieldCheck, Sparkles } from 'lucide-react'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
  })

  const article = docs[0]
  if (!article) return {}

  return {
    title: `${article.title} | NOB TECHNOLOGIES`,
    description: article.metaDescription || article.summary,
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    draft: false,
  })

  const article = docs[0]

  if (!article || article.status !== 'published') {
    notFound()
  }

  // Fetch other related articles for the footer section
  const { docs: otherArticles } = await payload.find({
    collection: 'articles',
    where: {
      and: [
        { status: { equals: 'published' } },
        { slug: { not_equals: slug } },
      ],
    },
    limit: 2,
    sort: '-publishedDate',
  })

  const authorDisplayName =
    article.authorName ||
    (typeof article.author === 'object' && article.author?.name) ||
    'Rédaction NOB TECHNOLOGIES'

  const formattedDate = new Date(
    article.publishedDate || article.createdAt
  ).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#090D16] text-slate-100 min-h-screen">
        {/* Article Header & Editorial Meta */}
        <section className="relative pt-28 pb-16 border-b border-slate-800/80 bg-gradient-to-b from-[#060911] via-[#0A101D] to-[#090D16]">
          {/* Subtle Ambient Tech Glows */}
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <Container>
            <div className="max-w-3xl mx-auto">
              {/* Back to Blog */}
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>RETOUR AUX ARTICLES</span>
              </Link>

              {/* Category & Read Time Tag */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                  {article.category || 'Culture Tech & Innovation'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {article.readingTime || '5 min de lecture'}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">
                  {formattedDate}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-8 leading-tight">
                {article.title}
              </h1>

              {/* Lead / Editorial Summary */}
              {article.summary && (
                <div className="p-6 rounded-xl bg-slate-900/80 border-l-4 border-cyan-500 border border-slate-800/60 mb-10 shadow-lg">
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal italic">
                    {article.summary}
                  </p>
                </div>
              )}

              {/* Author Byline */}
              <div className="flex items-center justify-between py-4 border-y border-slate-800/80 text-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-sm font-bold text-white shadow-md ring-2 ring-cyan-400/30">
                    {authorDisplayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-white tracking-wide">
                      {authorDisplayName}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Ingénierie & Systèmes • NOB TECHNOLOGIES</span>
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-500 font-mono hidden sm:block">
                  Édition Certifiée
                </div>
              </div>

              {/* Editorial Hero / Header Image */}
              {article.heroImage && (typeof article.heroImage === 'object' ? article.heroImage?.url : true) && (
                <div className="mt-10 w-full rounded-2xl overflow-hidden border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-30 z-10 pointer-events-none" />
                  <img
                    src={
                      typeof article.heroImage === 'object' && article.heroImage?.url
                        ? article.heroImage.url
                        : `/media/${article.slug}.jpg`
                    }
                    alt={article.title}
                    className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {typeof article.heroImage === 'object' && article.heroImage?.alt && (
                    <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                      <span>{article.heroImage.alt}</span>
                      <span className="text-cyan-400/70">[PHOTO HD // 16:9]</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* Article Body */}
        <Section className="py-16">
          <Container>
            <div className="max-w-3xl mx-auto">

              {/* Content Rendered with Lexical RichText */}
              <div className="prose prose-invert prose-cyan lg:prose-lg max-w-none text-slate-300 leading-relaxed font-sans prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-800/80 prose-h2:pb-3 prose-p:my-5 prose-blockquote:border-l-cyan-400 prose-blockquote:bg-slate-900/40 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:text-cyan-200 prose-strong:text-white">
                {article.content ? (
                  <RichText data={article.content} />
                ) : (
                  <p className="text-slate-500 italic">Contenu en cours de rédaction.</p>
                )}
              </div>

              {/* Tags Section */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider mr-2">
                    Mots-clés :
                  </span>
                  {article.tags.map((t: any, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      #{t.tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Bio Card */}
              <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/30 border border-slate-800/80 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shrink-0 ring-4 ring-slate-800">
                  {authorDisplayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                    <h3 className="text-lg font-bold text-white">{authorDisplayName}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                      AUTEUR
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 text-center sm:text-left">
                    Ingénieur et spécialiste en infrastructures critiques chez NOB TECHNOLOGIES. Nous accompagnons les entreprises dans la sécurisation de leurs réseaux, l'intégration ERP et le déploiement d'architectures hybrides résilientes.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-mono text-cyan-400">
                    <Link href="/contact" className="hover:underline">
                      Contacter l'équipe technique →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Read More Section */}
        {otherArticles.length > 0 && (
          <section className="py-16 bg-[#060911] border-t border-slate-800">
            <Container>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  À lire également dans nos chroniques
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {otherArticles.map((other: any) => (
                    <Link
                      key={other.id}
                      href={`/articles/${other.slug}`}
                      className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[11px] font-mono text-cyan-400 uppercase">
                          {other.category || 'Tech'}
                        </span>
                        <h3 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors mt-2 mb-3 line-clamp-2">
                          {other.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                          {other.summary}
                        </p>
                      </div>
                      <div className="text-xs font-mono text-slate-500 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                        <span>{other.readingTime || '4 min'}</span>
                        <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">
                          Lire →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  )
}
