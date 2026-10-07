import type { CollectionConfig } from 'payload';

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  admin: {
    group: 'Blog & Actualités',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'authorName', 'status', 'publishedDate'],
  },
  access: {
    read: () => true, // Accessible publiquement pour affichage sur le site
  },
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'create' || !data.authorName) {
          if (req.user) {
            if (!data.author) {
              data.author = req.user.id;
            }
            if (!data.authorName && req.user.name) {
              data.authorName = req.user.name;
            }
          }
        }
        if (!data.publishedDate && data.status === 'published') {
          data.publishedDate = new Date().toISOString();
        }
        return data;
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article & Contenu',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'title', type: 'text', required: true, label: 'Titre de l’article', admin: { width: '60%' } },
                { name: 'slug', type: 'text', required: true, unique: true, label: 'URL (Slug)', admin: { width: '40%' } },
              ],
            },
            {
              name: 'summary',
              type: 'textarea',
              label: 'Résumé d’accroche / Chapeau',
              admin: { description: 'Texte d’accroche affiché sur la liste du blog et sous le titre (style éditorial).' },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image de Couverture / Bannière',
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
              label: 'Corps de l’article',
            },
          ],
        },
        {
          label: 'Méta & Auteur',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  label: 'Catégorie',
                  options: [
                    { label: 'Cybersécurité & Audit', value: 'Cybersécurité & Audit' },
                    { label: 'Infrastructure & Réseaux', value: 'Infrastructure & Réseaux' },
                    { label: 'Cloud & DevOps', value: 'Cloud & DevOps' },
                    { label: 'Intelligence Artificielle & ERP', value: 'Intelligence Artificielle & ERP' },
                    { label: 'Culture Tech & Innovation', value: 'Culture Tech & Innovation' },
                  ],
                  defaultValue: 'Culture Tech & Innovation',
                  admin: { width: '50%' },
                },
                {
                  name: 'readingTime',
                  type: 'text',
                  label: 'Temps de lecture estimé',
                  defaultValue: '5 min',
                  admin: { width: '50%', placeholder: 'ex: 4 min' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'author',
                  type: 'relationship',
                  relationTo: 'users',
                  label: 'Utilisateur Auteur (Compte)',
                  defaultValue: ({ req: { user } }) => user?.id,
                  admin: { width: '50%', description: 'Associe l’article au compte de la personne connectée.' },
                },
                {
                  name: 'authorName',
                  type: 'text',
                  label: 'Nom de l’auteur affiché',
                  defaultValue: ({ req: { user } }) => user?.name || 'Rédaction NOB TECHNOLOGIES',
                  admin: { width: '50%', description: 'Nom affiché publiquement sur le blog (rempli automatiquement).' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  type: 'select',
                  label: 'Statut de publication',
                  options: [
                    { label: 'Brouillon', value: 'draft' },
                    { label: 'En révision', value: 'review' },
                    { label: 'Publié', value: 'published' },
                    { label: 'Archivé', value: 'archived' },
                  ],
                  defaultValue: 'published',
                  admin: { width: '50%' },
                },
                {
                  name: 'publishedDate',
                  type: 'date',
                  label: 'Date de publication',
                  defaultValue: () => new Date().toISOString(),
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'tags',
              type: 'array',
              label: 'Tags / Mots-clés',
              fields: [{ name: 'tag', type: 'text', label: 'Tag' }],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'metaTitle', type: 'text', label: 'Titre SEO' },
            { name: 'metaDescription', type: 'textarea', label: 'Description SEO' },
          ],
        },
      ],
    },
  ],
};
