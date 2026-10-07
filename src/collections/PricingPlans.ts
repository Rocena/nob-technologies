import type { CollectionConfig } from 'payload';

export const PricingPlans: CollectionConfig = {
  slug: 'pricing-plans',
  labels: {
    singular: 'Plan Tarifaire',
    plural: 'Plans Tarifaires',
  },
  admin: {
    
    
    useAsTitle: 'name',
    group: 'Expertises & Offres',
    defaultColumns: ['name', 'price', 'isPopular'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nom du plan',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Identifiant URL (slug)',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tagline',
      label: 'Slogan',
      type: 'text',
    },
    {
      name: 'price',
      label: 'Prix affiché (ex: "Sur devis")',
      type: 'text',
      required: true,
    },
    {
      name: 'isPopular',
      label: 'Mettre en avant (Populaire)',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'isDark',
      label: 'Design sombre (Mise en valeur)',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'features',
      label: 'Fonctionnalités incluses',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },
  ],
};
