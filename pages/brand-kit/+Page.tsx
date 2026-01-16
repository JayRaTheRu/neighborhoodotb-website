import React from 'react'

export default function Page() {
  return (
    <section>
      <header className="sectionHeader" data-reveal>
        <h1>Brand Kit</h1>
        <p>
          Guidelines and assets for using The Neighborhood O.T.B. brand correctly. This page will host downloadable
          logos, marks, color tokens, and usage rules.
        </p>
      </header>

      <div className="stack" style={{ maxWidth: 980 }}>
        <div className="panel" data-reveal data-reveal-delay="80">
          <h2 className="panelTitle">Quick rules</h2>

          <div className="gridAuto gridAuto280" data-reveal>
            <div className="panelInset" data-reveal data-reveal-delay="80" data-reveal-variant="fast">
              <h3 className="subTitle">Do</h3>
              <ul className="listTight">
                <li>Use approved marks and colors.</li>
                <li>Keep the vibe mature, real, culturally aware.</li>
                <li>Credit collaborators properly.</li>
              </ul>
            </div>

            <div className="panelInset" data-reveal data-reveal-delay="140" data-reveal-variant="fast">
              <h3 className="subTitle">Don’t</h3>
              <ul className="listTight">
                <li>Blur Studio voice with FUDkers voice.</li>
                <li>Use hype/urgency/influencer language.</li>
                <li>Alter core marks without approval.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel" data-reveal data-reveal-delay="140">
          <h2 className="panelTitle">Assets (coming soon)</h2>
          <p className="panelText" style={{ marginBottom: 0 }}>
            We will add downloadable packs (SVG/PNG), typography tokens, and a short press/collab boilerplate.
          </p>
        </div>
      </div>
    </section>
  )
}
