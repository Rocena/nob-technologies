import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Code, Database, Network, Shield, Phone, Server, Video, Wrench } from 'lucide-react'
import { FadeUp, TextReveal, MagneticElement } from '@/components/animations'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Nos Services | NOB TECHNOLOGIES',
  description: 'Découvrez notre expertise en sécurité, câblage, virtualisation, téléphonie IP et développement d\'applications.',
}

const getIcon = (slug: string) => {
  switch (slug) {
    case 'infogerance': return <Wrench className="w-8 h-8 text-accent mb-4" />
    case 'cablage': return <Network className="w-8 h-8 text-accent mb-4" />
    case 'securite-des-donnees': return <Shield className="w-8 h-8 text-accent mb-4" />
    case 'protection-de-reseau': return <Shield className="w-8 h-8 text-accent mb-4" />
    case 'virtualisation-et-consolidation': return <Server className="w-8 h-8 text-accent mb-4" />
    case 'telephone-ip': return <Phone className="w-8 h-8 text-accent mb-4" />
    case 'video-surveillance': return <Video className="w-8 h-8 text-accent mb-4" />
    case 'developpement': return <Code className="w-8 h-8 text-accent mb-4" />
    case 'erp': return <Database className="w-8 h-8 text-accent mb-4" />
    default: return <Server className="w-8 h-8 text-accent mb-4" />
  }
}

export default async function ServicesPage() {
  const payload = await getPayloadClient()
  
  const { docs: services } = await payload.find({
    collection: 'services',
    where: { status: { equals: 'published' } },
    sort: 'title',
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
                <Heading level={1} className="text-white mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1]">Expertises &amp; Services</Heading>
              </TextReveal>
              <FadeUp delay={0.2}>
                <Text className="text-slate-400 text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
                  De l'infogérance à la sécurité réseau, NOB TECHNOLOGIES vous accompagne dans tous vos projets informatiques avec des solutions sur-mesure.
                </Text>
              </FadeUp>
            </div>
          </Container>
        </Section>
        
        <Section className="py-12 md:py-16 lg:py-24">
          <Container>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <FadeUp key={service.id} delay={index * 0.1}>
                  <Link href={`/services/${service.slug}`} className="block h-full group">
                    <Card className="h-full flex flex-col hover:border-accent/50 transition-colors bg-surface-elevated">
                      <CardHeader>
                        <MagneticElement className="inline-block">
                          {getIcon(service.slug)}
                        </MagneticElement>
                        <CardTitle className="group-hover:text-accent transition-colors">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between">
                        <Text className="text-sm text-muted mb-6">{(service.description as string) || (service.problem as string)}</Text>
                        <span className="inline-flex items-center text-sm font-medium text-accent">
                          En savoir plus <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeUp>
              ))}
            </div>
            
            {services.length === 0 && (
              <div className="text-center py-12 text-muted border border-dashed border-border rounded-xl">
                Les services sont en cours de mise à jour.
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
