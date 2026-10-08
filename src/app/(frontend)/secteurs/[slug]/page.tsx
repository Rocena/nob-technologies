import { notFound } from 'next/navigation'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { FadeUp, TextReveal } from '@/components/animations'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const sectorsData: Record<string, { title: string, subtitle: string, desc1: string, desc2: string, features: string[], benefits: string[] }> = {
  'pme-eti': {
    title: 'Solutions IT pour PME & ETI',
    subtitle: 'Une infrastructure scalable pour soutenir votre croissance.',
    desc1: "Dans le contexte compétitif actuel, les PME et ETI ont besoin d'une infrastructure technologique robuste qui ne les ralentit pas, mais qui propulse leur croissance. Chez NOB TECHNOLOGIES, nous concevons des réseaux sécurisés et des systèmes d'information intégrés (ERP, CRM) spécialement taillés pour la dynamique des moyennes entreprises.",
    desc2: "Nous unifions la voix, la donnée et la vidéo grâce à nos solutions de communications unifiées. Nos ingénieurs consolident vos serveurs, virtualisent vos environnements et mettent en place des VPN sécurisés pour garantir le travail collaboratif à distance, sans faille de sécurité.",
    features: ["Virtualisation de serveurs (VMware, Hyper-V)", "Déploiement de réseaux LAN/WAN haut débit", "Firewalls de nouvelle génération (NGFW)", "Solutions de Communications Unifiées VoIP"],
    benefits: ["Réduction des coûts d'infrastructure", "Productivité accrue des équipes", "Sécurité des données critiques renforcée", "Scalabilité immédiate en cas de croissance"]
  },
  'pmi-industrie': {
    title: 'Solutions IT pour PMI & Industrie',
    subtitle: 'La robustesse et la disponibilité au cœur de la production.',
    desc1: "Le secteur industriel (PMI, usines, logistique) impose des contraintes physiques extrêmes et une tolérance zéro face aux pannes. Nos solutions de câblage industriel et de connectivité sont conçues pour résister aux interférences électromagnétiques, à la poussière et aux températures extrêmes.",
    desc2: "Au-delà du réseau, nous sécurisons vos chaînes de production. Grâce à la vidéosurveillance IP avancée et au contrôle d'accès biométrique, vous gardez une maîtrise totale sur vos sites. Nous sécurisons également vos réseaux OT (Operational Technology) contre les cyberattaques visant le monde industriel.",
    features: ["Câblage structuré durci et Fibre Optique industrielle", "Vidéosurveillance IP avec analyse intelligente", "Contrôle d'accès biométrique et gestion des temps", "Sécurisation des réseaux industriels (SCADA/ICS)"],
    benefits: ["Continuité de service maximale (99.99%)", "Surveillance en temps réel des lignes de production", "Protection contre l'espionnage industriel", "Conformité aux normes de sécurité internationales"]
  },
  'commerces-institutions': {
    title: 'Solutions IT pour Commerces & Institutions',
    subtitle: 'Connecter les citoyens et sécuriser les transactions.',
    desc1: "Les commerces de détail, les banques et les institutions publiques gèrent un flux massif de visiteurs et de données sensibles. NOB TECHNOLOGIES déploie des solutions d'infogérance 24/7 et des plateformes transactionnelles sécurisées (portails e-commerce B2B/B2C, plateformes bancaires conformes PCI-DSS et passerelles de paiement sécurisées avec haute disponibilité 99.99%) pour garantir la continuité et la résilience totale de vos services critiques.",
    desc2: "Nous développons des applications web et mobiles sur-mesure pour moderniser l'expérience de vos utilisateurs. De plus, nos systèmes de vidéosurveillance périmétrique et nos réseaux Wi-Fi sécurisés pour les visiteurs transforment vos espaces physiques en environnements sûrs et connectés.",
    features: ["Développement de plateformes web sécurisées", "Réseaux Wi-Fi haute densité (Guest & Corporate)", "Infogérance et Monitoring proactif 24/7", "Sécurité périmétrique et protection des données (RGPD/CDP)"],
    benefits: ["Expérience utilisateur fluide et moderne", "Disponibilité continue de vos services publics/privés", "Confidentialité totale des données utilisateurs", "Réactivité immédiate en cas d'incident technique"]
  },
  'particuliers-startups': {
    title: 'Solutions IT pour Particuliers & Startups',
    subtitle: 'L\'agilité et la performance pour donner vie à vos idées.',
    desc1: "Les startups et les particuliers exigeants n'ont pas de temps à perdre avec une informatique défaillante. Vous avez besoin d'une approche « Plug & Play », légère mais extrêmement performante. Nous vous fournissons du matériel informatique de pointe et configurons vos espaces de travail (Smart Home & Smart Office).",
    desc2: "Que ce soit pour installer un réseau Wi-Fi Mesh sans zone d'ombre à votre domicile, configurer votre premier serveur cloud pour votre startup, ou vous conseiller sur vos achats technologiques, notre équipe agit comme votre CTO personnel. Nous nous occupons de la technique, vous vous concentrez sur l'innovation.",
    features: ["Fourniture et configuration de matériel (PC, Mac, Serveurs)", "Réseaux sans fil intelligents (Wi-Fi Mesh)", "Audit technologique et CTO as a Service", "Solutions Cloud légères et sauvegarde de données"],
    benefits: ["Démarrage de projet rapide et sans friction", "Réseau domestique/bureau ultra-rapide et stable", "Choix matériels optimisés pour votre budget", "Tranquillité d'esprit grâce à la maintenance préventive"]
  }
}

export default async function SectorDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const data = sectorsData[params.slug];

  if (!data) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        
        {/* Hero Section */}
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-32 pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
          
          <Container className="relative z-10">
            <Link href="/secteurs" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-accent transition-colors mb-10">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux secteurs
            </Link>
            
            <div className="max-w-4xl">
              <TextReveal>
                <Heading level={1} className="text-white mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.1]">
                  {data.title}
                </Heading>
              </TextReveal>
              <FadeUp delay={0.2}>
                <Text className="text-accent text-xl md:text-2xl font-medium max-w-3xl leading-relaxed">
                  {data.subtitle}
                </Text>
              </FadeUp>
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
                    L'approche NOB TECHNOLOGIES
                  </Heading>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {data.desc1}
                  </p>
                </FadeUp>
                <FadeUp delay={0.2}>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {data.desc2}
                  </p>
                </FadeUp>
                
                <FadeUp delay={0.3} className="pt-8">
                  <div className="bg-slate-50 border border-slate-200 p-8 rounded-sm">
                    <Heading level={3} className="text-xl font-bold text-slate-900 mb-6">Bénéfices clés</Heading>
                    <ul className="space-y-4">
                      {data.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mr-4" />
                          <span className="text-slate-700 font-medium">{benefit}</span>
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
                    <Heading level={3} className="text-2xl font-bold text-white mb-8">Solutions déployées</Heading>
                    
                    <ul className="space-y-6">
                      {data.features.map((feature, i) => (
                        <li key={i} className="flex items-start border-b border-white/10 pb-6 last:border-0 last:pb-0">
                          <div className="w-2 h-2 mt-2 rounded-sm bg-accent shrink-0 mr-4"></div>
                          <span className="text-slate-300 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-10 pt-10 border-t border-white/10">
                      <p className="text-sm text-slate-400 mb-6">Un projet dans ce secteur ? Discutons de vos besoins spécifiques.</p>
                      <Link href="/contact" className="flex items-center justify-center w-full py-4 bg-white text-[#020617] font-bold rounded-sm hover:bg-slate-200 transition-colors">
                        Démarrer une consultation
                      </Link>
                    </div>
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
