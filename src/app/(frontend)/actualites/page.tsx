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
  const payload = await getPayloadClient()
  
  const { docs: news } = await payload.find({
    collection: 'news',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
  })

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <Section data-cursor-binary="true" className="bg-[#020617] text-white py-24 relative overflow-hidden">
          <Container>
            <Heading level={1} className="text-white mb-4">Actualités</Heading>
            <Text className="text-slate-400 text-lg max-w-2xl relative z-10 leading-relaxed">
              Les dernières annonces, événements et nouveautés de l'entreprise.
            </Text>
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
