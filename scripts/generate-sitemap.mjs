import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

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
  '/legal',
  '/legal/privacy',
  '/legal/terms',
  '/content'
]

function isYmd(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s)
}

function maxYmd(a, b) {
  if (!isYmd(a)) return isYmd(b) ? b : null
  if (!isYmd(b)) return a
  return a >= b ? a : b
}

function safeStatMtimeYmd(filePath) {
  try {
    const st = fs.statSync(filePath)
    return new Date(st.mtime).toISOString().slice(0, 10)
  } catch {
    return null
  }
}

function gitLastModYmd(filePath) {
  try {
    // %cs = committer date, strict YYYY-MM-DD
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', filePath], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore']
    })
      .toString()
      .trim()

    return isYmd(out) ? out : null
  } catch {
    return null
  }
}

function lastModForFile(filePath) {
  // Prefer git; fall back to filesystem mtime
  return gitLastModYmd(filePath) ?? safeStatMtimeYmd(filePath)
}

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

function urlEntry(loc, lastmod = null) {
  if (lastmod && isYmd(lastmod)) {
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
  }
  return `  <url><loc>${loc}</loc></url>`
}

function listRouteFiles(routePath) {
  // Map a route to its directory under /pages
  // '/' -> pages/index
  const dir =
    routePath === '/'
      ? path.join(ROOT, 'pages', 'index')
      : path.join(ROOT, 'pages', ...routePath.replace(/^\//, '').split('/'))

  if (!fs.existsSync(dir)) return []

  // For /content, do NOT include @slug when computing lastmod for the index page
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    if (e.isDirectory()) {
      if (routePath === '/content' && e.name === '@slug') continue
      continue
    }
    const full = path.join(dir, e.name)
    files.push(full)
  }
  return files
}

function lastModForRoute(routePath) {
  const files = listRouteFiles(routePath).filter((f) => fs.existsSync(f))
  let last = null
  for (const f of files) {
    last = maxYmd(last, lastModForFile(f))
  }
  return last
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true })

  const urls = []

  // 1) Content pages from MDX
  const contentEntries = []
  let latestContentLastmod = null

  if (fs.existsSync(CONTENT_DIR)) {
    const mdxFiles = walk(CONTENT_DIR).filter((f) => f.toLowerCase().endsWith('.mdx'))

    for (const file of mdxFiles) {
      const src = fs.readFileSync(file, 'utf8')
      const slug = extractMetaValue(src, 'slug')
      if (!slug) continue

      const metaDate = extractMetaValue(src, 'date') // expected YYYY-MM-DD
      const gitDate = lastModForFile(file)

      // Best practice: lastmod reflects *actual change*; meta date reflects *published date*
      // So we take the max of both.
      const lastmod = maxYmd(isYmd(metaDate) ? metaDate : null, gitDate)

      contentEntries.push({ slug, lastmod })
      latestContentLastmod = maxYmd(latestContentLastmod, lastmod)
    }
  }

  // 2) Static pages with per-route git lastmod
  for (const r of STATIC_ROUTES) {
    let lastmod = lastModForRoute(r)

    // Home and /content change when new content appears
    if (r === '/' || r === '/content') {
      lastmod = maxYmd(lastmod, latestContentLastmod)
    }

    urls.push(urlEntry(`${ORIGIN}${r}`, lastmod))
  }

  // 3) Add each content slug page
  for (const { slug, lastmod } of contentEntries) {
    urls.push(urlEntry(`${ORIGIN}/content/${slug}`, lastmod))
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
