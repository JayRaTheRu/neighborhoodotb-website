// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const FUDKERS_NAME = 'FUDkers'
const FUDKERS_CANONICAL_SITE = 'https://www.fudkers.xyz'

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
    // ignore
  }
  return null
}

export function Head() {
  const pageContext = usePageContext()

  const origin =
    envFirst('VITE_SITE_ORIGIN') || pageContext.urlParsed?.origin || ''
  const canonical = origin ? `${origin}/fudkers` : null
  const orgId = origin ? `${origin}/#organization` : null

  // Pull your exact page copy from pages/fudkers/+description.ts
  const description =
    resolveConfigString(pageContext.config?.description, pageContext) ??
    'Fudkers, featured projects, and related drops from the NeighborhoodOTB ecosystem.'

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

          // Explicitly connect to the separate canonical site
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
