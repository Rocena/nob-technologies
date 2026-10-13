import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { getPayloadClient } from '@/lib/payload';
import { migrations } from '@/migrations';
import { CustomCreateFirstUser } from '@/components/admin/CustomCreateFirstUser';
import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function CreateFirstUserPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value;

  try {
    const payload = await getPayloadClient();

    // Si une session est déjà valide, rediriger directement vers /admin
    if (token) {
      try {
        const reqHeaders = await headers();
        const { user } = await payload.auth({ headers: reqHeaders });
        if (user) {
          redirect('/admin');
        }
      } catch (authErr) {
        if (isRedirectError(authErr)) throw authErr;
      }
    }

    try {
      const { totalDocs } = await payload.count({
        collection: 'users',
      });

      if (totalDocs > 0) {
        redirect('/login');
      }
    } catch (countError) {
      if (isRedirectError(countError)) {
        throw countError;
      }
      // Si la table n'existe pas ou erreur schema, synchroniser le schéma Drizzle
      try {
        const { ensureDatabaseSchema } = await import('@/lib/ensureSchema');
        await ensureDatabaseSchema(payload);
        const { totalDocs } = await payload.count({ collection: 'users' });
        if (totalDocs > 0) {
          redirect('/login');
        }
      } catch (schemaErr) {
        if (isRedirectError(schemaErr)) throw schemaErr;
        console.warn('Auto schema sync attempt warning:', schemaErr);
      }
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    // Erreur de connexion DB ou table manquante : on affiche la page de création sans bloquer en 500
    console.error('Initial user check error on server:', error);
  }

  return <CustomCreateFirstUser />;
}

