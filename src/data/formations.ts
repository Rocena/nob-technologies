export interface FormationMonth {
  month: number;
  title: string;
  duration: string;
  objectives: string;
  topics: string[];
  practicalLab: string;
  deliverable: string;
}

export interface FormationCareer {
  targetRoles: { title: string; desc: string }[];
  sectors: string[];
  salarySenegal: {
    junior: string;
    intermediate: string;
    senior: string;
    context: string;
  };
}

export interface FormationOffering {
  id: "entreprise" | "bootcamp" | "particulier";
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  features: string[];
  rhythm: string;
}

export interface Formation {
  slug: string;
  title: string;
  badge: string;
  category?: string;
  shortDesc: string;
  heroHeadline: string;
  heroDescription: string;
  targetAudience: string[];
  prerequisites: string[];
  duration: string;
  hours: string;
  pace: string;
  format: string;
  partnerLogos: { name: string; logo: string }[];
  targetCertifications: {
    title: string;
    organization: string;
    level: string;
    desc: string;
  }[];
  months: FormationMonth[];
  keyOutcomes: string[];
  career?: FormationCareer;
  offerings: FormationOffering[];
}

export const DEFAULT_FORMATION_OFFERINGS: FormationOffering[] = [
  {
    id: "entreprise",
    title: "Formation Entreprise",
    badge: "DSI & Équipes Métiers",
    subtitle: "Montée en compétences sur-mesure pour vos collaborateurs",
    description:
      "Programme intra ou inter-entreprises adapté à vos impératifs de production. Déploiement sur vos infrastructures ou dans nos laboratoires à Dakar.",
    features: [
      "Calendrier et horaires flexibles selon vos contraintes d'activité",
      "Exercices et cas réels ciblés sur le contexte de votre organisation",
      "Rapports d'assiduité et bilan d'évaluation individuel remis à la DSI / RH",
      "Éligible au financement par le 3FPT et les budgets formation continue",
    ],
    rhythm: "Sur-mesure (intra-entreprise ou max 6h/semaine)",
  },
  {
    id: "bootcamp",
    title: "Bootcamp Intensif",
    badge: "Accélérateur Pratique",
    subtitle: "Immersion rapide axée 100% sur la pratique et les examens",
    description:
      "Format condensé et dynamique pour les techniciens et cadres souhaitant monter rapidement en compétences ou valider leurs certifications officielles.",
    features: [
      "Travaux pratiques intensifs sur baies réelles et environnements virtuels",
      "Batterie d'examens blancs chronométrés et cas d'usage réels",
      "Mentorat individuel par des consultants et ingénieurs certifiés seniors",
      "Vouchers d'examen et préparation directe aux épreuves",
    ],
    rhythm: "Sessions intensives ciblées (soirées ou samedis)",
  },
  {
    id: "particulier",
    title: "Formation Particulier",
    badge: "Salariés & Étudiants",
    subtitle: "Rythme allégé compatible avec votre emploi du temps",
    description:
      "Idéal pour les salariés en poste, étudiants ou personnes en reconversion. Cours en soirée ou le samedi matin (max 6h par semaine) avec accès aux labs 24/7.",
    features: [
      "Rythme allégé de max 6h / semaine (cours du soir 18h-20h ou samedi matin)",
      "100% conciliable avec un emploi à temps plein ou des études",
      "Accès 24/7 aux machines virtuelles, plateformes cloud et enregistrements",
      "Facilités de paiement mensuel échelonné sans frais",
    ],
    rhythm: "Max 6h / semaine (soirées ou samedi matin)",
  },
];

export const FORMATIONS_DATA: Record<string, Formation> = {
  // 1. INITIATION A LA CYBERSECURITE
  "initiation-cybersecurite": {
    slug: "initiation-cybersecurite",
    title: "Initiation à la Cybersécurité & Fondamentaux",
    badge: "FONDAMENTAUX &bull; 4 SEMAINES",
    category: "Cybersécurité",
    shortDesc:
      "Maîtrisez les bases indispensables de la sécurité informatique : comprendre les menaces courantes, sécuriser les postes de travail, les mots de passe et les réseaux d'entreprise.",
    heroHeadline: "Initiez-vous aux fondamentaux de la sécurité des systèmes d'information",
    heroDescription:
      "Conçue pour les professionnels, techniciens et débutants, cette formation pratique pose les bases indispensables de la cyber-hygiène, de la protection des données et de la détection des menaces du quotidien.",
    targetAudience: [
      "Techniciens support et informaticiens généralistes",
      "Collaborateurs manipulant des données sensibles (RH, comptabilité, finances)",
      "Gestionnaires de parcs informatiques de PME et structures publiques",
      "Étudiants et professionnels en reconversion vers les métiers de l'IT",
    ],
    prerequisites: [
      "Utilisation courante d'un ordinateur (Windows, macOS ou Linux)",
      "Notions de base d'Internet et des outils bureautiques",
      "Aucune connaissance préalable en programmation requise",
    ],
    duration: "4 Semaines",
    hours: "24 heures de pratique (6h / semaine)",
    pace: "Max 6h / semaine (cours du soir ou samedi matin)",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel dans nos Labs à Dakar + Accès plateforme cloud",
    partnerLogos: [
      { name: "Sophos", logo: "/images/partners/sophos.svg" },
      { name: "Fortinet", logo: "/images/partners/fortinet.svg" },
      { name: "Microsoft", logo: "/images/partners/microsoft.svg" },
      { name: "Kaspersky", logo: "/images/partners/kaspersky.svg" },
    ],
    targetCertifications: [
      {
        title: "Attestation Officielle NOB TECHNOLOGIES - Cyber Fondamentaux",
        organization: "NOB TECHNOLOGIES",
        level: "Certificat Professionnel",
        desc: "Validation pratique des compétences fondamentales en hygiène cyber et durcissement des postes de travail.",
      },
      {
        title: "CompTIA Security+ Foundations (Préparation)",
        organization: "CompTIA",
        level: "Standard International",
        desc: "Introduction aux concepts clés exigés pour le passage ultérieur des examens internationaux CompTIA.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Module 1 : Paysage des Cybermenaces & Vocabulaire Essentiel",
        duration: "Semaine 1 (6h)",
        objectives: "Comprendre les types d'attaques, les motivations des pirates et la triade CIA (Confidentialité, Intégrité, Disponibilité).",
        topics: [
          "Panorama des cybermenaces modernes : malwares, spywares, chevaux de Troie",
          "Principes de la triade CIA et notions d'actifs critiques d'entreprise",
          "Comprendre les vecteurs d'infection et failles humaines",
        ],
        practicalLab: "Analyse guidée d'un incident de sécurité réel et identification du vecteur d'entrée.",
        deliverable: "Rapport d'analyse d'incident avec recommandations de premier niveau.",
      },
      {
        month: 2,
        title: "Module 2 : Sécurité des Postes de Travail & Mots de Passe",
        duration: "Semaine 2 (6h)",
        objectives: "Durcir un poste Windows/Mac et gérer les identifiants avec des coffres-forts numériques et l'authentification MFA.",
        topics: [
          "Mots de passe robustes, générateurs et gestionnaires (Bitwarden, KeePass)",
          "Mise en place de l'authentification multifacteur (MFA / 2FA)",
          "Mises à jour de sécurité, pare-feu local et antivirus de nouvelle génération",
        ],
        practicalLab: "Configuration complète d'un poste de travail sécurisé avec MFA et coffre-fort de mots de passe.",
        deliverable: "Check-list de durcissement d'un poste de travail bureautique.",
      },
      {
        month: 3,
        title: "Module 3 : Protection des Données, Sauvegardes & Chiffrement",
        duration: "Semaine 3 (6h)",
        objectives: "Apprendre à chiffrer des données sensibles et concevoir une stratégie de sauvegarde 3-2-1 anti-perte.",
        topics: [
          "Chiffrement de disque (BitLocker / FileVault) et clés USB sécurisées",
          "Règle de sauvegarde 3-2-1 (locale, externe, cloud sécurisé)",
          "Protection contre les rançongiciels (ransomwares) et détection des comportements suspects",
        ],
        practicalLab: "Mise en place d'un volume chiffré et automatisation d'une sauvegarde incrémentielle chiffrée.",
        deliverable: "Plan de sauvegarde personnel et professionnel opérationnel.",
      },
      {
        month: 4,
        title: "Module 4 : Réseau Sans-Fil, Télétravail & Réflexes d'Alerte",
        duration: "Semaine 4 (6h)",
        objectives: "Sécuriser les connexions Wi-Fi, utiliser un VPN et savoir réagir immédiatement en cas de suspicion d'attaque.",
        topics: [
          "Dangers des Wi-Fi publics et configuration sécurisée des box d'entreprise (WPA3)",
          "Usage sécurisé des VPN pour le travail à distance",
          "Procédure de signalement interne et réflexes d'isolation immédiate",
        ],
        practicalLab: "Simulation d'une alerte de sécurité : isolation réseau d'une machine et rédaction de la notification DSI.",
        deliverable: "Guide de réflexes d'urgence cyber pour les collaborateurs.",
      },
    ],
    keyOutcomes: [
      "Compréhension claire des risques et techniques utilisées par les cybercriminels",
      "Capacité à sécuriser ses postes de travail et ses accès professionnels avec le MFA",
      "Maîtrise des protocoles de sauvegarde 3-2-1 pour se prémunir des ransomwares",
      "Attestation de compétences délivrée par NOB TECHNOLOGIES",
    ],
    career: {
      targetRoles: [
        { title: "Référent Cybersécurité Junior", desc: "Assistance aux équipes internes pour le respect des bonnes pratiques et la sécurité quotidienne." },
        { title: "Technicien Support Helpdesk N1", desc: "Prise en charge des incidents utilisateurs et sensibilisation de premier niveau." },
      ],
      sectors: ["PME & Entreprises de services", "Établissements bancaires et financiers", "Administrations et collectivités"],
      salarySenegal: {
        junior: "350 000 à 550 000 FCFA / mois",
        intermediate: "600 000 à 900 000 FCFA / mois",
        senior: "1 000 000+ FCFA / mois",
        context: "Compétence tremplin hautement appréciée pour faire évoluer un profil généraliste vers les métiers spécialisés de la sécurité informatique.",
      },
    },
  },

  // 2. SENSIBILISATION AU PHISHING CAS PRATIQUE
  "sensibilisation-phishing-cas-pratiques": {
    slug: "sensibilisation-phishing-cas-pratiques",
    title: "Sensibilisation au Phishing (Cas Pratiques)",
    badge: "ATELIER PRATIQUE &bull; 2 SEMAINES",
    category: "Cybersécurité",
    shortDesc:
      "Ateliers 100% pratiques pour reconnaître les attaques par hameçonnage (phishing, spear-phishing, vishing, QR code phishing) et adopter les bons réflexes de défense en entreprise.",
    heroHeadline: "Blindez le premier rempart de l'entreprise : vos collaborateurs face aux cyber-escroqueries",
    heroDescription:
      "90% des cyberattaques débutent par un e-mail piégé ou une manipulation humaine. À travers des cas pratiques réels, découvrez l'anatomie d'un faux message, les techniques d'usurpation bancaire et les simulations d'hameçonnage.",
    targetAudience: [
      "Directions générales, directeurs financiers et comptables (cibles privilégiées des fraudes au président)",
      "Assistantes de direction, secrétaires et chargés de communication",
      "Équipes commerciales, gestionnaires de paie et ressources humaines",
      "Toute personne disposant d'une adresse email professionnelle d'entreprise",
    ],
    prerequisites: [
      "Aucun prérequis technique nécessaire",
      "Savoir consulter sa messagerie électronique professionnelle",
    ],
    duration: "2 Semaines",
    hours: "12 heures d'ateliers interactifs",
    pace: "Ateliers intensifs (soirées ou demi-journées)",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel à Dakar ou Session intra-entreprise personnalisée",
    partnerLogos: [
      { name: "GateWatcher", logo: "/images/partners/gatewatcher.svg" },
      { name: "Sophos", logo: "/images/partners/sophos.svg" },
      { name: "Microsoft", logo: "/images/partners/microsoft.svg" },
    ],
    targetCertifications: [
      {
        title: "Certificat de Vigilance Cyber & Prévention du Phishing",
        organization: "NOB TECHNOLOGIES",
        level: "Certificat d'Aptitude Professionnelle",
        desc: "Attestation de validation des tests pratiques de détection d'attaques d'ingénierie sociale.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Module 1 : Anatomie du Phishing & Faux E-mails en Contexte Réel",
        duration: "Semaine 1 (6h)",
        objectives: "Apprendre à décortiquer un e-mail piégé, repérer les faux expéditeurs et analyser les liens suspects sans cliquer.",
        topics: [
          "Typologie du phishing : hameçonnage de masse, spear-phishing ultra-ciblé, whaling (fraude au président)",
          "Analyse des en-têtes (headers), fautes dissimulées, fausses adresses (typosquattage) et liens masqués",
          "Attaques par QR Code (Quishing) et arnaques par SMS/WhatsApp (Smishing)",
        ],
        practicalLab: "Atelier 'Chasse aux indices' : analyse de 20 e-mails réels pour démasquer les pièges subtils.",
        deliverable: "Score individuel de discernement et grille d'analyse des messages suspects.",
      },
      {
        month: 2,
        title: "Module 2 : Ingénierie Sociale, Fraude au Virement & Réflexes",
        duration: "Semaine 2 (6h)",
        objectives: "Déjouer les tentatives d'usurpation téléphonique (vishing) et mettre en place des procédures de double validation.",
        topics: [
          "Techniques de manipulation psychologique : urgence, autorité supposée, peur, promesse de gain",
          "Scénarios classiques : changement de RIB fournisseur, demande de virement urgent du PDG, faux support technique",
          "Protocole de vérification par canal séparé et procédure de signalement immédiat à la DSI",
        ],
        practicalLab: "Simulation en direct : mise en situation d'un appel suspect et exécution du protocole de contre-vérification.",
        deliverable: "Procédure interne de contre-appel et validation des flux financiers.",
      },
    ],
    keyOutcomes: [
      "Capacité à détecter immédiatement les e-mails et SMS d'hameçonnage les plus trompeurs",
      "Élimination du risque de clic impulsif sur les pièces jointes ou liens malveillants",
      "Maîtrise du protocole de double validation pour sécuriser les transactions de l'entreprise",
      "Attestation officielle de sensibilisation aux risques cyber délivrée par NOB TECH",
    ],
    career: {
      targetRoles: [
        { title: "Collaborateur Cyber-Vigilant", desc: "Poste clé pour la réduction drastique de la surface d'attaque humaine en entreprise." },
        { title: "Ambassadeur Sécurité Interne", desc: "Relais des bonnes pratiques et de la vigilance au sein de son service métier." },
      ],
      sectors: ["Secteur bancaire & Microfinance", "Grandes entreprises & PME sénégalaises", "Agences gouvernementales & ONG"],
      salarySenegal: {
        junior: "Compétence transverse",
        intermediate: "Compétence transverse",
        senior: "Compétence transverse",
        context: "Formation indispensable pour prévenir les pertes financières massives causées par les fraudes au virement et compromissions d'emails (BEC).",
      },
    },
  },

  // 3. INITIATION A L'IA
  "initiation-intelligence-artificielle": {
    slug: "initiation-intelligence-artificielle",
    title: "Initiation à l’Intelligence Artificielle (IA)",
    badge: "INNOVATION &bull; 4 SEMAINES",
    category: "Intelligence Artificielle",
    shortDesc:
      "Démystifiez l'IA générative (ChatGPT, Claude, Gemini, Copilot), apprenez l'ingénierie de prompt avancée et automatisez vos flux de travail quotidiens sans compétences en programmation.",
    heroHeadline: "Exploitez concrètement l'Intelligence Artificielle pour booster votre productivité",
    heroDescription:
      "L'IA transforme tous les métiers. Cette formation pragmatique vous apprend à utiliser les modèles d'IA générative dans vos tâches professionnelles : rédaction, analyse de données, automatisation de synthèses et respect de la confidentialité des données d'entreprise.",
    targetAudience: [
      "Cadres, managers et dirigeants souhaitant intégrer l'IA dans leurs équipes",
      "Professionnels du marketing, de la communication, des RH et de la finance",
      "Développeurs et techniciens voulant accélérer leur production de code et documentation",
      "Entrepreneurs et consultants souhaitant optimiser leur temps de travail",
    ],
    prerequisites: [
      "Aisance avec les outils bureautiques et Internet",
      "Curiosité et volonté d'expérimenter de nouvelles technologies",
    ],
    duration: "4 Semaines",
    hours: "24 heures de pratique interactive",
    pace: "Max 6h / semaine (cours du soir ou samedi matin)",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel à Dakar & Labs interactifs sur plateformes d'IA",
    partnerLogos: [
      { name: "Microsoft 365", logo: "/images/partners/microsoft.svg" },
      { name: "Dell Technologies", logo: "/images/partners/dell-color.svg" },
    ],
    targetCertifications: [
      {
        title: "Attestation Pratique NOB TECHNOLOGIES - Productivité par l'IA",
        organization: "NOB TECHNOLOGIES",
        level: "Certificat Professionnel",
        desc: "Validation pratique de l'ingénierie de prompt et de l'intégration de l'IA dans les processus métiers.",
      },
      {
        title: "Microsoft Certified: Azure AI Fundamentals (AI-900) - Préparation",
        organization: "Microsoft",
        level: "Certification Fondamentaux Cloud & IA",
        desc: "Examen officiel AI-900 couvrant les concepts d'apprentissage automatique, de vision par ordinateur et de NLP.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Module 1 : Comprendre les Modèles d'IA & L'Écosystème Actuel",
        duration: "Semaine 1 (6h)",
        objectives: "Comprendre le fonctionnement des LLMs (Large Language Models), leurs forces, leurs hallucinations et leurs limites.",
        topics: [
          "Histoire et principes des modèles génératifs : comment un LLM 'prédit' le mot suivant",
          "Panorama des outils majeurs : OpenAI ChatGPT, Anthropic Claude, Google Gemini, Microsoft Copilot",
          "Enjeux éthiques, droits d'auteur et règles de confidentialité des données en entreprise",
        ],
        practicalLab: "Comparatif en direct des réponses de 3 modèles sur un problème métier complexe.",
        deliverable: "Guide comparatif des outils d'IA adaptés aux besoins de son organisation.",
      },
      {
        month: 2,
        title: "Module 2 : Ingénierie de Prompt Avancée (Prompt Engineering)",
        duration: "Semaine 2 (6h)",
        objectives: "Formuler des instructions précises pour obtenir des résultats professionnels constants dès le premier essai.",
        topics: [
          "Structure d'un prompt parfait : Contexte, Rôle, Tâche, Contraintes, Format de sortie",
          "Techniques avancées : Few-shot prompting, Chain of Thought, prompts itératifs",
          "Génération de tableaux de données, synthèses exécutives et rédaction de contrats/courriers",
        ],
        practicalLab: "Création d'une bibliothèque de 15 prompts réutilisables pour son activité professionnelle.",
        deliverable: "Playbook personnel de prompts validés pour son domaine métier.",
      },
      {
        month: 3,
        title: "Module 3 : IA Multimodale, Documents Longs & Analyse de Données",
        duration: "Semaine 3 (6h)",
        objectives: "Exploiter l'IA pour résumer des rapports PDF de 100 pages, analyser des feuilles Excel et traiter des images.",
        topics: [
          "Analyse de documents volumineux (PDF, bilans, rapports d'activité)",
          "Traitement et nettoyage de données avec l'interpréteur de code intégré",
          "Création d'images professionnelles et supports visuels assistés par IA",
        ],
        practicalLab: "Analyse automatisée d'un jeu de données financières avec génération de graphiques et résumé décisionnel.",
        deliverable: "Rapport d'analyse de données synthétisé généré avec l'assistance de l'IA.",
      },
      {
        month: 4,
        title: "Module 4 : Automatisation Légère & Garde-Fous de Sécurité",
        duration: "Semaine 4 (6h)",
        objectives: "Connecter l'IA à ses outils quotidiens et mettre en place une charte d'utilisation sécurisée en entreprise.",
        topics: [
          "Création de GPTs personnalisés et d'assistants sur-mesure",
          "Intégration dans la suite bureautique (Word, Excel, Outlook, Teams)",
          "Élaboration d'une politique d'usage de l'IA en entreprise (respect des secrets d'affaires)",
        ],
        practicalLab: "Configuration d'un assistant IA personnalisé dédié à une procédure interne d'entreprise.",
        deliverable: "Assistant IA opérationnel et charte d'utilisation responsable prête pour la direction.",
      },
    ],
    keyOutcomes: [
      "Maîtrise immédiate des meilleurs outils d'IA générative du marché",
      "Capacité à concevoir des prompts avancés produisant des livrables de haute qualité",
      "Gain de temps mesurable (3 à 5 heures par semaine) sur les tâches rédactionnelles et d'analyse",
      "Compréhension des impératifs de confidentialité et de sécurité des données",
    ],
    career: {
      targetRoles: [
        { title: "Professionnel Augmenté par l'IA", desc: "Gain immédiat de compétitivité et d'efficacité dans n'importe quelle fonction d'entreprise." },
        { title: "Chef de Projet Adoption IA", desc: "Accompagnement des équipes internes dans la prise en main des outils d'IA." },
      ],
      sectors: ["Secteur tertiaire & Services", "Banques & Assurances", "Cabinets de conseil & Éducation"],
      salarySenegal: {
        junior: "Valorisation salariale immédiate",
        intermediate: "Valorisation salariale immédiate",
        senior: "Valorisation salariale immédiate",
        context: "Compétence différenciante majeure recherchée par les employeurs de la sous-région pour moderniser les flux de travail.",
      },
    },
  },

  // 4. PREPARATION A LA CERTIFICATION FORTINET NSE 4 (FCP)
  "preparation-certification-fortinet-nse4": {
    slug: "preparation-certification-fortinet-nse4",
    title: "Préparation à la Certification Fortinet NSE 4 (FCP)",
    badge: "CERTIFICATION CONSTRUCTEUR &bull; 8 SEMAINES",
    category: "Pare-feu & Réseau",
    shortDesc:
      "Cursus intensif pour maîtriser la configuration avancée des pare-feux FortiGate, les profils de sécurité, l'inspection SSL, les VPN IPsec/SSL et réussir l'examen officiel Fortinet FCP Network Security.",
    heroHeadline: "Devenez administrateur certifié Fortinet FortiGate et sécurisez vos périmètres",
    heroDescription:
      "Entraînement approfondi sur appliances virtuelles et physiques FortiGate. Déploiement de règles de filtrage, inspection applicative, routage, cluster de haute disponibilité et examens blancs sous format officiel Pearson VUE.",
    targetAudience: [
      "Administrateurs réseaux et systèmes souhaitant obtenir la certification officielle Fortinet",
      "Techniciens et ingénieurs de sécurité en poste chez des intégrateurs ou clients finaux",
      "Consultants infrastructure préparant les marchés d'appels d'offres exigeant des profils certifiés",
    ],
    prerequisites: [
      "Bonnes connaissances des réseaux TCP/IP (adressage IP, masques, routage, NAT)",
      "Compréhension des concepts fondamentaux de pare-feu et de sécurité périmétrique",
    ],
    duration: "8 Semaines",
    hours: "48 heures de pratique et labs réels",
    pace: "Max 6h / semaine (cours du soir ou samedi matin)",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel dans nos Labs à Dakar sur FortiOS & Appliances physiques",
    partnerLogos: [
      { name: "Fortinet", logo: "/images/partners/fortinet.svg" },
      { name: "Paessler", logo: "/images/partners/paessler.svg" },
      { name: "Dell Technologies", logo: "/images/partners/dell-color.svg" },
    ],
    targetCertifications: [
      {
        title: "Fortinet Certified Professional (FCP) - Network Security (FortiGate Administrator)",
        organization: "Fortinet",
        level: "Certification Officielle Constructeur",
        desc: "Examen officiel Pearson VUE validant l'installation, la configuration et l'administration quotidienne des pare-feux FortiGate.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Module 1 : Architecture FortiOS & Déploiement Réseau Initial",
        duration: "Semaines 1 & 2 (12h)",
        objectives: "Prendre en main l'interface FortiOS, configurer les interfaces réseau, les zones et les routes statiques.",
        topics: [
          "Présentation de la gamme FortiGate et architecture matérielle/logicielle FortiOS",
          "Modes de fonctionnement : mode NAT/Route vs mode Transparent",
          "Configuration des interfaces, VLANs 802.1Q, agrégation de liens LACP et zones logiques",
          "Routage statique, passerelles par défaut et diagnostics en ligne de commande (CLI)",
        ],
        practicalLab: "Mise en service complète d'un FortiGate avec segmentation LAN/DMZ/WAN et routage statique.",
        deliverable: "Schéma d'adressage et configuration initiale fonctionnelle d'un boîtier FortiGate.",
      },
      {
        month: 2,
        title: "Module 2 : Politiques Pare-Feu, NAT & Authentification",
        duration: "Semaines 3 & 4 (12h)",
        objectives: "Construire des règles de filtrage granulaires avec translation d'adresse (Source & Destination NAT) et authentification.",
        topics: [
          "Objets d'adresses, groupes, services et planification temporelle",
          "Politiques de sécurité (Firewall Policies) et ordre de traitement des règles",
          "Source NAT (IP Pool, Overload) et Destination NAT (Virtual IP / Port Forwarding)",
          "Authentification des utilisateurs : base locale, annuaire Active Directory / LDAP et FSSO",
        ],
        practicalLab: "Publication d'un serveur Web en DMZ avec Virtual IP et restriction d'accès Internet par groupe AD.",
        deliverable: "Matrice de flux sécurisée et règles de filtrage conformes aux politiques d'entreprise.",
      },
      {
        month: 3,
        title: "Module 3 : Profils UTM de Sécurité, Antivirus & Inspection SSL",
        duration: "Semaines 5 & 6 (12h)",
        objectives: "Activer la protection contre les logiciels malveillants, filtrer le web et déchiffrer les flux HTTPS.",
        topics: [
          "Inspection de contenu : Antivirus de flux et proxy-based vs flow-based",
          "Filtrage Web par catégories et contrôle applicatif (Application Control)",
          "Système de prévention d'intrusion (IPS) et profils DoS",
          "Inspection SSL/TLS : inspection de certificat vs inspection approfondie (Deep SSL Inspection)",
        ],
        practicalLab: "Déploiement du Deep SSL Inspection avec injection du certificat racine sur les postes clients.",
        deliverable: "Politique de filtrage applicatif et rapport de blocage des menaces chiffrées.",
      },
      {
        month: 4,
        title: "Module 4 : VPNs IPsec/SSL, Haute Disponibilité (HA) & Examens Blancs",
        duration: "Semaines 7 & 8 (12h)",
        objectives: "Interconnecter des sites distants, sécuriser les accès nomades et s'entraîner aux examens officiels.",
        topics: [
          "Tunnels IPsec site-à-site avec IKEv2 et routage sur interfaces virtuelles",
          "Accès nomade sécurisé SSL-VPN (tunnel mode vs web mode) avec client FortiClient et MFA",
          "Haute disponibilité : Cluster FortiGate HA (Actif/Passif) et basculement automatique",
          "Session intensive d'examens blancs chronométrés sous format officiel Pearson VUE",
        ],
        practicalLab: "Montage d'un cluster HA redondant et liaison VPN IPsec chiffrée avec basculement automatique.",
        deliverable: "Cluster haute disponibilité opérationnel et validation des tests blancs d'examen.",
      },
    ],
    keyOutcomes: [
      "Maîtrise complète de l'administration quotidienne des pare-feux FortiGate",
      "Capacité à concevoir des architectures sécurisées avec VPNs et haute disponibilité",
      "Préparation ciblée garantissant un taux de réussite optimal à l'examen officiel FCP",
      "Éligibilité immédiate aux postes d'administrateur sécurité recherchés par les grandes entreprises",
    ],
    career: {
      targetRoles: [
        { title: "Administrateur Pare-Feu Fortinet", desc: "Gestion des règles de sécurité, maintenance et supervision des appliances FortiGate." },
        { title: "Ingénieur Réseau & Sécurité N2", desc: "Conception et déploiement de solutions de sécurité périmétrique multi-sites." },
        { title: "Consultant Déploiement Sécurité", desc: "Missions d'intégration Fortinet chez des clients grands comptes et opérateurs." },
      ],
      sectors: ["Opérateurs télécoms & Fournisseurs d'accès", "Établissements bancaires & Assurances", "Intégrateurs IT & Sociétés de services à Dakar"],
      salarySenegal: {
        junior: "500 000 à 750 000 FCFA / mois",
        intermediate: "850 000 à 1 400 000 FCFA / mois",
        senior: "1 500 000 à 2 300 000+ FCFA / mois",
        context: "La certification Fortinet FCP (ex-NSE4) est l'une des accréditations techniques les plus demandées sur les marchés sénégalais et ouest-africains.",
      },
    },
  },

  // 5. INITIATION A SOPHOS
  "initiation-sophos": {
    slug: "initiation-sophos",
    title: "Initiation à Sophos (Firewalls XGS & Intercept X)",
    badge: "SÉCURITÉ SYNCHRONISÉE &bull; 4 SEMAINES",
    category: "Pare-feu & Sécurité",
    shortDesc:
      "Prise en main complète des pare-feux Sophos XGS (SFOS) et de la solution endpoint Intercept X : sécurité synchronisée, détection anti-ransomware CryptoGuard et gestion cloud Sophos Central.",
    heroHeadline: "Maîtrisez la suite de cyberdéfense Sophos pour entreprises et PME",
    heroDescription:
      "Apprenez à administrer l'écosystème Sophos : configuration des boîtiers XGS, communication bidirectionnelle (Security Heartbeat) entre poste et firewall, isolation instantanée des terminaux infectés et supervision centralisée.",
    targetAudience: [
      "Administrateurs réseaux de PME, cliniques, écoles et structures privées",
      "Techniciens informatiques souhaitant déployer la solution Sophos",
      "Responsables informatiques préparant la migration vers une protection unifiée",
    ],
    prerequisites: [
      "Notions de base de réseau (IP, passerelle, DNS, NAT)",
      "Connaissance des systèmes d'exploitation Windows et Linux",
    ],
    duration: "4 Semaines",
    hours: "24 heures de travaux pratiques",
    pace: "Max 6h / semaine (cours du soir ou samedi matin)",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel à Dakar & Labs sur Sophos Central et VM SFOS",
    partnerLogos: [
      { name: "Sophos", logo: "/images/partners/sophos.svg" },
      { name: "Dell Technologies", logo: "/images/partners/dell-color.svg" },
    ],
    targetCertifications: [
      {
        title: "Sophos Certified Engineer - Sophos Firewall & Endpoint (Préparation)",
        organization: "Sophos",
        level: "Certification Constructeur",
        desc: "Préparation technique officielle constructeur validant le déploiement des pare-feux XGS et d'Intercept X.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Module 1 : Prise en Main de Sophos Firewall OS (SFOS)",
        duration: "Semaine 1 (6h)",
        objectives: "Comprendre l'architecture Xstream, initialiser un boîtier XGS et configurer les zones et interfaces.",
        topics: [
          "Gamme Sophos XGS et processeurs de flux Xstream",
          "Interface SFOS : tableau de bord, interfaces physiques, VLANs et passerelles WAN",
          "Règles pare-feu unifiées (Firewall & NAT Rules) et inspection de flux",
        ],
        practicalLab: "Installation et configuration initiale d'un pare-feu Sophos virtuel avec règles de sortie Internet.",
        deliverable: "Configuration réseau d'un boîtier Sophos validée.",
      },
      {
        month: 2,
        title: "Module 2 : Filtrage Web, Contrôle Applicatif & VPNs",
        duration: "Semaine 2 (6h)",
        objectives: "Mettre en place des politiques de filtrage web, bloquer les applications indésirables et monter un VPN nomade.",
        topics: [
          "Filtrage Web par catégories et contrôle du téléchargement de fichiers",
          "Contrôle des applications (Application Control) et priorisation QoS de la bande passante",
          "VPN nomade Sophos Connect (IPsec/SSL) pour les utilisateurs en télétravail",
        ],
        practicalLab: "Configuration d'une politique de filtrage web interdisant les sites dangereux et déploiement du VPN Sophos Connect.",
        deliverable: "Rapport de politique de filtrage web et profil VPN exportable.",
      },
      {
        month: 3,
        title: "Module 3 : Protection Endpoint avec Sophos Intercept X",
        duration: "Semaine 3 (6h)",
        objectives: "Déployer la protection des postes de travail et comprendre les technologies anti-ransomware et EDR.",
        topics: [
          "Gestion unifiée depuis la console cloud Sophos Central",
          "Technologie CryptoGuard : détection et annulation automatique du chiffrement ransomware",
          "Exploit Prevention et protection de la mémoire contre les attaques 'zero-day'",
        ],
        practicalLab: "Déploiement d'agents Intercept X sur postes Windows et simulation d'attaque ransomware bloquée.",
        deliverable: "Console Sophos Central paramétrée avec stratégies de protection des postes.",
      },
      {
        month: 4,
        title: "Module 4 : Sécurité Synchronisée (Security Heartbeat) & Supervision",
        duration: "Semaine 4 (6h)",
        objectives: "Connecter le pare-feu et les postes clients pour isoler automatiquement toute machine compromise.",
        topics: [
          "Principe du Security Heartbeat : communication en temps réel entre poste et firewall",
          "Isolation réseau automatique d'un poste infecté sans intervention humaine",
          "Supervision, alertes e-mail et rapports d'activité exécutifs dans Sophos Central",
        ],
        practicalLab: "Test complet de sécurité synchronisée : déclenchement d'une alerte et vérification de l'isolation instantanée.",
        deliverable: "Architecture de sécurité synchronisée opérationnelle et rapport de conformité.",
      },
    ],
    keyOutcomes: [
      "Autonomie sur le déploiement et l'administration des appliances Sophos XGS",
      "Protection éprouvée contre les ransomwares grâce à Intercept X et CryptoGuard",
      "Maîtrise de la sécurité synchronisée pour une isolation automatique des menaces",
      "Attestation de compétences et préparation au statut Sophos Certified Engineer",
    ],
    career: {
      targetRoles: [
        { title: "Administrateur Systèmes & Sécurité Sophos", desc: "Gestion des postes, firewalls et conformité sécuritaire de l'entreprise." },
        { title: "Technicien Déploiement Sécurité", desc: "Installation des boîtiers XGS et protection des flottes de PC d'entreprise." },
      ],
      sectors: ["PME & Entreprises de taille intermédiaire", "Cliniques, cabinets médicaux & Santé", "Écoles, universités & Éducation"],
      salarySenegal: {
        junior: "400 000 à 650 000 FCFA / mois",
        intermediate: "700 000 à 1 100 000 FCFA / mois",
        senior: "1 200 000+ FCFA / mois",
        context: "Solution très plébiscitée par les PME sénégalaises pour sa simplicité d'administration et sa protection intégrée.",
      },
    },
  },

  // 6. INITIATION MICROSOFT 365
  "initiation-microsoft-365": {
    slug: "initiation-microsoft-365",
    title: "Initiation à Microsoft 365 (Administration & Outils)",
    badge: "CLOUD & COLLABORATION &bull; 4 SEMAINES",
    category: "Cloud & Microsoft",
    shortDesc:
      "Administrez et sécurisez l'environnement cloud Microsoft 365 : gestion des utilisateurs, Exchange, Teams, SharePoint, OneDrive et sécurisation des identités avec Microsoft Entra ID (Azure AD, MFA).",
    heroHeadline: "Administrez et optimisez la suite cloud Microsoft 365 de votre organisation",
    heroDescription:
      "Formation pratique pour administrateurs informatiques et référents bureautiques : gestion des licences CSP/ESD, création de boîtes e-mails professionnelles, gouvernance Teams/SharePoint et renforcement de la sécurité des comptes d'entreprise.",
    targetAudience: [
      "Administrateurs systèmes juniors et techniciens support informatique",
      "Référents numériques d'entreprises en migration vers le cloud Microsoft",
      "Gestionnaires de parcs informatiques souhaitant centraliser leurs licences et identités",
    ],
    prerequisites: [
      "Utilisation courante de Windows et des outils bureautiques Office",
      "Notions de base de réseau et de gestion des utilisateurs",
    ],
    duration: "4 Semaines",
    hours: "24 heures de labs pratiques sur Tenant dédié",
    pace: "Max 6h / semaine (cours du soir ou samedi matin)",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel à Dakar & Accès direct à un tenant Microsoft 365 d'entraînement",
    partnerLogos: [
      { name: "Microsoft 365", logo: "/images/partners/microsoft.svg" },
      { name: "Dell Technologies", logo: "/images/partners/dell-color.svg" },
    ],
    targetCertifications: [
      {
        title: "Microsoft 365 Certified: Fundamentals (MS-900) - Préparation",
        organization: "Microsoft",
        level: "Certification Officielle Constructeur",
        desc: "Examen officiel MS-900 attestant de la compréhension des services cloud Microsoft 365, de la sécurité et des licences.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Module 1 : Architecture du Tenant, Licences & Gestion des Comptes",
        duration: "Semaine 1 (6h)",
        objectives: "Comprendre le centre d'administration M365, gérer les noms de domaine d'entreprise et provisionner les utilisateurs.",
        topics: [
          "Vue d'ensemble de l'écosystème Microsoft 365 et modèles de licences (Business Basic, Standard, Premium)",
          "Configuration du nom de domaine d'entreprise personnalisé (DNS, MX, SPF, DKIM)",
          "Création d'utilisateurs, groupes de distribution et attribution des licences",
        ],
        practicalLab: "Ajout d'un domaine personnalisé et création d'une arborescence d'utilisateurs avec licences associées.",
        deliverable: "Tenant opérationnel avec utilisateurs créés et domaine validé.",
      },
      {
        month: 2,
        title: "Module 2 : Messagerie Exchange Online & Sécurité E-mail",
        duration: "Semaine 2 (6h)",
        objectives: "Gérer les boîtes de réception Exchange, boîtes partagées et protéger la messagerie contre le spam et le spoofing.",
        topics: [
          "Administration Exchange Online : boîtes principales, boîtes partagées et alias",
          "Protection anti-spam et anti-malware avec Microsoft Defender pour Office 365",
          "Mise en œuvre des enregistrements SPF, DKIM et DMARC pour éviter le piratage d'expéditeur",
        ],
        practicalLab: "Création d'une boîte partagée 'contact@' avec droits d'accès délégués et configuration de règles de flux de courrier.",
        deliverable: "Architecture de messagerie d'entreprise configurée et sécurisée.",
      },
      {
        month: 3,
        title: "Module 3 : Collaboration avec Teams, SharePoint Online & OneDrive",
        duration: "Semaine 3 (6h)",
        objectives: "Structurer les espaces de travail d'équipe, gérer les bibliothèques de documents et contrôler le partage externe.",
        topics: [
          "Administration de Microsoft Teams : canaux, politiques de réunion et applications",
          "Architecture SharePoint Online : sites d'équipe, bibliothèques de documents et gestion des droits",
          "Synchronisation OneDrive Entreprise et règles de partage avec des tiers externes",
        ],
        practicalLab: "Création d'un site SharePoint de département avec droits restreints et canal Teams synchronisé.",
        deliverable: "Espace collaboratif d'entreprise structuré avec politique de partage étanche.",
      },
      {
        month: 4,
        title: "Module 4 : Sécurité des Identités avec Microsoft Entra ID & MFA",
        duration: "Semaine 4 (6h)",
        objectives: "Protéger les comptes contre le vol d'identifiants grâce au MFA obligatoire et aux accès conditionnels.",
        topics: [
          "Introduction à Microsoft Entra ID (anciennement Azure AD) et gestion des rôles RBAC",
          "Activation obligatoire du MFA (authentification multifacteur) pour tous les employés",
          "Notions d'accès conditionnel et alertes de connexions suspectes ou à l'étranger",
        ],
        practicalLab: "Mise en place du MFA obligatoire sur l'ensemble des comptes et simulation de blocage d'accès suspect.",
        deliverable: "Rapport de conformité sécuritaire du tenant Microsoft 365.",
      },
    ],
    keyOutcomes: [
      "Autonomie totale pour administrer au quotidien un tenant Microsoft 365 d'entreprise",
      "Protection efficace de la messagerie contre le piratage et l'usurpation d'identité",
      "Structuration professionnelle des espaces Teams et SharePoint pour la collaboration",
      "Préparation à l'examen officiel de certification Microsoft MS-900",
    ],
    career: {
      targetRoles: [
        { title: "Administrateur Microsoft 365 Junior", desc: "Gestion des comptes, support utilisateur et maintien en conditions opérationnelles du cloud." },
        { title: "Technicien Support Bureautique & Cloud", desc: "Assistance aux employés sur Teams, Outlook, OneDrive et résolution des incidents." },
      ],
      sectors: ["Toutes entreprises privées et publiques utilisant la suite Office 365", "Sociétés d'infogérance et de services informatiques"],
      salarySenegal: {
        junior: "400 000 à 650 000 FCFA / mois",
        intermediate: "700 000 à 1 200 000 FCFA / mois",
        senior: "1 300 000+ FCFA / mois",
        context: "Compétence incontournable au Sénégal où la quasi-totalité des entreprises formelles s'appuie sur la suite Microsoft 365.",
      },
    },
  },

  // 7. CISCO CCNA (200-301)
  "cisco-ccna": {
    slug: "cisco-ccna",
    title: "Cisco CCNA (200-301) — Réseaux & Commutation",
    badge: "STANDARD MONDIAL &bull; 10 SEMAINES",
    category: "Réseaux & Télécoms",
    shortDesc:
      "Préparation approfondie à l'examen officiel de référence Cisco CCNA 200-301 : routage dynamique OSPF, commutation VLAN, Spanning Tree (STP), EtherChannel, sécurité niveau 2 et bases de l'automatisation réseau.",
    heroHeadline: "Validez la certification Cisco CCNA 200-301 et maîtrisez les infrastructures réseaux",
    heroDescription:
      "Le standard mondial absolu de l'ingénierie réseau. Travaux pratiques sur commutateurs Cisco Catalyst et routeurs physiques dans nos laboratoires de Dakar, simulations avancées Packet Tracer/GNS3 et examens blancs au format officiel Pearson VUE.",
    targetAudience: [
      "Techniciens et administrateurs réseaux en poste souhaitant formaliser leurs compétences",
      "Ingénieurs télécoms et systèmes préparant le passage de la certification CCNA",
      "Diplômés bac+2 à bac+5 en informatique visant une carrière solide dans les infrastructures",
    ],
    prerequisites: [
      "Compréhension de base de l'informatique et des systèmes d'exploitation",
      "Capacité à effectuer des calculs binaires élémentaires (adressage IP)",
    ],
    duration: "10 Semaines",
    hours: "60 heures de formation et travaux pratiques sur banc d'essai",
    pace: "Max 6h / semaine (cours du soir ou samedi matin)",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel sur racks réels Cisco à Dakar + Émulateurs GNS3/Packet Tracer",
    partnerLogos: [
      { name: "Cisco", logo: "/images/partners/cisco-color.svg" },
      { name: "Dell Technologies", logo: "/images/partners/dell-color.svg" },
      { name: "Paessler", logo: "/images/partners/paessler.svg" },
    ],
    targetCertifications: [
      {
        title: "Cisco Certified Network Associate (CCNA 200-301)",
        organization: "Cisco Systems",
        level: "Standard International de Référence",
        desc: "Examen officiel 200-301 sanctionnant la maîtrise des protocoles réseaux, du routage, de la commutation et de la sécurité d'entreprise.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Module 1 : Modèle OSI, Pile TCP/IP & Adressage IPv4/IPv6",
        duration: "Semaines 1 & 2 (12h)",
        objectives: "Maîtriser les couches réseaux, l'adressage IPv4/IPv6 et le découpage en sous-réseaux (VLSM).",
        topics: [
          "Modèle OSI 7 couches vs Modèle TCP/IP en profondeur",
          "Calculs de masques et découpage de sous-réseaux à longueur variable (VLSM)",
          "Adressage IPv6 : types d'adresses (Global Unicast, Link-Local) et SLAAC",
          "Prise en main de l'interface en ligne de commande Cisco IOS (modes User, Privilégié, Config)",
        ],
        practicalLab: "Plan d'adressage complet pour une entreprise multisite et configuration de base de routeurs Cisco.",
        deliverable: "Plan d'adressage IP validé et fichiers de configuration initiale IOS.",
      },
      {
        month: 2,
        title: "Module 2 : Commutation Ethernet, VLANs, Trunking & STP",
        duration: "Semaines 3 & 4 (12h)",
        objectives: "Configurer des commutateurs Cisco de campus avec segmentation VLAN, liaisons Trunk et redondance Spanning Tree.",
        topics: [
          "Fonctionnement des commutateurs : table CAM et apprentissage des adresses MAC",
          "Création de VLANs, ports d'accès et liaisons Trunking 802.1Q",
          "Protocole Spanning Tree (STP, Rapid-PVST+) et protection de topologie",
          "Agrégation de liens EtherChannel (LACP / PAgP) pour la bande passante et la haute disponibilité",
        ],
        practicalLab: "Maquettage physique d'un réseau commuté avec 4 VLANs, agrégation EtherChannel et prévention des boucles.",
        deliverable: "Architecture réseau de niveau 2 fonctionnelle et redondante.",
      },
      {
        month: 3,
        title: "Module 3 : Routage IP Inter-VLAN & Protocole Dynamique OSPF",
        duration: "Semaines 5 & 6 (12h)",
        objectives: "Assurer la communication entre sous-réseaux et déployer le routage dynamique d'entreprise OSPFv2/v3.",
        topics: [
          "Routage inter-VLAN (Router-on-a-stick et commutateurs multicouches Layer 3)",
          "Routage statique et routes par défaut flottantes",
          "Protocole de routage dynamique OSPF : états de voisinage, calcul du coût, zones (Single & Multi-Area)",
        ],
        practicalLab: "Configuration d'un réseau d'entreprise maillé avec OSPFv2 et routage inter-VLAN sur switch de niveau 3.",
        deliverable: "Table de routage optimisée et analyse de convergence avec Wireshark.",
      },
      {
        month: 4,
        title: "Module 4 : Services IP (DHCP, NAT, NTP) & Sécurité Réseau",
        duration: "Semaines 7 & 8 (12h)",
        objectives: "Configurer les services IP essentiels et blinder les commutateurs contre les attaques courantes.",
        topics: [
          "Configuration des services DHCP (serveur et relais) et DNS",
          "NAT / PAT statique et dynamique (surcharge d'adresse IP publique)",
          "Listes de contrôle d'accès (ACL IPv4 standard et étendue)",
          "Sécurité de niveau 2 : Port Security, DHCP Snooping et Dynamic ARP Inspection (DAI)",
        ],
        practicalLab: "Sécurisation complète d'une baie de brassage contre les attaques par usurpation ARP et épuisement DHCP.",
        deliverable: "Rapport de durcissement réseau et matrice ACL appliquée.",
      },
      {
        month: 5,
        title: "Module 5 : Wi-Fi, Automatisation Réseau & Examens Blancs CCNA",
        duration: "Semaines 9 & 10 (12h)",
        objectives: "Comprendre les architectures sans-fil d'entreprise, les bases de l'automatisation (REST, JSON) et réussir les examens blancs.",
        topics: [
          "Architectures sans-fil d'entreprise (WLC, bornes légères CAPWAP)",
          "Concepts d'automatisation : SDN, contrôleurs Cisco DNA Center, formats JSON, APIs REST",
          "Séries intensives d'examens blancs chronométrés sous conditions Pearson VUE (100 questions par session)",
        ],
        practicalLab: "Passage de 3 examens blancs complets avec analyse des questions pièges et correction individualisée.",
        deliverable: "Score d'aptitude CCNA supérieur à 85% et attestation de préparation complète.",
      },
    ],
    keyOutcomes: [
      "Maîtrise approfondie des technologies réseaux fondamentales utilisées dans 80% des entreprises",
      "Autonomie sur le déploiement et le dépannage de commutateurs et routeurs Cisco",
      "Préparation optimale pour décrocher la certification mondiale Cisco CCNA 200-301",
      "Reconnaissance immédiate sur le marché de l'emploi en Afrique et à l'international",
    ],
    career: {
      targetRoles: [
        { title: "Technicien Réseaux & Télécoms", desc: "Installation, câblage et configuration des équipements réseaux sur site." },
        { title: "Administrateur Réseaux d'Entreprise", desc: "Supervision, maintenance et évolution des architectures de commutation et routage." },
        { title: "Ingénieur Support Réseau N1 / N2", desc: "Résolution des incidents de connectivité chez des opérateurs ou grands comptes." },
      ],
      sectors: ["Opérateurs télécoms (Sonatel, Free, Expresso)", "Banques & Institutions financières de la zone UEMOA", "Fournisseurs d'accès Internet & Datacenters"],
      salarySenegal: {
        junior: "450 000 à 750 000 FCFA / mois",
        intermediate: "800 000 à 1 350 000 FCFA / mois",
        senior: "1 500 000 à 2 400 000+ FCFA / mois",
        context: "La certification Cisco CCNA demeure le sésame par excellence pour démarrer ou accélérer une carrière dans les infrastructures réseaux.",
      },
    },
  },

  // 8. GESTION DE PROJET IT
  "gestion-de-projet": {
    slug: "gestion-de-projet",
    title: "Gestion de Projet Informatique & Méthodes Agiles",
    badge: "MANAGEMENT IT &bull; 4 SEMAINES",
    category: "Management & Projets",
    shortDesc:
      "Pilotez des projets informatiques avec succès : cadrage, cahier des charges, planification (Gantt), gestion des budgets et des risques, rituels Agiles (Scrum, Kanban) et gouvernance ITIL.",
    heroHeadline: "Apprenez à cadrer, piloter et livrer vos projets technologiques dans les délais et budgets",
    heroDescription:
      "Trop de projets informatiques échouent faute de méthode. Ce cursus pragmatique transmet les outils éprouvés pour réussir le pilotage de vos chantiers IT : de l'expression des besoins au déploiement en production, en passant par le management des équipes et la gestion du changement.",
    targetAudience: [
      "Chefs de projet débutants ou confirmés souhaitant structurer leur méthodologie",
      "Ingénieurs et techniciens accédant à des responsabilités de coordination d'équipe",
      "Directeurs des systèmes d'information (DSI) et responsables métiers pilotant des prestataires",
    ],
    prerequisites: [
      "Expérience de travail en entreprise ou en environnement technologique",
      "Sens de l'organisation et intérêt pour le travail collaboratif",
    ],
    duration: "4 Semaines",
    hours: "24 heures d'ateliers et études de cas",
    pace: "Max 6h / semaine (cours du soir ou samedi matin)",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel à Dakar & Outils de gestion en ligne (Trello, Jira, MS Project)",
    partnerLogos: [
      { name: "Microsoft 365", logo: "/images/partners/microsoft.svg" },
      { name: "Dell Technologies", logo: "/images/partners/dell-color.svg" },
    ],
    targetCertifications: [
      {
        title: "Certificat de Chef de Projet IT - NOB TECHNOLOGIES",
        organization: "NOB TECHNOLOGIES",
        level: "Certificat Professionnel",
        desc: "Attestation de validation des compétences en cadrage, pilotage budgétaire et méthodologie agile.",
      },
      {
        title: "Préparation Scrum Master & ITIL 4 Foundation",
        organization: "PeopleCert / Scrum.org",
        level: "Standards Internationaux",
        desc: "Fondamentaux indispensables pour le passage des certifications mondiales de management de services et agilité.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Module 1 : Cadrage de Projet, Cahier des Charges & Parties Prenantes",
        duration: "Semaine 1 (6h)",
        objectives: "Traduire un besoin métier en objectifs SMART, rédiger un cahier des charges et cartographier les parties prenantes.",
        topics: [
          "Cycle de vie d'un projet informatique : Cadrage, Conception, Réalisation, Recette, Déploiement",
          "Rédaction d'une note de cadrage et d'un cahier des charges fonctionnel et technique (CCTP)",
          "Identification des parties prenantes, matrice RACI et gouvernance de projet",
        ],
        practicalLab: "Rédaction d'une note de cadrage complète pour le déploiement d'une nouvelle infrastructure réseau.",
        deliverable: "Note de cadrage et matrice RACI d'un projet technologique.",
      },
      {
        month: 2,
        title: "Module 2 : Planification, Budgétisation & Gestion des Risques",
        duration: "Semaine 2 (6h)",
        objectives: "Découper un projet en tâches (WBS), construire un planning Gantt et anticiper les risques de dérive.",
        topics: [
          "Structure de découpage du projet (WBS / PBS) et estimation des charges (jours/hommes)",
          "Planification temporelle, chemin critique et diagramme de Gantt",
          "Élaboration du budget prévisionnel et matrice des risques (probabilité x impact)",
        ],
        practicalLab: "Modélisation du planning complet et du budget prévisionnel d'un projet de migration ERP.",
        deliverable: "Planning Gantt et registre des risques d'un projet IT.",
      },
      {
        month: 3,
        title: "Module 3 : Méthodologies Agiles (Scrum, Kanban) & Outils Collaboratifs",
        duration: "Semaine 3 (6h)",
        objectives: "Piloter un projet en mode Agile : animation de sprints, gestion du Product Backlog et rituels Scrum.",
        topics: [
          "Manifeste Agile et comparaison cycle en V vs Agilité",
          "Rôles Scrum : Product Owner, Scrum Master, Équipe de développement",
          "Rituels Scrum : Sprint Planning, Daily Standup, Sprint Review, Rétrospective",
          "Outils de pilotage visuel : Jira Software, Trello, Azure DevOps",
        ],
        practicalLab: "Simulation d'un sprint Scrum complet avec création de User Stories et burndown chart sous Jira.",
        deliverable: "Tableau de sprint Agile configuré avec backlog priorisé.",
      },
      {
        month: 4,
        title: "Module 4 : Recette, Conduite du Changement & Clôture de Projet",
        duration: "Semaine 4 (6h)",
        objectives: "Organiser les phases de tests (recette utilisateur), accompagner les équipes et formaliser le bilan final.",
        topics: [
          "Cahier de recette, tests d'acceptation utilisateur (UAT) et gestion des anomalies",
          "Conduite du changement : formation des utilisateurs, plan de communication et adoption",
          "Bilan de clôture de projet (Post-Mortem), retour d'expérience et archivage documentaire",
        ],
        practicalLab: "Élaboration d'un plan de recette et soutenance finale d'un dossier de projet devant jury.",
        deliverable: "Cahier de recette validé et rapport de clôture de projet.",
      },
    ],
    keyOutcomes: [
      "Maîtrise des outils et méthodologies de gestion de projet éprouvés (cycle en V et Agile/Scrum)",
      "Capacité à respecter les délais et les budgets alloués pour les chantiers informatiques",
      "Compétence en animation d'équipe et négociation avec les prestataires externes",
      "Certification professionnelle NOB TECHNOLOGIES et préparation Scrum/ITIL",
    ],
    career: {
      targetRoles: [
        { title: "Chef de Projet Informatique / Digital", desc: "Pilotage complet des initiatives technologiques de l'entreprise." },
        { title: "Scrum Master / Facilitateur Agile", desc: "Accompagnement des équipes de développement dans la méthode Scrum." },
        { title: "Coordinateur Technique IT", desc: "Interface entre les équipes métiers et les techniciens d'infrastructure." },
      ],
      sectors: ["Grandes entreprises & Banques", "Sociétés d'ingénierie et intégrateurs", "Startups & Agences numériques"],
      salarySenegal: {
        junior: "500 000 à 800 000 FCFA / mois",
        intermediate: "900 000 à 1 500 000 FCFA / mois",
        senior: "1 600 000 à 2 600 000+ FCFA / mois",
        context: "Rôle stratégique très recherché pour éviter les dérapages budgétaires sur les grands projets de transformation numérique.",
      },
    },
  },

  // 9. CADRE DE CONFORMITE, NORMES ET REGLEMENTATIONS (NIST, ISO 27001 ETC)
  "cadre-conformite-normes-reglementations": {
    slug: "cadre-conformite-normes-reglementations",
    title: "Cadre de Conformité, Normes & Réglementations (NIST, ISO 27001)",
    badge: "GOUVERNANCE &bull; 6 SEMAINES",
    category: "Gouvernance & Conformité",
    shortDesc:
      "Maîtrisez les référentiels de gouvernance et conformité majeurs : ISO/IEC 27001:2022, NIST Cybersecurity Framework, réglementations sectorielles (BCEAO, CDP Sénégal) et audits de conformité.",
    heroHeadline: "Alignez la sécurité de votre organisation sur les plus hauts standards internationaux",
    heroDescription:
      "Destiné aux RSSI, auditeurs et directeurs des systèmes d'information. Apprenez à concevoir un Système de Management de la Sécurité de l'Information (SMSI), cartographier les risques avec EBIOS RM, appliquer les 93 mesures ISO 27001 et respecter la législation locale de protection des données.",
    targetAudience: [
      "Responsables de la Sécurité des SI (RSSI) et directeurs informatiques (DSI)",
      "Auditeurs internes, juristes d'entreprise et chargés de conformité (Compliance Officers)",
      "Consultants en gouvernance et sécurité des systèmes d'information",
    ],
    prerequisites: [
      "Bonne culture générale des systèmes d'information et des enjeux de sécurité",
      "Intérêt pour la gestion des risques organisationnels et les textes réglementaires",
    ],
    duration: "6 Semaines",
    hours: "36 heures d'études de cas et modélisation de conformité",
    pace: "Max 6h / semaine (cours du soir ou samedi matin)",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel à Dakar & Études de cas sectorielles (Banque, Télécoms, Santé)",
    partnerLogos: [
      { name: "Wallix", logo: "/images/partners/wallix.svg" },
      { name: "GateWatcher", logo: "/images/partners/gatewatcher.svg" },
      { name: "Kaspersky", logo: "/images/partners/kaspersky.svg" },
    ],
    targetCertifications: [
      {
        title: "PECB Certified ISO/IEC 27001 Lead Implementer (Préparation)",
        organization: "PECB",
        level: "Standard International Normatif",
        desc: "Préparation complète à l'examen officiel international pour implémenter un SMSI selon l'ISO 27001:2022.",
      },
      {
        title: "NIST Cybersecurity Framework (CSF 2.0) Practitioner",
        organization: "NIST / Standards US",
        level: "Référentiel International",
        desc: "Maîtrise des 6 fonctions fondamentales du NIST : Gouverner, Identifier, Protéger, Détecter, Répondre, Récupérer.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Module 1 : Norme ISO/IEC 27001:2022 & Conception d'un SMSI",
        duration: "Semaines 1 & 2 (12h)",
        objectives: "Comprendre les exigences des clauses 4 à 10 de l'ISO 27001 et structurer la gouvernance de sécurité.",
        topics: [
          "Structure de la norme ISO/IEC 27001:2022 et cycle PDCA (Plan-Do-Check-Act)",
          "Définition du périmètre du SMSI, politique de sécurité (PSSI) et engagement de la direction",
          "Les 93 mesures de sécurité de l'Annexe A (Organisationnelles, Personnes, Physiques, Technologiques)",
        ],
        practicalLab: "Rédaction d'une Déclaration d'Applicabilité (DdA) pour une entreprise de services financiers.",
        deliverable: "Dossier de Déclaration d'Applicabilité (DdA) conforme ISO 27001:2022.",
      },
      {
        month: 2,
        title: "Module 2 : Analyse des Risques Cyber & Méthodes Éprouvées (EBIOS RM / ISO 27005)",
        duration: "Semaines 3 & 4 (12h)",
        objectives: "Évaluer objectivement les risques pesant sur les actifs critiques et bâtir un plan de traitement des risques.",
        topics: [
          "Fondamentaux de la gestion des risques selon l'ISO 27005 et la méthode EBIOS RM",
          "Identification des événements redoutés, scénarios de menace et sources de risque",
          "Calcul du risque brut vs risque résiduel et élaboration du plan de traitement des risques (PTR)",
        ],
        practicalLab: "Atelier complet d'analyse de risques sur le système de paiement en ligne d'une banque partenaire.",
        deliverable: "Cartographie formelle des risques cyber et plan de traitement priorisé.",
      },
      {
        month: 3,
        title: "Module 3 : Référentiel NIST CSF, Réglementation BCEAO & CDP Sénégal",
        duration: "Semaines 5 & 6 (12h)",
        objectives: "Aligner son organisation sur le NIST CSF 2.0, les circulaires bancaires BCEAO et la loi sur les données personnelles.",
        topics: [
          "Le framework NIST CSF 2.0 : Gouverner, Identifier, Protéger, Détecter, Répondre, Récupérer",
          "Directives de sécurité de la BCEAO pour les banques et établissements financiers de l'UEMOA",
          "Conformité à la Commission de Protection des Données Personnelles (CDP) du Sénégal : déclarations et droits",
        ],
        practicalLab: "Audit de conformité d'une infrastructure avec grille croisée ISO 27001 / NIST / Circulaires BCEAO.",
        deliverable: "Rapport d'audit de conformité réglementaire avec plan d'actions correctives.",
      },
    ],
    keyOutcomes: [
      "Maîtrise opérationnelle des exigences de la norme ISO/IEC 27001:2022 et du NIST CSF",
      "Capacité à mener une analyse de risques formelle et rédiger une PSSI pour son organisation",
      "Connaissance des impératifs juridiques et bancaires ouest-africains (BCEAO, CDP)",
      "Préparation reconnue pour l'obtention des certifications PECB Lead Implementer / Auditor",
    ],
    career: {
      targetRoles: [
        { title: "Consultant Gouvernance, Risques & Conformité (GRC)", desc: "Accompagnement des entreprises vers les certifications ISO et la conformité légale." },
        { title: "Responsable de la Sécurité des SI (RSSI)", desc: "Définition et pilotage de la politique de sécurité des systèmes d'information." },
        { title: "Auditeur Interne Cybersécurité", desc: "Vérification périodique du respect des normes et des contrôles de sécurité." },
      ],
      sectors: ["Établissements bancaires & Fintechs régulées", "Opérateurs télécoms & Fournisseurs d'infrastructures critiques", "Cabinets d'audit internationaux (Big 4)"],
      salarySenegal: {
        junior: "600 000 à 950 000 FCFA / mois",
        intermediate: "1 000 000 à 1 800 000 FCFA / mois",
        senior: "1 900 000 à 3 200 000+ FCFA / mois",
        context: "La conformité étant une obligation légale pour les institutions financières et télécoms au Sénégal, ces profils bénéficient des plus hautes grilles de rémunération.",
      },
    },
  },

  // 10. ETHICAL HACKING
  "ethical-hacking": {
    slug: "ethical-hacking",
    title: "Ethical Hacking & Tests d'Intrusion (Pentest)",
    badge: "SÉCURITÉ OFFENSIVE &bull; 8 SEMAINES",
    category: "Cybersécurité Offensive",
    shortDesc:
      "Pensez comme un attaquant pour mieux défendre votre organisation : méthodologie de test d'intrusion, reconnaissance réseau, scan de failles, exploitation éthique, vulnérabilités Web OWASP et rédaction de rapports de remédiation.",
    heroHeadline: "Détectez les vulnérabilités avant les cybercriminels grâce au Ethical Hacking",
    heroDescription:
      "Immersion pratique dans l'art de l'évaluation offensive de sécurité en laboratoire isolé. Apprenez à utiliser les outils des hackers professionnels (Kali Linux, Nmap, Metasploit, Burp Suite, Wireshark), découvrez les failles applicatives et élaborez des recommandations techniques pour protéger les infrastructures.",
    targetAudience: [
      "Administrateurs systèmes et réseaux souhaitant acquérir des compétences en sécurité offensive",
      "Analystes en cybersécurité et consultants voulant réaliser des tests d'intrusion professionnels",
      "Passionnés d'informatique et techniciens préparant les certifications de pentesting (CEH, PenTest+)",
    ],
    prerequisites: [
      "Solides bases en réseaux TCP/IP (ports, protocoles, DNS, routage)",
      "Aisance avec la ligne de commande Linux (bash) et notions d'architecture Web",
      "Sens absolu de l'éthique professionnelle et de la légalité",
    ],
    duration: "8 Semaines",
    hours: "48 heures d'entraînement intensif sur labs CTF dédiés",
    pace: "Max 6h / semaine (cours du soir ou samedi matin)",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel à Dakar & Plateformes CTF (Capture The Flag) isolées",
    partnerLogos: [
      { name: "GateWatcher", logo: "/images/partners/gatewatcher.svg" },
      { name: "Wallix", logo: "/images/partners/wallix.svg" },
      { name: "Kaspersky", logo: "/images/partners/kaspersky.svg" },
    ],
    targetCertifications: [
      {
        title: "EC-Council Certified Ethical Hacker (CEH v12) - Préparation",
        organization: "EC-Council",
        level: "Standard Mondial Offensif",
        desc: "Examen officiel mondialement reconnu certifiant la maîtrise des méthodologies de hacking éthique.",
      },
      {
        title: "CompTIA PenTest+ (PT0-002) - Préparation",
        organization: "CompTIA",
        level: "Certification Internationale Pentest",
        desc: "Certification attestant des compétences complètes en planification, scan, exploitation et rapport de test d'intrusion.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Module 1 : Éthique Légale, Reconnaissance & Cartographie Réseau",
        duration: "Semaines 1 & 2 (12h)",
        objectives: "Comprendre le cadre juridique du pentest, collecter des informations en sources ouvertes (OSINT) et cartographier les cibles.",
        topics: [
          "Cadre juridique du test d'intrusion : conventions de preuve, règles d'engagement et législation",
          "Reconnaissance passive (OSINT) : DNS recon, Shodan, Google Dorking, Whois",
          "Reconnaissance active et cartographie : scan de ports avec Nmap, énumération des services et bannières",
        ],
        practicalLab: "Cartographie réseau complète d'un environnement d'entreprise simulé avec identification de l'ensemble des services exposés.",
        deliverable: "Rapport de reconnaissance et cartographie d'architecture cible.",
      },
      {
        month: 2,
        title: "Module 2 : Évaluation des Vulnérabilités & Exploitation Réseau",
        duration: "Semaines 3 & 4 (12h)",
        objectives: "Identifier les failles de sécurité avec des scanners de vulnérabilités et tester leur exploitabilité avec Metasploit.",
        topics: [
          "Scan de vulnérabilités automatisé avec Nessus, OpenVAS et Nikto",
          "Analyse des scores CVSS et identification des faux positifs",
          "Introduction au framework Metasploit : payloads, exploits, listeners et post-exploitation",
        ],
        practicalLab: "Exploitation d'une machine Windows/Linux non patchée en laboratoire isolé et capture de flag.",
        deliverable: "Rapport d'audit de vulnérabilités techniques avec preuve de concept (PoC).",
      },
      {
        month: 3,
        title: "Module 3 : Sécurité des Applications Web (OWASP Top 10)",
        duration: "Semaines 5 & 6 (12h)",
        objectives: "Identifier et tester les vulnérabilités majeures des sites et applications web avec Burp Suite.",
        topics: [
          "Interception des flux HTTP/HTTPS avec Burp Suite Community/Pro",
          "Injections SQL (SQLi), Cross-Site Scripting (XSS) et Cross-Site Request Forgery (CSRF)",
          "Défauts de contrôle d'accès (Broken Access Control) et mauvaise gestion des sessions",
        ],
        practicalLab: "Audit applicatif complet d'une boutique en ligne vulnérable avec exploitation éthique des failles OWASP.",
        deliverable: "Rapport de test d'intrusion Web avec correctifs de code recommandés.",
      },
      {
        month: 4,
        title: "Module 4 : Élévation de Privilèges, Post-Exploitation & Rédaction de Rapport",
        duration: "Semaines 7 & 8 (12h)",
        objectives: "Comprendre les mouvements latéraux, l'élévation de privilèges et rédiger un rapport d'audit exécutif.",
        topics: [
          "Techniques d'élévation de privilèges sous Linux (SUID, sudo) et Windows (services non sécurisés)",
          "Nettoyage des traces et analyse de l'exposition",
          "Rédaction du rapport d'audit professionnel : synthèse managériale pour la direction et détails techniques pour l'équipe IT",
        ],
        practicalLab: "Challenge CTF final chronométré : intrusion complète sur serveur cible et rédaction du rapport d'audit.",
        deliverable: "Rapport de test d'intrusion professionnel complet remis au jury.",
      },
    ],
    keyOutcomes: [
      "Compréhension approfondie des tactiques et techniques réelles employées par les cyberattaquants",
      "Maîtrise des outils incontournables du pentest (Kali Linux, Burp Suite, Nmap, Metasploit)",
      "Capacité à rédiger un rapport d'audit professionnel avec préconisations de remédiation claires",
      "Excellente préparation aux certifications d'élite CEH et CompTIA PenTest+",
    ],
    career: {
      targetRoles: [
        { title: "Pentesteur / Hacker Éthique Junior", desc: "Réalisation de tests d'intrusion techniques sur les applications et réseaux d'entreprises." },
        { title: "Consultant en Sécurité Offensive", desc: "Audits de sécurité, exercices de Red Team et évaluation des défenses d'entreprise." },
        { title: "Analyste Vulnérabilités & Remédiation", desc: "Veille sur les failles zéro-day et pilotage des campagnes de correction sécuritaire." },
      ],
      sectors: ["Sociétés spécialisées en cybersécurité & Cabinets d'audit", "Banques, assurances & Télécoms", "Grandes entreprises & Éditeurs de logiciels"],
      salarySenegal: {
        junior: "550 000 à 900 000 FCFA / mois",
        intermediate: "1 000 000 à 1 800 000 FCFA / mois",
        senior: "1 900 000 à 3 000 000+ FCFA / mois",
        context: "L'expertise en Ethical Hacking est l'une des compétences les plus valorisées et respectées dans le domaine de la tech en Afrique.",
      },
    },
  },
};
