import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    group: 'Expertises & Offres',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'availability'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations Générales',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Titre du Service', admin: { width: '50%' } },
                { name: 'slug', type: 'text', required: true, unique: true, label: 'URL (Slug)', admin: { width: '50%' } },
              ]
            },
            { name: 'description', type: 'textarea', label: 'Description Courte (Résumé)' },
            { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Image de Présentation' },
          ]
        },
        {
          label: 'Pitch & Solution',
          fields: [
            { name: 'problem', type: 'textarea', label: 'La Problématique Client (Le "Pourquoi")' },
            { name: 'solution', type: 'richText', label: 'Notre Solution détaillée (Le "Comment")' },
          ]
        },
        {
          label: 'Livrables / Prestations',
          fields: [
            {
              name: 'prestations',
              type: 'array',
              label: 'Liste des Prestations Incluses',
              labels: { singular: 'Prestation', plural: 'Prestations' },
              fields: [
                { name: 'name', type: 'text', required: true, label: 'Nom de la prestation' },
              ],
            },
          ]
        },
        {
          label: 'Statut & Disponibilité',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  type: 'select',
                  label: 'Statut de publication',
                  options: [
                    { label: 'Brouillon', value: 'draft' },
                    { label: 'Publié', value: 'published' },
                  ],
                  defaultValue: 'published',
                  admin: { width: '50%' }
                },
                {
                  name: 'availability',
                  type: 'select',
                  label: 'Disponibilité',
                  options: [
                    { label: 'Disponible', value: 'available' },
                    { label: 'Sur demande', value: 'on_demand' },
                    { label: 'À venir', value: 'coming_soon' },
                    { label: 'Indisponible', value: 'unavailable' },
                  ],
                  defaultValue: 'available',
                  admin: { width: '50%' }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
};
