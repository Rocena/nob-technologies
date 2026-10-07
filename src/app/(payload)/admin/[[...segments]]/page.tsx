import configPromise from '@/payload.config'
import { RootPage } from '@payloadcms/next/views'
import React from 'react'
import { importMap } from '../importMap.js'

type Args = { 
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function Page({ params, searchParams }: Args) {
  // @ts-expect-error - Payload RC / Next 15 bindings mismatch
  return <RootPage config={configPromise} params={params} searchParams={searchParams} importMap={importMap} />
}
