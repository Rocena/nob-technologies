import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { getPayloadClient } from '@/lib/payload';
import { CustomLogin } from '@/components/admin/CustomLogin';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  try {
    const payload = await getPayloadClient();
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
