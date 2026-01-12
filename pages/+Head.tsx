// https://vike.dev/Head

const faviconSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0b0b0b"/>
  <text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle"
        font-family="system-ui, -apple-system, Segoe UI, Roboto, Arial"
        font-size="26" font-weight="700" fill="#ffffff">OTB</text>
</svg>
`.trim())

export function Head() {
  return (
    <>
      <link rel="icon" href={`data:image/svg+xml,${faviconSvg}`} />
      <meta name="theme-color" content="#0b0b0b" />
      <meta name="robots" content="index, follow" />
    </>
  )
}
