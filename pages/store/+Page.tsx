import React from 'react'

export default function Page() {
  return (
    <section>
      <header className="sectionHeader" data-reveal="up">
        <h1>Store</h1>
        <p>
          Two routes: Physical goods and Digital releases. This starts as a storefront shell and scales when products go
          live.
        </p>
      </header>

      <div className="stack" style={{ maxWidth: 900 }}>
        <div className="panel" data-reveal="up">
          <h2 className="panelTitle">Physical</h2>
          <p className="panelText">Tangible products: prints, merch, packs, objects, limited runs.</p>
        </div>

        <div className="panel" data-reveal="up" data-reveal-delay="80">
          <h2 className="panelTitle">Digital</h2>
          <p className="panelText">Digital drops: collections, downloads, interactive releases, NFT-oriented work.</p>
        </div>

        <div className="panel" data-reveal="up" data-reveal-delay="160">
          <h2 className="panelTitle">Notify me</h2>
          <p className="panelText">
            Next: a waitlist form (DB-backed) that lets you capture interest by category.
          </p>
          <div className="panelActions" data-reveal="fade" data-reveal-delay="220">
            <a className="btnGhost" href="/contact">
              Contact for now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
