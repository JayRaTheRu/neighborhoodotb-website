import React from 'react'

export default function Page() {
  return (
    <section>
      <header style={{ marginBottom: 24 }}>
        <h1>About</h1>
        <p style={{ color: 'rgba(242,242,242,0.72)', maxWidth: 820 }}>
          The Neighborhood is a culture house with a business engine and an owned IP universe.
          Everything lives inside the same values, but each part has a distinct job.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 14, maxWidth: 980 }}>
        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Purpose</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)', marginBottom: 0 }}>
            Unite independent creatives, thinkers, and strategists into a collaborative force that creates with intention,
            builds with integrity, and inspires through authenticity — on the block and on the blockchain.
          </p>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Point of View</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Creativity is powerful. Culture is sacred. Technology is a tool.
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'rgba(242,242,242,0.72)' }}>
            <li>We stand against exploitation, clout chasing, surface culture, and artificial hype.</li>
            <li>We stand for soulful creation, independent vision, community elevation, and real work.</li>
          </ul>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Master Values (non-negotiable)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {[
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
            ].map((v) => (
              <div
                key={v}
                style={{
                  border: '1px solid rgba(242,242,242,0.10)',
                  borderRadius: 14,
                  padding: 12,
                  color: 'rgba(242,242,242,0.80)'
                }}
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Gate Test</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)', marginBottom: 0 }}>
            If a project, collab, post, product, client, or drop violates any Master Value,
            it gets corrected or killed before release.
          </p>
        </div>
      </div>
    </section>
  )
}
