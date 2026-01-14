cd "/home/jason/neighborhoodotb website"
cat > pages/content/+Head.tsx <<'EOF'
// Environment: server
// https://vike.dev/Head

import { usePageContext } from 'vike-react/usePageContext'

const SITE_ORIGIN = String(import.meta.env.VITE_SITE_ORIGIN ?? '').replace(/\/+$/, '')

export function Head() {
  const pageContext = usePageContext()

  const origin = SITE_ORIGIN || pageContext.urlParsed?.origin || ''
  const canonical = origin ? `${origin}/content` : null

  return (
    <>
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:type" content="website" />
    </>
  )
}
EOF
