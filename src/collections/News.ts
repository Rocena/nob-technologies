import type { CollectionConfig } from 'payload';

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Actualité',
    plural: 'Actualités',
  },
  admin: {
    
    
    group: 'Blog & Actualités',
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'summary', type: 'textarea' },
    { name: 'content', type: 'richText', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'publishedDate', type: 'date' },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Publié', value: 'published' },
      ],
      defaultValue: 'draft',
    },
  ],
};
