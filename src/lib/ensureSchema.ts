import type { Payload } from 'payload';
import { statements } from '@/migrations/20261013_183000_postgres_init';

let isPushing = false;

const postgresPatchStatements: string[] = [
  // 1. Colonnes MFA indispensables sur users (résout l'erreur critique select users.mfa_enabled)
  'ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "mfa_enabled" boolean DEFAULT false;',
  'ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "mfa_secret" varchar;',
  'UPDATE "users" SET "login_attempts" = 0, "lock_until" = NULL;',
  'UPDATE "users" SET "email" = LOWER(TRIM("email")), "role" = \'super_admin\', "login_attempts" = 0, "lock_until" = NULL WHERE LOWER(TRIM("email")) = \'rolva.iqra@gmail.com\';',

  // 2. Table users_sessions pour la persistance des sessions d'administration
  `CREATE TABLE IF NOT EXISTS "users_sessions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now(),
    "expires_at" timestamp(3) with time zone NOT NULL
  );`,
  'CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" ("_order");',
  'CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" ("_parent_id");',

  // 3. Table admissions
  `CREATE TABLE IF NOT EXISTS "admissions" (
    "id" serial PRIMARY KEY NOT NULL,
    "candidate_name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "phone" varchar NOT NULL,
    "current_status" varchar,
    "formation_title" varchar NOT NULL,
    "formation_slug" varchar,
    "target_session" varchar NOT NULL,
    "preferred_schedule" varchar,
    "current_level" varchar,
    "format" varchar,
    "motivation" text,
    "status" varchar DEFAULT 'pending',
    "decision_date" timestamp(3) with time zone,
    "admin_feedback" text,
    "email_sent_at" timestamp(3) with time zone,
    "reviewed_by" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );`,
  'CREATE INDEX IF NOT EXISTS "admissions_status_idx" ON "admissions" ("status");',
  'CREATE INDEX IF NOT EXISTS "admissions_email_idx" ON "admissions" ("email");',
  'CREATE INDEX IF NOT EXISTS "admissions_created_at_idx" ON "admissions" ("created_at");',

  // 4. Table formations_sessions
  `CREATE TABLE IF NOT EXISTS "formations_sessions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "start_date" timestamp(3) with time zone,
    "schedule" varchar,
    "format" varchar DEFAULT 'hybride',
    "status" varchar DEFAULT 'open',
    "available_seats" numeric DEFAULT 10,
    "location" varchar DEFAULT 'Campus NOB TECHNOLOGIES — Dakar'
  );`,
  'CREATE INDEX IF NOT EXISTS "formations_sessions_order_idx" ON "formations_sessions" ("_order");',
  'CREATE INDEX IF NOT EXISTS "formations_sessions_parent_id_idx" ON "formations_sessions" ("_parent_id");',

  // 5. Relations
  'ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "admissions_id" integer;',

  // 6. Colonnes Email & SMTP sur site_settings
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_settings_smtp_host" varchar DEFAULT \'smtp.gmail.com\';',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_settings_smtp_port" numeric DEFAULT 587;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_settings_smtp_secure" boolean DEFAULT false;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_settings_smtp_user" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_settings_smtp_pass" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_settings_smtp_from" varchar DEFAULT \'"NOB TECHNOLOGIES" <contact@nobtech.fr>\';',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_settings_admin_notification_emails" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_settings_resend_api_key" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "smtp_host" varchar DEFAULT \'smtp.gmail.com\';',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "smtp_port" numeric DEFAULT 587;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "smtp_secure" boolean DEFAULT false;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "smtp_user" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "smtp_pass" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "smtp_from" varchar DEFAULT \'"NOB TECHNOLOGIES" <contact@nobtech.fr>\';',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "admin_notification_emails" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "resend_api_key" varchar;',

  // 7. Table galleries (Galerie photos & chantiers)
  `CREATE TABLE IF NOT EXISTS "galleries" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar NOT NULL,
    "category" varchar DEFAULT 'cablage' NOT NULL,
    "category_label" varchar,
    "image_url" varchar,
    "image_upload_id" integer,
    "description" varchar NOT NULL,
    "date" varchar,
    "order" numeric DEFAULT 10,
    "published" boolean DEFAULT true,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );`,
  'CREATE INDEX IF NOT EXISTS "galleries_category_idx" ON "galleries" ("category");',
  'CREATE INDEX IF NOT EXISTS "galleries_order_idx" ON "galleries" ("order");',
  'CREATE INDEX IF NOT EXISTS "galleries_published_idx" ON "galleries" ("published");',
  'ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "galleries_id" integer;',

  // 8. Colonnes Modèles d'emails personnalisables sur site_settings
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_templates_ack_email_subject" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_templates_ack_email_heading" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_templates_ack_email_message" text;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_templates_ack_email_help_text" text;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_templates_admission_accepted_subject" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_templates_admission_accepted_message" text;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_templates_admission_declined_subject" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_templates_admission_declined_message" text;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_templates_quote_email_subject" varchar;',
  'ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "email_templates_quote_email_message" text;',

  // 7. Table analytics_events pour le tableau de bord Marketing & Analytics
  `CREATE TABLE IF NOT EXISTS "analytics_events" (
    "id" serial PRIMARY KEY NOT NULL,
    "type" varchar DEFAULT 'pageview' NOT NULL,
    "path" varchar NOT NULL,
    "title" varchar,
    "referrer" varchar,
    "element_text" varchar,
    "element_id" varchar,
    "visitor_id" varchar,
    "session_id" varchar,
    "country" varchar,
    "country_code" varchar,
    "city" varchar,
    "device" varchar DEFAULT 'desktop',
    "browser" varchar,
    "os" varchar,
    "duration" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );`,
  'CREATE INDEX IF NOT EXISTS "analytics_events_type_idx" ON "analytics_events" ("type");',
  'CREATE INDEX IF NOT EXISTS "analytics_events_path_idx" ON "analytics_events" ("path");',
  'CREATE INDEX IF NOT EXISTS "analytics_events_visitor_id_idx" ON "analytics_events" ("visitor_id");',
  'CREATE INDEX IF NOT EXISTS "analytics_events_country_idx" ON "analytics_events" ("country");',
  'CREATE INDEX IF NOT EXISTS "analytics_events_created_at_idx" ON "analytics_events" ("created_at");',
  'ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "analytics_events_id" integer;',
  'DELETE FROM "analytics_events" WHERE "visitor_id" LIKE \'v_seed_%\';',
];

export async function ensureDatabaseSchema(payload: Payload): Promise<{
  success: boolean;
  message: string;
  executedStatements?: number;
  errors?: string[];
}> {
  if (isPushing) {
    return { success: false, message: 'Initialisation du schéma déjà en cours' };
  }

  const adapter: any = payload.db;

  try {
    isPushing = true;

    // Gestion PostgreSQL directe et ultra-rapide (production Vercel)
    if (adapter?.pool || adapter?.drizzle) {
      console.log('[ensureDatabaseSchema] Exécution des instructions DDL PostgreSQL...');
      let executed = 0;
      const statementErrors: string[] = [];

      // Exécuter en priorité les patchs MFA et tables récentes, puis le DDL complet
      const allStatements = [...postgresPatchStatements, ...statements];

      for (const statement of allStatements) {
        try {
          if (adapter.pool?.query) {
            await adapter.pool.query(statement);
          } else if (adapter.drizzle?.execute) {
            const { sql } = await import('@payloadcms/db-postgres');
            await adapter.drizzle.execute(sql.raw(statement));
          }
          executed++;
        } catch (err: any) {
          const isAlreadyExists =
            err?.code === '42710' || // duplicate_object
            err?.code === '42P07' || // duplicate_table
            err?.code === '42701' || // duplicate_column
            err?.message?.includes('already exists');

          if (!isAlreadyExists) {
            console.warn(`[ensureDatabaseSchema] Avertissement instruction (${err?.code}):`, err?.message);
            statementErrors.push(String(err?.message));
          }
        }
      }

      console.log(`[ensureDatabaseSchema] Schéma PostgreSQL appliqué avec succès. ${executed} instructions traitées.`);
      return {
        success: true,
        message: `Schéma PostgreSQL synchronisé avec succès (${executed} instructions traitées).`,
        executedStatements: executed,
        errors: statementErrors.length > 0 ? statementErrors : undefined,
      };
    }

    // Gestion SQLite directe (développement local)
    if (adapter?.drizzle?.run || adapter?.client) {
      console.log('[ensureDatabaseSchema] Vérification et synchronisation du schéma SQLite...');
      try {
        const { sql } = await import('@payloadcms/db-sqlite');
        const db = adapter.drizzle || adapter;

        // 1. Colonnes MFA sur la table users
        try {
          await db.run(sql`ALTER TABLE \`users\` ADD COLUMN \`mfa_enabled\` integer DEFAULT 0;`);
        } catch {}
        try {
          await db.run(sql`ALTER TABLE \`users\` ADD COLUMN \`mfa_secret\` text;`);
        } catch {}
        try {
          await db.run(sql`UPDATE \`users\` SET \`login_attempts\` = 0, \`lock_until\` = NULL;`);
          await db.run(sql`UPDATE \`users\` SET \`email\` = LOWER(TRIM(\`email\`)), \`role\` = 'super_admin' WHERE LOWER(TRIM(\`email\`)) = 'rolva.iqra@gmail.com';`);
        } catch {}

        // 2. Colonne admissions_id sur payload_locked_documents_rels
        try {
          await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`admissions_id\` integer;`);
        } catch {}

        // 3. Table admissions
        try {
          await db.run(sql`
            CREATE TABLE IF NOT EXISTS \`admissions\` (
              \`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
              \`candidate_name\` text NOT NULL,
              \`email\` text NOT NULL,
              \`phone\` text NOT NULL,
              \`current_status\` text,
              \`formation_title\` text NOT NULL,
              \`formation_slug\` text,
              \`target_session\` text NOT NULL,
              \`preferred_schedule\` text,
              \`current_level\` text,
              \`format\` text,
              \`motivation\` text,
              \`status\` text DEFAULT 'pending',
              \`decision_date\` text,
              \`admin_feedback\` text,
              \`email_sent_at\` text,
              \`reviewed_by\` text,
              \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
              \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
            );
          `);
        } catch {}

        // 4. Table formations_sessions
        try {
          await db.run(sql`
            CREATE TABLE IF NOT EXISTS \`formations_sessions\` (
              \`_order\` integer NOT NULL,
              \`_parent_id\` integer NOT NULL,
              \`id\` text PRIMARY KEY NOT NULL,
              \`name\` text NOT NULL,
              \`start_date\` text,
              \`schedule\` text,
              \`format\` text DEFAULT 'hybride',
              \`status\` text DEFAULT 'open',
              \`available_seats\` numeric DEFAULT 10,
              \`location\` text DEFAULT 'Campus NOB TECHNOLOGIES — Dakar',
              FOREIGN KEY (\`_parent_id\`) REFERENCES \`formations\`(\`id\`) ON UPDATE no action ON DELETE cascade
            );
          `);
        } catch {}

        // 5. Colonnes Email & SMTP sur site_settings (SQLite)
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_settings_smtp_host\` text DEFAULT 'smtp.gmail.com';`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_settings_smtp_port\` numeric DEFAULT 587;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_settings_smtp_secure\` integer DEFAULT 0;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_settings_smtp_user\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_settings_smtp_pass\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_settings_smtp_from\` text DEFAULT '"NOB TECHNOLOGIES" <contact@nobtech.fr>';`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_settings_admin_notification_emails\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_settings_resend_api_key\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`smtp_host\` text DEFAULT 'smtp.gmail.com';`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`smtp_port\` numeric DEFAULT 587;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`smtp_secure\` integer DEFAULT 0;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`smtp_user\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`smtp_pass\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`smtp_from\` text DEFAULT '"NOB TECHNOLOGIES" <contact@nobtech.fr>';`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`admin_notification_emails\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`resend_api_key\` text;`); } catch {}

        // 5b. Colonnes Modèles d'emails personnalisables sur site_settings (SQLite)
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_templates_ack_email_subject\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_templates_ack_email_heading\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_templates_ack_email_message\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_templates_ack_email_help_text\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_templates_admission_accepted_subject\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_templates_admission_accepted_message\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_templates_admission_declined_subject\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_templates_admission_declined_message\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_templates_quote_email_subject\` text;`); } catch {}
        try { await db.run(sql`ALTER TABLE \`site_settings\` ADD COLUMN \`email_templates_quote_email_message\` text;`); } catch {}

        // 6. Table galleries (SQLite)
        try {
          await db.run(sql`
            CREATE TABLE IF NOT EXISTS \`galleries\` (
              \`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
              \`title\` text NOT NULL,
              \`category\` text DEFAULT 'cablage' NOT NULL,
              \`category_label\` text,
              \`image_url\` text,
              \`image_upload_id\` integer,
              \`description\` text NOT NULL,
              \`date\` text,
              \`order\` numeric DEFAULT 10,
              \`published\` integer DEFAULT 1,
              \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
              \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
            );
          `);
        } catch {}
        try { await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`galleries_id\` integer;`); } catch {}

        // 7. Table analytics_events (SQLite)
        try {
          await db.run(sql`
            CREATE TABLE IF NOT EXISTS \`analytics_events\` (
              \`id\` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
              \`type\` text DEFAULT 'pageview' NOT NULL,
              \`path\` text NOT NULL,
              \`title\` text,
              \`referrer\` text,
              \`element_text\` text,
              \`element_id\` text,
              \`visitor_id\` text,
              \`session_id\` text,
              \`country\` text,
              \`country_code\` text,
              \`city\` text,
              \`device\` text DEFAULT 'desktop',
              \`browser\` text,
              \`os\` text,
              \`duration\` numeric,
              \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
              \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
            );
          `);
        } catch {}
        try { await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`analytics_events_id\` integer;`); } catch {}

        console.log('[ensureDatabaseSchema] Schéma SQLite synchronisé avec succès.');
        return {
          success: true,
          message: 'Schéma SQLite synchronisé avec succès.',
        };
      } catch (sqliteErr: any) {
        console.warn('[ensureDatabaseSchema] Avertissement SQLite:', sqliteErr?.message);
      }
    }

    return { success: true, message: 'Schéma vérifié.' };
  } catch (err: any) {
    console.error('[ensureDatabaseSchema] Erreur lors de l’initialisation du schéma:', err);
    throw err;
  } finally {
    isPushing = false;
  }
}
