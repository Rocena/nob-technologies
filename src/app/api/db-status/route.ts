import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';
import { ensureDatabaseSchema } from '@/lib/ensureSchema';

export const dynamic = 'force-dynamic';

export async function GET() {
  const hasPostgresUrl = Boolean(
    process.env.POSTGRES_URL ||
    process.env.STORAGE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL ||
    (process.env.DATABASE_URI?.startsWith('postgres'))
  );

  const envDetected = {
    has_POSTGRES_URL: Boolean(process.env.POSTGRES_URL),
    has_POSTGRES_PRISMA_URL: Boolean(process.env.POSTGRES_PRISMA_URL),
    has_POSTGRES_URL_NON_POOLING: Boolean(process.env.POSTGRES_URL_NON_POOLING),
    has_DATABASE_URL: Boolean(process.env.DATABASE_URL),
    has_DATABASE_URI: Boolean(process.env.DATABASE_URI),
    has_PAYLOAD_SECRET: Boolean(process.env.PAYLOAD_SECRET),
    nodeEnv: process.env.NODE_ENV,
    detectedAdapter: hasPostgresUrl ? 'PostgreSQL (@payloadcms/db-postgres)' : 'SQLite (Fallback @payloadcms/db-sqlite)',
  };

  try {
    const payload = await getPayloadClient();
    
    // Test count query on users collection
    let usersCount = null;
    let queryError = null;
    let autoHealed = false;

    try {
      const res = await payload.count({ collection: 'users' });
      usersCount = res.totalDocs;
    } catch (err: any) {
      queryError = err?.message || String(err);
      
      // Auto-heal: If tables don't exist, synchronize schema now
      try {
        await ensureDatabaseSchema(payload);
        const retryRes = await payload.count({ collection: 'users' });
        usersCount = retryRes.totalDocs;
        queryError = null;
        autoHealed = true;
      } catch (healErr: any) {
        queryError = healErr?.message || String(healErr);
      }
    }

    return NextResponse.json({
      status: queryError ? 'warning' : 'ok',
      message: queryError
        ? 'Payload client initialized, but table query failed'
        : autoHealed
          ? 'Schéma et tables PostgreSQL synchronisés avec succès en direct !'
          : 'Database connected and responsive',
      database: envDetected,
      usersCount,
      queryError,
      autoHealed,
      actionRequired: queryError ? 'Consultez les logs de base de données.' : null,
    });
  } catch (initError: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to initialize Payload / Database connection',
        database: envDetected,
        error: initError?.message || String(initError),
      },
      { status: 500 }
    );
  }
}
