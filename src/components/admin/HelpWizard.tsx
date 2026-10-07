'use client';
import React, { useState, useEffect } from 'react';
import {
  Browsers,
  Question,
  Images,
  SuitcaseSimple,
  TagChevron,
  GraduationCap,
  FolderSimpleStar,
  Buildings,
  Handshake,
  Star,
  UsersThree,
  Receipt,
  FileText,
  NewspaperClipping,
  ChatCircleText,
  UserGear,
  Pulse,
  SlidersHorizontal,
  FileCode,
  MagnifyingGlass,
  ArrowLeft,
  ArrowUpRight,
  Sparkle,
  CheckCircle,
  Lightbulb,
} from '@phosphor-icons/react';

type Article = {
  id: string;
  title: string;
  category: 'Contenu' | 'Offres & Carrières' | 'Ventes & CRM' | 'Communication' | 'Système';
  summary: string;
  icon: React.ComponentType<{ size?: number | string; weight?: any; className?: string }>;
  accentColor: string;
  tags: string[];
  linkHref: string;
  linkLabel: string;
  sections: {
    heading: string;
    text: string;
    tips?: string[];
  }[];
};

const HELP_ARTICLES: Article[] = [
  {
    id: 'contact-messages',
    title: 'Messages de Contact & Réponses Emails',
    category: 'Communication',
    icon: ChatCircleText,
    accentColor: '#00B4D8',
    summary: 'Centralisation des messages du site web, accusés de réception automatisés et module d’envoi de réponse directe par email.',
    tags: ['contact', 'messages', 'email', 'formulaire', 'répondre', 'boite', 'notification'],
    linkHref: '/admin/collections/contact-messages',
    linkLabel: 'Ouvrir les Messages',
    sections: [
      {
        heading: '1. Réception et accusé de réception automatique',
        text: 'Dès qu’un visiteur remplit le formulaire de contact ou soumet une demande sur le site, une nouvelle fiche est créée ici avec le statut "Nouveau". En parallèle, le visiteur reçoit automatiquement un email professionnel accusant bonne réception de sa demande.',
        tips: [
          'Le statut change automatiquement à "Lu" lorsque vous ouvrez la fiche détaillée.',
          'Assurez-vous que les variables SMTP_USER et SMTP_PASS sont définies dans le fichier .env pour l’expédition réelle des courriels.'
        ]
      },
      {
        heading: '2. Répondre directement depuis le Back-Office',
        text: 'Ouvrez un message, accédez à l’onglet "Répondre par email". Saisissez votre sujet et le corps de votre message, puis cliquez sur "Envoyer la réponse". Le système expédie le message au destinataire avec le gabarit officiel NOB TECHNOLOGIES et archive la date, l’auteur et le contenu exact de la réponse envoyée.',
        tips: [
          'Le statut du message passe instantanément à "Répondu" une fois le courriel acheminé.',
          'Un récapitulatif complet de la réponse reste accessible dans la fiche pour l’historique.'
        ]
      }
    ]
  },
  {
    id: 'quotes',
    title: 'Devis & Propositions Commerciales',
    category: 'Ventes & CRM',
    icon: FileText,
    accentColor: '#0EA5E9',
    summary: 'Édition de propositions tarifaires complètes, chiffrage multi-lignes, calculs de TVA automatisés et génération PDF.',
    tags: ['devis', 'devis client', 'prix', 'chiffrage', 'vente', 'pdf', 'commercial'],
    linkHref: '/admin/collections/quotes',
    linkLabel: 'Gérer les Devis',
    sections: [
      {
        heading: '1. Création d’un devis client',
        text: 'Sélectionnez un client existant depuis la base Clients (CRM). Renseignez un numéro de référence ou laissez le système structurer le document. Vous pouvez définir une date d’émission et une durée de validité (ex: 30 jours).',
        tips: ['Si le client n’existe pas encore, créez-le au préalable dans la collection Clients (CRM).']
      },
      {
        heading: '2. Lignes d’articles et calculs',
        text: 'Ajoutez une ou plusieurs lignes de prestations (désignation, quantité, prix unitaire HT). Le sous-total HT, le montant de la TVA (20% par défaut) et le montant Total TTC sont automatiquement calculés.',
      },
      {
        heading: '3. Cycle de vie & Export PDF',
        text: 'Faites évoluer le statut du devis : "Brouillon" ➔ "Envoyé" ➔ "Accepté" ou "Refusé". Utilisez le bouton d’export PDF pour télécharger un document prêt à être transmis au client.',
        tips: ['Un devis au statut "Accepté" peut ensuite servir de base pour générer une facture correspondante.']
      }
    ]
  },
  {
    id: 'invoices',
    title: 'Factures & Suivi des Règlements',
    category: 'Ventes & CRM',
    icon: Receipt,
    accentColor: '#0369A1',
    summary: 'Facturation officielle de NOB TECHNOLOGIES, mentions légales, conditions de paiement et états de règlement.',
    tags: ['factures', 'comptabilité', 'paiement', 'tva', 'règlement', 'pdf', 'finances'],
    linkHref: '/admin/collections/invoices',
    linkLabel: 'Gérer les Factures',
    sections: [
      {
        heading: '1. Émission d’une facture',
        text: 'Associez la facture à un client ainsi qu’au devis source si applicable. Précisez la date de facturation et la date limite de règlement. Ajoutez le détail des prestations délivrées.',
      },
      {
        heading: '2. Suivi de trésorerie',
        text: 'Les statuts disponibles permettent un suivi rigoureux : "Brouillon", "Émise", "Payée" ou "En retard". Cela vous offre une visibilité directe depuis les cartes statistiques du tableau de bord.',
        tips: ['Vérifiez que les coordonnées fiscales du client (SIRET, Numéro de TVA) sont bien saisies sur sa fiche pour la conformité légale.']
      }
    ]
  },
  {
    id: 'customers',
    title: 'Gestion des Clients (CRM)',
    category: 'Ventes & CRM',
    icon: UsersThree,
    accentColor: '#38BDF8',
    summary: 'Répertoire centralisé des comptes clients, contacts décisionnaires, adresses de facturation et historique commercial.',
    tags: ['clients', 'crm', 'contacts', 'entreprises', 'adresses', 'tva', 'siret'],
    linkHref: '/admin/collections/customers',
    linkLabel: 'Gérer les Clients',
    sections: [
      {
        heading: '1. Renseigner un nouveau compte',
        text: 'Indiquez la raison sociale de l’entreprise, le nom de votre interlocuteur principal, son email professionnel, son téléphone direct et son adresse complète.',
        tips: ['Ces informations pré-rempliront automatiquement tous les devis et factures rattachés à ce compte.']
      }
    ]
  },
  {
    id: 'pages',
    title: 'Architecture & Contenus des Pages',
    category: 'Contenu',
    icon: Browsers,
    accentColor: '#0284C7',
    summary: 'Gestion éditoriale des pages publiques (Accueil, À propos, Contact), textes d’introduction et métadonnées SEO.',
    tags: ['pages', 'accueil', 'texte', 'seo', 'titres', 'architecture', 'contenu'],
    linkHref: '/admin/collections/pages',
    linkLabel: 'Gérer les Pages',
    sections: [
      {
        heading: '1. Modifier les sections d’une page',
        text: 'Chaque page regroupe les accroches principales, sous-titres et arguments technologiques visibles sur le site public. Cliquez sur la page voulue pour éditer ses blocs.',
        tips: ['Remplissez scrupuleusement les balises Meta Title et Meta Description pour maximiser le positionnement sur Google.']
      }
    ]
  },
  {
    id: 'services',
    title: 'Services & Expertises Technologiques',
    category: 'Offres & Carrières',
    icon: SuitcaseSimple,
    accentColor: '#0EA5E9',
    summary: 'Vitrine des domaines d’excellence NOB : Cybersécurité, Développement logiciel, Cloud et Infrastructure.',
    tags: ['services', 'offres', 'expertise', 'cybersécurité', 'cloud', 'dev', 'prestations'],
    linkHref: '/admin/collections/services',
    linkLabel: 'Gérer les Services',
    sections: [
      {
        heading: '1. Présentation de l’offre',
        text: 'Chaque service comprend un titre percutant, une description technique, les technologies clés mobilisées, ainsi que les livrables attendus par les clients d’entreprise.',
        tips: ['Ajoutez une icône représentative et des points forts précis pour valoriser le savoir-faire de l’équipe.']
      }
    ]
  },
  {
    id: 'pricing-plans',
    title: 'Plans Tarifaires & Formules',
    category: 'Offres & Carrières',
    icon: TagChevron,
    accentColor: '#38BDF8',
    summary: 'Configuration des packs d’accompagnement affichés sur la page Tarifs (Essentiel, Business, Enterprise).',
    tags: ['tarifs', 'prix', 'plans', 'formules', 'abonnements', 'packs'],
    linkHref: '/admin/collections/pricing-plans',
    linkLabel: 'Gérer les Plans',
    sections: [
      {
        heading: '1. Découpage des offres',
        text: 'Définissez le prix indicatif, le type de facturation (mensuel/projet) et la liste détaillée des fonctionnalités incluses et non incluses pour chaque formule.',
        tips: ['Mettez un plan en avant en cochant l’option "Recommandé / Populaire" pour guider le choix des prospects.']
      }
    ]
  },
  {
    id: 'projects',
    title: 'Réalisations & Portfolio Clients',
    category: 'Contenu',
    icon: FolderSimpleStar,
    accentColor: '#0284C7',
    summary: 'Études de cas réelles, défis techniques relevés, stack utilisée et métriques de réussite obtenues.',
    tags: ['portfolio', 'projets', 'réalisations', 'cas clients', 'succès', 'études'],
    linkHref: '/admin/collections/projects',
    linkLabel: 'Gérer les Réalisations',
    sections: [
      {
        heading: '1. Structurer une étude de cas convaincante',
        text: 'Décrivez le contexte initial du client, les verrous technologiques rencontrés, l’architecture mise en place par NOB TECHNOLOGIES et les résultats chiffrés.',
        tips: ['Associez des captures d’écran haute définition via la bibliothèque Médias pour illustrer le travail accompli.']
      }
    ]
  },
  {
    id: 'media',
    title: 'Bibliothèque Médias & Fichiers',
    category: 'Contenu',
    icon: Images,
    accentColor: '#00B4D8',
    summary: 'Gestionnaire central de tous les visuels, logos, photos d’illustration et documents PDF du site web.',
    tags: ['médias', 'images', 'upload', 'photos', 'documents', 'fichiers', 'galerie'],
    linkHref: '/admin/collections/media',
    linkLabel: 'Ouvrir les Médias',
    sections: [
      {
        heading: '1. Téléversement et optimisation',
        text: 'Glissez-déposez vos fichiers par lot. Le moteur génère automatiquement plusieurs déclinaisons adaptées aux résolutions mobiles, tablettes et Retina.',
        tips: [
          'Renseignez systématiquement le texte alternatif (Alt) pour chaque image : c’est indispensable pour le référencement et l’accessibilité.',
          'Poids recommandé : moins de 2 Mo par image pour garantir une vitesse de chargement optimale.'
        ]
      }
    ]
  },
  {
    id: 'articles-news',
    title: 'Blog, Articles & Actualités',
    category: 'Communication',
    icon: NewspaperClipping,
    accentColor: '#0284C7',
    summary: 'Publication d’articles d’actualités technologiques, veille métier et annonces corporate de NOB TECHNOLOGIES.',
    tags: ['blog', 'articles', 'news', 'actualités', 'publication', 'rédaction'],
    linkHref: '/admin/collections/articles',
    linkLabel: 'Gérer les Articles',
    sections: [
      {
        heading: '1. Rédiger un contenu de qualité',
        text: 'Utilisez l’éditeur de texte enrichi pour concevoir vos articles avec titres, sous-titres, citations et images d’illustration. Assignez une catégorie et une image de couverture.',
        tips: ['Laissez l’article au statut "Brouillon" pendant la rédaction et passez-le à "Publié" dès qu’il est prêt à être mis en ligne.']
      }
    ]
  },
  {
    id: 'job-offers',
    title: 'Offres d’Emploi & Recrutement',
    category: 'Offres & Carrières',
    icon: GraduationCap,
    accentColor: '#38BDF8',
    summary: 'Diffusion des postes ouverts au sein de l’ingénierie et des opérations NOB TECHNOLOGIES.',
    tags: ['recrutement', 'emplois', 'carrières', 'postes', 'candidatures', 'talents'],
    linkHref: '/admin/collections/job-offers',
    linkLabel: 'Gérer les Offres',
    sections: [
      {
        heading: '1. Rédiger une fiche de poste',
        text: 'Indiquez l’intitulé du poste, le type de contrat (CDI, Stage, Freelance), la localisation (sur site / télétravail hybride), ainsi que les compétences techniques et humaines requises.',
      }
    ]
  },
  {
    id: 'site-settings',
    title: 'Paramètres Généraux du Site',
    category: 'Système',
    icon: SlidersHorizontal,
    accentColor: '#475569',
    summary: 'Coordonnées de l’entreprise (téléphone, email, adresse), liens vers les réseaux sociaux et métadonnées globales.',
    tags: ['paramètres', 'réglages', 'téléphone', 'email', 'siège', 'linkedin', 'github', 'réseaux'],
    linkHref: '/admin/globals/site-settings',
    linkLabel: 'Modifier les Paramètres',
    sections: [
      {
        heading: '1. Informations institutionnelles',
        text: 'Toute modification effectuée ici est immédiatement répercutée sur le bandeau supérieur, le pied de page et les mentions légales du site public.',
      }
    ]
  },
  {
    id: 'users-logs',
    title: 'Utilisateurs & Journal d’Activité',
    category: 'Système',
    icon: UserGear,
    accentColor: '#475569',
    summary: 'Gestion des comptes d’administrateurs, attribution des rôles et historique de traçabilité des modifications.',
    tags: ['utilisateurs', 'sécurité', 'droits', 'journaux', 'audit', 'rôles', 'comptes'],
    linkHref: '/admin/collections/users',
    linkLabel: 'Gérer les Utilisateurs',
    sections: [
      {
        heading: '1. Niveaux de privilèges',
        text: 'Les comptes disposent de rôles : Super Administrateur (contrôle total sur le système et les comptes) ou Éditeur (gestion du contenu et des interactions).',
        tips: ['Les Journaux d’Activité enregistrent les créations, suppressions et modifications pour assurer un suivi d’audit complet.']
      }
    ]
  }
];

const CATEGORIES = ['Tous', 'Communication', 'Ventes & CRM', 'Contenu', 'Offres & Carrières', 'Système'] as const;

export const HelpWizard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('Tous');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filtered = HELP_ARTICLES.filter((a) => {
    const matchCat = activeCategory === 'Tous' || a.category === activeCategory;
    const q = searchTerm.trim().toLowerCase();
    if (!q) return matchCat;
    const inTitle = a.title.toLowerCase().includes(q);
    const inSummary = a.summary.toLowerCase().includes(q);
    const inTags = a.tags.some((t) => t.toLowerCase().includes(q));
    const inSections = a.sections.some(
      (s) => s.heading.toLowerCase().includes(q) || s.text.toLowerCase().includes(q)
    );
    return matchCat && (inTitle || inSummary || inTags || inSections);
  });

  return (
    <div className="nob-help-page">
      <style>{`
        .nob-help-page {
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
          padding: 32px 24px 80px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          box-sizing: border-box;
          color: #0f172a;
        }
        html[data-nob-theme="dark"] .nob-help-page {
          color: #f8fafc;
        }

        /* BANNIÈRE HERO */
        .nob-help-hero {
          position: relative;
          border-radius: 24px;
          padding: 44px 36px;
          margin-bottom: 32px;
          background: linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(224,242,254,0.45) 100%);
          border: 1px solid rgba(15,23,42,0.08);
          box-shadow: 0 20px 40px -15px rgba(2,132,199,0.12), inset 0 1px 1px #fff;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          text-align: center;
          overflow: hidden;
        }
        html[data-nob-theme="dark"] .nob-help-hero {
          background: linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.65) 100%);
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 24px 50px -15px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.15);
        }
        .nob-help-hero::before {
          content: '';
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 480px;
          height: 240px;
          background: radial-gradient(ellipse at center, rgba(34,211,238,0.22), transparent 70%);
          pointer-events: none;
        }
        .nob-help-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: rgba(2,132,199,0.1);
          color: #0284c7;
          border: 1px solid rgba(2,132,199,0.25);
          margin-bottom: 14px;
        }
        html[data-nob-theme="dark"] .nob-help-badge {
          background: rgba(56,189,248,0.15);
          color: #38bdf8;
          border-color: rgba(56,189,248,0.3);
        }
        .nob-help-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin: 0 0 10px;
          line-height: 1.15;
        }
        .nob-help-subtitle {
          max-width: 620px;
          margin: 0 auto 28px;
          font-size: 15px;
          line-height: 1.6;
          color: #64748b;
        }
        html[data-nob-theme="dark"] .nob-help-subtitle {
          color: #94a3b8;
        }

        /* BARRE DE RECHERCHE */
        .nob-help-search-wrap {
          position: relative;
          max-width: 580px;
          margin: 0 auto;
        }
        .nob-help-search-ic {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }
        .nob-help-search-input {
          width: 100%;
          box-sizing: border-box;
          padding: 16px 20px 16px 52px;
          border-radius: 16px;
          border: 1.5px solid rgba(100,116,139,0.3);
          background: rgba(255,255,255,0.9);
          font-size: 15px;
          color: inherit;
          outline: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        html[data-nob-theme="dark"] .nob-help-search-input {
          background: rgba(15,23,42,0.85);
          border-color: rgba(255,255,255,0.15);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .nob-help-search-input:focus {
          border-color: #0284c7;
          box-shadow: 0 0 0 3px rgba(2,132,199,0.22);
        }
        html[data-nob-theme="dark"] .nob-help-search-input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.25);
        }

        /* FILTRES PAR CATÉGORIE */
        .nob-help-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-bottom: 28px;
        }
        .nob-help-pill {
          all: unset;
          cursor: pointer;
          box-sizing: border-box;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(100,116,139,0.2);
          transition: all .15s ease;
        }
        html[data-nob-theme="dark"] .nob-help-pill {
          color: #94a3b8;
          background: rgba(15,23,42,0.6);
          border-color: rgba(255,255,255,0.1);
        }
        .nob-help-pill:hover {
          color: #0284c7;
          border-color: rgba(2,132,199,0.4);
        }
        html[data-nob-theme="dark"] .nob-help-pill:hover {
          color: #38bdf8;
          border-color: rgba(56,189,248,0.4);
        }
        .nob-help-pill.active {
          background: #0284c7;
          color: #fff;
          border-color: #0284c7;
          box-shadow: 0 4px 14px rgba(2,132,199,0.35);
        }
        html[data-nob-theme="dark"] .nob-help-pill.active {
          background: #0284c7;
          color: #fff;
          border-color: #38bdf8;
          box-shadow: 0 4px 16px rgba(56,189,248,0.35);
        }

        /* GRILLE DE CARTES */
        .nob-help-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .nob-help-card {
          cursor: pointer;
          border-radius: 20px;
          padding: 24px;
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(15,23,42,0.08);
          box-shadow: 0 10px 25px -8px rgba(0,0,0,0.04);
          transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease, border-color .2s ease;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        html[data-nob-theme="dark"] .nob-help-card {
          background: rgba(15,23,42,0.7);
          border-color: rgba(255,255,255,0.1);
          box-shadow: 0 12px 30px -8px rgba(0,0,0,0.5);
        }
        .nob-help-card:hover {
          transform: translateY(-4px);
          border-color: #0284c7;
          box-shadow: 0 18px 36px -10px rgba(2,132,199,0.2);
        }
        html[data-nob-theme="dark"] .nob-help-card:hover {
          border-color: #38bdf8;
          box-shadow: 0 18px 40px -10px rgba(56,189,248,0.25);
        }
        .nob-help-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .nob-help-card-ic {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(2,132,199,0.1);
          color: #0284c7;
          border: 1px solid rgba(2,132,199,0.2);
        }
        html[data-nob-theme="dark"] .nob-help-card-ic {
          background: rgba(56,189,248,0.14);
          color: #38bdf8;
          border-color: rgba(56,189,248,0.25);
        }
        .nob-help-card-cat {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #64748b;
        }
        html[data-nob-theme="dark"] .nob-help-card-cat {
          color: #94a3b8;
        }
        .nob-help-card-title {
          font-size: 17px;
          font-weight: 700;
          margin: 0 0 8px;
          line-height: 1.3;
        }
        .nob-help-card-summary {
          font-size: 13.5px;
          line-height: 1.55;
          color: #64748b;
          margin: 0 0 16px;
          flex: 1;
        }
        html[data-nob-theme="dark"] .nob-help-card-summary {
          color: #94a3b8;
        }
        .nob-help-card-foot {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #0284c7;
          padding-top: 12px;
          border-top: 1px solid rgba(100,116,139,0.15);
        }
        html[data-nob-theme="dark"] .nob-help-card-foot {
          color: #38bdf8;
          border-top-color: rgba(255,255,255,0.08);
        }

        /* VUE DÉTAILLÉE D'UN ARTICLE */
        .nob-help-detail {
          border-radius: 24px;
          padding: 36px;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(15,23,42,0.08);
          box-shadow: 0 20px 45px -10px rgba(0,0,0,0.06);
          animation: nobIn .2s cubic-bezier(.16,1,.3,1) both;
        }
        html[data-nob-theme="dark"] .nob-help-detail {
          background: rgba(15,23,42,0.85);
          border-color: rgba(255,255,255,0.12);
          box-shadow: 0 24px 60px -15px rgba(0,0,0,0.7);
        }
        @keyframes nobIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }
        .nob-help-back-btn {
          all: unset;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #0284c7;
          margin-bottom: 24px;
          padding: 6px 12px;
          border-radius: 10px;
          transition: background .12s ease;
        }
        html[data-nob-theme="dark"] .nob-help-back-btn {
          color: #38bdf8;
        }
        .nob-help-back-btn:hover {
          background: rgba(2,132,199,0.1);
        }
        .nob-help-detail-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(100,116,139,0.2);
          margin-bottom: 28px;
        }
        .nob-help-detail-info {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .nob-help-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 12px;
          background: #0284c7;
          color: #fff !important;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          box-shadow: 0 6px 18px -4px rgba(2,132,199,0.4);
          transition: transform .15s ease, background .15s ease;
        }
        .nob-help-action-btn:hover {
          background: #0369a1;
          transform: translateY(-2px);
        }
        .nob-help-section {
          margin-bottom: 28px;
        }
        .nob-help-section h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nob-help-section p {
          font-size: 15px;
          line-height: 1.7;
          color: #334155;
          margin: 0 0 12px;
        }
        html[data-nob-theme="dark"] .nob-help-section p {
          color: #cbd5e1;
        }
        .nob-help-tips {
          background: rgba(2,132,199,0.06);
          border-left: 3px solid #0284c7;
          border-radius: 0 12px 12px 0;
          padding: 14px 18px;
          margin-top: 12px;
        }
        html[data-nob-theme="dark"] .nob-help-tips {
          background: rgba(56,189,248,0.08);
          border-left-color: #38bdf8;
        }
        .nob-help-tip-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13.5px;
          line-height: 1.5;
          margin-bottom: 6px;
        }
        .nob-help-tip-item:last-child {
          margin-bottom: 0;
        }

        .nob-help-empty {
          text-align: center;
          padding: 60px 20px;
          color: #64748b;
        }
      `}</style>

      {/* EN-TÊTE HERO */}
      <div className="nob-help-hero">
        <span className="nob-help-badge">
          <Sparkle size={14} weight="fill" /> Documentation Officielle
        </span>
        <h1 className="nob-help-title">Centre d’Aide & Guides NOB TECHNOLOGIES</h1>
        <p className="nob-help-subtitle">
          Retrouvez les guides détaillés, tutoriels pas-à-pas et bonnes pratiques pour chaque module de votre back-office.
        </p>

        <div className="nob-help-search-wrap">
          <MagnifyingGlass size={20} className="nob-help-search-ic" weight="bold" />
          <input
            type="text"
            className="nob-help-search-input"
            placeholder="Rechercher : répondre aux messages, créer un devis, tva, images, articles..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedArticle(null);
            }}
          />
        </div>
      </div>

      {/* FILTRES CATÉGORIES */}
      {!selectedArticle && (
        <div className="nob-help-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`nob-help-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* CONTENU PRINCIPAL */}
      {selectedArticle ? (
        <div className="nob-help-detail">
          <button type="button" className="nob-help-back-btn" onClick={() => setSelectedArticle(null)}>
            <ArrowLeft size={16} weight="bold" /> Retour à la documentation
          </button>

          <div className="nob-help-detail-header">
            <div className="nob-help-detail-info">
              <div className="nob-help-card-ic" style={{ width: 56, height: 56 }}>
                <selectedArticle.icon size={30} weight="duotone" />
              </div>
              <div>
                <span className="nob-help-card-cat">{selectedArticle.category}</span>
                <h2 style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 800 }}>
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            <a href={selectedArticle.linkHref} className="nob-help-action-btn">
              {selectedArticle.linkLabel} <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>

          <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '32px', color: 'inherit', opacity: 0.85 }}>
            {selectedArticle.summary}
          </p>

          <div>
            {selectedArticle.sections.map((sec, idx) => (
              <div key={idx} className="nob-help-section">
                <h3>{sec.heading}</h3>
                <p>{sec.text}</p>
                {sec.tips && sec.tips.length > 0 && (
                  <div className="nob-help-tips">
                    {sec.tips.map((tip, tIdx) => (
                      <div key={tIdx} className="nob-help-tip-item">
                        <Lightbulb size={16} weight="duotone" style={{ flexShrink: 0, marginTop: 2, color: '#0284c7' }} />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="nob-help-empty">
          <Question size={48} weight="duotone" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.5 }} />
          <h3 style={{ margin: '0 0 6px', fontSize: '18px' }}>Aucun guide trouvé pour « {searchTerm} »</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>Essayez avec d'autres termes comme : devis, messages, factures, médias...</p>
        </div>
      ) : (
        <div className="nob-help-grid">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="nob-help-card"
              onClick={() => setSelectedArticle(art)}
            >
              <div className="nob-help-card-head">
                <div className="nob-help-card-ic">
                  <art.icon size={24} weight="duotone" />
                </div>
                <span className="nob-help-card-cat">{art.category}</span>
              </div>

              <h3 className="nob-help-card-title">{art.title}</h3>
              <p className="nob-help-card-summary">{art.summary}</p>

              <div className="nob-help-card-foot">
                Lire le guide détaillé <ArrowUpRight size={14} weight="bold" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

