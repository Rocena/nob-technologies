import { redirect } from 'next/navigation';
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
    console.error('Check user count in CreateFirstUserPage:', error);
  }

  return <CustomCreateFirstUser />;
}
