import type { CollectionConfig } from 'payload';

export const AnalyticsEvents: CollectionConfig = {
  slug: 'analytics-events',
  labels: {
    singular: 'Événement Analytics',
    plural: 'Événements Analytics',
  },
  admin: {
    group: 'Marketing & Analyse',
    useAsTitle: 'path',
    defaultColumns: ['path', 'type', 'elementText', 'country', 'city', 'device', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Accessible par l'API de tracking public
    update: ({ req: { user } }) => user?.role === 'super_admin',
    delete: ({ req: { user } }) => user?.role === 'super_admin',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Type d’interaction',
      options: [
        { label: 'Page vue (Pageview)', value: 'pageview' },
        { label: 'Clic Bouton / CTA', value: 'click' },
        { label: 'Clic WhatsApp direct', value: 'whatsapp_click' },
        { label: 'Clic Appel téléphonique', value: 'call_click' },
        { label: 'Téléchargement Brochure / Programme', value: 'download_brochure' },
        { label: 'Soumission de formulaire', value: 'form_submit' },
      ],
      defaultValue: 'pageview',
      required: true,
      index: true,
    },
    {
      name: 'path',
      type: 'text',
      label: 'Chemin URL de la page',
      required: true,
      index: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titre de la page',
    },
    {
      name: 'referrer',
      type: 'text',
      label: 'Source / Référent',
    },
    {
      name: 'elementText',
      type: 'text',
      label: 'Texte de l’élément cliqué (Bouton / Lien)',
    },
    {
      name: 'elementId',
      type: 'text',
      label: 'Identifiant / Cible du clic',
    },
    {
      name: 'visitorId',
      type: 'text',
      label: 'Identifiant unique visiteur (Anonymisé)',
      index: true,
    },
    {
      name: 'sessionId',
      type: 'text',
      label: 'Identifiant de session',
    },
    {
      name: 'country',
      type: 'text',
      label: 'Pays',
      index: true,
    },
    {
      name: 'countryCode',
      type: 'text',
      label: 'Code Pays (ISO)',
    },
    {
      name: 'city',
      type: 'text',
      label: 'Ville',
      index: true,
    },
    {
      name: 'device',
      type: 'select',
      label: 'Type d’appareil',
      options: [
        { label: 'Mobile (Smartphone)', value: 'mobile' },
        { label: 'Ordinateur (Desktop)', value: 'desktop' },
        { label: 'Tablette', value: 'tablet' },
      ],
      defaultValue: 'desktop',
    },
    {
      name: 'browser',
      type: 'text',
      label: 'Navigateur',
    },
    {
      name: 'os',
      type: 'text',
      label: 'Système d’exploitation',
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Durée estimée (secondes)',
    },
  ],
};
