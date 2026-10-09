import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { getPayloadClient } from '@/lib/payload';
import { migrations } from '@/migrations';
import { CustomCreateFirstUser } from '@/components/admin/CustomCreateFirstUser';

export const dynamic = 'force-dynamic';

export default async function CreateFirstUserPage() {
  try {
    const payload = await getPayloadClient();
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
      if (payload.db?.migrate && typeof payload.db.migrate === 'function') {
        try {
          await payload.db.migrate({ migrations: migrations as any });
          const { totalDocs } = await payload.count({ collection: 'users' });
          if (totalDocs > 0) {
            redirect('/login');
          }
        } catch (migErr) {
          if (isRedirectError(migErr)) throw migErr;
        }
      }
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }

  return <CustomCreateFirstUser />;
}
