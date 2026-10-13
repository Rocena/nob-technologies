import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/payload';

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

    try {
      const res = await payload.count({ collection: 'users' });
      usersCount = res.totalDocs;
    } catch (err: any) {
      queryError = err?.message || String(err);
    }

    return NextResponse.json({
      status: queryError ? 'warning' : 'ok',
      message: queryError
        ? 'Payload client initialized, but table query failed (schema or tables might be uninitialized)'
        : 'Database connected and responsive',
      database: envDetected,
      usersCount,
      queryError,
      actionRequired: queryError ? 'Rendez-vous sur /api/db-init pour synchroniser le schéma et créer les tables PostgreSQL.' : null,
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
