import configPromise from '@/payload.config'
import { RootPage } from '@payloadcms/next/views'
import React from 'react'
import { importMap } from '../importMap.js'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Args = { 
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: Args) {
  await getPayloadClient().catch(() => {})
  return RootPage({ config: configPromise, params, searchParams: searchParams as any, importMap })
}
