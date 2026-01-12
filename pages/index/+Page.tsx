import React from 'react'
import { MapSection } from '../../src/components/MapSection'
import { FeaturedDrop } from '../../src/components/FeaturedDrop'
import { DispatchModule } from '../../src/components/DispatchModule'

export default function Page() {
  return (
    <section>
      <header className="homeHero">
        <div className="homeKicker">THE HOUSE</div>
        <h1 className="homeTitle">The Neighborhood On The Block</h1>
        <p className="homeSub">
          Culture house + creative studio + tools + drops. Built with intention — on the block and on the blockchain.
        </p>

        <div className="homeActions">
          <a className="btn" href="/studio">
            Explore Studio
          </a>
          <a className="btnGhost" href="/content">
            View Content
          </a>
        </div>
      </header>

      <MapSection />

      <FeaturedDrop />

      <DispatchModule source="home_dispatch" />
    </section>
  )
}
