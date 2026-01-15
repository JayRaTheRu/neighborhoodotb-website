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

export default function Page() {
  return (
    <section>
      <header className="sectionHeader">
        <h1>About</h1>
        <p>
          The Neighborhood is a culture house with a business engine and an owned IP universe. Everything lives inside
          the same values, but each part has a distinct job.
        </p>
      </header>

      <div className="stack" style={{ maxWidth: 980 }}>
        <div className="panel">
          <h2 className="panelTitle">Purpose</h2>
          <p className="panelText">
            Unite independent creatives, thinkers, and strategists into a collaborative force that creates with
            intention, builds with integrity, and inspires through authenticity — on the block and on the blockchain.
          </p>
        </div>

        <div className="panel">
          <h2 className="panelTitle">Point of View</h2>
          <p className="panelText">Creativity is powerful. Culture is sacred. Technology is a tool.</p>
          <ul className="panelList">
            <li>We stand against exploitation, clout chasing, surface culture, and artificial hype.</li>
            <li>We stand for soulful creation, independent vision, community elevation, and real work.</li>
          </ul>
        </div>

        <div className="panel">
          <h2 className="panelTitle">Master Values (non-negotiable)</h2>
          <div className="chipGrid">
            {MASTER_VALUES.map((v) => (
              <div key={v} className="chip">
                {v}
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2 className="panelTitle">Gate Test</h2>
          <p className="panelText" style={{ marginBottom: 0 }}>
            If a project, collab, post, product, client, or drop violates any Master Value, it gets corrected or killed
            before release.
          </p>
        </div>
      </div>
    </section>
  )
}
