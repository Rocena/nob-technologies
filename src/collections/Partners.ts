import type { CollectionConfig } from 'payload';

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Partenaire',
    plural: 'Partenaires',
  },
  admin: {
    
    
    useAsTitle: 'name',
    group: 'Portfolio & Preuves',
    defaultColumns: ['name', 'category', 'role'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Nom de la marque',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Rôle (ex: Partenaire Certifié)',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      label: 'Catégorie (badge)',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description courte',
      type: 'textarea',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'themeColor',
      label: 'Couleur de thème (Tailwind class, ex: blue-500)',
      type: 'text',
      defaultValue: 'blue-500',
    },
  ],
};
