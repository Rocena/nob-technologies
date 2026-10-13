import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Pages table: menu_placement and parent_item
  try {
    await db.run(sql`ALTER TABLE \`pages\` ADD COLUMN \`menu_placement\` text DEFAULT 'main';`)
  } catch {
    // Column already exists
  }

  try {
    await db.run(sql`ALTER TABLE \`pages\` ADD COLUMN \`parent_item\` text DEFAULT 'solutions';`)
  } catch {
    // Column already exists
  }

  // 2. Partners table: website_url
  try {
    await db.run(sql`ALTER TABLE \`partners\` ADD COLUMN \`website_url\` text;`)
  } catch {
    // Column already exists
  }

  // 3. Projects table: website_url and preview_screenshot_url
  try {
    await db.run(sql`ALTER TABLE \`projects\` ADD COLUMN \`website_url\` text;`)
  } catch {
    // Column already exists
  }

  try {
    await db.run(sql`ALTER TABLE \`projects\` ADD COLUMN \`preview_screenshot_url\` text;`)
  } catch {
    // Column already exists
  }
}

export async function down({}: MigrateDownArgs): Promise<void> {
  // SQLite cannot easily drop columns in older schemas without table recreation
}
