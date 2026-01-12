import React from 'react'

export default function Page() {
  return (
    <section>
      <header style={{ marginBottom: 24 }}>
        <h1>Store</h1>
        <p style={{ color: 'rgba(242,242,242,0.72)', maxWidth: 780 }}>
          Two routes: Physical goods and Digital releases. This starts as a storefront shell and scales when products go live.
        </p>
      </header>

      <div style={{ display: 'grid', gap: 14, maxWidth: 900 }}>
        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Physical</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Tangible products: prints, merch, packs, objects, limited runs.
          </p>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Digital</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Digital drops: collections, downloads, interactive releases, NFT-oriented work.
          </p>
        </div>

        <div style={{ border: '1px solid rgba(242,242,242,0.12)', borderRadius: 16, padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Notify me</h2>
          <p style={{ color: 'rgba(242,242,242,0.72)' }}>
            Next: a waitlist form (DB-backed) that lets you capture interest by category.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              marginTop: 10,
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(242,242,242,0.12)'
            }}
          >
            Contact for now
          </a>
        </div>
      </div>
    </section>
  )
}
