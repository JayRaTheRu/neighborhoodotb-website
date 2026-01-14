// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const SITE_NAME = 'The Neighborhood On The Block'
const SITE_APP_NAME = 'NeighborhoodOTB'
const DEFAULT_DESCRIPTION = 'Culture house + creative studio + tools + drops. Built with intention.'

const SITE_ORIGIN = String(import.meta.env.VITE_SITE_ORIGIN ?? '').replace(/\/+$/, '')

function envFirst(...keys: string[]): string {
  for (const k of keys) {
    const v = (import.meta.env as any)?.[k]
    if (typeof v === 'string' && v.trim()) return v.trim()
  }
  return ''
}

function splitList(raw: string): string[] {
  return String(raw || '')
    .split(/[\n,]+/g) // commas or newlines
    .map((s) => s.trim())
    .filter(Boolean)
}

function isYmd(s: string | null): boolean {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s)
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

function normalizeAreaServed(values: string[]): string | Array<string | { '@type': 'Country'; name: string }> | undefined {
  if (!values.length) return undefined
  if (values.length === 1) return values[0] // cleanest output

  return values.map((v) => {
    const k = v.toLowerCase()
    if (k === 'us' || k === 'usa' || k === 'united states' || k === 'united states of america') {
      return { '@type': 'Country' as const, name: 'United States' }
    }
    return v
  })
}

export function Head() {
  const pageContext = usePageContext()

  const origin = SITE_ORIGIN || pageContext.urlParsed?.origin || ''
  const pathname = pageContext.urlParsed?.pathname || '/'
  const canonical = origin ? `${origin}${pathname}` : null

  const title = resolveConfigString(pageContext.config?.title, pageContext) ?? SITE_NAME
  const description =
    resolveConfigString(pageContext.config?.description, pageContext) ?? DEFAULT_DESCRIPTION

  // Assets (prefer absolute URLs for crawlers)
  const ogImage = origin ? `${origin}/og-default.png` : '/og-default.png'
  const logo512 = origin ? `${origin}/icon-512.png` : '/icon-512.png'
  const contactUrl = origin ? `${origin}/contact` : '/contact'

  // Optional AEO/GEO env vars (strings in Vercel; parsed here)
  const sameAs = splitList(envFirst('VITE_SITE_SAME_AS', 'VITE_SAME_AS'))
  const contactEmail = envFirst('VITE_SITE_CONTACT_EMAIL', 'VITE_CONTACT_EMAIL') || null

  const foundingDateRaw = envFirst('VITE_SITE_FOUNDING_DATE', 'VITE_FOUNDING_DATE')
  const foundingDate = isYmd(foundingDateRaw) ? foundingDateRaw : null

  const areaServedRaw = envFirst('VITE_SITE_AREA_SERVED', 'VITE_AREA_SERVED')
  const areaServedList = splitList(areaServedRaw)
  const areaServed = normalizeAreaServed(areaServedList)

  // GEO grounding (based in LA)
  const addressLocality = envFirst('VITE_SITE_ADDRESS_LOCALITY', 'VITE_ADDRESS_LOCALITY') || null
  const addressRegion = envFirst('VITE_SITE_ADDRESS_REGION', 'VITE_ADDRESS_REGION') || null
  const addressCountry = envFirst('VITE_SITE_ADDRESS_COUNTRY', 'VITE_ADDRESS_COUNTRY') || null
  const postalCode = envFirst('VITE_SITE_ADDRESS_POSTAL_CODE', 'VITE_ADDRESS_POSTAL_CODE') || null

  const hasAddress = Boolean(addressLocality || addressRegion || addressCountry || postalCode)
  const postalAddress = hasAddress
    ? {
        '@type': 'PostalAddress',
        ...(addressLocality ? { addressLocality } : null),
        ...(addressRegion ? { addressRegion } : null),
        ...(addressCountry ? { addressCountry } : null),
        ...(postalCode ? { postalCode } : null)
      }
    : null

  const orgId = origin ? `${origin}/#organization` : null
  const siteId = origin ? `${origin}/#website` : null

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

          ...(sameAs.length ? { sameAs } : null),
          ...(foundingDate ? { foundingDate } : null),
          ...(areaServed ? { areaServed } : null),
          ...(postalAddress ? { address: postalAddress } : null),

          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'inquiries',
              url: contactUrl,
              ...(contactEmail ? { email: contactEmail } : null),
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
      <meta name="application-name" content={SITE_APP_NAME} />
      <meta name="theme-color" content="#0b0b0b" />
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      {/* Icons + manifest */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />

      {/* Open Graph */}
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

      {/* Twitter */}
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
