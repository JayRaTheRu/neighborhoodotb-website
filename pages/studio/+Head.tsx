// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const SITE_NAME = 'The Neighborhood On The Block'
const STUDIO_NAME = 'OTB Studio'
const STUDIO_ALT_NAME = 'On The Block Studio'

function envString(key: string): string {
  return String((import.meta as any).env?.[key] ?? '')
}

function envFirst(...keys: string[]) {
  for (const k of keys) {
    const v = envString(k).trim()
    if (v) return v
  }
  return null
}

function csvEnv(...keys: string[]): string[] {
  const raw = envFirst(...keys) ?? ''
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
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

export function Head() {
  const pageContext = usePageContext()

  const origin =
    envFirst('VITE_SITE_ORIGIN') || pageContext.urlParsed?.origin || ''
  const canonical = origin ? `${origin}/studio` : null

  // Pull your exact page copy from pages/studio/+description.ts via Vike config
  const description =
    resolveConfigString(pageContext.config?.description, pageContext) ??
    'OTB Studio is the build and creative arm of The Neighborhood—brand systems, web/product, drop infrastructure, and experiments shipped with intention.'

  const logo512 = origin ? `${origin}/icon-512.png` : '/icon-512.png'
  const orgId = origin ? `${origin}/#organization` : null

  // Keep areaServed simple and correct: worldwide services + LA address
  const areaServedList = csvEnv('VITE_AREA_SERVED', 'VITE_SITE_AREA_SERVED')
  const areaServed =
    areaServedList.length === 0
      ? undefined
      : areaServedList.length === 1
        ? areaServedList[0]
        : areaServedList

  const contactUrl = origin ? `${origin}/contact` : '/contact'
  const contactEmail = envFirst('VITE_SITE_CONTACT_EMAIL', 'VITE_CONTACT_EMAIL')

  const addressLocality = envFirst('VITE_SITE_ADDRESS_LOCALITY')
  const addressRegion = envFirst('VITE_SITE_ADDRESS_REGION')
  const addressCountry = envFirst('VITE_SITE_ADDRESS_COUNTRY')

  const address =
    addressLocality || addressRegion || addressCountry
      ? {
          '@type': 'PostalAddress',
          addressLocality: addressLocality || undefined,
          addressRegion: addressRegion || undefined,
          addressCountry: addressCountry || undefined
        }
      : undefined

  // Optional: reuse your “what we do” list if you store it in env
  // If you don’t, this stays undefined and is omitted.
  const knowsAbout = csvEnv('VITE_SITE_KNOWS_ABOUT')

  const studioJsonLd =
    canonical
      ? {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          '@id': `${canonical}#service`,
          name: STUDIO_NAME,
          alternateName: STUDIO_ALT_NAME,
          url: canonical,
          description,
          logo: { '@type': 'ImageObject', url: logo512 },

          // Link to umbrella org
          parentOrganization: orgId
            ? { '@id': orgId }
            : { '@type': 'Organization', name: SITE_NAME },

          // Service reach and location
          areaServed,
          address,

          // AEO bonus (optional)
          knowsAbout: knowsAbout.length ? knowsAbout : undefined,

          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'inquiries',
              url: contactUrl,
              email: contactEmail || undefined,
              availableLanguage: ['en']
            }
          ]
        }
      : null

  return (
    <>
      {studioJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(studioJsonLd) }}
        />
      ) : null}
    </>
  )
}
