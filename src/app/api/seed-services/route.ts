import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

// Secret key to protect the seed endpoint
const SEED_SECRET = 'nob-seed-2024'

const services = [
  {
    title: 'Infogerance',
    slug: 'infogerance',
    description: "Notre service d'infogerance permet aux clients de s'affranchir des contraintes liees a l'informatique. Surveillance proactive 24/7, maintenance preventive et corrective, gestion des incidents en temps reel et support helpdesk. Vous beneficiez d'un interlocuteur unique et d'une infrastructure toujours operationnelle.",
    status: 'published',
    availability: 'available',
    problem: "Votre equipe perd un temps precieux a gerer les pannes et les mises a jour au lieu de se concentrer sur votre coeur de metier.",
    prestations: [
      { name: 'Surveillance et monitoring 24/7' },
      { name: 'Maintenance preventive et corrective' },
      { name: 'Gestion des incidents et tickets' },
      { name: 'Support utilisateurs (helpdesk)' },
      { name: 'Gestion des mises a jour et patchs de securite' },
      { name: 'Rapport mensuel de performance' },
    ],
  },
  {
    title: 'Cablage Reseau et Electrique',
    slug: 'cablage',
    description: "Conception et deploiement d'infrastructures de cablage structure conformes aux normes TIA-568-D et ISO/IEC 11801. Cablage cuivre cat. 6A et fibre optique pour vos reseaux LAN/WAN, cablage telephonique et electrique dans les bureaux, datacenters et environnements industriels.",
    status: 'published',
    availability: 'available',
    problem: "Un cablage non structure ou sous-dimensionne est la premiere cause de pannes reseau et de pertes de productivite en entreprise.",
    prestations: [
      { name: 'Cablage cuivre cat. 6A / cat. 7' },
      { name: 'Fibre optique monomode et multimode' },
      { name: 'Cablage telephonique (RJ11/RJ45)' },
      { name: 'Installation de baies de brassage (patch panels)' },
      { name: 'Etiquetage et documentation (TIA-606)' },
      { name: 'Tests et certification des liens' },
    ],
  },
  {
    title: 'Securite des Donnees',
    slug: 'securite-des-donnees',
    description: "Protection complete de vos donnees sensibles contre les fuites, ransomwares et intrusions. Strategies de cybersecurite conformes a la norme ISO/IEC 27001 : chiffrement AES-256, gestion des acces (IAM), politique de sauvegarde 3-2-1 et audits de vulnerabilite reguliers.",
    status: 'published',
    availability: 'available',
    problem: "Les cyberattaques coutent en moyenne des millions aux entreprises. Une seule faille non detectee peut compromettre l'ensemble de votre systeme d'information.",
    prestations: [
      { name: 'Audit de securite et tests de penetration' },
      { name: 'Chiffrement des donnees (AES-256)' },
      { name: 'Gestion des identites et acces (IAM)' },
      { name: 'Politique de sauvegarde 3-2-1' },
      { name: 'Plan de reprise activite (PRA/PCA)' },
      { name: 'Sensibilisation et formation des collaborateurs' },
    ],
  },
  {
    title: 'Protection de Reseau',
    slug: 'protection-de-reseau',
    description: "Deploiement de solutions de protection reseau de nouvelle generation (NGFW), systemes de detection d'intrusion (IDS/IPS), antivirus centralises et VPN securises. Configuration selon le modele Zero Trust pour contenir toute tentative d'intrusion.",
    status: 'published',
    availability: 'available',
    problem: "Sans protection reseau adequate, votre entreprise est exposee aux malwares, attaques DDoS et intrusions qui peuvent paralyser votre activite.",
    prestations: [
      { name: 'Pare-feux NGFW (Fortinet, pfSense, Cisco)' },
      { name: 'Systemes IDS/IPS' },
      { name: 'Antivirus et EDR centralises' },
      { name: 'VPN site-a-site et nomades (IPSec/SSL)' },
      { name: 'Segmentation reseau (VLAN)' },
      { name: 'Filtrage de contenu web' },
    ],
  },
  {
    title: 'Virtualisation et Consolidation',
    slug: 'virtualisation-et-consolidation',
    description: "Reduisez vos couts d'infrastructure de 40 a 60% grace a la virtualisation de vos serveurs. Deploiement VMware vSphere, Microsoft Hyper-V ou Proxmox pour consolider vos serveurs physiques, ameliorer la disponibilite et accelerer vos deploiements applicatifs.",
    status: 'published',
    availability: 'available',
    problem: "Des serveurs physiques sous-utilises et des couts en energie eleves freinent la croissance de votre infrastructure IT.",
    prestations: [
      { name: 'Virtualisation de serveurs (VMware, Hyper-V, Proxmox)' },
      { name: 'Virtualisation de postes de travail (VDI)' },
      { name: 'Migration physique vers virtuel (P2V)' },
      { name: 'Clustering et haute disponibilite (HA)' },
      { name: 'Snapshots et sauvegarde des VMs' },
      { name: 'Infrastructure Cloud prive' },
    ],
  },
  {
    title: 'Telephonie IP (VoIP)',
    slug: 'telephone-ip',
    description: "Modernisez votre systeme de communication avec la telephonie sur IP. Deploiement IPBX (Asterisk, 3CX, Cisco UCM) conformes aux protocoles SIP et H.323 : appels internes gratuits, messagerie vocale unifiee, conference audio/video et mobilite totale de vos collaborateurs.",
    status: 'published',
    availability: 'available',
    problem: "Les systemes de telephonie classiques sont couteux, peu flexibles et inadaptes au teletravail et aux sites distants.",
    prestations: [
      { name: 'Installation IPBX (Asterisk, 3CX, Cisco)' },
      { name: 'Configuration SIP / H.323 / RTP' },
      { name: 'Postes IP et softphones' },
      { name: 'Messagerie vocale unifiee' },
      { name: 'Conference audio et video' },
      { name: 'Interconnexion multi-sites (trunk SIP)' },
    ],
  },
  {
    title: 'Videosurveillance IP',
    slug: 'video-surveillance',
    description: "Systemes de videosurveillance IP haute definition conformes au protocole ONVIF. Cameras 4K avec enregistrement NVR, detection de mouvement par intelligence artificielle, acces a distance securise et integration avec vos systemes de controle d'acces.",
    status: 'published',
    availability: 'available',
    problem: "Les intrusions physiques non surveillees representent une menace directe pour vos employes, votre materiel et vos donnees.",
    prestations: [
      { name: 'Cameras IP HD/4K (interieur/exterieur)' },
      { name: 'NVR et stockage securise' },
      { name: 'Detection de mouvement par IA' },
      { name: 'Acces a distance (application mobile)' },
      { name: 'Controle acces et interphonie IP' },
      { name: 'Maintenance et supervision du systeme' },
    ],
  },
  {
    title: 'Developpement Applications Web et Mobile',
    slug: 'developpement',
    description: "Developpement d'applications web et mobiles sur-mesure pour automatiser vos processus metiers. Architecture microservices, principes SOLID, APIs REST/GraphQL pour des solutions robustes, maintenables et evolutives : portails clients, dashboards temps reel, applications internes.",
    status: 'published',
    availability: 'available',
    problem: "Les solutions logicielles generiques ne correspondent jamais exactement a vos processus, entrainant des inefficacites et des couts caches.",
    prestations: [
      { name: 'Applications web (React, Next.js, Vue.js)' },
      { name: 'Applications mobiles (iOS et Android)' },
      { name: 'APIs REST et GraphQL' },
      { name: 'Tableaux de bord et reporting' },
      { name: 'Integrations systemes tiers' },
      { name: 'Maintenance evolutive' },
    ],
  },
  {
    title: 'ERP et Gestion Entreprise',
    slug: 'erp',
    description: "Deploiement et parametrage de systemes ERP (Odoo, SAP Business One) pour unifier la gestion de vos ressources humaines, finances, stocks et achats. Migration de donnees existantes, formation des equipes et support post-deploiement inclus.",
    status: 'published',
    availability: 'available',
    problem: "La gestion fragmentee sur des outils disparates genere des erreurs, des doublons et une vision operationnelle incomplete.",
    prestations: [
      { name: 'Deploiement Odoo (ERP open source)' },
      { name: 'Deploiement SAP Business One' },
      { name: 'Migration et nettoyage de donnees' },
      { name: 'Parametrage modules (RH, Finance, Stock)' },
      { name: 'Formation des equipes' },
      { name: 'Support et maintenance' },
    ],
  },
  {
    title: 'Creation de Sites Web',
    slug: 'creation-site-web',
    description: "Conception de sites web vitrine, e-commerce et plateformes institutionnelles. Sites optimises SEO, responsive mobile-first et performants, livres avec un CMS pour une gestion autonome de votre contenu sans competences techniques.",
    status: 'published',
    availability: 'available',
    problem: "Un site web non professionnel ou lent nuit directement a votre credibilite et a votre visibilite dans les moteurs de recherche.",
    prestations: [
      { name: 'Sites vitrine et institutionnels' },
      { name: 'Boutiques e-commerce' },
      { name: 'Optimisation SEO technique' },
      { name: 'Design responsive (mobile-first)' },
      { name: 'CMS integre (gestion autonome du contenu)' },
      { name: 'Hebergement et nom de domaine' },
    ],
  },
  {
    title: 'Formation et Conseil IT',
    slug: 'formation-conseil',
    description: "Formations sur-mesure en cybersecurite, administration reseau, Microsoft 365 et gestion de projets IT. Dispensees dans vos locaux ou a distance. Nos experts accompagnent vos equipes pour maximiser l'adoption de vos outils et renforcer votre posture de securite.",
    status: 'published',
    availability: 'available',
    problem: "Le facteur humain est a l'origine de 85% des incidents de securite. Des equipes mal formees compromettent meme les meilleures infrastructures.",
    prestations: [
      { name: 'Formation cybersecurite et sensibilisation' },
      { name: 'Formation administration reseau' },
      { name: 'Formation Microsoft 365 / G Suite' },
      { name: 'Conseil en transformation numerique' },
      { name: 'Audit et schema directeur IT' },
      { name: 'Accompagnement projets IT' },
    ],
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayloadClient()
    const results: string[] = []

    for (const service of services) {
      const existing = await payload.find({
        collection: 'services',
        where: { slug: { equals: service.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        results.push(`Already exists: ${service.title}`)
        continue
      }

      await payload.create({
        collection: 'services',
        data: service as any,
      })
      results.push(`Created: ${service.title}`)
    }

    return NextResponse.json({ success: true, results })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
