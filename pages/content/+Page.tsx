import { useMemo, useState } from 'react'
import { getAllContentMeta } from '../../src/content/contentIndex'
import { formatDateYmd } from '../../src/lib/formatDate'

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
  const items = getAllContentMeta()

  const [q, setQ] = useState('')
  const [type, setType] = useState<'all' | string>('all')
  const [tag, setTag] = useState<'all' | string>('all')

  const { typeOptions, tagOptions } = useMemo(() => {
    const types = new Map<string, string>()
    const tags = new Map<string, string>()

    for (const it of items) {
      const tk = typeKey(it)
      if (tk) types.set(tk, tk)

      for (const t of it.tags ?? []) {
        const k = t.toLowerCase()
        if (!tags.has(k)) tags.set(k, t)
      }
    }

    const typeOptions = Array.from(types.keys()).sort()
    const tagOptions = Array.from(tags.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([k, label]) => ({ k, label }))

    return { typeOptions, tagOptions }
  }, [items])

  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase()
    return items.filter((it) => {
      if (type !== 'all' && typeKey(it) !== type) return false
      if (tag !== 'all' && !(it.tags ?? []).some((t) => t.toLowerCase() === tag)) return false

      if (!qn) return true
      const hay = [
        it.title ?? '',
        it.summary ?? '',
        it.slug ?? '',
        it.type ?? '',
        it.series ?? '',
        ...(it.tags ?? [])
      ]
        .join(' ')
        .toLowerCase()

      return hay.includes(qn)
    })
  }, [items, q, type, tag])

  return (
    <section>
      <header className="sectionHeader">
        <h1>Content</h1>
        <p>Drops, music, visuals, writing, experiments — each with a dedicated, shareable page.</p>
      </header>

      <div
        style={{
          display: 'grid',
          gap: 12,
          marginBottom: 16,
          padding: 14,
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14
        }}
      >
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles, tags, summaries…"
            style={{
              flex: '1 1 240px',
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'transparent',
              color: 'inherit'
            }}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              flex: '0 0 auto',
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'transparent',
              color: 'inherit'
            }}
          >
            <option value="all">All types</option>
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            style={{
              flex: '0 0 auto',
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'transparent',
              color: 'inherit'
            }}
          >
            <option value="all">All tags</option>
            {tagOptions.map((t) => (
              <option key={t.k} value={t.k}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ opacity: 0.75, fontSize: 13 }}>
          Showing <strong>{filtered.length}</strong> of <strong>{items.length}</strong>
          {type !== 'all' ? ` • type: ${type}` : ''}
          {tag !== 'all' ? ` • tag: ${tagOptions.find((x) => x.k === tag)?.label ?? tag}` : ''}
          {q.trim() ? ` • query: "${q.trim()}"` : ''}
        </div>
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        {filtered.map((item) => (
          <a
            key={item.slug}
            href={`/content/${item.slug}`}
            style={{
              display: 'block',
              padding: 16,
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 14,
              textDecoration: 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <strong style={{ fontSize: 16 }}>{item.title}</strong>
              <span style={{ opacity: 0.7, fontSize: 13 }}>
                {typeLabel(item)}
                {item.date ? ` • ${formatDateYmd(item.date)}` : ''}
              </span>
            </div>

            {item.summary ? <p style={{ marginTop: 8, opacity: 0.85 }}>{item.summary}</p> : null}

            {item.tags && item.tags.length > 0 ? (
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {item.tags.slice(0, 6).map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  )
}
