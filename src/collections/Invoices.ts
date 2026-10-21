import type { CollectionConfig } from 'payload';

export const Invoices: CollectionConfig = {
  slug: 'invoices',
  labels: {
    singular: 'Facture',
    plural: 'Factures',
  },
  admin: {
    group: 'CRM & Facturation',
    useAsTitle: 'invoiceNumber',
    defaultColumns: ['invoiceNumber', 'customer', 'status', 'total', 'date'],
  },
  fields: [
    {
      name: 'invoiceActions',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/admin/InvoiceActionsPanel#InvoiceActionsPanel',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations de Facturation',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'invoiceNumber',
                  type: 'text',
                  required: true,
                  label: 'Numéro de Facture',
                  admin: { width: '33%', description: 'Laissez vide pour auto-générer' }
                },
                {
                  name: 'customer',
                  type: 'relationship',
                  relationTo: 'customers',
                  required: true,
                  label: 'Client',
                  admin: { width: '33%' }
                },
                {
                  name: 'quote',
                  type: 'relationship',
                  relationTo: 'quotes',
                  label: 'Devis lié (optionnel)',
                  admin: { width: '34%' }
                }
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
                  name: 'dueDate',
                  type: 'date',
                  required: true,
                  label: 'Date d\'échéance',
                  admin: { width: '33%' }
                },
                {
                  name: 'status',
                  type: 'select',
                  required: true,
                  label: 'Statut',
                  options: [
                    { label: 'Brouillon', value: 'draft' },
                    { label: 'Envoyée', value: 'sent' },
                    { label: 'Payée', value: 'paid' },
                    { label: 'En retard', value: 'overdue' },
                    { label: 'Annulée', value: 'cancelled' },
                  ],
                  defaultValue: 'draft',
                  admin: { width: '34%' }
                },
              ]
            }
          ]
        },
        {
          label: 'Lignes de Facturation',
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
          label: 'Totaux',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'subtotal', type: 'number', label: 'Sous-total (FCFA)', admin: { readOnly: true, width: '33%' } },
                { name: 'tax', type: 'number', label: 'TVA (18% - FCFA)', admin: { readOnly: true, width: '33%' } },
                { name: 'total', type: 'number', label: 'Total TTC (FCFA)', admin: { readOnly: true, width: '34%' } },
              ]
            },
            { name: 'notes', type: 'textarea', label: 'Notes (Paiement, RIB, etc.)' },
          ]
        }
      ]
    }
  ],
};
