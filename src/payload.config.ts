import { fr } from '@payloadcms/translations/languages/fr';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';

import { Users } from './collections/Users';
import { Pages } from './collections/Pages';
import { Services } from './collections/Services';
import { Media } from './collections/Media';
import { Articles } from './collections/Articles';
import { News } from './collections/News';
import { FAQ } from './collections/FAQ';
import { Testimonials } from './collections/Testimonials';
import { Clients } from './collections/Clients';
import { ContactMessages } from './collections/ContactMessages';
import { Projects } from './collections/Projects';
import { JobOffers } from './collections/JobOffers';
import { PricingPlans } from './collections/PricingPlans';
import { Partners } from './collections/Partners';
import { ActivityLogs } from './collections/ActivityLogs';
import { Customers } from './collections/Customers';
import { Quotes } from './collections/Quotes';
import { Invoices } from './collections/Invoices';
import { Formations } from './collections/Formations';
import { Admissions } from './collections/Admissions';
import { Galleries } from './collections/Galleries';
import { AnalyticsEvents } from './collections/AnalyticsEvents';
import { SiteSettings } from './globals/SiteSettings';
import { migrations, postgresMigrations } from './migrations';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    
    
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- NOB TECHNOLOGIES',
      icons: [
        { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'icon', url: '/favicon.ico' },
      ],
    },
    avatar: {
      Component: '@/components/admin/CustomAvatar#CustomAvatar',
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo#Logo',
        Icon: '@/components/admin/Icon#Icon',
      },
      providers: ['@/components/admin/GlobalUIProvider#GlobalUIProvider', '@/components/admin/DynamicTitleEnhancer#DynamicTitleEnhancer'],
      afterNavLinks: [
        '@/components/admin/LogoutButton#LogoutButton'
      ],
      views: {
        dashboard: {
          Component: '@/components/admin/DashboardWidget#DashboardWidget',
        },
        Aide: {
          path: '/aide',
          Component: '@/components/admin/HelpWizard#HelpWizard',
        },
        Analytics: {
          path: '/analytics',
          Component: '@/components/admin/AnalyticsDashboard#AnalyticsDashboard',
        },
        PipelineCRM: {
          path: '/crm-pipeline',
          Component: '@/components/admin/CrmPipelineDashboard#CrmPipelineDashboard',
        },
        MfaSecurity: {
          path: '/mfa',
          Component: '@/components/admin/MfaSettingsField#MfaSecurityView',
        }
      }
    },
  },
  globals: [
    SiteSettings,
  ],
  collections: [
    Users,
    Pages,
    Services,
    PricingPlans,
    JobOffers,
    Partners,
    ActivityLogs,
    Customers,
    Quotes,
    Invoices,
    Media,
    Articles,
    News,
    FAQ,
    Testimonials,
    Clients,
    ContactMessages,
    Projects,
    Formations,
    Admissions,
    Galleries,
    AnalyticsEvents,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'nobtech-super-secret-key-12345',
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr',
    translations: {
      fr: {
        general: {
          createNew: 'Ajouter',
          createNewLabel: 'Ajouter',
          createNewBlock: 'Ajouter',
          creatingNew: 'Ajout : {{label}}',
          creating: 'Ajout : {{label}}',
          create: 'Ajout : {{label}}',
          creatingNew_male: 'Ajout : {{label}}',
          creatingNew_female: 'Ajout : {{label}}',
          creatingNew_genderNeutral: 'Ajout : {{label}}',
          fallbackTitle: 'Nouvelle création',
          noResults: 'Aucune donnée disponible dans cette section pour le moment.',
          dashboard: 'Tableau de bord',
          save: 'Enregistrer les modifications',
          delete: 'Supprimer définitivement',
          edit: 'Modifier',
          updatedSuccessfully: 'Modifications enregistrées avec succès',
          createdSuccessfully: 'Création réussie',
        }
      }
    }
  },
  db: (() => {
    const postgresUri =
      process.env.POSTGRES_URL ||
      process.env.STORAGE_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.DATABASE_URL ||
      (process.env.DATABASE_URI?.startsWith('postgres') ? process.env.DATABASE_URI : null);

    if (postgresUri) {
      const isLocal = postgresUri.includes('localhost') || postgresUri.includes('127.0.0.1');
      return postgresAdapter({
        pool: {
          connectionString: postgresUri,
          ssl: isLocal ? false : { rejectUnauthorized: false },
          max: 10,
        },
        prodMigrations: postgresMigrations,
        push: true,
      });
    }

    return sqliteAdapter({
      client: {
        url: process.env.DATABASE_URI || 'file:./payload.db',
      },
      push: false,
      prodMigrations: migrations,
      busyTimeout: 10000,
      wal: true,
    });
  })(),
  onInit: async (payload) => {
    try {
      const { ensureDatabaseSchema } = await import('@/lib/ensureSchema');
      await ensureDatabaseSchema(payload);
      const { ensureCompleteSeed } = await import('@/lib/ensureSeed');
      await ensureCompleteSeed(payload);
    } catch (err: any) {
      console.warn('[PAYLOAD ONINIT WARNING]:', err?.message || err);
    }
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
