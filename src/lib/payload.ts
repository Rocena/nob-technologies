import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { ensureDatabaseSchema } from '@/lib/ensureSchema';
import { ensureCompleteSeed } from '@/lib/ensureSeed';

let schemaInitPromise: Promise<any> | null = null;

export const getPayloadClient = async () => {
  const payload = await getPayload({ config: configPromise });
  if (!schemaInitPromise) {
    schemaInitPromise = (async () => {
      try {
        await ensureDatabaseSchema(payload);
      } catch (err: any) {
        console.warn('[PAYLOAD INIT SCHEMA WARNING]:', err?.message || err);
      }
      try {
        await ensureCompleteSeed(payload);
      } catch (err: any) {
        console.warn('[PAYLOAD INIT SEED WARNING]:', err?.message || err);
      }
    })();
  }
  return payload;
};
