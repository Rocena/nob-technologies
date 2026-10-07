import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params
  const filename = key ? key.join('/') : ''

  if (!filename) {
    return new NextResponse('File not found', { status: 404 })
  }

  // Look in public/media first, then media
  const filePath1 = path.join(process.cwd(), 'public', 'media', filename)
  const filePath2 = path.join(process.cwd(), 'media', filename)

  let finalPath = ''
  if (fs.existsSync(filePath1)) {
    finalPath = filePath1
  } else if (fs.existsSync(filePath2)) {
    finalPath = filePath2
  } else {
    return new NextResponse('File not found', { status: 404 })
  }

  const fileBuffer = fs.readFileSync(finalPath)
  const ext = path.extname(filename).toLowerCase()

  let contentType = 'application/octet-stream'
  if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg'
  else if (ext === '.png') contentType = 'image/png'
  else if (ext === '.webp') contentType = 'image/webp'
  else if (ext === '.svg') contentType = 'image/svg+xml'
  else if (ext === '.gif') contentType = 'image/gif'

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
