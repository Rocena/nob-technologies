import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { getPayloadClient } from '@/lib/payload';
import { CustomLogin } from '@/components/admin/CustomLogin';
import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
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

    const { totalDocs } = await payload.count({
      collection: 'users',
    });

    if (totalDocs === 0) {
      redirect('/create-first-user');
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    // Si la table n'existe pas encore ou erreur DB, on redirige vers la création initiale
    redirect('/create-first-user');
  }

  return <CustomLogin />;
}

