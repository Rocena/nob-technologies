import type { CollectionConfig } from 'payload';

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  labels: {
    singular: 'Devis',
    plural: 'Devis',
  },
  admin: {
    group: 'CRM & Facturation',
    useAsTitle: 'quoteNumber',
    defaultColumns: ['quoteNumber', 'customer', 'status', 'total', 'date'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations Générales',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'customer',
                  type: 'relationship',
                  relationTo: 'customers',
                  required: true,
                  label: 'Client',
                  admin: { width: '50%' }
                },
                {
                  name: 'quoteNumber',
                  type: 'text',
                  required: true,
                  label: 'Numéro de Devis',
                  admin: { width: '50%', description: 'Laissez vide pour auto-générer' }
                },
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'date',
                  type: 'date',
                  required: true,
                  label: 'Date d\'émission',
                  defaultValue: () => new Date(),
                  admin: { width: '33%' }
                },
                {
                  name: 'validUntil',
                  type: 'date',
                  required: true,
                  label: 'Valide jusqu\'au',
                  admin: { width: '33%' }
                },
                {
                  name: 'status',
                  type: 'select',
                  required: true,
                  label: 'Statut',
                  options: [
                    { label: 'Brouillon', value: 'draft' },
                    { label: 'Envoyé', value: 'sent' },
                    { label: 'Accepté', value: 'accepted' },
                    { label: 'Refusé', value: 'rejected' },
                  ],
                  defaultValue: 'draft',
                  admin: { width: '34%' }
                },
              ]
            }
          ]
        },
        {
          label: 'Lignes du Devis',
          fields: [
            {
              name: 'items',
              type: 'array',
              required: true,
              label: 'Articles / Prestations',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'description', type: 'text', required: true, label: 'Description', admin: { width: '50%' } },
                    { name: 'quantity', type: 'number', required: true, label: 'Quantité', min: 1, defaultValue: 1, admin: { width: '15%' } },
                    { name: 'unitPrice', type: 'number', required: true, label: 'Prix Unitaire (FCFA)', min: 0, admin: { width: '35%' } },
                  ]
                }
              ],
            },
          ]
        },
        {
          label: 'Totaux & Conditions',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'subtotal', type: 'number', label: 'Sous-total (FCFA)', admin: { readOnly: true, width: '33%' } },
                { name: 'tax', type: 'number', label: 'TVA (18% - FCFA)', admin: { readOnly: true, width: '33%' } },
                { name: 'total', type: 'number', label: 'Total TTC (FCFA)', admin: { readOnly: true, width: '34%' } },
              ]
            },
            { name: 'notes', type: 'textarea', label: 'Notes ou Conditions particulières' },
          ]
        }
      ]
    }
  ],
};
