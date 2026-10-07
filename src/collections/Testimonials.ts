import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Témoignage',
    plural: 'Témoignages',
  },
  admin: {
    
    
    group: 'Portfolio & Preuves',
    useAsTitle: 'authorName',
  },
  fields: [
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorRole', type: 'text' },
    { name: 'content', type: 'textarea', required: true },
    { name: 'client', type: 'relationship', relationTo: 'clients' },
  ],
};
