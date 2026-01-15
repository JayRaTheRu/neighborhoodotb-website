// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const FUDKERS_NAME = 'FUDkers'
const FUDKERS_CANONICAL_SITE = 'https://www.fudkers.xyz'

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
    // ignore
  }
  return null
}

export function Head() {
  const pageContext = usePageContext()

  const origin = String(import.meta.env.VITE_SITE_ORIGIN ?? '').replace(/\/+$/, '') || pageContext.urlParsed?.origin || ''
  const canonical = origin ? `${origin}/fudkers` : null
  const orgId = origin ? `${origin}/#organization` : null

  const description =
    resolveConfigString(pageContext.config?.description, pageContext) ??
    'Owned IP character universe inside the Neighborhood ecosystem.'

  // “CreativeWorkSeries” is a good fit for an IP / character universe.
  const fudkersJsonLd =
    canonical
      ? {
          '@context': 'https://schema.org',
          '@type': 'CreativeWorkSeries',
          '@id': `${canonical}#series`,
          name: FUDKERS_NAME,
          url: canonical,
          description,
          publisher: orgId ? { '@id': orgId } : undefined,

          // Connect the hub page to the canonical external site
          sameAs: [FUDKERS_CANONICAL_SITE],
          mainEntityOfPage: canonical
        }
      : null

  return (
    <>
      {fudkersJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fudkersJsonLd) }}
        />
      ) : null}
    </>
  )
}
