import React from 'react'

export default function Page() {
  return (
    <section>
      <header className="sectionHeader">
        <h1>Store</h1>
        <p>
          Two routes: Physical goods and Digital releases. This starts as a storefront shell and scales when products go
          live.
        </p>
      </header>

      <div className="stack" style={{ maxWidth: 900 }}>
        <div className="panel">
          <h2 className="panelTitle">Physical</h2>
          <p className="panelText">Tangible products: prints, merch, packs, objects, limited runs.</p>
        </div>

        <div className="panel">
          <h2 className="panelTitle">Digital</h2>
          <p className="panelText">Digital drops: collections, downloads, interactive releases, NFT-oriented work.</p>
        </div>

        <div className="panel">
          <h2 className="panelTitle">Notify me</h2>
          <p className="panelText">
            Next: a waitlist form (DB-backed) that lets you capture interest by category.
          </p>
          <div className="panelActions">
            <a className="btnGhost" href="/contact">
              Contact for now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
