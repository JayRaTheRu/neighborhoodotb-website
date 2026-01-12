export { onBeforePrerenderStart }

import { getAllContentMeta } from '../../../src/content/contentIndex'

function onBeforePrerenderStart(): string[] {
  return getAllContentMeta().map((p) => `/content/${p.slug}`)
}
