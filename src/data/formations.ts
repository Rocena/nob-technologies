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
    badge: "DSI & Équipes IT",
    subtitle: "Montée en compétences sur-mesure pour vos collaborateurs",
    description:
      "Programme intra ou inter-entreprises adapté à vos impératifs de production. Déploiement sur vos infrastructures ou dans nos laboratoires à Dakar.",
    features: [
      "Calendrier et horaires flexibles selon vos contraintes d'activité",
      "Exercices et labs ciblés sur l'architecture réseau de votre entreprise",
      "Rapports d'assiduité et bilan d'évaluation individuel remis à la DSI / RH",
      "Éligible au financement par le 3FPT et les budgets formation continue",
    ],
    rhythm: "Sur-mesure (intra-entreprise ou max 6h/semaine)",
  },
  {
    id: "bootcamp",
    title: "Bootcamp Intensif",
    badge: "Accélérateur Pratique",
    subtitle: "Immersion rapide axée 100% sur la pratique et l'examen",
    description:
      "Format condensé et dynamique pour les techniciens et ingénieurs souhaitant valider rapidement leurs certifications officielles constructeurs.",
    features: [
      "Travaux pratiques intensifs sur baies réelles et simulateurs",
      "Batterie d'examens blancs chronométrés sous conditions Pearson VUE",
      "Mentorat individuel par des consultants et ingénieurs certifiés seniors",
      "Vouchers d'examen et préparation directe aux épreuves",
    ],
    rhythm: "Sessions intensives ciblées (max 6h / semaine)",
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
  "preparation-certifications-it": {
    slug: "preparation-certifications-it",
    title: "Préparation aux Certifications IT & Réseaux",
    badge: "PROGRAMME INTENSIF 6 MOIS &bull; EXPERT IT",
    shortDesc:
      "Cycle d'entraînement technique de haut niveau sur 6 mois pour réussir les examens internationaux Cisco CCNA/CCNP, Fortinet NSE, Sophos et CompTIA Security+.",
    heroHeadline: "Maîtrisez les infrastructures réseaux et validez vos certifications internationales",
    heroDescription:
      "Un cursus professionnalisant conçu pour les administrateurs systèmes, ingénieurs réseaux et techniciens IT souhaitant maximiser leur taux de réussite aux certifications des constructeurs de référence (Cisco, Fortinet, Sophos, CompTIA). Accompagnement rigoureux, labs sur matériel réel et examens blancs.",
    targetAudience: [
      "Techniciens et administrateurs réseaux en poste ou en évolution",
      "Ingénieurs télécoms et systèmes souhaitant formaliser leur expertise",
      "Équipes IT d'entreprises préparant une montée en compétences",
      "Diplômés bac+3/bac+5 en informatique visant une spécialisation reconnue",
    ],
    prerequisites: [
      "Bases solides des systèmes d'exploitation (Windows, Linux)",
      "Compréhension élémentaire du modèle OSI et de l'adressage IP",
      "Motivation pour un investissement régulier (cours du soir ou sessions intensives)",
    ],
    duration: "6 Mois (24 semaines)",
    hours: "Max 6h / semaine (cours du soir ou samedi matin)",
    pace: "Max 6h / semaine",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel dans nos Labs à Dakar + Accès plateformes virtuelles 24/7",
    partnerLogos: [
      { name: "Cisco", logo: "/images/partners/cisco-color.svg" },
      { name: "Fortinet", logo: "/images/partners/fortinet.svg" },
      { name: "Sophos", logo: "/images/partners/sophos.svg" },
      { name: "Dell Technologies", logo: "/images/partners/dell-color.svg" },
      { name: "UBIKA / Paessler", logo: "/images/partners/ubika-paessler.svg" },
    ],
    targetCertifications: [
      {
        title: "Cisco Certified Network Associate (CCNA 200-301)",
        organization: "Cisco Systems",
        level: "Certification Constructeur",
        desc: "Examen officiel 200-301 sanctionnant la maîtrise des protocoles de routage (OSPF), de la commutation VLAN, des services IP d'entreprise et des bases de l'automatisation réseau.",
      },
      {
        title: "Fortinet Certified Professional (FCP) - Network Security",
        organization: "Fortinet",
        level: "Certification Constructeur",
        desc: "Examen officiel Fortinet (FortiGate Administrator) validant la configuration avancée des appliances pare-feux FortiGate, les politiques de sécurité, l'inspection SSL et les tunnels VPN IPsec/SSL.",
      },
      {
        title: "Sophos Certified Engineer - Sophos Firewall",
        organization: "Sophos",
        level: "Certification Constructeur",
        desc: "Accréditation technique officielle constructeur validant le déploiement des pare-feux Sophos XGS, la protection Synchronized Security avec Intercept X et la défense contre les menaces avancées.",
      },
      {
        title: "CompTIA Security+ (SY0-701)",
        organization: "CompTIA",
        level: "Standard International (ISO 17024)",
        desc: "Examen officiel SY0-701 reconnu mondialement, attestant des compétences indispensables en sécurité des réseaux d'entreprise, gestion des vulnérabilités, cryptographie et conformité.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Fondamentaux Réseau Avancés & Architecture Cisco",
        duration: "Semaines 1 à 4 (max 6h / semaine)",
        objectives: "Maîtriser l'adressage IPv4/IPv6, le découpage en sous-réseaux (VLSM), la commutation de niveau 2 et le modèle hiérarchique.",
        topics: [
          "Modèle OSI et pile TCP/UDP en profondeur",
          "Adressage IPv4, IPv6 et calculs de masques VLSM",
          "Configuration des commutateurs Cisco Catalyst, VLANs, Trunking 802.1Q",
          "Spanning Tree Protocol (STP, RSTP) et agrégation de liens EtherChannel",
        ],
        practicalLab: "Maquettage complet d'un réseau de campus avec VLANs segmentés et redondance STP sous GNS3 et racks réels.",
        deliverable: "Architecture réseau validée avec schéma d'adressage et fichier de configuration conforme aux normes constructeur.",
      },
      {
        month: 2,
        title: "Routage Dynamique, Services IP & Sécurité de Niveau 2",
        duration: "Semaines 5 à 8 (max 6h / semaine)",
        objectives: "Configurer les protocoles de routage dynamique et blinder l'accès réseau contre les attaques courantes.",
        topics: [
          "Routage statique, routage dynamique OSPFv2 et OSPFv3 multi-zones",
          "Services DHCP Snooping, Dynamic ARP Inspection (DAI) et Port Security",
          "Listes de contrôle d'accès (ACL IPv4 standard et étendue)",
          "NAT / PAT statique et dynamique, translation d'adresses d'entreprise",
        ],
        practicalLab: "Mise en œuvre d'une topologie multi-sites avec OSPF, isolation par ACLs et durcissement des ports contre l'usurpation.",
        deliverable: "Rapport de sécurisation de niveau 2 avec tests d'intrusion simulés et validation des tables de routage.",
      },
      {
        month: 3,
        title: "Firewalls Nouvelle Génération & Administration Fortinet FortiGate",
        duration: "Semaines 9 à 12 (max 6h / semaine)",
        objectives: "Prendre en main les boîtiers FortiGate et déployer une politique périmétrique zéro-trust robuste.",
        topics: [
          "Architecture FortiOS et modes de déploiement (NAT/Route vs Transparent)",
          "Politiques de pare-feu, objets réseau, inspection de contenu et antivirus de flux",
          "Filtrage Web, contrôle applicatif et inspection SSL/TLS en profondeur",
          "Haute disponibilité (Cluster HA Actif/Passif et Actif/Actif)",
        ],
        practicalLab: "Déploiement d'un cluster FortiGate virtuel avec règles de filtrage d'entreprise, profils de sécurité et inspection SSL.",
        deliverable: "Matrice de flux sécurisée et configuration d'un cluster FortiGate prête pour la production.",
      },
      {
        month: 4,
        title: "VPNs Sécurisés, SD-WAN & Pare-feu Sophos XGS",
        duration: "Semaines 13 à 16 (max 6h / semaine)",
        objectives: "Interconnecter les succursales de manière chiffrée et déployer la solution pare-feu Sophos.",
        topics: [
          "Tunnels IPsec site-à-site avec chiffrement IKEv2 et clés pré-partagées",
          "Accès nomade sécurisé SSL-VPN avec authentification multifacteur (MFA)",
          "Découverte de Sophos Firewall OS (SFOS) et architecture Xstream",
          "Sécurité synchronisée Sophos : communication heartbeat entre poste et firewall",
        ],
        practicalLab: "Interconnexion de deux sites distants via IPsec VPN avec basculement automatique et déploiement Sophos Intercept X.",
        deliverable: "Scénario de secours réseau opérationnel avec rapport de validation des flux VPN chiffrés.",
      },
      {
        month: 5,
        title: "Supervision, Durcissement & Principes CompTIA Security+",
        duration: "Semaines 17 à 20 (max 6h / semaine)",
        objectives: "Surveiller proactivement l'infrastructure et intégrer les standards internationaux de sécurité.",
        topics: [
          "Surveillance proactive des flux réseau avec PRTG Network Monitor (Paessler)",
          "Gestion des logs, syslog centralisé, analyse de bande passante et détection d'anomalies",
          "Gestion des identités, politiques de mots de passe, contrôle d'accès RBAC",
          "Principes de cryptographie, certificats X.509, PKI et gestion des vulnérabilités",
        ],
        practicalLab: "Mise en place d'un tableau de bord de supervision PRTG avec sondes de santé et alertes automatiques en temps réel.",
        deliverable: "Plateforme de supervision opérationnelle et guide d'audit de sécurité selon le référentiel Security+.",
      },
      {
        month: 6,
        title: "Examens Blancs Intensifs, Coaching & Passage de Certifications",
        duration: "Semaines 21 à 24 (max 6h / semaine)",
        objectives: "Réussir l'examen officiel de certification grâce à un entraînement intensif en conditions réelles.",
        topics: [
          "Séries d'examens blancs chronométrés sur plateformes officielles de préparation",
          "Analyse détaillée de chaque question piège et remédiation personnalisée",
          "Conseils méthodologiques pour la gestion du temps le jour de l'épreuve Pearson VUE",
          "Dossier technique de synthèse et plan de carrière certifié",
        ],
        practicalLab: "Passage de 4 examens blancs complets (CCNA, Fortinet, Sophos, Sec+) avec score seuil de 85% exigé.",
        deliverable: "Badge d'aptitude NOB TECHNOLOGIES et bon de réduction/voucher d'examen pour le centre de test.",
      },
    ],
    keyOutcomes: [
      "Maîtrise opérationnelle sur les équipements phares du marché africain et international",
      "Préparation rigoureuse et structurée maximisant les chances de succès dès le 1er passage",
      "Portfolio de projets concrets et labs documentés à valoriser auprès des recruteurs",
      "Réseau professionnel et parrainage technique par les ingénieurs seniors de NOB TECH",
    ],
    career: {
      targetRoles: [
        {
          title: "Administrateur Réseaux & Sécurité",
          desc: "Gestion quotidienne des commutateurs Cisco, routage OSPF, segmentation VLAN et maintien de la sécurité opérationnelle.",
        },
        {
          title: "Ingénieur Déploiement Firewalls (Fortinet / Sophos)",
          desc: "Mise en service des appliances de sécurité périmétrique, politiques de filtrage, inspection SSL et VPNs d'interconnexion.",
        },
        {
          title: "Technicien Réseaux & Datacenter N2 / N3",
          desc: "Résolution des incidents d'infrastructure complexes, supervision SNMP/PRTG et maintenance des équipements en baie.",
        },
        {
          title: "Consultant Infrastructure Réseau Junior",
          desc: "Audit technique, assistance à maîtrise d'ouvrage et participation aux projets de refonte réseau d'entreprise.",
        },
      ],
      sectors: [
        "Opérateurs Télécoms & FAI (Orange / Sonatel, Free Sénégal, Expresso)",
        "Secteur Bancaire & Établissements Financiers (BCEAO, SGBS, CBAO, Ecobank, BHS)",
        "Sociétés de Services Numériques (ESN / SSII) & Intégrateurs Réseaux à Dakar",
        "Multinationales, Sièges Régionaux & Grandes ONG Internationales",
        "Institutions Publiques & Agences Gouvernementales (SENUM SA, Douanes, Port Autonome)",
      ],
      salarySenegal: {
        junior: "450 000 à 700 000 FCFA / mois",
        intermediate: "800 000 à 1 350 000 FCFA / mois",
        senior: "1 500 000 à 2 400 000+ FCFA / mois",
        context:
          "Salaires nets indicatifs observés à Dakar pour les profils certifiés Cisco (CCNA) et Fortinet (NSE4/FCP). Les profils bilingues intervenant sur des missions régionales ou pour des multinationales accèdent aux tranches supérieures.",
      },
    },
  },

  "cybersecurite-audit": {
    slug: "cybersecurite-audit",
    title: "Cybersécurité Offensive, Défensive & Audit d'Entreprise",
    badge: "PROGRAMME INTENSIF 6 MOIS &bull; CYBERSÉCURITÉ",
    shortDesc:
      "Cursus d'excellence sur 6 mois dédié à la gouvernance de la sécurité des systèmes d'information, à l'audit ISO 27001, à l'analyse SOC et aux tests de pénétration.",
    heroHeadline: "Protégez les actifs critiques et devenez le garant de la sécurité de votre organisation",
    heroDescription:
      "Face à la prolifération des attaques ciblées, ransomwares et fraudes informatiques, NOB TECHNOLOGIES forme vos experts aux méthodologies de défense en profondeur, à l'audit organisationnel et à la surveillance opérationnelle via SOC.",
    targetAudience: [
      "Responsables de la Sécurité des Systèmes d'Information (RSSI) juniors ou en prise de fonction",
      "Auditeurs internes, consultants en gouvernance informatique et conformité",
      "Ingénieurs systèmes et réseaux souhaitant se spécialiser dans le domaine de la cyberdéfense",
      "Analystes en sécurité et techniciens support de niveau 2/3",
    ],
    prerequisites: [
      "Solides compétences en réseaux d'entreprise (TCP/IP, routage, DNS)",
      "Connaissance des environnements Windows Server et Linux",
      "Sens aigu de l'éthique professionnelle et de la confidentialité",
    ],
    duration: "6 Mois (24 semaines)",
    hours: "Max 6h / semaine (cours du soir ou samedi matin)",
    pace: "Max 6h / semaine",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel à Dakar ou classe virtuelle interactive pour professionnels",
    partnerLogos: [
      { name: "GateWatcher", logo: "/images/partners/gatewatcher.svg" },
      { name: "Kaspersky", logo: "/images/partners/kaspersky.svg" },
      { name: "Wallix", logo: "/images/partners/wallix.svg" },
      { name: "Allot", logo: "/images/partners/allot.svg" },
      { name: "BeyondTrust", logo: "/images/partners/beyondtrust.svg" },
    ],
    targetCertifications: [
      {
        title: "PECB Certified ISO/IEC 27001 Lead Implementer",
        organization: "PECB",
        level: "Standard International Normatif",
        desc: "Examen officiel international certifiant la capacité à concevoir, déployer, piloter et auditer un Système de Management de la Sécurité de l'Information (SMSI) conforme au standard ISO/IEC 27001:2022.",
      },
      {
        title: "CompTIA CySA+ (Cybersecurity Analyst CS0-003)",
        organization: "CompTIA",
        level: "Certification Internationale SOC & Blue Team",
        desc: "Examen officiel CS0-003 validant les compétences opérationnelles en surveillance SOC, corrélation SIEM, analyse des journaux de sécurité, Threat Intelligence et réponse aux incidents critiques.",
      },
      {
        title: "EC-Council Certified Ethical Hacker (CEH v12)",
        organization: "EC-Council",
        level: "Certification Internationale Offensive",
        desc: "Examen officiel 312-50 mondialement reconnu certifiant la maîtrise des méthodologies de tests d'intrusion (pentest) éthiques : cartographie réseau, scan de vulnérabilités, exploitation et recommandations de remédiation.",
      },
      {
        title: "WALLIX Certified Administrator (WCA) - Bastion PAM",
        organization: "WALLIX Group",
        level: "Certification Constructeur",
        desc: "Certification officielle constructeur validant l'architecture et l'administration du Bastion WALLIX, la gestion des coffres-forts de mots de passe et la protection contre le vol d'identifiants à hauts privilèges.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Gouvernance Cyber, Analyse des Risques & Norme ISO 27001",
        duration: "Semaines 1 à 4 (max 6h / semaine)",
        objectives: "Comprendre l'écosystème réglementaire, cartographier les actifs critiques et structurer une PSSI.",
        topics: [
          "Paysage des cybermenaces contemporaines et typologie des attaquants",
          "Cadre normatif ISO/IEC 27001:2022 et Déclaration d'Applicabilité (DdA)",
          "Méthodes d'analyse de risques (EBIOS RM, ISO 27005)",
          "Rédaction d'une Politique de Sécurité des Systèmes d'Information (PSSI) réaliste",
        ],
        practicalLab: "Étude de cas complète : réalisation de la cartographie des risques et rédaction de la PSSI pour un établissement financier régional.",
        deliverable: "Dossier d'analyse de risques formalisé et charte informatique validée.",
      },
      {
        month: 2,
        title: "Cyber-Hygiène, Sensibilisation & Sécurité des Identités (IAM / PAM)",
        duration: "Semaines 5 à 8 (max 6h / semaine)",
        objectives: "Réduire la vulnérabilité humaine et blinder l'accès aux comptes à privilèges.",
        topics: [
          "Vecteurs d'ingénierie sociale, techniques d'hameçonnage (phishing, spear-phishing, vishing)",
          "Conception et pilotage de campagnes de faux phishing pédagogiques",
          "Gestion des identités et des accès (IAM) : Annuaire Active Directory, Azure AD / Entra ID",
          "Gestion des comptes à privilèges (PAM avec Wallix Bastion et BeyondTrust)",
        ],
        practicalLab: "Mise en place d'une passerelle PAM Wallix pour sécuriser et enregistrer les sessions SSH et RDP des administrateurs.",
        deliverable: "Politique de gestion des identités et rapport d'impact d'une campagne de simulation de phishing.",
      },
      {
        month: 3,
        title: "Audit Technique de Vulnérabilités & Pentest Fondamental",
        duration: "Semaines 9 à 12 (max 6h / semaine)",
        objectives: "Identifier les failles de sécurité avant que les cybercriminels ne les exploitent.",
        topics: [
          "Phases d'un test d'intrusion : Reconnaissance, Scanning, Énumération, Exploitation",
          "Outils de cartographie et scans : Nmap, Nessus, OpenVAS, Wireshark",
          "Vulnérabilités Web majeures (OWASP Top 10 : Injections SQL, XSS, CSRF)",
          "Mécanismes de durcissement (Hardening des serveurs Linux et Windows)",
        ],
        practicalLab: "Audit technique complet d'une infrastructure d'entreprise fictive vulnérable en environnement isolé.",
        deliverable: "Rapport d'audit de vulnérabilités professionnel avec matrice de criticité CVSS et plan de remédiation priorisé.",
      },
      {
        month: 4,
        title: "Surveillance SOC, SIEM & Détection NDR Assistée par IA",
        duration: "Semaines 13 à 16 (max 6h / semaine)",
        objectives: "Mettre en œuvre les briques de détection et surveiller le réseau contre les attaques avancées.",
        topics: [
          "Architecture d'un Security Operations Center (SOC) : rôles N1, N2, N3",
          "Centralisation des événements et corrélation SIEM (Wazuh, Splunk, Elastic SIEM)",
          "Analyse comportementale du trafic réseau (NDR avec technologies GateWatcher)",
          "Détection des exfiltrations de données, attaques DDoS (Allot) et mouvements latéraux",
        ],
        practicalLab: "Déploiement d'un agent SIEM et analyse en direct d'une attaque simulée avec génération d'alertes SOC.",
        deliverable: "Tableau de bord de monitoring SOC et règles de corrélation personnalisées.",
      },
      {
        month: 5,
        title: "Réponse à Incident, Forensics & Continuité d'Activité (PCA/PRA)",
        duration: "Semaines 17 à 20 (max 6h / semaine)",
        objectives: "Réagir avec méthode lors d'une crise cyber pour limiter l'impact et préserver la preuve.",
        topics: [
          "Cycle de vie de la gestion d'incidents (NIST SP 800-61 / ISO 27035)",
          "Premiers réflexes d'isolation et collecte de preuves numériques (Forensics)",
          "Gestion d'une crise ransomware : communication de crise et restauration (Acronis / Veritas)",
          "Élaboration d'un Plan de Continuité d'Activité (PCA) et de Reprise après Sinistre (PRA)",
        ],
        practicalLab: "Simulation de crise en cellule de crise : prise en charge d'une cyberattaque fictive en direct avec reconstitution des faits.",
        deliverable: "Guide opératoire de réponse à incident (Playbook) et procédure d'escalade.",
      },
      {
        month: 6,
        title: "Audit Blanc Organisationnel, Soutenance & Rapport Exécutif",
        duration: "Semaines 21 à 24 (max 6h / semaine)",
        objectives: "Valider les acquis par un audit blanc en situation réelle et présenter les conclusions à un jury.",
        topics: [
          "Conduite d'un audit blanc selon les 93 mesures de l'ISO 27001:2022",
          "Rédaction du rapport d'audit pour le comité de direction (vulgarisation technique)",
          "Préparation aux certifications professionnelles (PECB ISO 27001, CompTIA CySA+)",
          "Soutenance orale individuelle devant les ingénieurs seniors de NOB TECHNOLOGIES",
        ],
        practicalLab: "Audit blanc croisé entre apprenants sur des infrastructures réelles d'entraînement.",
        deliverable: "Rapport d'audit exécutif final et attestation de formation d'excellence NOB TECHNOLOGIES.",
      },
    ],
    keyOutcomes: [
      "Capacité à concevoir, auditer et faire évoluer la posture de cybersécurité d'une grande entreprise",
      "Maîtrise des outils de référence utilisés par les SOC modernes",
      "Éligibilité immédiate à des fonctions très demandées : RSSI adjoint, auditeur cyber, analyste SOC",
      "Accompagnement méthodologique pour le passage des certifications internationales PECB et CompTIA",
    ],
    career: {
      targetRoles: [
        {
          title: "Analyste SOC (Security Operations Center) N1 / N2",
          desc: "Surveillance des alertes de sécurité en temps réel, corrélation des événements SIEM et qualification des incidents d'intrusion.",
        },
        {
          title: "Consultant Cybersécurité & Audit ISO 27001",
          desc: "Audit de conformité organisationnelle, analyse de risques EBIOS RM et accompagnement des entreprises vers la certification.",
        },
        {
          title: "Responsable de la Sécurité des SI (RSSI) Adjoint",
          desc: "Déploiement de la politique de sécurité (PSSI), sensibilisation du personnel et gestion des plans de continuité d'activité (PCA/PRA).",
        },
        {
          title: "Ingénieur Sécurité Opérationnelle & PAM",
          desc: "Administration des coffres-forts numériques de mots de passe, bastion Wallix et durcissement des accès à privilèges.",
        },
      ],
      sectors: [
        "Banques, Assurances & Fintechs (Secteurs soumis à la stricte réglementation cyber BCEAO)",
        "Opérateurs Télécoms, Datacenters souverains & Cloud providers à Dakar",
        "Cabinets d'Audit International (Big 4 : PwC, Deloitte, EY, KPMG) & Cabinets Conseils",
        "Grandes Entreprises Industrielles, Énergie, Mines, Pétrole & Gaz au Sénégal",
        "Agences Nationales de Cyberdéfense, Ministères & Défense / Renseignement",
      ],
      salarySenegal: {
        junior: "500 000 à 850 000 FCFA / mois",
        intermediate: "900 000 à 1 600 000 FCFA / mois",
        senior: "1 700 000 à 2 800 000+ FCFA / mois",
        context:
          "La forte pénurie de profils cyber qualifiés au Sénégal et dans l'espace UEMOA fait de la sécurité des SI l'un des domaines les mieux payés à Dakar, avec une prime majeure accordée aux certifiés ISO 27001, CEH et CompTIA CySA+.",
      },
    },
  },

  "automatisation-ia": {
    slug: "automatisation-ia",
    title: "Automatisation d'Entreprise, DevOps & Intelligence Artificielle",
    badge: "PROGRAMME INTENSIF 6 MOIS &bull; AUTOMATISATION & IA",
    shortDesc:
      "Parcours professionnalisant sur 6 mois pour transformer les opérations métiers : orchestrateurs de workflows n8n, scripts Python, connecteurs ERP (Dolibarr, Odoo) et agents IA d'entreprise.",
    heroHeadline: "Modernisez les opérations de votre entreprise grâce aux flux automatisés et à l'IA",
    heroDescription:
      "Gagnez des centaines d'heures par mois en éliminant les tâches manuelles répétitives. Ce programme vous apprend à orchestrer les systèmes d'information modernes, connecter vos ERP et déployer des agents d'intelligence artificielle appliqués au monde réel des affaires.",
    targetAudience: [
      "Développeurs web et logiciels souhaitant acquérir une compétence rare en automatisation d'entreprise",
      "Consultants ERP et chefs de projet digital en charge de la transformation numérique",
      "Directeurs des opérations (COO) et responsables métiers voulant industrialiser leurs processus",
      "Administrateurs systèmes évoluant vers des postes DevOps & intégration cloud",
    ],
    prerequisites: [
      "Notions de base de programmation (JavaScript, Python ou tout langage de script)",
      "Familiarité avec les formats de données web (JSON, CSV)",
      "Intérêt prononcé pour la productivité opérationnelle et l'intelligence artificielle",
    ],
    duration: "6 Mois (24 semaines)",
    hours: "Max 6h / semaine (cours du soir ou samedi matin)",
    pace: "Max 6h / semaine",
    offerings: DEFAULT_FORMATION_OFFERINGS,
    format: "Présentiel ou distanciel interactif avec serveurs dédiés mis à disposition",
    partnerLogos: [
      { name: "Microsoft 365", logo: "/images/partners/microsoft.svg" },
      { name: "VMware", logo: "/images/partners/vmware.svg" },
      { name: "Dell Technologies", logo: "/images/partners/dell-color.svg" },
    ],
    targetCertifications: [
      {
        title: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
        organization: "Microsoft",
        level: "Certification Constructeur Cloud & IA",
        desc: "Examen officiel AI-102 validant la conception et le déploiement en environnement d'entreprise de solutions d'IA : intégration Azure OpenAI, modèles LLM personnalisés, architectures RAG et agents cognitifs.",
      },
      {
        title: "PCAP™ – Certified Associate in Python Programming",
        organization: "Python Institute (OpenEDG)",
        level: "Certification Internationale Professionnelle",
        desc: "Examen officiel PCAP-31-03 certifiant la maîtrise avancée de la programmation Python : automatisation des processus informatiques, traitement de flux de données massifs, connecteurs d'APIs REST et scripts d'intégration.",
      },
      {
        title: "Microsoft Certified: Power Automate RPA Developer Associate (PL-500)",
        organization: "Microsoft",
        level: "Certification Constructeur Automatisation",
        desc: "Examen officiel PL-500 sanctionnant la conception de solutions d'automatisation des processus robotisés (RPA) de bout en bout, l'orchestration des flux de travail entre ERP (Odoo, Dolibarr), CRM et outils cloud.",
      },
      {
        title: "Linux Professional Institute LPIC-1 (Examens 101-500 & 102-500)",
        organization: "Linux Professional Institute (LPI)",
        level: "Certification Internationale DevOps & Linux",
        desc: "Double examen officiel certifiant l'administration système Linux en entreprise, la conteneurisation Docker, l'automatisation de scripts et l'hébergement sécurisé des serveurs de workflows (n8n) et bases de données.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Architecture des Systèmes Modernes, HTTP & APIs REST",
        duration: "Semaines 1 à 4 (max 6h / semaine)",
        objectives: "Comprendre les protocoles d'échange de données entre applications d'entreprise.",
        topics: [
          "Architecture client-serveur et protocoles HTTP/HTTPS (méthodes GET, POST, PUT, DELETE)",
          "Structures de données JSON, XML et validation de schémas",
          "Mécanismes d'authentification : API Keys, Basic Auth, Bearer Tokens et OAuth2",
          "Tests et documentation d'APIs professionnelles avec Postman et Swagger",
        ],
        practicalLab: "Connexion et synchronisation en direct entre deux plateformes SaaS via leurs APIs ouvertes.",
        deliverable: "Collection Postman complète documentant l'ensemble des flux d'intégration d'une entreprise.",
      },
      {
        month: 2,
        title: "Orchestration de Processus Métiers avec n8n Auto-Hébergé",
        duration: "Semaines 5 à 8 (max 6h / semaine)",
        objectives: "Déployer la plateforme open source n8n et automatiser des processus complexes sans friction.",
        topics: [
          "Déploiement et sécurisation de n8n sur serveur Linux avec Docker et SSL",
          "Déclencheurs (triggers), Webhooks entrants et tâches planifiées (Cron)",
          "Transformation de données, filtres, boucles et manipulation de collections complexes",
          "Gestion des erreurs, mécanismes de retry et alertes de défaillance instantanées",
        ],
        practicalLab: "Mise en place d'un workflow automatisé complet : capture de prospect web > qualification > création de fiche client > envoi de notification WhatsApp/Slack.",
        deliverable: "Instance n8n sécurisée en production exécutant des workflows automatisés critiques.",
      },
      {
        month: 3,
        title: "Scripting Python Avancé pour l'Automatisation de Données",
        duration: "Semaines 9 à 12 (max 6h / semaine)",
        objectives: "Développer des scripts Python autonomes pour le traitement et la consolidation de données massives.",
        topics: [
          "Bibliothèques incontournables : requests, pandas, openpyxl, pydantic",
          "Extraction, nettoyage et consolidation de données hétérogènes (Excel, CSV, PDF)",
          "Connexion sécurisée aux bases de données relationnelles (PostgreSQL, MySQL)",
          "Packaging en tâches autonomes (scripts de nuit, conteneurs légers)",
        ],
        practicalLab: "Création d'un robot d'extraction générant automatiquement le rapport de trésorerie consolidé hebdomadaire à partir de multiples sources bancaires.",
        deliverable: "Script Python modulaire testé avec logging exhaustif et exécution planifiée.",
      },
      {
        month: 4,
        title: "Intégration d'ERP d'Entreprise : Dolibarr & Odoo",
        duration: "Semaines 13 à 16 (max 6h / semaine)",
        objectives: "Relier les systèmes de gestion d'entreprise (ERP) au reste de l'écosystème numérique.",
        topics: [
          "Architecture et modèle de données des ERP open source majeurs (Dolibarr et Odoo)",
          "Exploitation de l'API REST de Dolibarr et de l'API XML-RPC / JSON-RPC d'Odoo",
          "Automatisation de la création de devis, commandes, factures et suivi de paiement",
          "Synchronisation des stocks en temps réel avec des plateformes e-commerce (WooCommerce, Shopify)",
        ],
        practicalLab: "Mise en place d'un connecteur bidirectionnel automatique entre une plateforme e-commerce et le module de gestion commerciale de Dolibarr/Odoo.",
        deliverable: "Module ou workflow d'interfaçage ERP pleinement opérationnel et documenté.",
      },
      {
        month: 5,
        title: "Intelligence Artificielle Générative & Agents Métiers d'Entreprise",
        duration: "Semaines 17 à 20 (max 6h / semaine)",
        objectives: "Intégrer les grands modèles de langage (LLMs) pour créer des assistants intelligents sur mesure.",
        topics: [
          "Fondamentaux des LLMs et ingénierie de prompt avancée pour les cas d'usage métiers",
          "Architecture RAG (Retrieval-Augmented Generation) : recherche sémantique et bases vectorielles",
          "Création d'agents autonomes dotés d'outils (Function Calling, Tool Use)",
          "Sécurisation des données d'entreprise et confidentialité face aux modèles d'IA",
        ],
        practicalLab: "Développement d'un assistant IA interne capable de répondre aux questions des employés sur la base des procédures internes et de rédiger des synthèses de rapports.",
        deliverable: "Agent IA fonctionnel connecté à la documentation interne de l'entreprise avec garde-fous de confidentialité.",
      },
      {
        month: 6,
        title: "Déploiement en Production, DevOps, Sécurité & Soutenance",
        duration: "Semaines 21 à 24 (max 6h / semaine)",
        objectives: "Industrialiser les pipelines d'automatisation et soutenir son projet de fin de cursus.",
        topics: [
          "Conteneurisation avec Docker et Docker Compose pour la reproductibilité",
          "Pipelines CI/CD (GitHub Actions) pour le déploiement continu sans interruption",
          "Gestion sécurisée des secrets d'entreprise (variables d'environnement, Vault)",
          "Surveillance, observabilité et alertes de santé des flux automatisés",
        ],
        practicalLab: "Déploiement en production complète du grand projet d'automatisation individuel intégrant ERP, n8n et IA.",
        deliverable: "Démonstration devant un jury professionnel du projet d'automatisation et remise de l'attestation de réussite.",
      },
    ],
    keyOutcomes: [
      "Capacité à concevoir une architecture d'automatisation scalable et autonome pour toute organisation",
      "Maîtrise concrète des technologies d'orchestration (n8n, Python) et d'IA générative appliquée",
      "Économies directes de temps et d'argent immédiatement démontrables pour les entreprises clientes ou employeurs",
      "Accompagnement continu et adhésion au réseau d'experts alumni NOB TECHNOLOGIES",
    ],
    career: {
      targetRoles: [
        {
          title: "Ingénieur Automatisation & Workflows (n8n / Python)",
          desc: "Conception de flux automatisés transversaux, synchronisation d'APIs tierces et suppression des tâches manuelles répétitives.",
        },
        {
          title: "Consultant Intégration ERP (Odoo & Dolibarr)",
          desc: "Déploiement, personnalisation des modules de gestion commerciale, comptabilité et interfaçage avec les plateformes e-commerce.",
        },
        {
          title: "Développeur Solutions IA & Agents d'Entreprise",
          desc: "Mise en place d'architectures RAG privées, assistants métiers connectés aux données de l'entreprise et automatisation documentaire.",
        },
        {
          title: "Ingénieur DevOps & Cloud Operations Junior",
          desc: "Conteneurisation Docker, gestion des pipelines CI/CD et surveillance des serveurs hébergeant les automates d'entreprise.",
        },
      ],
      sectors: [
        "Startups Tech, Scale-ups & Écosystème FinTech / E-commerce à Dakar",
        "Grandes Entreprises Commerciales, Logistiques & Distributeurs au Sénégal",
        "Cabinets de Conseil en Organisation & Transformation Digitale",
        "PME & Industries locales modernisant leurs processus opérationnels",
        "Clients Européens & Entreprises Internationales en Télétravail (Full Remote)",
      ],
      salarySenegal: {
        junior: "400 000 à 700 000 FCFA / mois",
        intermediate: "750 000 à 1 300 000 FCFA / mois",
        senior: "1 400 000 à 2 200 000+ FCFA / mois",
        context:
          "Salaires nets indicatifs sur le marché sénégalais. Les profils certifiés Microsoft Azure AI, Python Institute (PCAP) et Power Automate RPA accèdent rapidement aux meilleures grilles et à des opportunités à forte valeur ajoutée en entreprise ou en télétravail international.",
      },
    },
  },
};
