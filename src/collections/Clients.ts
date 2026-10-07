import type { CollectionConfig } from 'payload';

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: {
    singular: 'Clients',
    plural: 'Clients',
  },
  admin: {
    
    
    group: 'Portfolio & Preuves',
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nom' },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'industry', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'displayStatus', type: 'checkbox', defaultValue: true, label: 'Afficher sur le site public' },
  ],
};
