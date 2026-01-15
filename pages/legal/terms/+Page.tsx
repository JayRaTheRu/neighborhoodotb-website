import React from 'react'

export default function Page() {
  return (
    <section>
      <header className="sectionHeader">
        <h1>Terms of Use</h1>
        <p>Placeholder terms for the early build stage. Before launch, replace this with your final terms text.</p>
      </header>

      <div className="stack" style={{ maxWidth: 980 }}>
        <div className="panel">
          <h2 className="panelTitle">Use of the site</h2>
          <p className="panelText">
            Content is provided for informational and creative purposes. Do not misuse the site or attempt unauthorized
            access.
          </p>
        </div>

        <div className="panel">
          <h2 className="panelTitle">IP and brand assets</h2>
          <p className="panelText">
            The Neighborhood O.T.B. and related marks are protected. Use brand assets only according to the Brand Kit
            rules.
          </p>
          <p className="panelText" style={{ marginTop: 10, marginBottom: 0 }}>
            See <a className="linkInline" href="/brand-kit">Brand Kit</a>.
          </p>
        </div>

        <div className="panel">
          <h2 className="panelTitle">Contact</h2>
          <p className="panelText" style={{ marginBottom: 0 }}>
            Questions? Use the <a className="linkInline" href="/contact">Contact</a> page.
          </p>
        </div>
      </div>
    </section>
  )
}
