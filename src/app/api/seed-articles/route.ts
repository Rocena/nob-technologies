import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

const SEED_SECRET = 'nob-seed-2024'

function makeParagraph(text: string) {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        mode: 'normal',
        text,
        type: 'text',
        style: '',
        detail: 0,
        format: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
  }
}

function makeHeading(text: string, tag: 'h2' | 'h3' = 'h2') {
  return {
    type: 'heading',
    tag,
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        mode: 'normal',
        text,
        type: 'text',
        style: '',
        detail: 0,
        format: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
  }
}

function makeQuote(text: string) {
  return {
    type: 'quote',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        mode: 'normal',
        text,
        type: 'text',
        style: '',
        detail: 0,
        format: 0,
        version: 1,
      },
    ],
    direction: 'ltr',
  }
}

function buildLexicalDoc(elements: any[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: elements,
      direction: 'ltr',
    },
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayloadClient()

    // 1. Fetch existing users to identify the author
    const usersResult = await payload.find({
      collection: 'users',
      limit: 10,
    })

    const primaryUser = usersResult.docs[0]
    const authorId = primaryUser?.id
    const authorName = primaryUser?.name || 'Ozias Nzongo'

    const articlesData = [
      {
        title: "Zero-Day, Zéro Panique : Comment nous avons blindé l'infra d'un géant financier sans réveiller le DSI",
        slug: "zero-day-zero-panique-cybersecurite-nobtech",
        summary: "Dans la Silicon Valley, le dogme sacré s'appelle « Move fast and break things ». En cybersécurité d'entreprise, si vous cassez les choses à 3 heures du matin, c'est le régulateur et votre conseil d'administration qui vous brisent. Récit d'une nuit sous haute tension où nos sondes IDS ont intercepté une charge Zero-Day avant le premier café du matin.",
        category: "Cybersécurité & Audit",
        readingTime: "5 min",
        author: authorId,
        authorName: authorName,
        status: "published",
        publishedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
        metaTitle: "Zero-Day & Cyber-résilience : Récit d'intervention | NOB TECHNOLOGIES",
        metaDescription: "Retour d'expérience sur la neutralisation d'une vulnérabilité Zero-Day critique avec segmentation Zero Trust et monitoring SOC proactif.",
        tags: [{ tag: "Cybersécurité" }, { tag: "Zero Trust" }, { tag: "SOC" }, { tag: "Incident Response" }],
        content: buildLexicalDoc([
          makeParagraph("Il est 02h42 un mardi matin. L'univers dort d'un sommeil de plomb, à l'exception des traders de cryptos insomniaques et des scripts d'intrusion automatisés qui parcourent les plages d'adresses IPv4 mondiales à la recherche de ports ouverts."),
          makeHeading("L'alerte que personne ne veut recevoir sur Slack", "h2"),
          makeParagraph("Sur notre dashboard SOC NOB TECHNOLOGIES, un voyant ambre passe au cramoisi : une anomalie comportementale sur les couches d'inspection de paquets NGFW d'un client bancaire partenaire. Une tentative d'exfiltration furtive utilisant un contournement d'authentification tout juste documenté dans les cercles sombres du dark web."),
          makeQuote("« La différence entre un incident mineur et un désastre boursier ne tient pas à la chance, mais au temps de réaction de vos règles automatisées : 47 secondes pour isoler le segment réseau, 0 octet exfiltré. »"),
          makeHeading("La doctrine Zero Trust en conditions réelles", "h2"),
          makeParagraph("Le piège classique des infrastructures héritées (le fameux 'legacy IT' que tout le monde promet de migrer depuis 2017) est le modèle du château fort : une grosse muraille externe, et une fois dedans, open-bar total pour n'importe quel paquet bien formé."),
          makeParagraph("Chez NOB TECHNOLOGIES, nous appliquons la paranoïa constructive du Zero Trust : chaque micro-segment VLAN doit prouver son identité, chaque requête interne est chiffrée en AES-256 et aucun poste utilisateur n'a de passe-droit vers les bases de données comptables. Résultat des courses ? Le payload malveillant s'est retrouvé confiné dans un bac à sable hermétique."),
          makeHeading("Le bilan au petit matin", "h2"),
          makeParagraph("À 08h15, le DSI arrive avec son gobelet de café fumant, prêt pour son stand-up meeting. Notre rapport d'incident complet était déjà sur son bureau chiffré : menace détectée, neutralisée, patch de contournement déployé, et aucun downtime pour les utilisateurs finaux. Comme on dit dans la Valley : 'It just worked'."),
        ]),
      },
      {
        title: "Wi-Fi 7 et Fibre 10G : Pourquoi votre routeur de 2019 pleure sous vos visioconférences",
        slug: "wifi-7-fibre-10g-infrastructure-entreprise-2026",
        summary: "Votre entreprise a souscrit un forfait fibre ultra-rapide à grand renfort de plaquettes commerciales, mais dès que 12 collaborateurs démarrent une réunion Zoom simultanée, la voix du CEO ressemble à une transmission radio de la mission Apollo 11 ? Ne jetez pas votre écran par la fenêtre : l'explication se trouve dans votre baie de brassage.",
        category: "Infrastructure & Réseaux",
        readingTime: "4 min",
        author: authorId,
        authorName: authorName,
        status: "published",
        publishedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
        metaTitle: "Wi-Fi 7 et Câblage Cat. 6A : L'infrastructure réseau moderne",
        metaDescription: "Pourquoi les goulots d'étranglement Wi-Fi surviennent en entreprise et comment le Wi-Fi 7 et le câblage certifié résolvent la congestion réseau.",
        tags: [{ tag: "Réseaux" }, { tag: "Wi-Fi 7" }, { tag: "Câblage" }, { tag: "Infrastructure" }],
        content: buildLexicalDoc([
          makeParagraph("C'est le mystère le plus récurrent des open-spaces modernes : comment une entreprise peut-elle payer un débit fibre symétrique de 1 Gbit/s et simultanément afficher une latence de 420 ms dès qu'un fichier PDF de 15 Mo est partagé sur le canal Slack général ?"),
          makeHeading("Le syndrome de l'entonnoir Wi-Fi", "h2"),
          makeParagraph("La majorité des locaux professionnels utilisent encore des bornes Wi-Fi 5 ou Wi-Fi 6 d'ancienne génération, empilées les unes sur les autres sans plan de fréquences ni cartographie radio thermique. En clair : vos bornes se crient dessus comme des traders à la criée, s'entre-brouillent, et forcent chaque smartphone et ordinateur portable à renégocier ses trames en boucle."),
          makeQuote("« Acheter une connexion fibre 10 Gbits sans revoir son câblage Cat. 6A et ses switchs multi-gigabit, c'est comme brancher un moteur d'avion de chasse sur une bicyclette d'appartement. »"),
          makeHeading("L'avènement du Wi-Fi 7 (802.11be) : La fin de l'embouteillage", "h2"),
          makeParagraph("Le Wi-Fi 7 n'est pas juste 'un peu plus rapide'. Il introduit l'opération multi-liens (MLO), permettant à un seul terminal d'émettre et de recevoir simultanément sur les bandes 2,4 GHz, 5 GHz et 6 GHz. Fini la congestion aux heures de pointe."),
          makeParagraph("Mais attention au prérequis physique que les vendeurs de boîtiers oublient de mentionner : une borne Wi-Fi 7 moderne exige une liaison cuivre PoE++ (Power over Ethernet) capable d'encaisser 2.5 Gbps ou 10 Gbps. Si votre câblage mural date de 2012 et n'a jamais été certifié au réflectomètre, vous bridez 80% du potentiel de votre investissement."),
          makeHeading("La recette NOB TECHNOLOGIES", "h2"),
          makeParagraph("Audit radio sur site, câblage structuré certifié TIA-568-D, switchs managés avec segmentation de bande passante prioritaire pour la VoIP : en une demi-journée d'intervention, vos appels vidéos redeviennent aussi limpides qu'un keynote d'Apple."),
        ]),
      },
      {
        title: "Du Cloud public au Cloud Hybride : Pourquoi les scale-ups rapatrient leurs serveurs (et pourquoi elles ont raison)",
        slug: "cloud-hybride-repatriement-serveurs-datacenter",
        summary: "Le mois dernier, la facture AWS ou Azure de votre scale-up a dépassé le budget R&D annuel d'un petit pays ? Vous n'êtes pas seul. Entre les coûts d'egress cachés et les exigences de souveraineté des données, voici pourquoi l'infrastructure hybride on-premise redevient le comble du chic technologique.",
        category: "Cloud & DevOps",
        readingTime: "6 min",
        author: authorId,
        authorName: authorName,
        status: "published",
        publishedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days ago
        metaTitle: "Cloud Hybride et FinOps : L'heure du rapatriement d'infra",
        metaDescription: "Analyse des coûts du cloud public et des bénéfices de la virtualisation VMware/Proxmox sur infrastructure dédiée.",
        tags: [{ tag: "Cloud" }, { tag: "FinOps" }, { tag: "Virtualisation" }, { tag: "Proxmox" }, { tag: "DevOps" }],
        content: buildLexicalDoc([
          makeParagraph("Il y a dix ans, le mot d'ordre martelé dans toutes les conférences tech de San Francisco à Paris était limpide : 'Migrez tout dans le Cloud, les serveurs physiques sont morts et enterrés'. Les promoteurs du Cloud promettaient des économies infinies, une élasticité divine et l'extinction définitive des bruits de ventilateurs dans les salles serveurs."),
          makeParagraph("Avance rapide en 2026 : de nombreuses directions techniques découvrent la 'taxe d'inattention Cloud' — des factures à 6 chiffres par mois pour des instances EC2 sous-utilisées et des coûts de sortie de données (egress fees) qui feraient pâlir un contrôleur de gestion."),
          makeHeading("La gueule de bois du 'Tout-Cloud'", "h2"),
          makeParagraph("Le Cloud public reste imbattable pour tester un MVP ou encaisser un pic de trafic imprévisible lors d'une campagne marketing virale. Mais pour vos charges de travail continues — vos bases de données principales, vos systèmes ERP et vos sauvegardes lourdes — louer des machines virtuelles à l'heure revient à vivre toute l'année dans une suite d'hôtel 5 étoiles au lieu de louer ou d'acheter des bureaux."),
          makeQuote("« David Heinemeier Hansson (créateur de Ruby on Rails) a économisé des millions en quittant le cloud public. Le secret ? Ce n'est pas de revenir aux serveurs poussiéreux sous un bureau, c'est de maîtriser la virtualisation privée moderne. »"),
          makeHeading("L'art de l'infrastructure hybride moderne", "h2"),
          makeParagraph("Chez NOB TECHNOLOGIES, nous ne prônons pas le rejet du Cloud, mais son utilisation intelligente en tandem avec des grappes de virtualisation dédiées (Proxmox VE haute disponibilité ou VMware vSphere)."),
          makeParagraph("Vos données critiques restent souveraines, stockées localement sur des baies NVMe ultra-véloces, sécurisées par des sauvegardes automatiques 3-2-1, tandis que vos front-ends web peuvent déborder élastiquement sur des CDN globaux en cas de besoin. Bilan financier moyen pour nos clients : entre 45% et 60% de réduction immédiate des dépenses d'infrastructure récurrentes."),
        ]),
      },
      {
        title: "L'IA en entreprise n'est pas magique : Elle a juste besoin d'un bon réseau et d'un bon ERP",
        slug: "ia-entreprise-reseau-erp-integration-reelle",
        summary: "Tout le monde rêve d'un agent IA autonome capable de trier les factures, d'optimiser la chaîne logistique et de répondre aux clients en 20 langues. Mais brancher un grand modèle de langage sur des données désorganisées dans 45 fichiers Excel non sécurisés, c'est comme monter un moteur de fusée sur une trottinette d'enfant.",
        category: "Intelligence Artificielle & ERP",
        readingTime: "5 min",
        author: authorId,
        authorName: authorName,
        status: "published",
        publishedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16).toISOString(), // 16 days ago
        metaTitle: "IA appliquée & ERP en entreprise : Au-delà du battage médiatique",
        metaDescription: "Comment réussir l'intégration de l'intelligence artificielle et des ERP en entreprise sur une base réseau solide.",
        tags: [{ tag: "IA" }, { tag: "ERP" }, { tag: "Transformation Digitale" }, { tag: "Data" }],
        content: buildLexicalDoc([
          makeParagraph("Si vous ouvrez LinkedIn ou Twitter ces jours-ci, vous aurez l'impression que n'importe quelle entreprise qui n'a pas encore remplacé son service comptable par un essaim d'agents autonomes dotés de vision spatiale est condamnée à disparaître avant vendredi."),
          makeHeading("La réalité du terrain : Garbage In, Garbage Out", "h2"),
          makeParagraph("Dans la vraie vie des PME et des grandes entreprises, l'intelligence artificielle se heurte à un mur bien connu des informaticiens depuis les années 1970 : le chaos des données non structurées. Si vos stocks sont suivis dans un tableur partagé dont trois versions différentes circulent par e-mail, aucun modèle d'IA ne pourra prédire vos ruptures d'approvisionnement."),
          makeQuote("« L'intelligence artificielle est un multiplicateur de force. Si vous la branchez sur un système d'information solide et centralisé, elle décuple votre rentabilité. Si vous la branchez sur le désordre, elle automatise le chaos à la vitesse de la lumière. »"),
          makeHeading("La véritable colonne vertébrale : L'ERP unifié", "h2"),
          makeParagraph("C'est précisément ici qu'intervient l'intégration d'un ERP moderne comme Odoo ou SAP Business One. En centralisant vos commandes, vos stocks, vos factures et vos RH dans une base de données relationnelle propre et normalisée, vous créez le socle de vérité absolue indispensable à toute exploitation d'IA."),
          makeHeading("L'étape suivante : Vos propres agents spécialisés", "h2"),
          makeParagraph("Une fois cette fondation posée avec l'accompagnement de NOB TECHNOLOGIES, l'IA cesse d'être un gadget coûteux pour devenir un outil opérationnel redoutable : détection des fraudes à la facture en temps réel, réapprovisionnement prédictif et assistance client instantanée connectée directement à votre catalogue."),
        ]),
      },
    ]

    const results: string[] = []

    for (const article of articlesData) {
      const existing = await payload.find({
        collection: 'articles',
        where: { slug: { equals: article.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        // Update existing article to ensure high quality content and author
        await payload.update({
          collection: 'articles',
          id: existing.docs[0].id,
          data: article as any,
        })
        results.push(`Updated: ${article.title}`)
      } else {
        await payload.create({
          collection: 'articles',
          data: article as any,
        })
        results.push(`Created: ${article.title}`)
      }
    }

    return NextResponse.json({
      success: true,
      authorUsed: { id: authorId, name: authorName },
      results,
    })
  } catch (err: any) {
    console.error('Seed articles error:', err)
    return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 })
  }
}
