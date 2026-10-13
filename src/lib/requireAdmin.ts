import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

/**
 * Garde d'accès pour les routes sensibles (seed, maintenance).
 * Retourne une réponse 401/403 si l'appelant n'est pas un super_admin connecté, sinon null.
 */
export async function requireSuperAdmin(): Promise<NextResponse | null> {
  try {
    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: await headers() })
    if (!user) {
      return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 })
    }
    if ((user as any).role !== 'super_admin') {
      return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 })
    }
    return null
  } catch {
    return NextResponse.json({ error: 'Authentification requise.' }, { status: 401 })
  }
}
