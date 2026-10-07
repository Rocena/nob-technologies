import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Réalisation',
    plural: 'Réalisations',
  },
  admin: {
    group: 'Portfolio & Preuves',
    useAsTitle: 'title',
    defaultColumns: ['title', 'sector', 'status', 'completionDate'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Présentation',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Titre du Projet', admin: { width: '50%' } },
                { name: 'slug', type: 'text', required: true, unique: true, label: 'URL (Slug)', admin: { width: '50%' } },
              ]
            },
            { name: 'description', type: 'textarea', label: 'Résumé court (Méta & Carte)' },
            { name: 'coverImage', type: 'upload', relationTo: 'media', label: 'Image de Couverture' },
          ]
        },
        {
          label: 'Détails & Contenu',
          fields: [
            { name: 'content', type: 'richText', label: 'Étude de cas complète' },
          ]
        },
        {
          label: 'Métadonnées',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'sector', type: 'text', label: 'Secteur d\'activité', admin: { width: '50%' } },
                { name: 'completionDate', type: 'date', label: 'Date de livraison', admin: { width: '50%' } },
              ]
            },
            {
              name: 'status',
              type: 'select',
              label: 'Statut de publication',
              options: [
                { label: 'Brouillon', value: 'draft' },
                { label: 'Publié', value: 'published' },
              ],
              defaultValue: 'draft',
            },
          ]
        }
      ]
    }
  ],
};
