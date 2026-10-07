import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FadeUp, TextReveal } from '@/components/animations'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Réalisations | NOB TECHNOLOGIES',
  description: 'Découvrez les projets et réalisations de NOB TECHNOLOGIES dans les domaines des réseaux, télécoms et développement logiciel.',
}

export default async function ProjectsPage() {
  const payload = await getPayloadClient()
  
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
  })

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <TextReveal>
                <Heading level={1} className="text-white mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1]">Nos Réalisations</Heading>
              </TextReveal>
              <FadeUp delay={0.2}>
                <Text className="text-slate-400 text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
                  Une sélection de projets illustrant notre savoir-faire technologique.
                </Text>
              </FadeUp>
            </div>
          </Container>
        </Section>
        
        <Section className="py-12 md:py-16 lg:py-24">
          <Container>
            {projects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <FadeUp key={project.id} delay={(index % 3) * 0.1}>
                    <Card className="h-full flex flex-col group overflow-hidden hover:border-accent/50 transition-colors bg-surface-elevated">
                      <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 border-b border-border transition-transform group-hover:scale-105 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-slate-300 font-bold text-4xl opacity-50">&gt;_</span>
                      </div>
                      <CardHeader>
                        <Text className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">{project.sector || 'Technologie'}</Text>
                        <CardTitle className="text-xl group-hover:text-accent transition-colors">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <Text className="text-sm text-muted">{project.description as string}</Text>
                      </CardContent>
                    </Card>
                  </FadeUp>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <Text className="text-muted">Les cas d'études détaillés seront bientôt disponibles. Revenez plus tard ou contactez-nous pour en savoir plus.</Text>
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
