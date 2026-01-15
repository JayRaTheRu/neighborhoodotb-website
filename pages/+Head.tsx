// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const SITE_NAME = 'The Neighborhood On The Block'
const SITE_APP_NAME = 'NeighborhoodOTB'
const DEFAULT_DESCRIPTION = 'Culture house + creative studio + tools + drops. Built with intention.'

const SITE_ORIGIN = String(import.meta.env.VITE_SITE_ORIGIN ?? '').replace(/\/+$/, '')

// ----------------------------
// Optional AEO/GEO env vars (build-time)
// ----------------------------

function csvEnv(name: string): string[] {
  return String((import.meta as any).env?.[name] ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

const SITE_SAME_AS = csvEnv('VITE_SITE_SAME_AS')
const SITE_CONTACT_EMAIL =
  String(import.meta.env.VITE_SITE_CONTACT_EMAIL ?? import.meta.env.VITE_CONTACT_EMAIL ?? '').trim() || null
const SITE_FOUNDING_DATE =
  String(import.meta.env.VITE_SITE_FOUNDING_DATE ?? import.meta.env.VITE_FOUNDING_DATE ?? '').trim() || null

// If you set one value: "Worldwide" -> outputs string
// If you set multiple: "United States, Worldwide" -> outputs array
const SITE_AREA_SERVED_LIST = csvEnv('VITE_AREA_SERVED')

// AEO: explicit topical coverage for answer engines
const SITE_KNOWS_ABOUT = csvEnv('VITE_SITE_KNOWS_ABOUT')

// GEO anchor (optional)
const SITE_ADDRESS_LOCALITY = String(import.meta.env.VITE_SITE_ADDRESS_LOCALITY ?? '').trim() || null
const SITE_ADDRESS_REGION = String(import.meta.env.VITE_SITE_ADDRESS_REGION ?? '').trim() || null
const SITE_ADDRESS_COUNTRY = String(import.meta.env.VITE_SITE_ADDRESS_COUNTRY ?? '').trim() || null

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

          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'inquiries',
              url: contactUrl,
              email: SITE_CONTACT_EMAIL || undefined,
              availableLanguage: ['en']
            }
          ]
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
