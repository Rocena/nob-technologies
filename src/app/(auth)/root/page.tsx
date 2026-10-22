import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { getPayloadClient } from '@/lib/payload';
import { CustomLogin } from '@/components/admin/CustomLogin';
import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Connexion • Console d\'administration | NOB TECHNOLOGIES',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = searchParams ? await searchParams : {};
  const hasResetToken = Boolean(sp?.token);

  const cookieStore = await cookies();
  const token = cookieStore.get('payload-token')?.value;

  try {
    const payload = await getPayloadClient();

    // Si une session est déjà valide (et qu'on n'est pas en train de réinitialiser un mot de passe), rediriger vers /admin
    if (token && !hasResetToken) {
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

    let userCount = 0;
    try {
      const { totalDocs } = await payload.count({
        collection: 'users',
      });
      userCount = totalDocs;
    } catch (countError) {
      if (isRedirectError(countError)) throw countError;
      console.warn('Users table count warning on root (no users yet):', countError);
      redirect('/create-first-user');
    }

    if (userCount === 0) {
      redirect('/create-first-user');
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error('Root user check error:', error);
  }

  return <CustomLogin />;
}
