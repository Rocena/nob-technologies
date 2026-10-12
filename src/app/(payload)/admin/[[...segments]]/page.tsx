import configPromise from '@/payload.config'
import { RootPage } from '@payloadcms/next/views'
import React from 'react'
import { importMap } from '../importMap.js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'

type Args = { 
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: Args) {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  const resolvedParams = await params
  const segments = resolvedParams?.segments || []
  const isLogoutRoute = segments[0] === 'logout'

  if (!token && !isLogoutRoute) {
    try {
      const payload = await getPayloadClient()
      const { totalDocs } = await payload.count({ collection: 'users' })
      if (totalDocs === 0) {
        redirect('/create-first-user')
      }
    } catch {
      redirect('/create-first-user')
    }

    const currentPath = segments.length > 0 ? `/admin/${segments.join('/')}` : ''
    const redirectParam = currentPath ? `?redirect=${encodeURIComponent(currentPath)}` : ''
    redirect(`/login${redirectParam}`)
  }

  // @ts-expect-error - Payload RC / Next 15 bindings mismatch
  return <RootPage config={configPromise} params={params} searchParams={searchParams} importMap={importMap} />
}

