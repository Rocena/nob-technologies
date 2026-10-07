import { notFound } from 'next/navigation'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { FadeUp, TextReveal } from '@/components/animations'
import { ShieldCheck, Cpu, Globe2, Activity, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const expertisesData: Record<string, { title: string, subtitle: string, desc1: string, desc2: string, features: string[], Icon: any, approachTitle: string, ctaTitle: string, ctaText: string }> = {
  'cyber-resilience': {
    title: 'Cyber-Résilience Maximale',
    subtitle: 'Verrouillez vos données contre toute intrusion.',
    desc1: "Dans un monde où les cyberattaques sont de plus en plus sophistiquées, la simple protection ne suffit plus : il faut être résilient. Chez NOB TECHNOLOGIES, nous déployons des pare-feux de nouvelle génération (NGFW), mettons en place des politiques d'accès Zero Trust et réalisons des audits de vulnérabilité réguliers.",
    desc2: "Notre objectif est simple : faire en sorte que votre infrastructure puisse non seulement bloquer les attaques, mais aussi continuer à fonctionner de manière optimale en cas d'incident majeur.",
    features: ["Audit de vulnérabilité et tests d'intrusion", "Déploiement de Firewalls Nouvelle Génération", "Protection des Endpoints (EDR/XDR)", "Mise en place de VPN sécurisés pour le télétravail"],
    Icon: ShieldCheck,
    approachTitle: "Notre Méthodologie de Défense",
    ctaTitle: "Prêt à blinder votre réseau ?",
    ctaText: "Nos experts en cybersécurité sont disponibles pour un premier audit rapide de vos vulnérabilités et pour définir votre périmètre de défense."
  },
  'haute-disponibilite': {
    title: 'Haute Disponibilité',
    subtitle: 'Pour que votre activité ne s\'arrête jamais.',
    desc1: "Chaque minute d'interruption réseau coûte de l'argent et entache votre réputation. Nous concevons des architectures réseau redondantes qui garantissent un uptime de 99.9%.",
    desc2: "Du routage dynamique à la mise en grappe (clustering) de vos serveurs critiques, nous nous assurons que même en cas de panne matérielle d'un composant, votre système bascule automatiquement sur un système de secours sans aucune interruption visible pour l'utilisateur final.",
    features: ["Architectures réseaux redondantes (SD-WAN, BGP)", "Clustering et virtualisation haute disponibilité", "Sauvegarde automatisée et Plan de Reprise d'Activité (PRA)", "Monitoring proactif 24/7"],
    Icon: Activity,
    approachTitle: "Conception de l'Architecture",
    ctaTitle: "Fini les interruptions de service ?",
    ctaText: "Discutons de vos besoins en continuité de service. Nous dimensionnerons une infrastructure capable d'absorber toutes les pannes."
  },
  'innovation-logicielle': {
    title: 'Innovation Logicielle',
    subtitle: 'L\'automatisation au service de vos processus.',
    desc1: "Les logiciels standards ne répondent pas toujours aux besoins spécifiques de votre métier. Nous développons des ERP, des CRM et des applications web/mobiles sur-mesure pour automatiser vos processus les plus complexes.",
    desc2: "En numérisant vos flux de travail, nous réduisons les erreurs humaines, accélérons la prise de décision et permettons à vos équipes de se concentrer sur des tâches à forte valeur ajoutée. L'innovation devient votre avantage concurrentiel.",
    features: ["Développement d'applications Web et Mobiles", "Conception et intégration d'ERP/CRM sur-mesure", "Automatisation des processus métiers (BPA)", "Création de sites web vitrines et e-commerce"],
    Icon: Cpu,
    approachTitle: "Développement et Intégration",
    ctaTitle: "Un projet d'application ou d'ERP ?",
    ctaText: "De la conceptualisation au déploiement, notre équipe de développeurs est prête à donner vie à la solution logicielle de vos rêves."
  },
  'vision-globale': {
    title: 'Vision Globale',
    subtitle: 'L\'infogérance totale de votre parc informatique.',
    desc1: "La gestion d'un système d'information requiert une multitude de compétences souvent difficiles à réunir en interne. Notre approche 360° vous libère de toutes les contraintes techniques, du simple câblage physique jusqu'à l'infogérance totale.",
    desc2: "Nous agissons comme votre département informatique décentralisé. Vous n'avez qu'un seul interlocuteur de confiance pour la fourniture de matériel, le déploiement du réseau, la sécurité logicielle et la maintenance au quotidien.",
    features: ["Infogérance et support technique (Helpdesk)", "Câblage structuré et aménagement de salles serveurs", "Fourniture de matériel informatique professionnel", "Déploiement de vidéosurveillance et contrôle d'accès"],
    Icon: Globe2,
    approachTitle: "Un accompagnement à 360°",
    ctaTitle: "Besoin de déléguer votre gestion IT ?",
    ctaText: "Concentrez-vous sur votre cœur de métier. Confiez-nous les clés de votre informatique, de la maintenance matérielle au support utilisateur."
  }
}

export default async function ExpertiseDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const data = expertisesData[params.slug];

  if (!data) {
    notFound();
  }

  const { Icon } = data;

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        
        {/* Hero Section */}
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <Container className="relative z-10">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-accent transition-colors mb-10">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'accueil
            </Link>
            
            <div className="max-w-4xl flex items-center gap-8">
              <div className="hidden md:flex w-24 h-24 bg-white/5 border border-white/10 rounded-2xl items-center justify-center shrink-0 shadow-[0_0_30px_rgba(0,212,255,0.1)]">
                <Icon className="w-12 h-12 text-accent" />
              </div>
              <div>
                <TextReveal>
                  <Heading level={1} className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.1]">
                    {data.title}
                  </Heading>
                </TextReveal>
                <FadeUp delay={0.2}>
                  <Text className="text-slate-400 text-xl font-light max-w-2xl leading-relaxed">
                    {data.subtitle}
                  </Text>
                </FadeUp>
              </div>
            </div>
          </Container>
        </Section>
        
        {/* Content Section */}
        <Section className="py-24 bg-white">
          <Container>
            <div className="grid lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-7 space-y-8">
                <FadeUp delay={0.1}>
                  <Heading level={2} className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                    {data.approachTitle}
                  </Heading>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    {data.desc1}
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {data.desc2}
                  </p>
                </FadeUp>
                
                <FadeUp delay={0.2} className="pt-8">
                  <div className="bg-slate-50 border border-slate-200 p-8 rounded-sm">
                    <Heading level={3} className="text-xl font-bold text-slate-900 mb-6">Ce que nous mettons en œuvre :</Heading>
                    <ul className="space-y-4">
                      {data.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mr-4" />
                          <span className="text-slate-700 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              </div>
              
              <div className="lg:col-span-5">
                <FadeUp delay={0.2} className="sticky top-32">
                  <div className="bg-[#020617] p-10 rounded-sm border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>
                    <Heading level={3} className="text-2xl font-bold text-white mb-6">{data.ctaTitle}</Heading>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                      {data.ctaText}
                    </p>
                    
                    <Link href="/contact" className="flex items-center justify-center w-full py-4 bg-accent text-[#020617] font-bold rounded-sm hover:bg-[#00B4D8] transition-colors shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                      Demander une consultation
                    </Link>
                  </div>
                </FadeUp>
              </div>
              
            </div>
          </Container>
        </Section>
        
        <CTA />
      </main>
      <Footer />
    </>
  )
}
