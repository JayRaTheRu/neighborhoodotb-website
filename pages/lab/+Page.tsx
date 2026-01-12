import React from 'react'

export default function Page() {
  return (
    <section>
      <header style={{ marginBottom: 24 }}>
        <h1>Lab</h1>
        <p style={{ color: 'rgba(242,242,242,0.72)', maxWidth: 780 }}>
          Tools + Arcade. The Lab is where utility meets play: public tools, interactive experiments, and games.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 14, maxWidth: 900 }}>
        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Tools</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Public utilities, calculators, generators, and mini-apps built by OTB Studio.
          </p>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Arcade</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Interactive creations: games, playable experiences, experimental interfaces.
          </p>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Build something with us</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            If you want a custom tool or interactive experience, route through Studio.
          </p>
          <a
            href="/studio"
            style={{
              display: 'inline-block',
              marginTop: 10,
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(242,242,242,0.12)'
            }}
          >
            Go to Studio
          </a>
        </div>
      </div>
    </section>
  )
}
