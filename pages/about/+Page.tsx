import React from 'react'

const MASTER_VALUES = [
  'Independence',
  'Authenticity',
  'Soul & Depth',
  'Craftsmanship',
  'Community',
  'Integrity',
  'Creative Intention',
  'Evolution Without Selling Out',
  'Culture Over Trends',
  'Expression Over Perfection'
]

const ABOUT_FAQ = [
  {
    q: 'What is NeighborhoodOTB?',
    a: 'A culture house and creative studio building brand systems, products, tools, and drops with clear values.'
  },
  {
    q: 'Who is it for?',
    a: 'Founders, teams, and collaborators who care about craft, culture, and long-term systems.'
  },
  {
    q: 'How do we start?',
    a: 'Begin with Studio for project work or use Contact for collaborations and introductions.'
  }
]

export default function Page() {
  return (
    <section>
      <header className="sectionHeader" data-reveal>
        <h1>About</h1>
        <p>
          The Neighborhood is a culture house with a business engine and an owned IP universe. Everything lives inside
          the same values, but each part has a distinct job.
        </p>
      </header>

      <div className="stack stackWide">
        <div className="panel" data-reveal data-reveal-delay="80">
          <h2 className="panelTitle">Purpose</h2>
          <p className="panelText">
            Unite independent creatives, thinkers, and strategists into a collaborative force that creates with
            intention, builds with integrity, and inspires through authenticity — on the block and on the blockchain.
          </p>
        </div>

        <div className="panel" data-reveal data-reveal-delay="140">
          <h2 className="panelTitle">Point of View</h2>
          <p className="panelText">Creativity is powerful. Culture is sacred. Technology is a tool.</p>
          <ul className="panelList">
            <li>We stand against exploitation, clout chasing, surface culture, and artificial hype.</li>
            <li>We stand for soulful creation, independent vision, community elevation, and real work.</li>
          </ul>
        </div>

        <div className="panel" data-reveal data-reveal-delay="200">
          <h2 className="panelTitle">Master Values (non-negotiable)</h2>
          <div className="chipGrid" data-reveal>
            {MASTER_VALUES.map((v, i) => (
              <div
                key={v}
                className="chip"
                data-reveal
                data-reveal-delay={String(80 + i * 60)}
                data-reveal-variant="fast"
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        <div className="panel" data-reveal data-reveal-delay="260">
          <h2 className="panelTitle">Gate Test</h2>
          <p className="panelText" style={{ marginBottom: 0 }}>
            If a project, collab, post, product, client, or drop violates any Master Value, it gets corrected or killed
            before release.
          </p>
        </div>
      </div>

      <section className="homeSection">
        <header className="sectionHeader" data-reveal>
          <h2>Quick answers</h2>
          <p>Short answers to the most common questions about the Neighborhood.</p>
        </header>

        <div className="panelGrid" data-reveal>
          {ABOUT_FAQ.map((item, i) => (
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
