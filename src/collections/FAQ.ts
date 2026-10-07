import type { CollectionConfig } from 'payload';

export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'Question (FAQ)',
    plural: 'FAQ',
  },
  admin: {
    
    
    group: 'Contenu & Navigation',
    useAsTitle: 'question',
  },
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'richText', required: true },
    { name: 'category', type: 'text' },
  ],
};
