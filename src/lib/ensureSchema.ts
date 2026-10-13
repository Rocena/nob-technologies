import type { Payload } from 'payload';

let isPushing = false;

export async function ensureDatabaseSchema(payload: Payload): Promise<{ success: boolean; message: string }> {
  if (isPushing) {
    return { success: false, message: 'Schema initialization already in progress' };
  }

  const adapter: any = payload.db;

  if (adapter?.requireDrizzleKit && adapter?.schema && adapter?.drizzle) {
    try {
      isPushing = true;
      console.log('[ensureDatabaseSchema] Pushing schema to database via Drizzle Kit...');
      const { pushSchema } = adapter.requireDrizzleKit();
      const { apply, warnings, hasDataLoss } = await pushSchema(
        adapter.schema,
        adapter.drizzle,
        adapter.schemaName ? [adapter.schemaName] : undefined,
        adapter.tablesFilter,
        adapter.extensions?.postgis ? ['postgis'] : undefined
      );

      if (typeof apply === 'function') {
        await apply();
        console.log('[ensureDatabaseSchema] Schema successfully applied!');
        return {
          success: true,
          message: 'Schéma PostgreSQL synchronisé et tables créées avec succès.',
        };
      }

      return { success: false, message: 'apply function not available from pushSchema' };
    } catch (err: any) {
      console.error('[ensureDatabaseSchema] Error applying schema:', err);
      throw err;
    } finally {
      isPushing = false;
    }
  }

  return { success: false, message: 'Drizzle adapter not detected or not supported' };
}
