import React from 'react'

export default function Page() {
  return (
    <section>
      <header className="sectionHeader" data-reveal>
        <h1>The Collective</h1>
        <p>
          The Collective is an invite-based roster of independent collaborators who partner on select projects under
          clear terms. It is not a company and does not represent OTB Studio.
        </p>
      </header>

      <div className="stack" style={{ maxWidth: 900 }}>
        <div className="panel" data-reveal data-reveal-delay="80">
          <h2 className="panelTitle">What belongs here</h2>
          <ul className="panelList">
            <li>Creators who have collaborated meaningfully with the Neighborhood.</li>
            <li>Projects, drops, and releases credited properly.</li>
            <li>Spotlights that reinforce craft, integrity, and culture.</li>
          </ul>
        </div>

        <div className="panel" data-reveal data-reveal-delay="140">
          <h2 className="panelTitle">Nominate a collaborator</h2>
          <p className="panelText">Soon: a nomination form that routes into a private review pipeline. For now, use Contact.</p>
          <div className="panelActions">
            <a className="btnGhost" href="/contact">
              Go to Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
