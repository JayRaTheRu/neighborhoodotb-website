// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const SITE_NAME = 'The Neighborhood On The Block'
const DEFAULT_DESCRIPTION = 'Culture house + creative studio + tools + drops. Built with intention.'

const SITE_ORIGIN = String(import.meta.env.VITE_SITE_ORIGIN ?? '').replace(/\/+$/, '')

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

  // Absolute OG image URL when possible (preferred by crawlers)
  const ogImage = origin ? `${origin}/og-default.png` : '/og-default.png'

  return (
    <>
      {/* Primary document metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Icons + manifest */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Optional explicit PWA icons (harmless; some clients use them) */}
      <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />

      {/* Basics */}
      <meta name="theme-color" content="#0b0b0b" />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {/* Open Graph defaults */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={SITE_NAME} />

      {/* Twitter defaults */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={SITE_NAME} />
    </>
  )
}
