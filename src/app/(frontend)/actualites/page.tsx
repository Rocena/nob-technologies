import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Calendar } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Actualités | NOB TECHNOLOGIES',
  description: 'Suivez les dernières actualités et annonces de NOB TECHNOLOGIES.',
}

export default async function NewsPage() {
  let news: any[] = [];
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'news',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
    });
    news = res?.docs || [];
  } catch (err) {
    // Fallback if db is unseeded
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 uppercase mb-5 backdrop-blur-sm shadow-sm">
                &gt;_ VIE DE L&apos;ENTREPRISE &bull; ANNONCES OFFICIELLES
              </span>
              <h1 className="text-white mb-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
                Actualités &amp; Annonces :{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  L&apos;Information Nob Technologies
                </span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
                Suivez les temps forts, déploiements d&apos;envergure, nouvelles certifications d&apos;ingénieurs et partenariats constructeurs.
              </p>
            </div>
          </Container>
        </Section>
        
        <Section className="py-24">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Link key={item.id} href={`/actualites/${item.slug}`} className="block h-full group">
                  <Card className="h-full flex flex-col hover:border-accent/50 transition-colors bg-surface-elevated overflow-hidden">
                    <div className="w-full h-48 bg-muted/20 border-b border-border transition-transform group-hover:scale-105" />
                    <CardHeader>
                      <div className="flex items-center text-xs text-muted mb-3">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(item.publishedAt || item.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                      <CardTitle className="group-hover:text-accent transition-colors line-clamp-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between">
                      <Text className="text-sm text-muted mb-6 line-clamp-3">{item.summary}</Text>
                      <span className="inline-flex items-center text-sm font-medium text-accent mt-auto">
                        Lire la suite <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {news.length === 0 && (
              <div className="text-center py-12 text-muted border border-dashed border-border rounded-xl">
                Aucune actualité pour le moment.
              </div>
            )}
          </Container>
        </Section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}
