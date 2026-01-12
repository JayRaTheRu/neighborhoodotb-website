import type { ComponentType } from 'react'

export type ContentMeta = {
  slug: string
  title: string
  summary?: string
  date?: string
  tags?: string[]
  type?: string
  series?: string
  featured?: boolean
}

type MdxModule = {
  default: ComponentType
  meta?: ContentMeta
}

const mdxModules = import.meta.glob('/content/**/*.mdx', { eager: true }) as Record<string, MdxModule>

function assertMeta(path: string, mod: MdxModule): ContentMeta {
  if (!mod.meta?.slug || !mod.meta?.title) {
    throw new Error(`MDX file missing exported meta.slug/meta.title: ${path}`)
  }
  return mod.meta
}

function normalizeMeta(meta: ContentMeta): ContentMeta {
  const slug = String(meta.slug).trim()
  const title = String(meta.title).trim()

  const summary = meta.summary ? String(meta.summary).trim() : undefined
  const date = meta.date ? String(meta.date).trim() : undefined

  const type = meta.type ? String(meta.type).trim() : undefined
  const series = meta.series ? String(meta.series).trim() : undefined

  const tagsRaw = Array.isArray(meta.tags) ? meta.tags : undefined
  const tags =
    tagsRaw
      ?.map((t) => String(t).trim())
      .filter(Boolean)
      .filter((t, i, arr) => arr.findIndex((x) => x.toLowerCase() === t.toLowerCase()) === i) ?? undefined

  const featured = Boolean(meta.featured)

  return { slug, title, summary, date, tags, type, series, featured }
}

function dateMs(date?: string): number {
  if (!date) return 0
  const ms = Date.parse(date)
  return Number.isFinite(ms) ? ms : 0
}

const contentBySlug = new Map<string, { meta: ContentMeta; Component: ComponentType }>()
const allMeta: ContentMeta[] = []

for (const [path, mod] of Object.entries(mdxModules)) {
  const raw = assertMeta(path, mod)
  const meta = normalizeMeta(raw)

  const key = meta.slug.toLowerCase()
  if (contentBySlug.has(key)) {
    throw new Error(`Duplicate content slug detected: "${meta.slug}" (${path})`)
  }

  contentBySlug.set(key, { meta, Component: mod.default })
  allMeta.push(meta)
}

// Deterministic: date desc, then slug asc
allMeta.sort((a, b) => {
  const d = dateMs(b.date) - dateMs(a.date)
  if (d !== 0) return d
  return a.slug.localeCompare(b.slug)
})

export function getAllContentMeta(): ContentMeta[] {
  // defensive copy to prevent accidental mutation by callers
  return allMeta.slice()
}

export function getContentBySlug(slug: string): { meta: ContentMeta; Component: ComponentType } | null {
  const key = String(slug).trim().toLowerCase()
  return contentBySlug.get(key) ?? null
}
