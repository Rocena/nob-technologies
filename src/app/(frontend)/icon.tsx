import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: '#0B1121',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
          boxShadow: 'inset 0 0 0 1px rgba(0,212,255,0.2)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24" height="24">
          <polygon points="32,6 12,18 32,30 52,18" fill="#00D4FF" />
          <polygon points="12,18 32,30 32,54 12,42" fill="#0088CC" />
          <polygon points="32,30 52,18 52,42 32,54" fill="#004488" />
          <polyline points="32,30 32,54" stroke="#00D4FF" strokeWidth="1.5" />
          <polyline points="12,18 32,30 52,18" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />
        </svg>
      </div>
    ),
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
