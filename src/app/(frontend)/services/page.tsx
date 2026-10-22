import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import Link from 'next/link'
import { 
  ArrowRight, 
  Shield, 
  Network, 
  Phone, 
  Video, 
  Wrench, 
  Key, 
  Smartphone, 
  Database, 
  BarChart3, 
  GraduationCap, 
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { FadeUp, TextReveal } from '@/components/animations'
import { QuoteRequestButton } from '@/components/QuoteRequestButton'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Catalogue des Services & Expertises | NOB TECHNOLOGIES',
  description: 'Découvrez les services informatiques de NOB TECHNOLOGIES : cybersécurité (Sophos, Fortinet), câblage réseau, conception et intégration ERP (sur-mesure, Odoo, Dolibarr), développement web/mobile, licences Office 365 et infogérance.',
}

export interface ServiceDefinition {
  slug: string;
  title: string;
  category: string;
  description: string;
  icon: any;
  features: string[];
  partners?: string[];
  badge?: string;
}

export const OFFICIAL_SERVICES: ServiceDefinition[] = [
  {
    slug: 'cybersecurite',
    title: 'Cybersécurité, Protection des Données & Firewalls',
    category: 'Sécurité & Sauvegardes',
    description: 'Protection intégrale de votre système d’information : pare-feu de nouvelle génération (Sophos, Fortinet), plans de sauvegarde cloud hybride (Acronis), gestion des accès à privilèges (Wallix) et audit des vulnérabilités.',
    icon: Shield,
    features: ['Pare-feux Sophos XGS & Fortinet NGFW', 'Sauvegardes anti-ransomware Acronis', 'Protection des accès à privilèges (PAM/IAM)', 'VPN d’entreprise sécurisé multi-sites'],
    partners: ['Sophos', 'Fortinet', 'Acronis', 'Wallix', 'Kaspersky'],
  },
  {
    slug: 'reseaux-telecoms',
    title: 'Câblage Structuré, Fibre Optique & Réseaux',
    category: 'Infrastructures Physiques',
    description: 'Conception et déploiement d’infrastructures réseau d’entreprise : baies de brassage 42U, câblage certifié Cat 6A/7, liaisons fibre optique inter-bâtiments et bornes Wi-Fi professionnelles haute densité.',
    icon: Network,
    features: ['Pose et peignage de baies de brassage', 'Câblage structuré cuivre & Fibre Optique', 'Réseaux Wi-Fi maillés haute densité', 'Certification de liens et réflectométrie'],
    partners: ['Cisco', 'HP Enterprise', 'Ubiquiti'],
  },
  {
    slug: 'telephone-ip',
    title: 'Téléphonie IP d’Entreprise (VoIP) & PABX',
    category: 'Télécommunications',
    description: 'Modernisation de votre téléphonie fixe vers la VoIP : serveurs de communication IPBX Yeastar Série P, postes téléphoniques Cisco et visioconférence collaborative d’entreprise.',
    icon: Phone,
    features: ['Standards téléphoniques IPBX / VoIP', 'Postes IP filaires et sans-fil DECT', 'Serveur vocal interactif (SVI)', 'Communications unifiées voix / vidéo'],
    partners: ['Yeastar', 'Cisco'],
  },
  {
    slug: 'videosurveillance',
    title: 'Vidéosurveillance IP & Contrôle d’Accès',
    category: 'Sécurité Physique des Locaux',
    description: 'Sécurisation de vos bâtiments et entrepôts : caméras de vidéosurveillance haute définition avec vision nocturne et IA, enregistreurs NVR en réseau et contrôle d’accès biométrique.',
    icon: Video,
    features: ['Caméras IP haute résolution jour/nuit', 'Enregistrement NVR sécurisé et RAID', 'Contrôle d’accès par badge ou biométrie', 'Visualisation à distance sur smartphone'],
  },
  {
    slug: 'infogerance',
    title: 'Infogérance, Maintenance & Support 24/7',
    category: 'Services Managés',
    description: 'Prise en charge complète ou partielle de votre parc informatique : maintenance préventive, supervision réseau proactive (UBIKA PAESSLER / PRTG) et assistance technique rapide.',
    icon: Wrench,
    features: ['Supervision réseau proactive 24/7', 'Maintenance préventive des serveurs et PC', 'Assistance utilisateurs et télémaintenance', 'Gestion des sauvegardes et mises à jour'],
    partners: ['UBIKA PAESSLER', 'PRTG'],
  },
  {
    slug: 'vente-materiels-licences',
    title: 'Vente de Licences Office 365 (ESD & CSP) & Matériels IT',
    category: 'Licences & Équipements',
    description: 'Fourniture de licences logicielles d’origine Microsoft 365 (versions ESD et CSP) et vente de matériels informatiques certifiés : ordinateurs professionnels, serveurs Dell, onduleurs et périphériques.',
    icon: Key,
    features: ['Licences Microsoft 365 Business & Enterprise', 'Abonnements CSP mensuels / annuels', 'Serveurs rackables Dell Technologies', 'Postes de travail PC et accessoires réseau'],
    partners: ['Microsoft', 'Dell Technologies', 'Lenovo'],
  },
  {
    slug: 'developpement-web-mobile',
    title: 'Développement d’Applications Web & Mobiles',
    category: 'Génie Logiciel',
    description: 'Conception et développement sur-mesure de portails web d’entreprise, de plateformes de services connectées et d’applications mobiles iOS & Android intuitives, sécurisées et scalables.',
    icon: Smartphone,
    features: ['Portails web et extranets d’entreprise', 'Applications mobiles natives et hybrides', 'Architecture API sécurisée et bases de données', 'Design ergonomique centré utilisateur (UI/UX)'],
    partners: ['Next.js', 'React', 'Flutter', 'PostgreSQL'],
  },
  {
    slug: 'erp-gestion',
    title: 'Conception & Intégration d’ERP (Sur-Mesure, Odoo, Dolibarr)',
    category: 'Systèmes de Gestion & Digitalisation',
    description: 'Conception d’ERP sur-mesure développés selon vos processus métiers uniques, et intégration experte de progiciels open-source (Odoo, Dolibarr) : gestion commerciale, devis, stocks, facturation, RH et comptabilité.',
    icon: Database,
    features: ['Conception et développement d’ERP sur-mesure', 'Intégration & paramétrage Odoo et Dolibarr', 'Gestion commerciale, stocks, facturation et CRM', 'Connecteurs API, synchronisation et formation'],
    partners: ['Sur-Mesure', 'Odoo', 'Dolibarr'],
  },
  {
    slug: 'marketing-digital',
    title: 'Marketing Digital & Visibilité en Ligne',
    category: 'Croissance Digitale',
    description: 'Stratégie de présence numérique et acquisition : référencement naturel sur Google (SEO), gestion de campagnes publicitaires ciblées, production de contenus corporate et valorisation de votre marque.',
    icon: BarChart3,
    features: ['Optimisation du référencement naturel (SEO)', 'Campagnes d’acquisition Google Ads & Réseaux', 'Stratégie de communication digitale d’entreprise', 'Création de supports graphiques et digitaux'],
  },
  {
    slug: 'formations-ia',
    title: 'Formations, IA & Préparation aux Certifications',
    category: 'Transmission du Savoir',
    description: 'Programmes de montée en compétences : préparation intensive aux certifications internationales (Cisco, Fortinet, Sophos), sensibilisation à la cybersécurité et intégration de l’automatisation et de l’IA.',
    icon: GraduationCap,
    features: ['Préparation aux examens de certification IT', 'Sensibilisation anti-phishing des collaborateurs', 'Formations à l’automatisation des tâches', 'Initiation à l’Intelligence Artificielle en entreprise'],
  },
];

export default async function ServicesPage() {
  let cmsServices: any[] = [];
  try {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: 'services',
      where: { status: { equals: 'published' } },
    });
    cmsServices = res?.docs || [];
  } catch (err) {
    // Fallback if db is unseeded
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Silicon Valley Hero */}
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <TextReveal>
                <h1 className="text-white mb-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
                  Nos Expertises :{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#00F0FF] to-[#10E760]">
                    L&apos;Ingénierie IT de Haute Précision
                  </span>
                </h1>
              </TextReveal>
              <FadeUp delay={0.2}>
                <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
                  Cybersécurité de périmètre, câblage structuré, ERP sur-mesure et infogérance 24/7 : des solutions robustes conçues pour sécuriser et accélérer votre activité.
                </p>
              </FadeUp>
            </div>
          </Container>
        </Section>
        
        {/* Services Grid with Silicon Valley UI */}
        <Section className="py-16 md:py-24 bg-slate-50 dark:bg-[#020617]">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {OFFICIAL_SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <FadeUp key={service.slug} delay={index * 0.05}>
                    <div className="group h-full bg-white dark:bg-[#0b1329] rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-400/80 dark:hover:bg-[#0f1d3d] p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-5">
                          <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-100 dark:border-cyan-800/80 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                            <Icon className="w-6 h-6" />
                          </div>

                          <div className="flex items-center gap-1.5">
                            {(service as any).createdAt && (Date.now() - new Date((service as any).createdAt).getTime() <= 7 * 24 * 60 * 60 * 1000) && (
                              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                                NOUVEAU
                              </span>
                            )}
                            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                              {service.category}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                          {service.title}
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                          {service.description}
                        </p>

                        {/* Feature bullets */}
                        <div className="space-y-2 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                          {service.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Partners / Tech stack tags & Actions */}
                      <div>
                        {service.partners && (
                          <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                            {service.partners.map((p, i) => (
                              <span key={i} className="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded">
                                {p}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <QuoteRequestButton
                            service={service.title}
                            className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors cursor-pointer"
                          >
                            <span>Demander un devis</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </QuoteRequestButton>

                          <Link
                            href={`/services/${service.slug}`}
                            className="text-xs font-medium text-slate-400 hover:text-slate-700 dark:hover:text-cyan-400 transition-colors underline"
                          >
                            Détails &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </Container>
        </Section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
