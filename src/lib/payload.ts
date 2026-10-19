import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { ensureDatabaseSchema } from '@/lib/ensureSchema';

let schemaInitPromise: Promise<any> | null = null;

export const getPayloadClient = async () => {
  const payload = await getPayload({ config: configPromise });
  if (!schemaInitPromise) {
    schemaInitPromise = ensureDatabaseSchema(payload).catch((err) => {
      console.warn('[PAYLOAD INIT SCHEMA WARNING]:', err?.message || err);
    });
  }
  return payload;
};
