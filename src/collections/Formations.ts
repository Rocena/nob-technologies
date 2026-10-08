import type { CollectionConfig } from 'payload';

export const Formations: CollectionConfig = {
  slug: 'formations',
  labels: {
    singular: 'Formation',
    plural: 'Formations',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Formations & Savoir',
    defaultColumns: ['title', 'slug', 'duration', 'badge', 'published'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Titre de la Formation',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug URL (identifiant unique)',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'published',
      label: 'Publiée sur le site',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      label: 'Ordre d’affichage',
      type: 'number',
      defaultValue: 10,
    },
    {
      name: 'badge',
      label: 'Badge en-tête (ex: PROGRAMME INTENSIF 6 MOIS • EXPERT IT)',
      type: 'text',
    },
    {
      name: 'shortDesc',
      label: 'Description courte (aperçu catalogue)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroHeadline',
      label: 'Accroche principale (H1 Hero)',
      type: 'text',
    },
    {
      name: 'heroDescription',
      label: 'Description détaillée (Hero)',
      type: 'textarea',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'duration',
          label: 'Durée',
          type: 'text',
          defaultValue: '6 Mois (24 semaines)',
        },
        {
          name: 'hours',
          label: 'Volume horaire',
          type: 'text',
          defaultValue: '180 heures de pratique',
        },
        {
          name: 'format',
          label: 'Mode d’apprentissage',
          type: 'text',
          defaultValue: 'Présentiel & Hybride (Dakar / Visio)',
        },
      ],
    },
    {
      name: 'targetAudience',
      label: 'Public Cible',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Profil cible',
          required: true,
        },
      ],
    },
    {
      name: 'prerequisites',
      label: 'Prérequis recommandés',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Prérequis',
          required: true,
        },
      ],
    },
    {
      name: 'targetCertifications',
      label: 'Certifications ciblées',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Titre de la certification (ex: Cisco CCNA 200-301)',
          type: 'text',
          required: true,
        },
        {
          name: 'organization',
          label: 'Organisme / Constructeur (ex: Cisco Systems)',
          type: 'text',
        },
        {
          name: 'level',
          label: 'Niveau / Badge (ex: Associate / Spécialiste)',
          type: 'text',
        },
        {
          name: 'desc',
          label: 'Description succincte',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'months',
      label: 'Programme détaillé Mois par Mois (6 Mois)',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'month',
              label: 'Numéro du Mois (1 à 6)',
              type: 'number',
              required: true,
            },
            {
              name: 'duration',
              label: 'Période (ex: Semaines 1 à 4 (30 heures))',
              type: 'text',
            },
          ],
        },
        {
          name: 'title',
          label: 'Titre du Mois',
          type: 'text',
          required: true,
        },
        {
          name: 'objectives',
          label: 'Objectif pédagogique principal',
          type: 'textarea',
        },
        {
          name: 'topics',
          label: 'Modules & Compétences abordées',
          type: 'array',
          fields: [
            {
              name: 'topic',
              type: 'text',
              label: 'Sujet / Compétence',
              required: true,
            },
          ],
        },
        {
          name: 'practicalLab',
          label: 'Lab Pratique en Conditions Réelles',
          type: 'textarea',
        },
        {
          name: 'deliverable',
          label: 'Livrable attendu & Évaluation',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'keyOutcomes',
      label: 'Bénéfices & Débouchés à l’issue de la formation',
      type: 'array',
      fields: [
        {
          name: 'outcome',
          type: 'text',
          label: 'Compétence ou débouché clé',
          required: true,
        },
      ],
    },
  ],
};
