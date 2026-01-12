// https://vike.dev/Head

const faviconSvg = encodeURIComponent(
  `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0b0b0b"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle"
        font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial"
        font-size="26" font-weight="700" fill="#ffffff">OTB</text>
</svg>
`.trim()
)

const SITE_ORIGIN =
  (import.meta.env.VITE_SITE_ORIGIN as string | undefined)?.replace(/\/+$/, '') ||
  'https://www.neighborhoodotb.io'

const DEFAULT_TITLE = 'The Neighborhood On The Block'
const DEFAULT_DESCRIPTION = 'Culture house + creative studio + tools + drops. Built with intention.'
const OG_IMAGE = `${SITE_ORIGIN}/og-default.png`

export function Head() {
  return (
    <>
      <link rel="icon" href={`data:image/svg+xml,${faviconSvg}`} />
      <meta name="theme-color" content="#0b0b0b" />
      <meta name="robots" content="index, follow" />

      {/* Basic SEO defaults */}
      <meta name="description" content={DEFAULT_DESCRIPTION} />

      {/* Open Graph */}
      <meta property="og:site_name" content={DEFAULT_TITLE} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={DEFAULT_TITLE} />
      <meta property="og:description" content={DEFAULT_DESCRIPTION} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={DEFAULT_TITLE} />
      <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Canonical base (route-level canonicals can be added later) */}
      <link rel="canonical" href={SITE_ORIGIN} />
    </>
  )
}
