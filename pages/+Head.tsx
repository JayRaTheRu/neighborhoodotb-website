// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const SITE_NAME = 'The Neighborhood On The Block'
const SITE_APP_NAME = 'NeighborhoodOTB'
const DEFAULT_DESCRIPTION = 'Culture house + creative studio + tools + drops. Built with intention.'

const SITE_ORIGIN = String(import.meta.env.VITE_SITE_ORIGIN ?? '').replace(/\/+$/, '')

// ----------------------------
// Optional AEO/GEO env vars (build-time)
// Supports either:
// - Comma-separated: "a,b,c"
// - JSON array: ["a","b","c"]
// ----------------------------

function parseEnvList(name: string): string[] {
  const raw = String((import.meta as any).env?.[name] ?? '').trim()
  if (!raw) return []

  // JSON array support
  if (raw.startsWith('[')) {
    try {
      const arr = JSON.parse(raw)
      if (Array.isArray(arr)) {
        return arr.map((x) => String(x).trim()).filter(Boolean)
      }
    } catch {
      // fall back to CSV below
    }
  }

  // CSV support
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function envString(name: string): string | null {
  const v = String((import.meta as any).env?.[name] ?? '').trim()
  return v ? v : null
}

const SITE_SAME_AS = parseEnvList('VITE_SITE_SAME_AS')

const SITE_CONTACT_EMAIL =
  (envString('VITE_SITE_CONTACT_EMAIL') ?? envString('VITE_CONTACT_EMAIL')) || null

const SITE_FOUNDING_DATE =
  (envString('VITE_SITE_FOUNDING_DATE') ?? envString('VITE_FOUNDING_DATE')) || null

// Prefer one scheme but support legacy keys
const AREA_SERVED_PRIMARY = parseEnvList('VITE_AREA_SERVED')
const AREA_SERVED_FALLBACK = parseEnvList('VITE_SITE_AREA_SERVED')
const SITE_AREA_SERVED_LIST = AREA_SERVED_PRIMARY.length ? AREA_SERVED_PRIMARY : AREA_SERVED_FALLBACK

// AEO: explicit topical coverage for answer engines
const SITE_KNOWS_ABOUT = parseEnvList('VITE_SITE_KNOWS_ABOUT')

// GEO anchor (optional)
const SITE_ADDRESS_LOCALITY = envString('VITE_SITE_ADDRESS_LOCALITY')
const SITE_ADDRESS_REGION = envString('VITE_SITE_ADDRESS_REGION')
const SITE_ADDRESS_COUNTRY = envString('VITE_SITE_ADDRESS_COUNTRY')

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

function isYmd(s: string | null) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s)
}

function normalizePathname(pathname: string) {
  // Ensure leading slash; strip hash/query if any are present
  const p = String(pathname || '/').split('?')[0].split('#')[0]
  return p.startsWith('/') ? p : `/${p}`
}

export function Head() {
  const pageContext = usePageContext()

  const origin = SITE_ORIGIN || pageContext.urlParsed?.origin || ''
  const pathname = normalizePathname(pageContext.urlParsed?.pathname || '/')
  const canonical = origin ? `${origin}${pathname}` : null

  const title = resolveConfigString(pageContext.config?.title, pageContext) ?? SITE_NAME
  const description =
    resolveConfigString(pageContext.config?.description, pageContext) ?? DEFAULT_DESCRIPTION

  const ogImage = origin ? `${origin}/og-default.png` : '/og-default.png'
  const logo512 = origin ? `${origin}/icon-512.png` : '/icon-512.png'

  const orgId = origin ? `${origin}/#organization` : null
  const siteId = origin ? `${origin}/#website` : null
  const contactUrl = origin ? `${origin}/contact` : '/contact'

  const areaServed =
    SITE_AREA_SERVED_LIST.length === 0
      ? undefined
      : SITE_AREA_SERVED_LIST.length === 1
        ? SITE_AREA_SERVED_LIST[0]
        : SITE_AREA_SERVED_LIST

  const address =
    SITE_ADDRESS_LOCALITY || SITE_ADDRESS_REGION || SITE_ADDRESS_COUNTRY
      ? {
          '@type': 'PostalAddress',
          addressLocality: SITE_ADDRESS_LOCALITY || undefined,
          addressRegion: SITE_ADDRESS_REGION || undefined,
          addressCountry: SITE_ADDRESS_COUNTRY || undefined
        }
      : undefined

  // Include if we have an origin; email is optional
  const contactPoint =
    origin
      ? [
          {
            '@type': 'ContactPoint',
            contactType: 'inquiries',
            url: contactUrl,
            email: SITE_CONTACT_EMAIL || undefined,
            availableLanguage: ['en']
          }
        ]
      : undefined

  const organizationJsonLd =
    origin && orgId
      ? {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': orgId,
          name: SITE_NAME,
          alternateName: SITE_APP_NAME,
          description: DEFAULT_DESCRIPTION,
          url: origin,
          logo: {
            '@type': 'ImageObject',
            url: logo512
          },

          // AEO/GEO upgrades (optional)
          sameAs: SITE_SAME_AS.length ? SITE_SAME_AS : undefined,
          foundingDate: isYmd(SITE_FOUNDING_DATE) ? SITE_FOUNDING_DATE : undefined,
          areaServed,
          address,
          knowsAbout: SITE_KNOWS_ABOUT.length ? SITE_KNOWS_ABOUT : undefined,
          contactPoint
        }
      : null

  const websiteJsonLd =
    origin && siteId
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': siteId,
          name: SITE_NAME,
          alternateName: SITE_APP_NAME,
          url: origin,
          description: DEFAULT_DESCRIPTION,
          inLanguage: 'en-US',
          publisher: orgId ? { '@id': orgId } : { '@type': 'Organization', name: SITE_NAME }
        }
      : null

  return (
    <>
      {/* Primary document metadata */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />

      {/* Icons + manifest */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />

      {/* Basics */}
      <meta name="theme-color" content="#0b0b0b" />
      <meta name="robots" content="index, follow" />
      <meta name="application-name" content={SITE_APP_NAME} />

      {/* Canonical */}
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {/* Open Graph defaults */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={SITE_NAME} />

      {/* Twitter defaults */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={SITE_NAME} />

      {/* Structured data */}
      {organizationJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      ) : null}
      {websiteJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      ) : null}
    </>
  )
}
