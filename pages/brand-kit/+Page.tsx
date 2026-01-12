import React from 'react'

export default function Page() {
  return (
    <section>
      <header style={{ marginBottom: 24 }}>
        <h1>Brand Kit</h1>
        <p style={{ color: 'rgba(242,242,242,0.72)', maxWidth: 820 }}>
          Guidelines and assets for using The Neighborhood O.T.B. brand correctly.
          This page will host downloadable logos, marks, color tokens, and usage rules.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 14, maxWidth: 980 }}>
        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Quick rules</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            <div style={{ border: '1px solid rgba(242,242,242,0.10)', borderRadius: 14, padding: 12 }}>
              <h3 style={{ marginTop: 0 }}>Do</h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: 'rgba(242,242,242,0.72)' }}>
                <li>Use approved marks and colors.</li>
                <li>Keep the vibe mature, real, culturally aware.</li>
                <li>Credit collaborators properly.</li>
              </ul>
            </div>
            <div style={{ border: '1px solid rgba(242,242,242,0.10)', borderRadius: 14, padding: 12 }}>
              <h3 style={{ marginTop: 0 }}>Don’t</h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: 'rgba(242,242,242,0.72)' }}>
                <li>Blur Studio voice with FUDkers voice.</li>
                <li>Use hype/urgency/influencer language.</li>
                <li>Alter core marks without approval.</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Assets (coming soon)</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)', marginBottom: 0 }}>
            We will add downloadable packs (SVG/PNG), typography tokens, and a short press/collab boilerplate.
          </p>
        </div>
      </div>
    </section>
  )
}
