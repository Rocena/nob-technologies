import type { CollectionConfig, Block } from 'payload';

// ----------------------------------------------------
// BLOCKS (Drag & Drop "Elementor-like" Builder)
// ----------------------------------------------------

const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Haut de Page (Hero)', plural: 'Sections Hero' },
  fields: [
    { name: 'headline', type: 'text', required: true, label: 'Titre Principal' },
    { name: 'subhead', type: 'textarea', label: 'Sous-titre' },
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', label: 'Image de Fond' },
    { 
      name: 'buttons', type: 'array', label: "Boutons d'action", maxRows: 2,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
        { name: 'style', type: 'select', options: ['primary', 'secondary'], defaultValue: 'primary' }
      ]
    }
  ]
};

const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Texte Avancé', plural: 'Textes Avancés' },
  fields: [
    { name: 'content', type: 'richText', required: true, label: 'Contenu Textuel' }
  ]
};

const ImageBlock: Block = {
  slug: 'image',
  labels: { singular: 'Bloc Image', plural: 'Images' },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Image' },
    { name: 'caption', type: 'text', label: 'Légende' },
    { name: 'width', type: 'select', options: ['full', 'contained'], defaultValue: 'contained', label: 'Largeur' }
  ]
};

const FeaturesGridBlock: Block = {
  slug: 'featuresGrid',
  labels: { singular: 'Grille de Fonctionnalités', plural: 'Grilles' },
  fields: [
    { name: 'sectionTitle', type: 'text', label: 'Titre de la section' },
    {
      name: 'features', type: 'array', label: 'Cartes', minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Titre' },
        { name: 'description', type: 'textarea', required: true, label: 'Description' },
        { name: 'icon', type: 'text', label: 'Icône (Nom)' }
      ]
    }
  ]
};

const CallToActionBlock: Block = {
  slug: 'cta',
  labels: { singular: "Appel à l'Action (CTA)", plural: 'CTAs' },
  fields: [
    { name: 'headline', type: 'text', required: true, label: 'Titre' },
    { name: 'text', type: 'textarea', label: 'Texte incitatif' },
    { name: 'buttonLabel', type: 'text', required: true, label: 'Texte du Bouton' },
    { name: 'buttonLink', type: 'text', required: true, label: 'Lien du Bouton' }
  ]
};

const VideoBlock: Block = {
  slug: 'video',
  labels: { singular: 'Lecteur Vidéo', plural: 'Vidéos' },
  fields: [
    { name: 'videoUrl', type: 'text', required: true, label: 'URL de la vidéo (YouTube, Vimeo, MP4)' },
    { name: 'thumbnail', type: 'upload', relationTo: 'media', label: 'Vignette de couverture (Optionnelle)' },
    { name: 'autoplay', type: 'checkbox', label: 'Lecture automatique', defaultValue: false }
  ]
};

const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Chiffres Clés (Statistiques)', plural: 'Blocs Stats' },
  fields: [
    {
      name: 'stats', type: 'array', label: 'Compteurs', minRows: 1, maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Valeur (ex: 15+)' },
        { name: 'label', type: 'text', required: true, label: 'Libellé (ex: Années d\'expérience)' }
      ]
    }
  ]
};

const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Avis Clients', plural: 'Avis Clients' },
  fields: [
    { name: 'title', type: 'text', label: 'Titre de la section', defaultValue: 'Ce que disent nos clients' },
    { name: 'relation', type: 'relationship', relationTo: 'testimonials', hasMany: true, label: 'Sélectionner les témoignages à afficher' }
  ]
};

const PricingBlock: Block = {
  slug: 'pricing',
  labels: { singular: 'Grille Tarifaire', plural: 'Grilles Tarifaires' },
  fields: [
    { name: 'title', type: 'text', label: 'Titre', defaultValue: 'Nos Tarifs' },
    { name: 'relation', type: 'relationship', relationTo: 'pricing-plans', hasMany: true, label: 'Sélectionner les plans à afficher' }
  ]
};

const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: 'Questions Fréquentes (FAQ)', plural: 'Blocs FAQ' },
  fields: [
    { name: 'title', type: 'text', label: 'Titre', defaultValue: 'Foire Aux Questions' },
    { name: 'relation', type: 'relationship', relationTo: 'faq', hasMany: true, label: 'Sélectionner les questions à afficher' }
  ]
};

const SpacerBlock: Block = {
  slug: 'spacer',
  labels: { singular: 'Espaceur / Séparateur', plural: 'Espaceurs' },
  fields: [
    { name: 'height', type: 'select', label: 'Hauteur', options: ['small', 'medium', 'large'], defaultValue: 'medium' },
    { name: 'showLine', type: 'checkbox', label: 'Afficher une ligne de séparation', defaultValue: false }
  ]
};

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  access: {
    read: () => true, // Publicly accessible for rendering
  },
  admin: {
    group: 'Contenu & Navigation',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'addToNav', 'updatedAt'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Général',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Titre de la page', admin: { width: '50%' } },
                { name: 'slug', type: 'text', required: true, unique: true, label: 'URL (Slug)', admin: { width: '50%', description: 'ex: ma-nouvelle-page' } },
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'addToNav',
                  type: 'checkbox',
                  label: 'Afficher cette page dans la navigation du site',
                  defaultValue: true,
                  admin: { width: '33%', description: 'Apparaît dans le menu ou sous-menu.' }
                },
                {
                  name: 'menuPlacement',
                  type: 'select',
                  label: 'Emplacement dans le menu',
                  defaultValue: 'main',
                  options: [
                    { label: 'Lien direct du menu principal', value: 'main' },
                    { label: 'Sous-menu déroulant (Enfant)', value: 'submenu' },
                  ],
                  admin: { width: '33%', description: 'Choisissez si la page est un lien principal ou un sous-menu.' }
                },
                {
                  name: 'parentItem',
                  type: 'select',
                  label: 'Sous-menu parent (si sous-menu)',
                  defaultValue: 'solutions',
                  options: [
                    { label: 'Sous Solutions / Services', value: 'solutions' },
                    { label: 'Sous Secteurs', value: 'secteurs' },
                    { label: 'Sous À propos', value: 'apropos' },
                    { label: 'Général / Navigation', value: 'general' },
                  ],
                  admin: { width: '34%', description: 'Menu auquel cette sous-page sera rattachée.' }
                },
              ]
            },
            {
              name: 'navOrder',
              type: 'number',
              label: 'Ordre d’affichage dans le menu (Priorité)',
              defaultValue: 10,
              admin: { description: 'Plus le chiffre est petit (ex: 1, 2, 3), plus le lien s’affiche en premier / en haut.' }
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Description pour le menu / aperçu',
              admin: { description: 'Texte descriptif affiché au survol dans le menu de navigation.' }
            }
          ]
        },
        {
          label: 'Constructeur de Page (Drag & Drop)',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Éditeur Visuel',
              admin: { description: 'Ajoutez, réorganisez et personnalisez les blocs de cette page.' },
              blocks: [
                HeroBlock,
                RichTextBlock,
                ImageBlock,
                FeaturesGridBlock,
                CallToActionBlock,
                VideoBlock,
                StatsBlock,
                TestimonialsBlock,
                PricingBlock,
                FaqBlock,
                SpacerBlock
              ]
            }
          ]
        },
        {
          label: 'Référencement (SEO)',
          fields: [
            { name: 'metaTitle', type: 'text', label: 'Titre SEO', admin: { description: 'Titre affiché dans Google' } },
            { name: 'metaDescription', type: 'textarea', label: 'Description SEO' },
          ]
        }
      ]
    }
  ],
};
