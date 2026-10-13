import configPromise from '@/payload.config'
import { RootPage } from '@payloadcms/next/views'
import React from 'react'
import { importMap } from '../importMap.js'

export const dynamic = 'force-dynamic'

type Args = { 
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: Args) {
  return RootPage({ config: configPromise, params, searchParams: searchParams as any, importMap })
}

