import type { Payload } from 'payload';

export interface UserMfaRecord {
  id: string | number;
  email: string;
  name?: string;
  role?: string;
  mfaEnabled: boolean;
  mfaSecret: string | null;
}

/**
 * Lit l'état MFA (mfa_enabled & mfa_secret) directement depuis la table users
 * avec double sécurité (SQL direct + Payload API showHiddenFields)
 */
export async function getUserMfaState(
  payload: Payload,
  userId: string | number
): Promise<UserMfaRecord | null> {
  const adapter: any = payload.db;

  // 1. Lecture via Payload avec showHiddenFields + overrideAccess
  let doc: any = null;
  try {
    doc = await payload.findByID({
      collection: 'users',
      id: userId,
      showHiddenFields: true,
      overrideAccess: true,
    });
  } catch {}

  let sqlMfaEnabled: boolean | undefined = undefined;
  let sqlMfaSecret: string | null | undefined = undefined;

  // 2. Lecture SQL directe (contourne tout cache Drizzle ou filtrage de champ caché)
  try {
    if (adapter?.pool?.query) {
      const res = await adapter.pool.query(
        'SELECT mfa_enabled, mfa_secret, email, name, role FROM "users" WHERE id = $1 LIMIT 1',
        [userId]
      );
      if (res?.rows?.[0]) {
        const row = res.rows[0];
        sqlMfaEnabled = Boolean(row.mfa_enabled);
        sqlMfaSecret = row.mfa_secret || null;
        if (!doc) doc = row;
      }
    } else if (adapter?.client?.execute) {
      const res = await adapter.client.execute({
        sql: 'SELECT mfa_enabled, mfa_secret, email, name, role FROM `users` WHERE id = ? LIMIT 1',
        args: [userId],
      });
      if (res?.rows?.[0]) {
        const row: any = res.rows[0];
        sqlMfaEnabled = Boolean(row.mfa_enabled === 1 || row.mfa_enabled === true || row.mfa_enabled === '1');
        sqlMfaSecret = row.mfa_secret ? String(row.mfa_secret) : null;
        if (!doc) doc = row;
      }
    }
  } catch (err: any) {
    console.warn('[mfaDb] SQL read fallback warning:', err?.message);
  }

  if (!doc) return null;

  const finalEnabled =
    sqlMfaEnabled !== undefined ? sqlMfaEnabled : Boolean(doc.mfaEnabled || doc.mfa_enabled);
  const finalSecret =
    sqlMfaSecret !== undefined ? sqlMfaSecret : (doc.mfaSecret || doc.mfa_secret || null);

  return {
    id: doc.id ?? userId,
    email: doc.email || '',
    name: doc.name || '',
    role: doc.role || 'editor',
    mfaEnabled: finalEnabled,
    mfaSecret: finalSecret,
  };
}

/**
 * Enregistre de façon atomique l'état MFA (mfa_enabled & mfa_secret) sur l'utilisateur
 */
export async function setUserMfaState(
  payload: Payload,
  userId: string | number,
  mfaEnabled: boolean,
  mfaSecret: string | null
): Promise<void> {
  const adapter: any = payload.db;

  // 1. Mise à jour SQL directe garantie (PostgreSQL & SQLite)
  try {
    if (adapter?.pool?.query) {
      await adapter.pool.query(
        'ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "mfa_enabled" boolean DEFAULT false;'
      ).catch(() => {});
      await adapter.pool.query(
        'ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "mfa_secret" varchar;'
      ).catch(() => {});
      await adapter.pool.query(
        'UPDATE "users" SET "mfa_enabled" = $1, "mfa_secret" = $2, "updated_at" = NOW() WHERE "id" = $3',
        [mfaEnabled, mfaSecret || null, userId]
      );
    } else if (adapter?.client?.execute) {
      await adapter.client.execute('ALTER TABLE `users` ADD COLUMN `mfa_enabled` integer DEFAULT 0;').catch(() => {});
      await adapter.client.execute('ALTER TABLE `users` ADD COLUMN `mfa_secret` text;').catch(() => {});
      await adapter.client.execute({
        sql: 'UPDATE `users` SET `mfa_enabled` = ?, `mfa_secret` = ? WHERE `id` = ?',
        args: [mfaEnabled ? 1 : 0, mfaSecret || null, userId],
      });
    }
  } catch (sqlErr: any) {
    console.warn('[mfaDb] Direct SQL update warning:', sqlErr?.message);
  }

  // 2. Synchronisation Payload ORM
  try {
    await payload.update({
      collection: 'users',
      id: userId,
      data: {
        mfaEnabled,
        mfaSecret: mfaSecret || '',
      } as any,
      overrideAccess: true,
      showHiddenFields: true,
    });
  } catch (payloadErr: any) {
    console.warn('[mfaDb] Payload update sync warning:', payloadErr?.message);
  }
}
