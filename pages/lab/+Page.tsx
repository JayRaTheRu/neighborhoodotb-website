import React from 'react'

export default function Page() {
  return (
    <section>
      <header className="sectionHeader" data-reveal>
        <h1>Lab</h1>
        <p>Tools + Arcade. The Lab is where utility meets play: public tools, interactive experiments, and games.</p>
      </header>

      <div className="stack" style={{ maxWidth: 900 }}>
        <div className="panel" data-reveal data-reveal-delay="80">
          <h2 className="panelTitle">Tools</h2>
          <p className="panelText">Public utilities, calculators, generators, and mini-apps built by OTB Studio.</p>
        </div>

        <div className="panel" data-reveal data-reveal-delay="140">
          <h2 className="panelTitle">Arcade</h2>
          <p className="panelText">Interactive creations: games, playable experiences, experimental interfaces.</p>
        </div>

        <div className="panel" data-reveal data-reveal-delay="200">
          <h2 className="panelTitle">Build something with us</h2>
          <p className="panelText">If you want a custom tool or interactive experience, route through Studio.</p>
          <div className="panelActions">
            <a className="btnGhost" href="/studio">
              Go to Studio
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
