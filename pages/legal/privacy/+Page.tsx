import React from 'react'

export default function Page() {
  return (
    <section>
      <header style={{ marginBottom: 24 }}>
        <h1>Privacy Policy</h1>
        <p style={{ color: 'rgba(242,242,242,0.72)', maxWidth: 820 }}>
          Placeholder policy for the early build stage. Before launch, replace this with your final policy text.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 14, maxWidth: 980 }}>
        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>What we collect</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            If you submit a form, we may collect basic contact details and message content.
            Analytics may collect usage data (pages visited, device type) for site improvement.
          </p>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>How we use it</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            We use submitted information to respond to inquiries, manage collaborations, and improve the site.
            We do not sell personal data.
          </p>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Contact</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)', marginBottom: 0 }}>
            For privacy questions, use the <a href="/contact" style={{ textDecoration: 'underline' }}>Contact</a> page.
          </p>
        </div>
      </div>
    </section>
  )
}
