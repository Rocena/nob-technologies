import React from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

interface RichTextProps {
  data: any
  className?: string
}

export function RichText({ data, className = '' }: RichTextProps) {
  if (!data) return null

  return (
    <div className={`prose prose-blue prose-lg max-w-none ${className}`}>
      <LexicalRichText data={data} />
    </div>
  )
}
