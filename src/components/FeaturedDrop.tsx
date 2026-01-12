import React from 'react'
import { getAllContentMeta } from '../content/contentIndex'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(date?: string) {
  if (!date) return ''
  // Deterministic formatting for hydration safety: expects YYYY-MM-DD
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date.trim())
  if (!m) return date
  const year = m[1]
  const month = Number(m[2])
  const day = m[3]
  const mon = MONTHS[month - 1] ?? m[2]
  return `${mon} ${day}, ${year}`
}

export function FeaturedDrop() {
  const items = getAllContentMeta()

  // Prefer featured drops first, else newest drop, else newest content item
  const featured =
    items.find((x) => x.featured && (x.type === 'drop' || x.series === 'Drops')) ||
    items.find((x) => x.type === 'drop' || x.series === 'Drops') ||
    items[0]

  if (!featured) return null

  return (
    <section className="homeSection">
      <header className="sectionHeader">
        <h2>Featured Drop</h2>
        <p>The newest release with a dedicated, shareable page.</p>
      </header>

      <a href={`/content/${featured.slug}`} className="featured">
        <div className="featuredMeta">
          <div className="pill">Drop</div>
          <div className="muted">{formatDate(featured.date)}</div>
        </div>

        <div className="featuredTitle">{featured.title}</div>

        {featured.summary ? <div className="featuredSummary">{featured.summary}</div> : null}

        <div className="featuredBottom">
          <span className="featuredCta">Open drop</span>
          <span className="muted">{featured.tags?.slice(0, 3).join(' • ')}</span>
        </div>
      </a>
    </section>
  )
}
