import React from 'react'

const CONTACT_FAQ = [
  {
    q: 'What should I include?',
    a: 'Share goals, timeline, budget range, and any links that show the scope.'
  },
  {
    q: 'How fast do you reply?',
    a: 'We aim to respond within 2-3 business days for new inquiries.'
  },
  {
    q: 'Not sure if it is a fit?',
    a: 'Send the basics and we will route you to the right lane.'
  }
]

export default function Page() {
  return (
    <section>
      <header className="sectionHeader" data-reveal>
        <h1>Contact</h1>
        <p>Choose the right lane. Soon this page will route submissions into a private pipeline (DB-backed).</p>
      </header>

      <div className="stack stackNarrow">
        <div className="panel" data-reveal data-reveal-delay="80">
          <h2 className="panelTitle">Work with OTB Studio</h2>
          <p className="panelText">Websites, tools, systems, and interactive builds — clarity, credibility, conversion.</p>
          <div className="panelActions">
            <a className="btnGhost" href="/studio">
              Go to Studio
            </a>
          </div>
        </div>

        <div className="panel" data-reveal data-reveal-delay="140">
          <h2 className="panelTitle">Collective</h2>
          <p className="panelText">Collab nominations and roster questions.</p>
          <div className="panelActions">
            <a className="btnGhost" href="/collective">
              Go to Collective
            </a>
          </div>
        </div>

        <div className="panel" data-reveal data-reveal-delay="200">
          <h2 className="panelTitle">Brand / Press</h2>
          <p className="panelText">Brand assets, usage rules, and boilerplate.</p>
          <div className="panelActions">
            <a className="btnGhost" href="/brand-kit">
              Go to Brand Kit
            </a>
          </div>
        </div>
      </div>

      <section className="homeSection">
        <header className="sectionHeader" data-reveal>
          <h2>Contact FAQ</h2>
          <p>Fast answers before you reach out.</p>
        </header>

        <div className="panelGrid" data-reveal>
          {CONTACT_FAQ.map((item, i) => (
            <div
              key={item.q}
              className="panel"
              data-reveal
              data-reveal-delay={String(80 + i * 60)}
              data-reveal-variant="fast"
            >
              <h3 className="panelTitle">{item.q}</h3>
              <p className="panelText">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
