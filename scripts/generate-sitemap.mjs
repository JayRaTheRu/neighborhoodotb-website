import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const ORIGIN = (process.env.VITE_SITE_ORIGIN || 'https://www.neighborhoodotb.io').replace(/\/+$/, '')

const PUBLIC_DIR = path.join(ROOT, 'public')
const CONTENT_DIR = path.join(ROOT, 'content')
const OUT_PATH = path.join(PUBLIC_DIR, 'sitemap.xml')

// Static routes you want indexed
const STATIC_ROUTES = [
  '/',
  '/about',
  '/fudkers',
  '/studio',
  '/collective',
  '/store',
  '/lab',
  '/brand-kit',
  '/contact',
  '/legal/privacy',
  '/legal/terms',
  '/content'
]

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...walk(full))
    else files.push(full)
  }
  return files
}

function extractMetaValue(src, key) {
  // matches: key: 'value' OR key: "value"
  const re = new RegExp(`${key}\\s*:\\s*['"]([^'"]+)['"]`, 'm')
  const m = src.match(re)
  return m ? m[1] : null
}

function isYmd(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s)
}

function urlEntry(loc, lastmod = null) {
  if (lastmod && isYmd(lastmod)) {
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
  }
  return `  <url><loc>${loc}</loc></url>`
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true })

  // Build-time lastmod for static routes (YYYY-MM-DD)
  const buildDate = new Date().toISOString().slice(0, 10)

  const urls = []

  // Static pages (use buildDate as lastmod)
  for (const r of STATIC_ROUTES) {
    urls.push(urlEntry(`${ORIGIN}${r}`, buildDate))
  }

  // Content pages from MDX meta exports (use meta date when present/valid)
  if (fs.existsSync(CONTENT_DIR)) {
    const mdxFiles = walk(CONTENT_DIR).filter((f) => f.toLowerCase().endsWith('.mdx'))

    for (const file of mdxFiles) {
      const src = fs.readFileSync(file, 'utf8')
      const slug = extractMetaValue(src, 'slug')
      if (!slug) continue

      const date = extractMetaValue(src, 'date') // expected YYYY-MM-DD
      const lastmod = isYmd(date) ? date : null

      urls.push(urlEntry(`${ORIGIN}/content/${slug}`, lastmod))
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls.join('\n')}\n` +
    `</urlset>\n`

  fs.writeFileSync(OUT_PATH, xml, 'utf8')
  console.log(`sitemap written: ${OUT_PATH} (${urls.length} urls)`)
}

main()
