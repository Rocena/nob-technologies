export interface FormationMonth {
  month: number;
  title: string;
  duration: string;
  objectives: string;
  topics: string[];
  practicalLab: string;
  deliverable: string;
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
}

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
    hours: "180 heures de formation et travaux pratiques dirigés",
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
        title: "Cisco CCNA (200-301)",
        organization: "Cisco Systems",
        level: "Associate / Professionnel",
        desc: "Routage, commutation avancée, services IP, automatisation de base et sécurité réseau Cisco.",
      },
      {
        title: "Fortinet NSE 4 / FCP Network Security",
        organization: "Fortinet NSE Institute",
        level: "Spécialiste Firewall",
        desc: "Administration opérationnelle des firewalls FortiGate, politiques de sécurité, inspection SSL et VPNs.",
      },
      {
        title: "Sophos Certified Engineer",
        organization: "Sophos",
        level: "Ingénieur Pare-feu",
        desc: "Configuration des appliances Sophos XGS, sécurité synchronisée avec Intercept X et protection anti-ransomware.",
      },
      {
        title: "CompTIA Security+ (SY0-701)",
        organization: "CompTIA",
        level: "Standard International",
        desc: "Maîtrise des concepts fondamentaux de la sécurité des données, gestion des identités, menaces et conformité.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Fondamentaux Réseau Avancés & Architecture Cisco",
        duration: "Semaines 1 à 4 (30 heures)",
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
        duration: "Semaines 5 à 8 (30 heures)",
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
        duration: "Semaines 9 à 12 (30 heures)",
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
        duration: "Semaines 13 à 16 (30 heures)",
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
        duration: "Semaines 17 à 20 (30 heures)",
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
        duration: "Semaines 21 à 24 (30 heures)",
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
    hours: "180 heures de cours théoriques, simulations cyber et études de cas réels",
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
        title: "ISO/IEC 27001 Lead Auditor / Implementer Readiness",
        organization: "PECB / Normes ISO",
        level: "Gouvernance & Audit",
        desc: "Déploiement et audit d'un Système de Management de la Sécurité de l'Information (SMSI).",
      },
      {
        title: "Certified SOC Analyst (CSA) / Blue Team Ops",
        organization: "Cyber Defense Frameworks",
        level: "Opérations de Défense",
        desc: "Détection des intrusions, corrélation SIEM, analyse de menaces et réponse à incident.",
      },
      {
        title: "Certified Ethical Hacker (CEH) Methodology",
        organization: "EC-Council / Ethical Standards",
        level: "Sécurité Offensive",
        desc: "Méthodologie de reconnaissance, scan de vulnérabilités, exploitation éthique et reporting.",
      },
      {
        title: "Gestion des Accès à Privilèges (PAM)",
        organization: "Wallix & BeyondTrust Standards",
        level: "Sécurité des Identités",
        desc: "Protection des comptes à hauts privilèges et traçabilité des sessions administrateurs.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Gouvernance Cyber, Analyse des Risques & Norme ISO 27001",
        duration: "Semaines 1 à 4 (30 heures)",
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
        duration: "Semaines 5 à 8 (30 heures)",
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
        duration: "Semaines 9 à 12 (30 heures)",
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
        duration: "Semaines 13 à 16 (30 heures)",
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
        duration: "Semaines 17 à 20 (30 heures)",
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
        duration: "Semaines 21 à 24 (30 heures)",
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
    hours: "180 heures d'ateliers pratiques, code dirigé et projets d'automatisation en production",
    format: "Présentiel ou distanciel interactif avec serveurs dédiés mis à disposition",
    partnerLogos: [
      { name: "Microsoft 365", logo: "/images/partners/microsoft.svg" },
      { name: "VMware", logo: "/images/partners/vmware.svg" },
      { name: "Dell Technologies", logo: "/images/partners/dell-color.svg" },
    ],
    targetCertifications: [
      {
        title: "Enterprise Automation Specialist (n8n / Make)",
        organization: "Automation Frameworks",
        level: "Orchestration & No-Code/Low-Code",
        desc: "Conception de flux d'automatisation d'entreprise résilients, gestion d'erreurs et webhooks.",
      },
      {
        title: "Python for Enterprise Systems & APIs",
        organization: "Open Source / Python Institute",
        level: "Développement & Scripting",
        desc: "Scripting backend robuste, manipulation de données massives, connecteurs REST et automatisation système.",
      },
      {
        title: "Enterprise AI & LLM Integration Practitioner",
        organization: "Applied AI Standards",
        level: "Intelligence Artificielle Générative",
        desc: "Création d'agents autonomes, architectures RAG avec bases vectorielles et intégration d'APIs LLM sécurisées.",
      },
      {
        title: "ERP Modernization & Integration (Dolibarr / Odoo)",
        organization: "Open Source ERP Ecosystem",
        level: "Gestion d'Entreprise",
        desc: "Interfaçage des modules de facturation, stocks, CRM et passerelles de paiement.",
      },
    ],
    months: [
      {
        month: 1,
        title: "Architecture des Systèmes Modernes, HTTP & APIs REST",
        duration: "Semaines 1 à 4 (30 heures)",
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
        duration: "Semaines 5 à 8 (30 heures)",
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
        duration: "Semaines 9 à 12 (30 heures)",
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
        duration: "Semaines 13 à 16 (30 heures)",
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
        duration: "Semaines 17 à 20 (30 heures)",
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
        duration: "Semaines 21 à 24 (30 heures)",
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
  },
};
