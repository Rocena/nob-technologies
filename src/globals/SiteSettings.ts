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
          name: 'emailSettings',
          label: 'Configuration E-mails & SMTP',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'smtpHost',
                  type: 'text',
                  label: 'Serveur SMTP (Hôte)',
                  defaultValue: 'smtp.gmail.com',
                  admin: {
                    width: '50%',
                    placeholder: 'ex: smtp.gmail.com, mail.infomaniak.com, ssl0.ovh.net',
                    description: 'Hôte SMTP de votre fournisseur de messagerie.',
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
                    description: '587 (TLS standard) ou 465 (SSL direct).',
                  },
                },
                {
                  name: 'smtpSecure',
                  type: 'checkbox',
                  label: 'SSL direct (Port 465)',
                  defaultValue: false,
                  admin: {
                    width: '25%',
                    description: 'Cocher pour SSL direct (465). Décocher pour 587.',
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
                  label: 'Utilisateur / E-mail d’authentification SMTP',
                  admin: {
                    width: '50%',
                    placeholder: 'ex: contact@nobtech.fr ou monadresse@gmail.com',
                    description: 'Compte de messagerie utilisé pour s’authentifier.',
                  },
                },
                {
                  name: 'smtpPass',
                  type: 'text',
                  label: 'Mot de passe SMTP / Clé d’application',
                  admin: {
                    width: '50%',
                    placeholder: '••••••••••••••••',
                    description: 'Pour Gmail : utilisez un "Mot de passe d\'application" Google (16 caractères).',
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
                  label: 'Nom & Adresse d’expéditeur (From)',
                  defaultValue: '"NOB TECHNOLOGIES" <contact@nobtech.fr>',
                  admin: {
                    width: '50%',
                    placeholder: '"NOB TECHNOLOGIES" <contact@nobtech.fr>',
                    description: 'Expéditeur officiel affiché au destinataire.',
                  },
                },
                {
                  name: 'adminNotificationEmails',
                  type: 'text',
                  label: 'Destinataires des notifications admin (séparés par virgules)',
                  defaultValue: 'contact@nobtech.fr, rolva.iqra@gmail.com',
                  admin: {
                    width: '50%',
                    placeholder: 'contact@nobtech.fr, rolva.iqra@gmail.com',
                    description: 'Adresses qui reçoivent les devis, admissions et messages.',
                  },
                },
              ],
            },
            {
              name: 'resendApiKey',
              type: 'text',
              label: 'Clé API Resend (Optionnel - Solution de secours HTTP)',
              admin: {
                placeholder: 're_...',
                description: 'Clé API Resend si vous souhaitez utiliser l\'envoi par API HTTP plutôt que SMTP.',
              },
            },
            {
              name: 'emailTestTool',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/admin/EmailTestField#EmailTestField',
                },
              },
            },
          ],
        },
        {
          name: 'emailTemplates',
          label: 'Modèles d\'E-mails & Notifications',
          fields: [
            {
              type: 'collapsible',
              label: '1. Accusé de Réception Client (Formulaires & Candidatures)',
              admin: {
                initCollapsed: false,
                description: 'Email automatique envoyé instantanément au visiteur/candidat dès qu\'il soumet un formulaire.',
              },
              fields: [
                {
                  name: 'ackEmailSubject',
                  type: 'text',
                  label: 'Sujet de l\'email (Accusé de réception)',
                  defaultValue: 'Accusé de réception : Nous avons bien reçu votre demande — NOB TECHNOLOGIES',
                  admin: {
                    description: 'Vous pouvez utiliser la variable {{subject}} pour inclure l\'objet saisi par le visiteur.',
                  },
                },
                {
                  name: 'ackEmailHeading',
                  type: 'text',
                  label: 'Titre principal affiché dans l\'email',
                  defaultValue: 'Merci pour votre confiance',
                  admin: {
                    description: 'Titre en haut du message de confirmation.',
                  },
                },
                {
                  name: 'ackEmailMessage',
                  type: 'textarea',
                  label: 'Message de confirmation',
                  defaultValue: 'Nous accusons bonne réception de votre demande. Nos équipes techniques l\'examinent actuellement avec la plus grande attention. Vous recevrez une réponse sous 24 à 48 heures ouvrées.',
                  admin: {
                    description: 'Corps principal du texte de confirmation.',
                  },
                },
                {
                  name: 'ackEmailHelpText',
                  type: 'textarea',
                  label: 'Texte d\'assistance / Contact urgent',
                  defaultValue: 'Une question urgente ? Contactez directement nos équipes au +221 77 301 08 38 ou par e-mail à contact@nobtech.fr.',
                  admin: {
                    description: 'Mention de bas de message pour guider le destinataire.',
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: '2. Candidature Formation — Admission Validée & Acceptée',
              admin: {
                initCollapsed: false,
                description: 'Email officiel envoyé au candidat lors de la validation de son dossier d\'admission.',
              },
              fields: [
                {
                  name: 'admissionAcceptedSubject',
                  type: 'text',
                  label: 'Sujet (Admission Acceptée)',
                  defaultValue: '🎓 Félicitations ! Votre admission à la formation {{formationTitle}} est validée — NOB TECHNOLOGIES',
                  admin: {
                    description: 'Variables disponibles : {{formationTitle}}, {{candidateName}}, {{targetSession}}',
                  },
                },
                {
                  name: 'admissionAcceptedMessage',
                  type: 'textarea',
                  label: 'Message d\'admission (Introduction)',
                  defaultValue: 'Nous avons le plaisir de vous informer que votre dossier de candidature a été examiné avec succès par notre comité pédagogique. Votre admission est officiellement validée.',
                  admin: {
                    description: 'Texte d\'annonce officiel précédant le récapitulatif de session et de cohorte.',
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: '3. Candidature Formation — Non Retenue / Liste d\'attente',
              admin: {
                initCollapsed: true,
                description: 'Email envoyé au candidat lorsque la cohorte est complète ou le dossier non retenu.',
              },
              fields: [
                {
                  name: 'admissionDeclinedSubject',
                  type: 'text',
                  label: 'Sujet (Dossier Non Retenu)',
                  defaultValue: 'Mise à jour concernant votre candidature — NOB TECHNOLOGIES',
                  admin: {
                    description: 'Variables disponibles : {{formationTitle}}, {{candidateName}}, {{targetSession}}',
                  },
                },
                {
                  name: 'admissionDeclinedMessage',
                  type: 'textarea',
                  label: 'Message explicatif',
                  defaultValue: 'Après analyse attentive de votre dossier et au vu du nombre strictement limité de places par session sur nos infrastructures physiques, nous ne sommes malheureusement pas en mesure de donner une suite favorable à votre admission pour cette cohorte précise. Votre profil reste conservé dans notre base de talents pour les sessions ultérieures.',
                  admin: {
                    description: 'Explication bienveillante transmise au candidat.',
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: '4. Devis Commercial Officiel (Envoi de proposition chiffrée)',
              admin: {
                initCollapsed: true,
                description: 'Email envoyé au client avec le récapitulatif et le lien d\'accès au document PDF du devis.',
              },
              fields: [
                {
                  name: 'quoteEmailSubject',
                  type: 'text',
                  label: 'Sujet de l\'email de Devis',
                  defaultValue: 'Devis Officiel N° {{quoteNumber}} — NOB TECHNOLOGIES',
                  admin: {
                    description: 'Variables disponibles : {{quoteNumber}}, {{customerName}}, {{totalAmount}}',
                  },
                },
                {
                  name: 'quoteEmailMessage',
                  type: 'textarea',
                  label: 'Message d\'accompagnement du devis',
                  defaultValue: 'Nous avons le plaisir de vous transmettre notre proposition commerciale concernant vos besoins d\'infrastructure et de services IT. Vous trouverez ci-dessous le récapitulatif détaillé ainsi que l\'accès direct au document officiel.',
                  admin: {
                    description: 'Texte accompagnant le devis chiffré.',
                  },
                },
              ],
            },
            {
              name: 'templateTestTool',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/admin/EmailTestField#EmailTestField',
                },
              },
            },
          ],
        },
        {
          name: 'security',
          label: 'Sécurité & Google Authenticator (MFA / 2FA)',
          fields: [
            {
              name: 'mfaSecuritySettings',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/admin/MfaSettingsField#MfaSettingsField',
                },
              },
            },
          ],
        },
      ]
    }
  ],
};
