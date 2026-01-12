import React from 'react'

export default function Page() {
  return (
    <section>
      <header style={{ marginBottom: 24 }}>
        <h1>The Collective</h1>
        <p style={{ color: 'rgba(242,242,242,0.72)', maxWidth: 780 }}>
          The Collective is an invite-based roster of independent collaborators who partner on select projects under clear terms.
          It is not a company and does not represent OTB Studio.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 14, maxWidth: 900 }}>
        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>What belongs here</h2>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'rgba(242,242,242,0.72)' }}>
            <li>Creators who have collaborated meaningfully with the Neighborhood.</li>
            <li>Projects, drops, and releases credited properly.</li>
            <li>Spotlights that reinforce craft, integrity, and culture.</li>
          </ul>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Nominate a collaborator</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Soon: a nomination form that routes into a private review pipeline. For now, use Contact.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              marginTop: 10,
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(242,242,242,0.12)'
            }}
          >
            Go to Contact
          </a>
        </div>
      </div>
    </section>
  )
}
