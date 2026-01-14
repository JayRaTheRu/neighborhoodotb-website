// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'
import { getContentBySlug } from '../../../src/content/contentIndex'

const SITE_NAME = 'The Neighborhood On The Block'
const SITE_ORIGIN = String(import.meta.env.VITE_SITE_ORIGIN ?? '').replace(/\/+$/, '')

export function Head() {
  const pageContext = usePageContext()
  const slug = String(pageContext.routeParams?.slug ?? '').trim()

  const origin = SITE_ORIGIN || pageContext.urlParsed?.origin || ''
  const canonical = origin ? `${origin}/content/${slug}` : null

  const entry = getContentBySlug(slug)
  if (!entry) {
    return canonical ? <link rel="canonical" href={canonical} /> : null
  }

  const { meta } = entry

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.summary ?? undefined,
    datePublished: meta.date ?? undefined,
    dateModified: meta.date ?? undefined,
    keywords: meta.tags?.join(', ') ?? undefined,
    mainEntityOfPage: canonical ?? undefined,
    publisher: { '@type': 'Organization', name: SITE_NAME }
  }

  return (
    <>
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}

      <meta property="og:type" content="article" />
      {meta.date ? <meta property="article:published_time" content={meta.date} /> : null}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
