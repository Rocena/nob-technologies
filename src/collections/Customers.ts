import type { CollectionConfig } from 'payload';

export const Customers: CollectionConfig = {
  slug: 'customers',
  labels: {
    singular: 'Client',
    plural: 'Clients',
  },
  admin: {
    group: 'CRM & Facturation',
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'contactName', 'email', 'phone'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations Entreprise',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'companyName',
                  type: 'text',
                  required: true,
                  label: 'Nom de l\'entreprise',
                  admin: { width: '60%' }
                },
                {
                  name: 'taxId',
                  type: 'text',
                  label: 'NINEA / Numéro de TVA',
                  admin: { width: '40%' }
                },
              ]
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'Adresse postale complète',
            }
          ]
        },
        {
          label: 'Contact Principal',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'contactName',
                  type: 'text',
                  label: 'Prénom & Nom du contact',
                  admin: { width: '33%' }
                },
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  label: 'Adresse E-mail',
                  admin: { width: '33%' }
                },
                {
                  name: 'phone',
                  type: 'text',
                  label: 'Téléphone',
                  admin: { width: '34%' }
                },
              ]
            }
          ]
        },
        {
          label: 'Notes & Suivi',
          fields: [
            {
              name: 'notes',
              type: 'textarea',
              label: 'Notes internes',
              admin: {
                description: 'Ces informations sont privées et uniquement visibles par votre équipe.'
              }
            }
          ]
        }
      ]
    }
  ],
};
