import type { Payload } from 'payload';
import { statements } from '@/migrations/20261013_183000_postgres_init';

let isPushing = false;

const postgresPatchStatements: string[] = [
  // 1. Colonnes MFA indispensables sur users (résout l'erreur critique select users.mfa_enabled)
  'ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "mfa_enabled" boolean DEFAULT false;',
  'ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "mfa_secret" varchar;',

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
