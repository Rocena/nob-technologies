import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { Building2, Store, Users, Factory, Globe, Shield, Activity, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { FadeUp, TextReveal, MagneticElement } from '@/components/animations'

export const metadata = {
  title: 'Secteurs d\'intervention | NOB TECHNOLOGIES',
  description: 'Des solutions informatiques et réseaux haute performance conçues pour les PME, PMI, grandes entreprises et particuliers.',
}

export default function SectorsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        
        {/* Premium Tech Hero */}
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
          {/* Subtle Grid and Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

              <TextReveal>
                <Heading level={1} className="text-white mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1]">
                  Des écosystèmes architecturés pour chaque échelle.
                </Heading>
              </TextReveal>
              <FadeUp delay={0.2}>
                <Text className="text-slate-400 text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
                  Que vous opériez dans l'industrie lourde, le commerce de détail ou à grande échelle, nous concevons des infrastructures IT qui répondent exactement aux contraintes physiques et virtuelles de votre secteur.
                </Text>
              </FadeUp>
            </div>
          </Container>
        </Section>
        
        {/* The Strategy */}
        <Section className="py-12 md:py-16 lg:py-24 bg-white dark:bg-[#020617] border-b border-slate-100 dark:border-slate-800">
          <Container>
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <FadeUp>
                <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold text-[#0284C7] dark:text-sky-400">
                  APPROCHE MÉTIER &bull; AUDIT SUR-MESURE
                </p>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-8">
                  La technologie n'est pas générique.
                </h2>
                <div className="w-16 h-1.5 bg-[#0284C7] rounded-full mb-8 mx-auto"></div>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  Chaque secteur d'activité possède son propre rythme, ses propres menaces et ses propres normes. Chez NOB TECHNOLOGIES, nous n'appliquons pas de solutions toutes faites. Nous réalisons un audit précis de vos processus métiers pour concevoir, déployer et infogérer des solutions réseaux, télécoms et logicielles parfaitement alignées avec vos ambitions stratégiques.
                </p>
              </FadeUp>
            </div>
          </Container>
        </Section>

        {/* Sectors Grid */}
        <Section className="py-12 md:py-16 lg:py-24 bg-slate-50 dark:bg-[#070d1f] relative">
          <Container>
            <div className="grid lg:grid-cols-2 gap-10">
              
              {/* Card 1 */}
              <FadeUp delay={0.1}>
                <div className="group h-full bg-white dark:bg-[#0b1329] p-6 md:p-10 lg:p-14 rounded-sm border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <Building2 className="w-32 h-32" />
                  </div>
                  <MagneticElement className="inline-block mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <Building2 className="w-8 h-8 text-slate-900 dark:text-cyan-400 relative z-10 group-hover:text-cyan-400 transition-colors duration-500" />
                    </div>
                  </MagneticElement>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">PME & ETI</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 flex-1">
                    Les moyennes et grandes entreprises nécessitent une infrastructure capable d'absorber une croissance rapide. Nous concevons des réseaux locaux haut débit, déployons des ERP pour unifier la gestion de vos départements, et mettons en place des politiques de cybersécurité (Firewalls, VPN) pour protéger votre capital data.
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
                    <Link href="/secteurs/pme-eti" className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-white hover:text-slate-900 font-semibold text-xs sm:text-sm transition-all shadow-2xs">
                      <span>Découvrir nos solutions PME</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 text-slate-500 dark:text-slate-400" />
                    </Link>
                  </div>
                </div>
              </FadeUp>

              {/* Card 2 */}
              <FadeUp delay={0.2}>
                <div className="group h-full bg-white dark:bg-[#0b1329] p-6 md:p-10 lg:p-14 rounded-sm border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <Factory className="w-32 h-32" />
                  </div>
                  <MagneticElement className="inline-block mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <Factory className="w-8 h-8 text-slate-900 dark:text-cyan-400 relative z-10 group-hover:text-cyan-400 transition-colors duration-500" />
                    </div>
                  </MagneticElement>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">PMI & Industrie</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 flex-1">
                    Les environnements industriels imposent des contraintes physiques et thermiques extrêmes. Nous réalisons des câblages structurés durcis, interconnectons vos sites de production via fibre optique et protégeons vos lignes de contrôle industriel contre les attaques externes.
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
                    <Link href="/secteurs/pmi-industrie" className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-white hover:text-slate-900 font-semibold text-xs sm:text-sm transition-all shadow-2xs">
                      <span>Découvrir nos solutions Industrie</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 text-slate-500 dark:text-slate-400" />
                    </Link>
                  </div>
                </div>
              </FadeUp>
              
              {/* Card 3 */}
              <FadeUp delay={0.3}>
                <div className="group h-full bg-white dark:bg-[#0b1329] p-6 md:p-10 lg:p-14 rounded-sm border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <Store className="w-32 h-32" />
                  </div>
                  <MagneticElement className="inline-block mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <Store className="w-8 h-8 text-slate-900 dark:text-cyan-400 relative z-10 group-hover:text-cyan-400 transition-colors duration-500" />
                    </div>
                  </MagneticElement>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Commerces & Institutions</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 flex-1">
                    Pour garantir l'accueil de votre public en toute sécurité, nous installons des systèmes de vidéosurveillance haute définition, configurons des réseaux Wi-Fi sécurisés pour les visiteurs et vos équipes, et déployons des solutions avancées de contrôle d'accès.
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
                    <Link href="/secteurs/commerces-institutions" className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-white hover:text-slate-900 font-semibold text-xs sm:text-sm transition-all shadow-2xs">
                      <span>Découvrir nos solutions Commerce</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 text-slate-500 dark:text-slate-400" />
                    </Link>
                  </div>
                </div>
              </FadeUp>

              {/* Card 4 */}
              <FadeUp delay={0.4}>
                <div className="group h-full bg-white dark:bg-[#0b1329] p-6 md:p-10 lg:p-14 rounded-sm border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <Users className="w-32 h-32" />
                  </div>
                  <MagneticElement className="inline-block mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                      <Users className="w-8 h-8 text-slate-900 dark:text-cyan-400 relative z-10 group-hover:text-cyan-400 transition-colors duration-500" />
                    </div>
                  </MagneticElement>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">Particuliers & Startups</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 flex-1">
                    Parce que la sécurité et la connectivité ne sont pas réservées aux grands groupes. Nous accompagnons les résidences privées et les jeunes entreprises avec des installations réseau fiables, de la vidéosurveillance accessible depuis smartphone et la création de sites web professionnels.
                  </p>
                  
                  <div className="mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
                    <Link href="/secteurs/particuliers-startups" className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-800 dark:text-white hover:text-slate-900 font-semibold text-xs sm:text-sm transition-all shadow-2xs">
                      <span>Découvrir nos solutions Startups</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 text-slate-500 dark:text-slate-400" />
                    </Link>
                  </div>
                </div>
              </FadeUp>

            </div>
          </Container>
        </Section>
        
        <CTA />
      </main>
      <Footer />
    </>
  )
}
