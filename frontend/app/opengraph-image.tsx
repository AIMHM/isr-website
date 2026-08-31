import { ImageResponse } from 'next/og'

export const alt =
  'Islamic Society of RMIT — The home of Muslim students at RMIT'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#5B0B05',
          color: '#FFFFFF',
          padding: '72px 78px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '14px',
            height: '100%',
            background: '#509589',
          }}
        />

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '22px',
            }}
          >
            <div
              style={{
                width: '92px',
                height: '92px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#EBE8CB',
                color: '#5B0B05',
                fontSize: '40px',
                fontWeight: 800,
                letterSpacing: '-2px',
              }}
            >
              ISR
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  color: '#EBE8CB',
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Islamic Society of RMIT
              </div>

              <div
                style={{
                  marginTop: '8px',
                  color: '#98AEA8',
                  fontSize: '18px',
                  fontWeight: 600,
                }}
              >
                City · Bundoora · Brunswick
              </div>
            </div>
          </div>

          <div
            style={{
              maxWidth: '940px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: '64px',
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: '-3px',
              }}
            >
              The home of Muslim students at RMIT.
            </div>

            <div
              style={{
                marginTop: '24px',
                color: '#EBE8CB',
                fontSize: '25px',
                lineHeight: 1.3,
                fontWeight: 600,
              }}
            >
              Prayer · Jumu’ah · Events · Community · Student Support
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            <span>theisr.com.au</span>
            <span style={{ color: '#509589' }}>
              Representing Muslims on campus
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
