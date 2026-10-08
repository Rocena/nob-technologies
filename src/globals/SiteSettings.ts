import type { GlobalConfig } from 'payload';
import { isAdmin } from '../access';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du site & Chatbot AI',
  access: {
    read: () => true, // Publicly readable for the frontend
    update: isAdmin,
  },
  admin: {
    group: 'Configuration',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'general',
          label: 'Identité de la Marque',
          fields: [
            {
              type: 'row',
              fields: [
                { 
                  name: 'siteName', 
                  type: 'text', 
                  required: true, 
                  label: 'Nom du site / Entreprise',
                  defaultValue: 'NOB TECHNOLOGIES', 
                  admin: { width: '50%' } 
                },
                { 
                  name: 'logo', 
                  type: 'upload', 
                  relationTo: 'media', 
                  label: 'Logo Principal',
                  admin: { width: '50%' } 
                },
              ]
            },
            { 
              name: 'siteDescription', 
              type: 'textarea',
              label: 'Description Globale (SEO & Meta)',
              admin: { description: 'Cette description apparaîtra dans le pied de page et sera utilisée pour le référencement par défaut.' }
            },
          ]
        },
        {
          name: 'contact',
          label: 'Coordonnées Officielles',
          fields: [
            {
              type: 'row',
              fields: [
                { 
                  name: 'email', 
                  type: 'text', 
                  label: 'Adresse E-mail',
                  defaultValue: 'contact@nobtech.fr',
                  admin: { width: '50%' } 
                },
                { 
                  name: 'phone', 
                  type: 'text', 
                  label: 'Téléphone Standard (+221 77 prioritaires pour appels)',
                  defaultValue: '+221 77 301 08 38 / +221 33 814 04 35',
                  admin: { width: '50%' } 
                },
              ]
            },
            { 
              name: 'address', 
              type: 'textarea', 
              label: 'Adresse Physique du Siège',
              defaultValue: 'Azura de l’Aéroport, 1SS lot N° 79, Dakar Sénégal' 
            },
          ]
        },
        {
          label: 'Réseaux Sociaux',
          fields: [
            {
              name: 'socialMedia',
              type: 'array',
              label: 'Comptes et Liens Sociaux',
              labels: {
                singular: 'Réseau Social',
                plural: 'Réseaux Sociaux'
              },
              admin: {
                description: 'Ajoutez les liens vers vos différents comptes (LinkedIn, Twitter, Facebook, etc.).'
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { 
                      name: 'platform', 
                      type: 'select', 
                      required: true, 
                      label: 'Plateforme',
                      admin: { width: '30%' },
                      options: [
                        { label: 'LinkedIn', value: 'linkedin' },
                        { label: 'Twitter / X', value: 'twitter' },
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'Autre', value: 'autre' },
                      ]
                    },
                    { 
                      name: 'url', 
                      type: 'text', 
                      required: true, 
                      label: 'Lien (URL exacte)',
                      admin: { width: '70%', placeholder: 'https://...' } 
                    },
                  ]
                }
              ],
            },
          ]
        },
        {
          name: 'chatbot',
          label: 'Assistant Virtuel (Chatbot AI Knowledge Base)',
          fields: [
            {
              name: 'botGreeting',
              type: 'text',
              label: 'Message de bienvenue de l\'assistant',
              defaultValue: "Bonjour ! Je suis l'assistant de NOB TECHNOLOGIES. Comment puis-je vous aider aujourd'hui ? 👋",
            },
            {
              name: 'knowledgeBase',
              type: 'array',
              label: 'Base de Connaissances (Questions, Mots-clés & Réponses)',
              labels: {
                singular: 'Connaissance / Réponse',
                plural: 'Base de connaissances'
              },
              admin: {
                description: 'Enrichissez l\'intelligence de l\'assistant virtuel : définissez des mots-clés et la réponse précise à renvoyer.'
              },
              fields: [
                {
                  name: 'topic',
                  type: 'text',
                  label: 'Sujet / Intitulé',
                  admin: { placeholder: 'Ex: Horaires d\'ouverture, Garantie, Support d\'urgence...' }
                },
                {
                  name: 'keywords',
                  type: 'text',
                  required: true,
                  label: 'Mots-clés déclencheurs (séparés par des virgules)',
                  admin: { placeholder: 'urgence, astreinte, 24h, weekend, panne' }
                },
                {
                  name: 'response',
                  type: 'textarea',
                  required: true,
                  label: 'Réponse de l\'IA',
                  admin: { description: 'Texte renvoyé. Vous pouvez utiliser la syntaxe markdown pour les liens, ex: [Page Contact](/contact).' }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
};
