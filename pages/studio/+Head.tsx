// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const SITE_NAME = 'The Neighborhood On The Block'
const STUDIO_NAME = 'On The Block Studio'
const STUDIO_ALT_NAME = 'OTB Studio'

function csvEnv(name: string): string[] {
  return String((import.meta as any).env?.[name] ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function envFirst(...keys: string[]) {
  for (const k of keys) {
    const v = String((import.meta as any).env?.[k] ?? '').trim()
    if (v) return v
  }
  return null
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

  const origin = String(import.meta.env.VITE_SITE_ORIGIN ?? '').replace(/\/+$/, '') || pageContext.urlParsed?.origin || ''
  const canonical = origin ? `${origin}/studio` : null

  const description =
    resolveConfigString(pageContext.config?.description, pageContext) ??
    'Professional services arm of the Neighborhood: web, systems, brand, and execution.'

  const logo512 = origin ? `${origin}/icon-512.png` : '/icon-512.png'

  // Reuse your existing env vars (support both naming styles)
  const areaServedList = csvEnv('VITE_AREA_SERVED')
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

  // Use your AEO list for serviceType/knowsAbout if present
  const knowsAbout = csvEnv('VITE_SITE_KNOWS_ABOUT')
  const serviceType = knowsAbout.length ? knowsAbout : undefined

  const orgId = origin ? `${origin}/#organization` : null

  const studioJsonLd =
    origin && canonical
      ? {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          '@id': `${canonical}#service`,
          name: STUDIO_NAME,
          alternateName: STUDIO_ALT_NAME,
          url: canonical,
          description,
          logo: { '@type': 'ImageObject', url: logo512 },

          // Link back to umbrella Organization
          parentOrganization: orgId ? { '@id': orgId } : { '@type': 'Organization', name: SITE_NAME },
          provider: orgId ? { '@id': orgId } : { '@type': 'Organization', name: SITE_NAME },

          areaServed,
          address,
          serviceType,
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
