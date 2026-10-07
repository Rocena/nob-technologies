import { redirect } from 'next/navigation';
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
    // Si la base n'est pas encore initialisée ou en cas de count fail, on laisse le formulaire s'afficher
    console.error('Check user count in LoginPage:', error);
  }

  return <CustomLogin />;
}
