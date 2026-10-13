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

    // Secours local Drizzle Kit (si disponible en mode dev)
    if (adapter?.requireDrizzleKit && adapter?.schema && adapter?.drizzle) {
      const { pushSchema } = adapter.requireDrizzleKit();
      const { apply } = await pushSchema(
        adapter.schema,
        adapter.drizzle,
        adapter.schemaName ? [adapter.schemaName] : undefined,
        adapter.tablesFilter,
        adapter.extensions?.postgis ? ['postgis'] : undefined
      );

      if (typeof apply === 'function') {
        await apply();
        return {
          success: true,
          message: 'Schéma synchronisé via Drizzle Kit.',
        };
      }
    }

    return { success: false, message: 'Adaptateur non configuré pour la migration' };
  } catch (err: any) {
    console.error('[ensureDatabaseSchema] Erreur lors de l’initialisation du schéma:', err);
    throw err;
  } finally {
    isPushing = false;
  }
}
