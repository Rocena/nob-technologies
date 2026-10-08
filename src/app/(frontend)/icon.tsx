import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
const SHIELD_BASE64 = 'data:image/png;base64,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';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020617',
          borderRadius: 8,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SHIELD_BASE64}
          alt="NOBTECH Shield Favicon"
          width="30"
          height="30"
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}

