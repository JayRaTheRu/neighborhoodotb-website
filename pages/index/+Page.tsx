// pages/index/+Page.tsx

import React from 'react'
import { MapSection } from '../../src/components/MapSection'
import { FeaturedDrop } from '../../src/components/FeaturedDrop'
import { DispatchModule } from '../../src/components/DispatchModule'

export default function Page() {
  return (
    <section>
      <header className="homeHero" data-reveal="up">
        <div className="homeKicker" data-reveal="fade" data-reveal-delay="80" data-reveal-variant="fast">
          THE HOUSE
        </div>

        <h1 className="homeTitle" data-reveal="up" data-reveal-delay="140">
          The Neighborhood On The Block
        </h1>

        <p className="homeSub" data-reveal="up" data-reveal-delay="220">
          Culture house + creative studio + tools + drops. Built with intention — on the block and on the blockchain.
        </p>

        <div className="homeActions" data-reveal="fade" data-reveal-delay="300">
          <a className="btn" href="/studio">
            Explore Studio
          </a>
          <a className="btnGhost" href="/content">
            View Content
          </a>
        </div>
      </header>

      {/* Components below can optionally implement their own data-reveal internally later */}
      <div data-reveal="up" data-reveal-delay="120">
        <MapSection />
      </div>

      <div data-reveal="up" data-reveal-delay="140">
        <FeaturedDrop />
      </div>

      <div data-reveal="up" data-reveal-delay="160">
        <DispatchModule source="home_dispatch" />
      </div>
    </section>
  )
}
