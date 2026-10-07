import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { RichText } from '@/components/rich-text'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug } },
  })

  const item = docs[0]
  if (!item) return {}

  return {
    title: `${item.title} | NOB TECHNOLOGIES`,
    description: item.summary,
  }
}

export default async function NewsItemPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getPayloadClient()
  
  const { docs } = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug } },
    draft: false,
  })

  const item = docs[0]
  
  if (!item || item.status !== 'published') {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <article>
          <Section className="pb-8">
            <Container>
              <div className="max-w-3xl mx-auto">
                <Text className="text-accent font-semibold mb-4 text-sm uppercase tracking-wider">
                  Actualité
                </Text>
                <Heading level={1} className="mb-6">{item.title}</Heading>
                
                <div className="mt-8">
                  <Text variant="lead" className="mb-8">{item.summary}</Text>
                  {item.content ? (
                    <RichText data={item.content} />
                  ) : (
                    <p className="text-muted italic">Contenu non disponible.</p>
                  )}
                </div>
              </div>
            </Container>
          </Section>
        </article>
      </main>
      <Footer />
    </>
  )
}
export const dynamic = 'force-dynamic'; 
