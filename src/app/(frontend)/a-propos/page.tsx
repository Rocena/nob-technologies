import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { Shield, Network, Zap, Target, Cpu, Globe, CheckCircle2, Award, ShieldCheck, Briefcase, Clock } from 'lucide-react'
import { Clients } from '@/components/clients'
import { FadeUp, TextReveal, MagneticElement } from '@/components/animations'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { FounderBioSection } from '@/components/FounderBioSection'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'À propos | NOB TECHNOLOGIES',
  description: 'NOB TECHNOLOGIES, société informatique spécialisée en réseaux, cybersécurité et développement logiciel pour les entreprises et particuliers.',
}

export default async function AboutPage() {
  let clientsDocs: any[] = [];
  try {
    const payload = await getPayloadClient();
    const clientsRes = await payload.find({ collection: 'clients' });
    clientsDocs = clientsRes?.docs || [];
  } catch (err) {
    // Fallback if db is unseeded
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">

        {/* Hero */}
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-14 sm:pt-36 sm:pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <TextReveal>
                <h1 className="text-white mb-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
                  L&apos;Ingénierie Robuste :{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                    Des Fondations Digitales Pérennes
                  </span>
                </h1>
              </TextReveal>
              
              <FadeUp delay={0.2}>
                <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-3xl leading-relaxed">
                  <strong className="text-white font-bold">NOBTECH</strong> est une société d&apos;ingénierie informatique basée à Dakar, créée en 2020. Forte de 6 ans d&apos;expérience d&apos;entreprise et portée par plus de 15 ans d&apos;expertise métier de son fondateur, nous concevons, sécurisons et infogérons les écosystèmes informatiques des entreprises, institutions et organisations au Sénégal et en Afrique de l&apos;Ouest.
                </p>
              </FadeUp>
            </div>
          </Container>
        </Section>

        {/* Animated Stats / Corporate Metrics - Open Architectural Row (No Cards) */}
        <Section className="py-14 md:py-20 bg-[#020617] border-y border-white/10 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-32 bg-[#00D4FF]/5 rounded-full blur-[100px] pointer-events-none" />

          <Container className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {[
                {
                  badge: "Garantie de Service",
                  value: 100,
                  suffix: "%",
                  label: "Satisfaction Client",
                  detail: "Qualité d'intervention & suivi rigoureux",
                  Icon: ShieldCheck,
                  iconColor: "text-emerald-400",
                },
                {
                  badge: "Expertise Senior",
                  value: 15,
                  suffix: "+ Ans",
                  label: "Expérience Fondateur",
                  detail: "Ingénierie, maintenance & systèmes",
                  Icon: Briefcase,
                  iconColor: "text-[#00D4FF]",
                },
                {
                  badge: "Optimisation Élite",
                  prefix: "< ",
                  value: 1.2,
                  decimals: 1,
                  suffix: "s",
                  label: "Performance Web",
                  detail: "Temps de chargement moyen sur mobile",
                  Icon: Zap,
                  iconColor: "text-amber-400",
                },
                {
                  badge: "Haute Disponibilité",
                  value: 24,
                  suffix: "/7",
                  label: "Disponibilité & Support",
                  detail: "Infogérance & réactivité continue",
                  Icon: Clock,
                  iconColor: "text-[#10E760]",
                },
              ].map((stat, i) => (
                <FadeUp key={stat.label} delay={i * 0.1}>
                  <div className={`flex flex-col text-left ${i > 0 ? "pt-8 sm:pt-0 sm:pl-6 lg:pl-8" : ""}`}>
                    {/* Badge Surtitre discret avec icône */}
                    <div className="flex items-center gap-2 mb-3">
                      <stat.Icon className={`w-4 h-4 ${stat.iconColor} shrink-0`} />
                      <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-400">
                        {stat.badge}
                      </span>
                    </div>

                    {/* Grand chiffre avec Dégradé Accent Signature */}
                    <div className="my-1">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] tracking-tight tabular-nums inline-block">
                        <AnimatedCounter
                          prefix={stat.prefix}
                          value={stat.value}
                          decimals={stat.decimals}
                          suffix={stat.suffix}
                          duration={2000}
                        />
                      </span>
                    </div>

                    {/* Titre Principal */}
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1 mb-1.5">
                      {stat.label}
                    </h3>

                    {/* Détail Explicatif Simple */}
                    <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-xs">
                      {stat.detail}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>

        {/* Founder Biography: Ozias B. Nzongo */}
        <FounderBioSection />

        {/* What we do */}
        <Section className="py-12 md:py-20 lg:py-32 bg-white relative overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <FadeUp>
                <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-extrabold flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-[#00D4FF] font-black select-none text-sm sm:text-base font-mono tracking-tighter inline-flex items-center">&gt;<span className="text-[#10E760] animate-pulse">_</span></span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                    NOTRE MISSION &bull; PÉRIMÈTRE D&apos;INTERVENTION
                  </span>
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-8">
                  Concrètement, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">qu'est-ce qu'on fait ?</span>
                </h2>
                <div className="w-24 h-1.5 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760] mx-auto mb-10"></div>
                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-light">
                  On intervient sur tout ce qui touche à l'informatique de votre structure :
                  connecter et sécuriser votre réseau, protéger vos données,
                  installer vos caméras de surveillance, mettre en place un logiciel de gestion,
                  créer votre site web ou former vos équipes. <strong className="font-semibold text-slate-900">Une seule adresse pour tous vos besoins IT.</strong>
                </p>
              </FadeUp>
            </div>
          </Container>
        </Section>

        {/* Pillars */}
        <Section className="py-12 md:py-16 lg:py-24 bg-slate-50 border-t border-slate-100">
          <Container>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              
              <div className="space-y-12">
                <FadeUp>
                  <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 font-extrabold flex items-center gap-2 flex-wrap">
                    <span className="text-[#00D4FF] font-black select-none text-sm sm:text-base font-mono tracking-tighter inline-flex items-center">&gt;<span className="text-[#10E760] animate-pulse">_</span></span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                      L&apos;Ingénierie à l&apos;état pur
                    </span>
                  </p>
                  <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
                    Nous construisons les fondations numériques des leaders de demain.
                  </h3>
                  <p className="text-base sm:text-lg text-slate-800 md:text-slate-700 font-medium sm:font-normal leading-relaxed mb-4">
                    Chez <strong className="text-slate-900 font-bold">NOBTECH</strong>, nous ne nous contentons pas de fournir des services IT. Nous architecturons des écosystèmes complets, résilients et évolutifs. Face à la complexité croissante des réseaux et à l&apos;évolution des cybermenaces, notre mission est de vous offrir un socle technologique infaillible.
                  </p>
                  <p className="text-sm sm:text-base text-slate-700 md:text-slate-600 leading-relaxed">
                    Nous croyons fermement qu&apos;une infrastructure technologique performante ne devrait pas être un luxe réservé aux multinationales. Notre but est de démocratiser l&apos;accès à une informatique de pointe, robuste et sécurisée pour l&apos;ensemble de nos clients.
                  </p>
                </FadeUp>
                
                <div className="space-y-8 p-5 sm:p-8 bg-[#020617] rounded-sm border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>
                  
                  <FadeUp delay={0.1}>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 group">
                      <MagneticElement>
                        <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent/50 transition-colors duration-500">
                          <Target className="w-6 h-6 text-accent" />
                        </div>
                      </MagneticElement>
                      <div>
                        <h4 className="text-2xl font-bold mb-3 text-white group-hover:text-accent transition-colors duration-300">Travail soigné et documenté</h4>
                        <p className="text-slate-400 leading-relaxed text-lg font-light">Chaque installation est propre et bien organisée. Vous savez exactement ce que vous avez et comment ça fonctionne.</p>
                      </div>
                    </div>
                  </FadeUp>
                  <FadeUp delay={0.2}>
                    <div className="flex gap-6 group">
                      <MagneticElement>
                        <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent/50 transition-colors duration-500">
                          <Globe className="w-6 h-6 text-accent" />
                        </div>
                      </MagneticElement>
                      <div>
                        <h4 className="text-2xl font-bold mb-3 text-white group-hover:text-accent transition-colors duration-300">Expertise reconnue</h4>
                        <p className="text-slate-400 leading-relaxed text-lg font-light">Notre expertise couvre tous les domaines critiques : réseaux, cybersécurité, VoIP, vidéosurveillance et développement logiciel.</p>
                      </div>
                    </div>
                  </FadeUp>
                  <FadeUp delay={0.3}>
                    <div className="flex gap-6 group">
                      <MagneticElement>
                        <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-accent/50 transition-colors duration-500">
                          <Award className="w-6 h-6 text-accent" />
                        </div>
                      </MagneticElement>
                      <div>
                        <h4 className="text-2xl font-bold mb-3 text-white group-hover:text-accent transition-colors duration-300">Équipe certifiée</h4>
                        <p className="text-slate-400 leading-relaxed text-lg font-light">Tous nos interlocuteurs sont certifiés dans leurs domaines respectifs pour garantir des prestations haut de gamme.</p>
                      </div>
                    </div>
                  </FadeUp>
                </div>
              </div>

              {/* Right panel */}
              <div className="relative lg:sticky lg:top-32 space-y-6">
                
                {/* Services list */}
                <FadeUp delay={0.2}>
                  <div className="rounded-sm border border-slate-200 bg-white p-5 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-cyan-600 font-bold text-xs tracking-widest uppercase mb-6">Nos Domaines d&apos;Expertise</div>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { cat: 'Réseau', items: ['Câblage structuré', 'Téléphonie IP (VoIP)', 'Virtualisation'] },
                        { cat: 'Sécurité', items: ['Sécurité des données', 'Firewall & VPN', 'Vidéosurveillance IP'] },
                        { cat: 'Logiciel', items: ['Développement web', 'ERP & gestion', 'Création de sites'] },
                      ].map((group) => (
                        <div key={group.cat} className="mb-2">
                          <div className="text-slate-500 text-[11px] font-mono tracking-widest uppercase mb-2">{group.cat}</div>
                          {group.items.map((item) => (
                            <div key={item} className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0">
                              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                              <span className="text-slate-700 text-sm font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </Container>
        </Section>

        {/* Partenaires Constructeurs & Références Clients */}
        <Clients clients={clientsDocs} />

        <CTA />
      </main>
      <Footer />
    </>
  )
}
