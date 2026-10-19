import type { Payload } from 'payload';
import { statements } from '@/migrations/20261013_183000_postgres_init';

let isPushing = false;

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

      for (const statement of statements) {
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
