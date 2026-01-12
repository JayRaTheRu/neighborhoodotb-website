// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const SITE_ORIGIN = import.meta.env.VITE_SITE_ORIGIN ?? ''

export function Head() {
  const pageContext = usePageContext()
  const origin = SITE_ORIGIN || pageContext.urlParsed?.origin || ''
  const canonical = origin ? `${origin}/content` : null

  return (
    <>
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
    </>
  )
}
