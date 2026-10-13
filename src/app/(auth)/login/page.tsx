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
    // Erreur de connexion DB ou vérification : afficher CustomLogin plutôt que de boucler
    console.error('Login user check error:', error);
  }

  return <CustomLogin />;
}

