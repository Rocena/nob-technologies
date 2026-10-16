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
              defaultValue: 'Route de l’Aéroport LSS lot N° 79, Dakar Sénégal' 
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
              label: "Message de bienvenue de l'assistant (Koffi)",
              defaultValue: "Bonjour ! Je m'appelle Koffi, votre conseiller virtuel chez NOBTECH. Comment puis-je vous aider aujourd'hui ? 😊",
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
        },
        {
          name: 'emailConfig',
          label: 'Emails & Notifications Admins',
          fields: [
            {
              name: 'adminEmails',
              type: 'text',
              label: 'Emails des administrateurs destinataires (séparés par une virgule)',
              defaultValue: 'contact@nobtech.fr',
              admin: {
                placeholder: 'contact@nobtech.fr, direction@nobtech.fr',
                description:
                  'Ces adresses (ainsi que tous les comptes utilisateurs du back-office) recevront automatiquement les résumés des formulaires et des conversations sérieuses du chat.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'smtpHost',
                  type: 'text',
                  label: 'Serveur SMTP (Host)',
                  defaultValue: 'smtp.gmail.com',
                  admin: {
                    width: '50%',
                    placeholder: 'smtp.gmail.com ou ssl0.ovh.net',
                  },
                },
                {
                  name: 'smtpPort',
                  type: 'number',
                  label: 'Port SMTP',
                  defaultValue: 587,
                  admin: {
                    width: '25%',
                    placeholder: '587 ou 465',
                  },
                },
                {
                  name: 'smtpSecure',
                  type: 'checkbox',
                  label: 'SSL/TLS strict (Port 465)',
                  defaultValue: false,
                  admin: {
                    width: '25%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'smtpUser',
                  type: 'text',
                  label: 'Utilisateur SMTP (Adresse email d\'envoi)',
                  admin: {
                    width: '50%',
                    placeholder: 'ex: contact@nobtech.fr ou votre.adresse@gmail.com',
                    description: 'Requis pour activer l\'expédition réelle des emails si non défini dans .env.',
                  },
                },
                {
                  name: 'smtpPass',
                  type: 'text',
                  label: 'Mot de passe SMTP / Mot de passe d\'application Gmail',
                  access: {
                    read: ({ req: { user } }) => Boolean(user),
                  },
                  admin: {
                    width: '50%',
                    placeholder: 'Mot de passe SMTP ou App Password (16 caractères)',
                    description: 'Pour Gmail, utilisez un "Mot de passe d\'application" généré dans la sécurité de votre compte Google.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'smtpFrom',
                  type: 'text',
                  label: 'Nom & Adresse d\'expéditeur affichés (From)',
                  defaultValue: '"NOB TECHNOLOGIES" <contact@nobtech.fr>',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'resendApiKey',
                  type: 'text',
                  label: 'Clé API Resend (Alternative sans SMTP - Optionnel)',
                  access: {
                    read: ({ req: { user } }) => Boolean(user),
                  },
                  admin: {
                    width: '50%',
                    placeholder: 're_123456789...',
                    description: 'Si vous renseignez une clé Resend (resend.com), elle sera utilisée automatiquement si le SMTP n\'est pas configuré.',
                  },
                },
              ],
            },
          ],
        },
      ]
    }
  ],
};
