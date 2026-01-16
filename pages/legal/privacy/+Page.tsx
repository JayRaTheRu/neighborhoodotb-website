import React from 'react'

export default function Page() {
  return (
    <section>
      <header className="sectionHeader" data-reveal="up">
        <h1>Privacy Policy</h1>
        <p>Placeholder policy for the early build stage. Before launch, replace this with your final policy text.</p>
      </header>

      <div className="stack" style={{ maxWidth: 980 }}>
        <div className="panel" data-reveal="up">
          <h2 className="panelTitle">What we collect</h2>
          <p className="panelText">
            If you submit a form, we may collect basic contact details and message content. Analytics may collect usage
            data (pages visited, device type) for site improvement.
          </p>
        </div>

        <div className="panel" data-reveal="up" data-reveal-delay="80">
          <h2 className="panelTitle">How we use it</h2>
          <p className="panelText">
            We use submitted information to respond to inquiries, manage collaborations, and improve the site. We do not
            sell personal data.
          </p>
        </div>

        <div className="panel" data-reveal="up" data-reveal-delay="160">
          <h2 className="panelTitle">Contact</h2>
          <p className="panelText" style={{ marginBottom: 0 }}>
            For privacy questions, use the <a className="linkInline" href="/contact">Contact</a> page.
          </p>
        </div>
      </div>
    </section>
  )
}
