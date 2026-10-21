import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { ensureDatabaseSchema } from '@/lib/ensureSchema';
import { ensureCompleteSeed } from '@/lib/ensureSeed';

let schemaInitPromise: Promise<any> | null = null;
let seedStarted = false;

export const getPayloadClient = async () => {
  const payload = await getPayload({ config: configPromise });
  if (!schemaInitPromise) {
    schemaInitPromise = (async () => {
      try {
        await ensureDatabaseSchema(payload);
      } catch (err: any) {
        console.warn('[PAYLOAD INIT SCHEMA WARNING]:', err?.message || err);
      }
    })();
  }
  await schemaInitPromise;

  if (!seedStarted) {
    seedStarted = true;
    ensureCompleteSeed(payload).catch((err: any) => {
      console.warn('[PAYLOAD INIT SEED WARNING]:', err?.message || err);
    });
  }

  return payload;
};
