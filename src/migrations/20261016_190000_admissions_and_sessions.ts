import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite';

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Create admissions table
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

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`admissions_status_idx\` ON \`admissions\` (\`status\`);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`admissions_email_idx\` ON \`admissions\` (\`email\`);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`admissions_created_at_idx\` ON \`admissions\` (\`created_at\`);`);

  // 2. Create formations_sessions table for sessions array in formations collection
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

  await db.run(sql`CREATE INDEX IF NOT EXISTS \`formations_sessions_order_idx\` ON \`formations_sessions\` (\`_order\`);`);
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`formations_sessions_parent_id_idx\` ON \`formations_sessions\` (\`_parent_id\`);`);

  // 3. Add admissions_id to payload_locked_documents_rels
  try {
    await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD COLUMN \`admissions_id\` integer;`);
  } catch {
    // Already exists
  }
  try {
    await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_admissions_id_idx\` ON \`payload_locked_documents_rels\` (\`admissions_id\`);`);
  } catch {
    // Already exists
  }
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // down migration
}
