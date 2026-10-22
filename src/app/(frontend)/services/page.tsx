import { getPayloadClient } from '@/lib/payload'
import { Container, Section } from '@/components/ui/layout'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CTA } from '@/components/cta'
import { 
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
} from 'lucide-react'
import { FadeUp, TextReveal } from '@/components/animations'
import { ServicesCatalogView, SerializedServiceItem } from '@/components/services/ServicesCatalogView'

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

const SERIALIZED_SERVICES: SerializedServiceItem[] = [
  {
    slug: 'cybersecurite',
    title: 'Cybersécurité, Protection des Données & Firewalls',
    category: 'Sécurité & Sauvegardes',
    group: 'securite-reseaux',
    description: 'Protection intégrale de votre système d’information : pare-feu de nouvelle génération (Sophos, Fortinet), plans de sauvegarde cloud hybride (Acronis), gestion des accès à privilèges (Wallix) et audit des vulnérabilités.',
    iconName: 'shield',
    features: ['Pare-feux Sophos XGS & Fortinet NGFW', 'Sauvegardes anti-ransomware Acronis', 'Protection des accès à privilèges (PAM/IAM)', 'VPN d’entreprise sécurisé multi-sites'],
    partners: ['Sophos', 'Fortinet', 'Acronis', 'Wallix', 'Kaspersky'],
  },
  {
    slug: 'reseaux-telecoms',
    title: 'Câblage Structuré, Fibre Optique & Réseaux',
    category: 'Infrastructures Physiques',
    group: 'securite-reseaux',
    description: 'Conception et déploiement d’infrastructures réseau d’entreprise : baies de brassage 42U, câblage certifié Cat 6A/7, liaisons fibre optique inter-bâtiments et bornes Wi-Fi professionnelles haute densité.',
    iconName: 'network',
    features: ['Pose et peignage de baies de brassage', 'Câblage structuré cuivre & Fibre Optique', 'Réseaux Wi-Fi maillés haute densité', 'Certification de liens et réflectométrie'],
    partners: ['Cisco', 'HP Enterprise', 'Ubiquiti'],
  },
  {
    slug: 'telephone-ip',
    title: 'Téléphonie IP d’Entreprise (VoIP) & PABX',
    category: 'Télécommunications',
    group: 'telecoms-support',
    description: 'Modernisation de votre téléphonie fixe vers la VoIP : serveurs de communication IPBX Yeastar Série P, postes téléphoniques Cisco et visioconférence collaborative d’entreprise.',
    iconName: 'phone',
    features: ['Standards téléphoniques IPBX / VoIP', 'Postes IP filaires et sans-fil DECT', 'Serveur vocal interactif (SVI)', 'Communications unifiées voix / vidéo'],
    partners: ['Yeastar', 'Cisco'],
  },
  {
    slug: 'videosurveillance',
    title: 'Vidéosurveillance IP & Contrôle d’Accès',
    category: 'Sécurité Physique des Locaux',
    group: 'securite-reseaux',
    description: 'Sécurisation de vos bâtiments et entrepôts : caméras de vidéosurveillance haute définition avec vision nocturne et IA, enregistreurs NVR en réseau et contrôle d’accès biométrique.',
    iconName: 'video',
    features: ['Caméras IP haute résolution jour/nuit', 'Enregistrement NVR sécurisé et RAID', 'Contrôle d’accès par badge ou biométrie', 'Visualisation à distance sur smartphone'],
  },
  {
    slug: 'infogerance',
    title: 'Infogérance, Maintenance & Support 24/7',
    category: 'Services Managés',
    group: 'telecoms-support',
    description: 'Prise en charge complète ou partielle de votre parc informatique : maintenance préventive, supervision réseau proactive (UBIKA PAESSLER / PRTG) et assistance technique rapide.',
    iconName: 'wrench',
    features: ['Supervision réseau proactive 24/7', 'Maintenance préventive des serveurs et PC', 'Assistance utilisateurs et télémaintenance', 'Gestion des sauvegardes et mises à jour'],
    partners: ['UBIKA PAESSLER', 'PRTG'],
  },
  {
    slug: 'vente-materiels-licences',
    title: 'Vente de Licences Office 365 (ESD & CSP) & Matériels IT',
    category: 'Licences & Équipements',
    group: 'telecoms-support',
    description: 'Fourniture de licences logicielles d’origine Microsoft 365 (versions ESD et CSP) et vente de matériels informatiques certifiés : ordinateurs professionnels, serveurs Dell, onduleurs et périphériques.',
    iconName: 'key',
    features: ['Licences Microsoft 365 Business & Enterprise', 'Abonnements CSP mensuels / annuels', 'Serveurs rackables Dell Technologies', 'Postes de travail PC et accessoires réseau'],
    partners: ['Microsoft', 'Dell Technologies', 'Lenovo'],
  },
  {
    slug: 'developpement-web-mobile',
    title: 'Développement d’Applications Web & Mobiles',
    category: 'Génie Logiciel',
    group: 'erp-logiciel',
    description: 'Conception et développement sur-mesure de portails web d’entreprise, de plateformes de services connectées et d’applications mobiles iOS & Android intuitives, sécurisées et scalables.',
    iconName: 'smartphone',
    features: ['Portails web et extranets d’entreprise', 'Applications mobiles natives et hybrides', 'Architecture API sécurisée et bases de données', 'Design ergonomique centré utilisateur (UI/UX)'],
    partners: ['Next.js', 'React', 'Flutter', 'PostgreSQL'],
  },
  {
    slug: 'erp-gestion',
    title: 'Conception & Intégration d’ERP (Sur-Mesure, Odoo, Dolibarr)',
    category: 'Systèmes de Gestion & Digitalisation',
    group: 'erp-logiciel',
    description: 'Conception d’ERP sur-mesure développés selon vos processus métiers uniques, et intégration experte de progiciels open-source (Odoo, Dolibarr) : gestion commerciale, devis, stocks, facturation, RH et comptabilité.',
    iconName: 'database',
    features: ['Conception et développement d’ERP sur-mesure', 'Intégration & paramétrage Odoo et Dolibarr', 'Gestion commerciale, stocks, facturation et CRM', 'Connecteurs API, synchronisation et formation'],
    partners: ['Sur-Mesure', 'Odoo', 'Dolibarr'],
  },
  {
    slug: 'marketing-digital',
    title: 'Marketing Digital & Visibilité en Ligne',
    category: 'Croissance Digitale',
    group: 'erp-logiciel',
    description: 'Stratégie de présence numérique et acquisition : référencement naturel sur Google (SEO), gestion de campagnes publicitaires ciblées, production de contenus corporate et valorisation de votre marque.',
    iconName: 'barchart',
    features: ['Optimisation du référencement naturel (SEO)', 'Campagnes d’acquisition Google Ads & Réseaux', 'Stratégie de communication digitale d’entreprise', 'Création de supports graphiques et digitaux'],
  },
  {
    slug: 'formations-ia',
    title: 'Formations, IA & Préparation aux Certifications',
    category: 'Transmission du Savoir',
    group: 'formations',
    description: 'Programmes de montée en compétences : préparation intensive aux certifications internationales (Cisco, Fortinet, Sophos), sensibilisation à la cybersécurité et intégration de l’automatisation et de l’IA.',
    iconName: 'graduation',
    features: ['Préparation aux examens de certification IT', 'Sensibilisation anti-phishing des collaborateurs', 'Formations à l’automatisation des tâches', 'Initiation à l’Intelligence Artificielle en entreprise'],
  },
];

export default async function ServicesPage() {
  try {
    const payload = await getPayloadClient();
    await payload.find({
      collection: 'services',
      where: { status: { equals: 'published' } },
    });
  } catch {
    // Fallback if db is unseeded
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero */}
        <Section data-cursor-binary="true" className="bg-[#020617] text-white pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 lg:pt-44 lg:pb-24 relative overflow-hidden">
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
                <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed text-pretty">
                  Cybersécurité de périmètre, câblage structuré, ERP sur-mesure et infogérance 24/7 : des solutions robustes conçues pour sécuriser et accélérer votre activité.
                </p>
              </FadeUp>
            </div>
          </Container>
        </Section>
        
        {/* Interactive Services Catalog (Filterable + Grid/List Display Mode) */}
        <Section className="py-12 md:py-20 bg-slate-50 dark:bg-[#020617]">
          <Container>
            <ServicesCatalogView services={SERIALIZED_SERVICES} />
          </Container>
        </Section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
