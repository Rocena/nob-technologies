import type { CollectionConfig } from 'payload';

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  labels: {
    singular: 'Photo / Chantier Galerie',
    plural: 'Galerie Photos & Déploiements',
  },
  admin: {
    group: 'Portfolio & Preuves',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'published'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Titre du Chantier / Installation',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'ex: Pose de goulottes murales & déroulage du câblage réseau',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          label: 'Catégorie principale',
          type: 'select',
          required: true,
          defaultValue: 'cablage',
          admin: { width: '50%' },
          options: [
            { label: 'Baies & Télécoms (Racks 42U, Coffrets, GSM-R)', value: 'baies' },
            { label: 'Câblage & Goulottes (Cuivre Cat 6A/7, Goulottes, Boîtes de sol)', value: 'cablage' },
            { label: 'Équipements & Tests (Bandeaux RJ45, Testeurs, Certification)', value: 'equipements' },
            { label: 'Digital & ERP (Plateformes web, Logiciels, Dashboards)', value: 'digital' },
          ],
        },
        {
          name: 'categoryLabel',
          label: 'Badge / Libellé court affiché',
          type: 'text',
          admin: {
            width: '50%',
            placeholder: 'ex: Baies & Coffrets, Câblage & Goulottes...',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'imageUrl',
          label: 'Chemin ou URL de l’image',
          type: 'text',
          admin: {
            width: '50%',
            placeholder: 'ex: /images/gallery/galerie-1-baie-brassage.jpg ou https://...',
            description: 'Chemin interne du site ou lien direct.',
          },
        },
        {
          name: 'imageUpload',
          label: 'Ou Téléverser une image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            width: '50%',
            description: 'Téléversez une photo depuis votre ordinateur.',
          },
        },
      ],
    },
    {
      name: 'description',
      label: 'Description technique de l’installation',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Détails sur l\'intervention, le client, le matériel déployé ou la méthodologie.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          label: 'Période / Date (ex: 2026)',
          type: 'text',
          admin: { width: '33%' },
        },
        {
          name: 'order',
          label: 'Ordre d’affichage',
          type: 'number',
          defaultValue: 10,
          admin: { width: '33%' },
        },
        {
          name: 'published',
          label: 'Publié dans la galerie',
          type: 'checkbox',
          defaultValue: true,
          admin: { width: '33%' },
        },
      ],
    },
  ],
};
