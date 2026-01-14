// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const SITE_NAME = 'The Neighborhood On The Block'
const DEFAULT_DESCRIPTION = 'Culture house + creative studio + tools + drops. Built with intention.'

const SITE_ORIGIN = String(import.meta.env.VITE_SITE_ORIGIN ?? '').replace(/\/+$/, '')

const faviconSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0b0b0b"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle"
        font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial"
        font-size="26" font-weight="700" fill="#ffffff">OTB</text>
</svg>
`.trim())

function resolveConfigString(value: unknown, pageContext: any): string | null {
  try {
    if (typeof value === 'string') {
      const s = value.trim()
      return s ? s : null
    }
    if (typeof value === 'function') {
      const out = value(pageContext)
      if (typeof out === 'string') {
        const s = out.trim()
        return s ? s : null
      }
    }
  } catch {
    // ignore and fall back
  }
  return null
}

export function Head() {
  const pageContext = usePageContext()

  const origin = SITE_ORIGIN || pageContext.urlParsed?.origin || ''
  const pathname = pageContext.urlParsed?.pathname || '/'
  const canonical = origin ? `${origin}${pathname}` : null

  const title = resolveConfigString(pageContext.config?.title, pageContext) ?? SITE_NAME
  const description =
    resolveConfigString(pageContext.config?.description, pageContext) ?? DEFAULT_DESCRIPTION

  const ogImage = origin ? `${origin}/og-default.png` : '/og-default.png'

  return (
    <>
      {/* Icons + manifest */}
      <link rel="icon" href={`data:image/svg+xml,${faviconSvg}`} />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />

      {/* Basics */}
      <meta name="theme-color" content="#0b0b0b" />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {/* Open Graph defaults */}
      <meta property="og:site_name" content={SITE_NAME} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter defaults */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  )
}
