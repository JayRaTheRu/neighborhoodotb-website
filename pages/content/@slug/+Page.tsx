import { usePageContext } from 'vike-react/usePageContext'
import { getAllContentMeta, getContentBySlug } from '../../../src/content/contentIndex'
import { formatDateYmd } from '../../../src/lib/formatDate'

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

export default function Page() {
  const pageContext = usePageContext()
  const slug = String(pageContext.routeParams.slug ?? '').trim()
  const slugKey = slug.toLowerCase()

  const entry = getContentBySlug(slug)
  if (!entry) {
    return (
      <section>
        <header className="sectionHeader">
          <h1>Not found</h1>
          <p>That content page doesn’t exist.</p>
          <div className="controlsMeta">Slug: {slug}</div>
        </header>

        <a href="/content" className="linkInline">
          Back to Content
        </a>
      </section>
    )
  }

  const { meta, Component } = entry

  const all = getAllContentMeta()
  const idx = all.findIndex((x) => x.slug.toLowerCase() === slugKey)

  // all is sorted newest -> oldest
  const newer = idx > 0 ? all[idx - 1] : null
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null

  return (
    <article>
      <header className="sectionHeader">
        <div style={{ marginBottom: 10 }}>
          <a href="/content" className="linkInline">
            ← Back to Content
          </a>
        </div>

        <h1>{meta.title}</h1>
        {meta.summary ? <p>{meta.summary}</p> : null}

        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <span className="pill">{typeLabel(meta)}</span>
          {meta.featured ? <span className="pill">Featured</span> : null}
          {meta.date ? <span className="controlsMeta">{formatDateYmd(meta.date)}</span> : null}
        </div>

        {meta.tags && meta.tags.length > 0 ? (
          <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {meta.tags.map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <div className="prose">
        <Component />
      </div>

      <nav aria-label="Content navigation" className="panelGrid" style={{ marginTop: 26 }}>
        <div className="panelNavCard">
          <div className="panelKicker">Newer</div>
          {newer ? (
            <a href={`/content/${newer.slug}`} style={{ textDecoration: 'none' }}>
              <strong>{newer.title}</strong>
            </a>
          ) : (
            <div className="controlsMeta">None</div>
          )}
        </div>

        <div className="panelNavCard">
          <div className="panelKicker">Older</div>
          {older ? (
            <a href={`/content/${older.slug}`} style={{ textDecoration: 'none' }}>
              <strong>{older.title}</strong>
            </a>
          ) : (
            <div className="controlsMeta">None</div>
          )}
        </div>
      </nav>

      <div style={{ marginTop: 18 }}>
        <a href="/content" className="linkInline">
          Back to Content
        </a>
      </div>
    </article>
  )
}
