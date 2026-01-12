import React from 'react'

export default function Page() {
  return (
    <section>
      <header style={{ marginBottom: 24 }}>
        <h1>Terms of Use</h1>
        <p style={{ color: 'rgba(242,242,242,0.72)', maxWidth: 820 }}>
          Placeholder terms for the early build stage. Before launch, replace this with your final terms text.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 14, maxWidth: 980 }}>
        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Use of the site</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Content is provided for informational and creative purposes. Do not misuse the site or attempt unauthorized access.
          </p>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>IP and brand assets</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            The Neighborhood O.T.B. and related marks are protected. Use brand assets only according to the Brand Kit rules.
          </p>
          <p style={{ color: 'rgba(242,242,242,0.72)', marginBottom: 0 }}>
            See <a href="/brand-kit" style={{ textDecoration: 'underline' }}>Brand Kit</a>.
          </p>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Contact</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)', marginBottom: 0 }}>
            Questions? Use the <a href="/contact" style={{ textDecoration: 'underline' }}>Contact</a> page.
          </p>
        </div>
      </div>
    </section>
  )
}
