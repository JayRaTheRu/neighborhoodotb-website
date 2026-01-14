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

function maxYmd(a, b) {
  if (!isYmd(a)) return isYmd(b) ? b : null
  if (!isYmd(b)) return a
  return a >= b ? a : b
}

function mtimeYmd(absPath) {
  try {
    const st = fs.statSync(absPath)
    return new Date(st.mtimeMs).toISOString().slice(0, 10)
  } catch {
    return null
  }
}

function gitLastModifiedYmd(relPathFromRoot) {
  // returns YYYY-MM-DD (via %cs) or null if unavailable
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', relPathFromRoot], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim()
    return isYmd(out) ? out : null
  } catch {
    return null
  }
}

function urlEntry(loc, lastmod = null) {
  if (lastmod && isYmd(lastmod)) {
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
  }
  return `  <url><loc>${loc}</loc></url>`
}

function routeToPageDir(route) {
  if (route === '/') return 'pages/index'
  // routes map directly to folders in your repo (e.g. /brand-kit -> pages/brand-kit)
  return path.posix.join('pages', route.replace(/^\//, ''))
}

function staticRouteLastmod(route) {
  const pageDir = routeToPageDir(route)

  // Consider all metadata-affecting files for that route
  const relCandidates = [
    path.posix.join(pageDir, '+Page.tsx'),
    path.posix.join(pageDir, '+title.ts'),
    path.posix.join(pageDir, '+description.ts'),
    path.posix.join(pageDir, '+Head.tsx'),
    path.posix.join(pageDir, '+config.ts')
  ]

  let best = null

  for (const rel of relCandidates) {
    const abs = path.join(ROOT, rel)
    if (!fs.existsSync(abs)) continue

    const gitDate = gitLastModifiedYmd(rel)
    const fileDate = mtimeYmd(abs)
    best = maxYmd(best, gitDate ?? fileDate)
  }

  return best
}

function contentLastmod(absFilePath, metaDate) {
  const rel = path.relative(ROOT, absFilePath).split(path.sep).join(path.posix.sep)

  const gitDate = gitLastModifiedYmd(rel)
  const fileDate = mtimeYmd(absFilePath)

  // Ensure lastmod is never earlier than meta "date" (publish date)
  return maxYmd(metaDate, gitDate ?? fileDate)
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true })

  const urls = []

  // Static pages: lastmod = last Git modification date of page files (fallback to mtime)
  for (const r of STATIC_ROUTES) {
    const lm = staticRouteLastmod(r)
    urls.push(urlEntry(`${ORIGIN}${r}`, lm))
  }

  // Content pages: lastmod = max(meta date, git last modified, mtime fallback)
  if (fs.existsSync(CONTENT_DIR)) {
    const mdxFiles = walk(CONTENT_DIR).filter((f) => f.toLowerCase().endsWith('.mdx'))

    for (const file of mdxFiles) {
      const src = fs.readFileSync(file, 'utf8')
      const slug = extractMetaValue(src, 'slug')
      if (!slug) continue

      const metaDate = extractMetaValue(src, 'date') // expected YYYY-MM-DD (publish date)
      const lm = contentLastmod(file, isYmd(metaDate) ? metaDate : null)

      urls.push(urlEntry(`${ORIGIN}/content/${slug}`, lm))
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
