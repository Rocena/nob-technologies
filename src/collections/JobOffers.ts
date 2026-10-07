import type { CollectionConfig } from 'payload';

export const JobOffers: CollectionConfig = {
  slug: 'job-offers',
  labels: {
    singular: "Offre d'emploi",
    plural: "Offres d'emploi",
  },
  admin: {
    group: 'Carrières',
    useAsTitle: 'title',
    defaultColumns: ['title', 'department', 'type', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Détails de l\'offre',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Intitulé du Poste', admin: { width: '50%' } },
                { name: 'slug', type: 'text', required: true, unique: true, label: 'URL (Slug)', admin: { width: '50%' } },
              ]
            },
            {
              type: 'row',
              fields: [
                { name: 'department', type: 'text', label: 'Département (ex: Technique)', admin: { width: '50%' } },
                {
                  name: 'type',
                  type: 'select',
                  label: 'Type de Contrat',
                  options: [
                    { label: 'CDI', value: 'CDI' },
                    { label: 'CDD', value: 'CDD' },
                    { label: 'Stage', value: 'stage' },
                    { label: 'Freelance', value: 'freelance' },
                  ],
                  admin: { width: '50%' }
                }
              ]
            },
            { name: 'location', type: 'text', label: 'Lieu de travail (ex: Dakar, Hybride)' },
          ]
        },
        {
          label: 'Description & Profil',
          fields: [
            { name: 'description', type: 'richText', label: 'Description complète (Missions & Profil)' }
          ]
        },
        {
          label: 'Publication',
          fields: [
            {
              name: 'status',
              type: 'select',
              label: 'Statut de l\'offre',
              options: [
                { label: 'Brouillon', value: 'draft' },
                { label: 'Ouvert', value: 'open' },
                { label: 'Fermé', value: 'closed' },
              ],
              defaultValue: 'draft',
            }
          ]
        }
      ]
    }
  ],
};
