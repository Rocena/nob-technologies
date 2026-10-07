import type { CollectionConfig } from 'payload';

import { isAdmin } from '../access';

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Message Formulaire',
    plural: 'Messages & Formulaires',
  },
  admin: {
    group: 'Interactions & CRM',
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'name', 'email', 'status', 'repliedAt', 'createdAt'],
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        // Si l'administrateur passe manuellement le statut à "replied",
        // et qu'aucune date n'est renseignée, on l'initialise automatiquement.
        if (data?.status === 'replied' && !data?.repliedAt) {
          data.repliedAt = new Date().toISOString();
        }
        // Si le statut est nouveau et qu'on le consulte/modifie, s'il n'est pas encore répondu
        if (originalDoc?.status === 'new' && (!data?.status || data?.status === 'new')) {
          // Permet de marquer comme lu lors du premier enregistrement
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'replyPanel',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/admin/ReplyMessagePanel#ReplyMessagePanel',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Détails de la demande',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Nom & Prénom',
                  admin: { width: '50%' },
                },
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  label: 'Adresse Email',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Téléphone',
                  admin: { width: '50%' },
                },
                {
                  name: 'company',
                  type: 'text',
                  label: 'Entreprise / Organisation',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'subject',
              type: 'text',
              required: true,
              label: 'Objet de la demande',
            },
            {
              name: 'message',
              type: 'textarea',
              required: true,
              label: 'Contenu du message / Détails du projet',
            },
          ],
        },
        {
          label: 'Suivi & Historique Réponse',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'repliedAt',
                  type: 'date',
                  label: "Date d'envoi de la réponse",
                  admin: {
                    width: '50%',
                    date: {
                      pickerAppearance: 'dayAndTime',
                      displayFormat: 'dd/MM/yyyy HH:mm',
                    },
                    description: "Date et heure exactes d'envoi de la réponse",
                  },
                },
                {
                  name: 'repliedBy',
                  type: 'text',
                  label: 'Répondu par',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'replySubject',
              type: 'text',
              label: 'Objet de l\'email de réponse',
            },
            {
              name: 'replyBody',
              type: 'textarea',
              label: 'Dernière réponse envoyée',
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Statut du message',
      options: [
        { label: '🔴 Nouveau (Non traité)', value: 'new' },
        { label: '🟡 En cours (Lu)', value: 'read' },
        { label: '🟢 Répondu (Email envoyé)', value: 'replied' },
        { label: '⚪ Archivé', value: 'archived' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
