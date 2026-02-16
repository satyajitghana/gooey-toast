import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const alt = 'gooey-ui - Morphing toast notifications for React'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const mascotData = await readFile(join(process.cwd(), 'public', 'mascot.png'))
  const mascotBase64 = `data:image/png;base64,${mascotData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FAFAFE 0%, #EDE9FE 50%, #DBEAFE 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          <img
            src={mascotBase64}
            width={120}
            height={120}
            style={{ objectFit: 'contain' }}
          />
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #7C5CFC 0%, #34D399 50%, #60A5FA 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.03em',
            }}
          >
            gooey-ui
          </div>
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#706B82',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          Morphing toast notifications for React
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#A09BB0',
            fontWeight: 400,
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'white',
            padding: '8px 20px',
            borderRadius: '100px',
            border: '1px solid #E4E1ED',
          }}
        >
          npm install gooey-ui
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
