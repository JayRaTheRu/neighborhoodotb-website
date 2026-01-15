import React from 'react'

export default function Page() {
  return (
    <section>
      <header className="sectionHeader">
        <h1>Contact</h1>
        <p>Choose the right lane. Soon this page will route submissions into a private pipeline (DB-backed).</p>
      </header>

      <div className="stack" style={{ maxWidth: 900 }}>
        <div className="panel">
          <h2 className="panelTitle">Work with OTB Studio</h2>
          <p className="panelText">Websites, tools, systems, and interactive builds — clarity, credibility, conversion.</p>
          <div className="panelActions">
            <a className="btnGhost" href="/studio">
              Go to Studio
            </a>
          </div>
        </div>

        <div className="panel">
          <h2 className="panelTitle">Collective</h2>
          <p className="panelText">Collab nominations and roster questions.</p>
          <div className="panelActions">
            <a className="btnGhost" href="/collective">
              Go to Collective
            </a>
          </div>
        </div>

        <div className="panel">
          <h2 className="panelTitle">Brand / Press</h2>
          <p className="panelText">Brand assets, usage rules, and boilerplate.</p>
          <div className="panelActions">
            <a className="btnGhost" href="/brand-kit">
              Go to Brand Kit
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
