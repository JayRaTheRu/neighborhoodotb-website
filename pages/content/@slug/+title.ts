export { title }

import type { PageContext } from 'vike/types'
import { getContentBySlug } from '../../../src/content/contentIndex'

function title(pageContext: PageContext): string {
  const slug = String(pageContext.routeParams?.slug ?? '')
  const entry = getContentBySlug(slug)

  if (!entry) return 'Content — The Neighborhood On The Block'
  return `${entry.meta.title} — The Neighborhood On The Block`
}
