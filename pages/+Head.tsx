// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const SITE_NAME = 'The Neighborhood On The Block'
const SITE_APP_NAME = 'NeighborhoodOTB'
const DEFAULT_DESCRIPTION = 'Culture house + creative studio + tools + drops. Built with intention.'

const SITE_ORIGIN = String(import.meta.env.VITE_SITE_ORIGIN ?? '').replace(/\/+$/, '')

/**
 * Env helpers
 * Vite env vars are build-time. On Vercel, env var changes require a redeploy.
 * Also: we support multiple env key names for compatibility (e.g. VITE_CONTACT_EMAIL vs VITE_SITE_CONTACT_EMAIL).
 */
function getEnvFirst(keys: string[], fallback = ''): string {
  for (const k of keys) {
    const v = String((import.meta as any).env?.[k] ?? '').trim()
    if (v) return v
  }
  return fallback
}

function parseList(value: string): string[] {
  // allow comma-separated or newline-separated lists
  return value
    .split(/[\n,]/g)
    .map((s) => s.trim())
    .filter(Boolean)
}

function isYmd(s: string | null): s is string {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s)
}

function normalizeEmail(email: string | null): string | null {
  if (!email) return null
  const e = email.trim()
  if (!e) return null
  // Minimal sanity check; don't overvalidate.
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) return e
  return e
}

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

// Optional AEO/GEO env vars (build-time)
const SITE_SAME_AS = parseList(
  getEnvFirst(['VITE_SITE_SAME_AS', 'VITE_SAME_AS', 'VITE_SITE_SOCIALS', 'VITE_SOCIALS'])
)

const SITE_CONTACT_EMAIL = normalizeEmail(
  getEnvFirst(['VITE_SITE_CONTACT_EMAIL', 'VITE_CONTACT_EMAIL', 'VITE_SITE_EMAIL', 'VITE_EMAIL']) || null
)

const SITE_FOUNDING_DATE_RAW =
  getEnvFirst(['VITE_SITE_FOUNDING_DATE', 'VITE_FOUNDING_DATE', 'VITE_SITE_FOUNDED', 'VITE_FOUNDED']) || null
const SITE_FOUNDING_DATE = isYmd(SITE_FOUNDING_DATE_RAW) ? SITE_FOUNDING_DATE_RAW : null

const SITE_AREA_SERVED = parseList(getEnvFirst(['VITE_SITE_AREA_SERVED', 'VITE_AREA_SERVED']))

export function Head() {
  const pageContext = usePageContext()

  const origin = SITE_ORIGIN || pageContext.urlParsed?.origin || ''
  const pathname = pageContext.urlParsed?.pathname || '/'
  const canonical = origin ? `${origin}${pathname}` : null

  const title = resolveConfigString(pageContext.config?.title, pageContext) ?? SITE_NAME
  const description =
    resolveConfigString(pageContext.config?.description, pageContext) ?? DEFAULT_DESCRIPTION

  const ogImage = origin ? `${origin}/og-default.png` : '/og-default.png'
  const logo512 = origin ? `${origin}/icon-512.png` : '/icon-512.png'
  const contactUrl = origin ? `${origin}/contact` : '/contact'

  const orgId = origin ? `${origin}/#organization` : null
  const siteId = origin ? `${origin}/#website` : null

  // Organization JSON-LD (AEO/GEO)
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

          // Optional enrichments
          sameAs: SITE_SAME_AS.length ? SITE_SAME_AS : undefined,
          foundingDate: SITE_FOUNDING_DATE ?? undefined,
          areaServed: SITE_AREA_SERVED.length ? SITE_AREA_SERVED : undefined,

          // Contact clarity
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'inquiries',
              url: contactUrl,
              email: SITE_CONTACT_EMAIL ?? undefined,
              availableLanguage: ['en']
            }
          ]
        }
      : null

  // WebSite JSON-LD
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
      <title>{title}</title>
      <meta name="description" content={description} />

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      ) : null}
      {websiteJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      ) : null}
    </>
  )
}
