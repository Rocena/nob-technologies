import type { CollectionConfig } from 'payload';

export const Admissions: CollectionConfig = {
  slug: 'admissions',
  labels: {
    singular: 'Candidature & Admission',
    plural: 'Candidatures & Admissions',
  },
  admin: {
    group: 'Formations & Savoir',
    useAsTitle: 'candidateName',
    defaultColumns: ['candidateName', 'formationTitle', 'targetSession', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true, // Allows frontend admission applications
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'admissionActions',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/admin/AdmissionActionsPanel#AdmissionActionsPanel',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Dossier du Candidat',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'candidateName',
                  label: 'Nom & Prénom',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'email',
                  label: 'Adresse Email',
                  type: 'email',
                  required: true,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phone',
                  label: 'Téléphone / WhatsApp',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'currentStatus',
                  label: 'Situation actuelle / Entreprise / Études',
                  type: 'text',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'formationTitle',
                  label: 'Formation demandée',
                  type: 'text',
                  required: true,
                  admin: { width: '60%' },
                },
                {
                  name: 'formationSlug',
                  label: 'Slug de la formation',
                  type: 'text',
                  admin: { width: '40%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'targetSession',
                  label: 'Session / Rentrée souhaitée',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'preferredSchedule',
                  label: 'Créneau / Horaires préférés',
                  type: 'text',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'currentLevel',
                  label: 'Niveau technique actuel',
                  type: 'text',
                  admin: { width: '50%' },
                },
                {
                  name: 'format',
                  label: 'Modalité souhaitée',
                  type: 'text',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'motivation',
              label: 'Projet professionnel & Motivations',
              type: 'textarea',
              admin: { rows: 4 },
            },
          ],
        },
        {
          label: 'Décision d\'Admission',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  label: 'Statut de la candidature',
                  type: 'select',
                  defaultValue: 'pending',
                  options: [
                    { label: 'En attente d’examen', value: 'pending' },
                    { label: 'Admis (Candidature validée)', value: 'accepted' },
                    { label: 'Non retenu (Candidature déclinée)', value: 'declined' },
                  ],
                  admin: { width: '50%' },
                },
                {
                  name: 'decisionDate',
                  label: 'Date de décision',
                  type: 'date',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'adminFeedback',
              label: 'Commentaire ou consigne pour le candidat (inclus dans l\'email)',
              type: 'textarea',
              admin: {
                description: 'Laissez vide pour appliquer le message officiel standard, ou saisissez des instructions spécifiques.',
                rows: 3,
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'emailSentAt',
                  label: 'Dernière notification email envoyée le',
                  type: 'date',
                  admin: { width: '50%', readOnly: true },
                },
                {
                  name: 'reviewedBy',
                  label: 'Décision enregistrée par',
                  type: 'text',
                  admin: { width: '50%', readOnly: true },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
