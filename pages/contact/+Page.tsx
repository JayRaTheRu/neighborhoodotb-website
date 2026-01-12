import React from 'react'

export default function Page() {
  return (
    <section>
      <header style={{ marginBottom: 24 }}>
        <h1>Contact</h1>
        <p style={{ color: 'rgba(242,242,242,0.72)', maxWidth: 780 }}>
          Choose the right lane. Soon this page will route submissions into a private pipeline (DB-backed).
        </p>
      </header>

      <div style={{ display: 'grid', gap: 14, maxWidth: 900 }}>
        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Work with OTB Studio</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Websites, tools, systems, and interactive builds — clarity, credibility, conversion.
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

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Collective</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Collab nominations and roster questions.
          </p>
          <a
            href="/collective"
            style={{
              display: 'inline-block',
              marginTop: 10,
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(242,242,242,0.12)'
            }}
          >
            Go to Collective
          </a>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Brand / Press</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Brand assets, usage rules, and boilerplate.
          </p>
          <a
            href="/brand-kit"
            style={{
              display: 'inline-block',
              marginTop: 10,
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(242,242,242,0.12)'
            }}
          >
            Go to Brand Kit
          </a>
        </div>
      </div>
    </section>
  )
}
