import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const queryString = sp
    ? new URLSearchParams(
        Object.entries(sp).flatMap(([k, v]) =>
          Array.isArray(v) ? v.map((val) => [k, val]) : v !== undefined ? [[k, v]] : []
        )
      ).toString()
    : '';

  redirect(queryString ? `/root?${queryString}` : '/root');
}
