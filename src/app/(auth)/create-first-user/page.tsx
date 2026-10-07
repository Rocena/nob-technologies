import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { getPayloadClient } from '@/lib/payload';
import { CustomCreateFirstUser } from '@/components/admin/CustomCreateFirstUser';

export const dynamic = 'force-dynamic';

export default async function CreateFirstUserPage() {
  try {
    const payload = await getPayloadClient();
    const { totalDocs } = await payload.count({
      collection: 'users',
    });

    if (totalDocs > 0) {
      redirect('/login');
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    // Si la table n'est pas encore créée, c'est bien la première création
  }

  return <CustomCreateFirstUser />;
}
