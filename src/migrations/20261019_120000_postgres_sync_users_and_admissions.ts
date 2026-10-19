import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Colonnes MFA indispensables pour la collection users
  await db.execute(sql`
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "mfa_enabled" boolean DEFAULT false;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "mfa_secret" varchar;
  `);

  // 2. Table users_sessions pour la persistance des sessions d'administration
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "users_sessions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now(),
      "expires_at" timestamp(3) with time zone NOT NULL
    );
    CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" ("_order");
    CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" ("_parent_id");
  `);

  // 3. Table des candidatures d'admission
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "admissions" (
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
    );
    CREATE INDEX IF NOT EXISTS "admissions_status_idx" ON "admissions" ("status");
    CREATE INDEX IF NOT EXISTS "admissions_email_idx" ON "admissions" ("email");
    CREATE INDEX IF NOT EXISTS "admissions_created_at_idx" ON "admissions" ("created_at");
  `);

  // 4. Table des sessions de formation
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "formations_sessions" (
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
    );
    CREATE INDEX IF NOT EXISTS "formations_sessions_order_idx" ON "formations_sessions" ("_order");
    CREATE INDEX IF NOT EXISTS "formations_sessions_parent_id_idx" ON "formations_sessions" ("_parent_id");
  `);

  // 5. Colonnes de verrouillage documents
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "admissions_id" integer;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "admissions" CASCADE;
    DROP TABLE IF EXISTS "formations_sessions" CASCADE;
  `);
}
