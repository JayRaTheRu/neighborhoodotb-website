import { getAllContentMeta } from '../content/contentIndex'

function formatDate(date?: string) {
  if (!date) return ''
  try {
    const d = new Date(date)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
  } catch {
    return date
  }
}

function typeKey(meta: { type?: string; series?: string }) {
  const raw = `${meta.type ?? meta.series ?? ''}`.trim().toLowerCase()
  if (raw === 'drop' || raw === 'drops') return 'drop'
  if (raw === 'loop' || raw === 'loops') return 'loop'
  return raw
}

function typeLabel(meta: { type?: string; series?: string }) {
  const key = typeKey(meta)
  if (!key) return 'Content'
  return key.charAt(0).toUpperCase() + key.slice(1)
}

export function FeaturedDrop() {
  const items = getAllContentMeta()
  if (items.length === 0) return null

  const featuredDrop =
    items.find((x) => x.featured && typeKey(x) === 'drop') ?? items.find((x) => typeKey(x) === 'drop')

  const featured = featuredDrop ?? items[0]
  const isDrop = typeKey(featured) === 'drop'

  return (
    <section className="homeSection">
      <header className="sectionHeader">
        <h2>{isDrop ? 'Featured Drop' : 'Featured'}</h2>
        <p>{isDrop ? 'The newest release with a dedicated, shareable page.' : 'A highlighted piece with a shareable page.'}</p>
      </header>

      <a href={`/content/${featured.slug}`} className="featured">
        <div className="featuredMeta">
          <div className="pill">{typeLabel(featured)}</div>
          {featured.featured ? <div className="pill">Featured</div> : null}
          <div className="muted">{formatDate(featured.date)}</div>
        </div>

        <div className="featuredTitle">{featured.title}</div>

        {featured.summary ? <div className="featuredSummary">{featured.summary}</div> : null}

        <div className="featuredBottom">
          <span className="featuredCta">Open</span>
          <span className="muted">
            {featured.tags && featured.tags.length > 0 ? featured.tags.slice(0, 3).join(' • ') : ''}
          </span>
        </div>
      </a>
    </section>
  )
}
