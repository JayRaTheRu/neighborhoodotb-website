import React from 'react'

type MapCard = {
  title: string
  label: string
  body: string
  href: string
  note?: string
}

const cards: MapCard[] = [
  {
    title: 'The Neighborhood On The Block',
    label: 'Culture / Umbrella',
    body: 'The house standard: values, taste, and what belongs in the Neighborhood.',
    href: '/about'
  },
  {
    title: 'On The Block Studio',
    label: 'Business / Execution',
    body: 'The delivery engine: sites, systems, tools, and outcomes — culture-first, professional execution.',
    href: '/studio'
  },
  {
    title: 'The Neighborhood FUDkers',
    label: 'Owned IP / Universe',
    body: 'The allowed insanity: satirical character universe inside the house — drops, collectibles, merch.',
    href: '/fudkers',
    note: 'IP line inside the culture house.'
  },
  {
    title: 'The Collective',
    label: 'Creator Network',
    body: 'Invite-based roster of collaborators. Craft, community, and meaningful partnerships — not a company.',
    href: '/collective',
    note: 'No implied authority.'
  }
]

export function MapSection() {
  return (
    <section className="homeSection">
      <header className="sectionHeader" data-reveal>
        <h2>The Map</h2>
        <p>What connects to what — and why it stays clean.</p>
      </header>

      <div className="mapGrid" data-reveal>
        {cards.map((c, i) => (
          <a
            key={c.title}
            href={c.href}
            className="card"
            data-reveal
            data-reveal-delay={String(80 + i * 60)}
            data-reveal-variant="fast"
          >
            <div className="cardTop">
              <div className="pill">{c.label}</div>
              <div className="cardTitle">{c.title}</div>
            </div>

            <div className="cardBody">{c.body}</div>

            {c.note ? <div className="cardNote">{c.note}</div> : null}

            <div className="cardCta">Explore</div>
          </a>
        ))}
      </div>

      <div className="mapFooter" data-reveal data-reveal-delay="120">
        <span className="muted">
          Governance rule: if it breaks a Master Value, it doesn’t ship — no matter how profitable or viral.
        </span>
      </div>
    </section>
  )
}
