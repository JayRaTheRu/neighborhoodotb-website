export { description }

import type { PageContext } from 'vike/types'
import { getContentBySlug } from '../../../src/content/contentIndex'

function description(pageContext: PageContext): string {
  const slug = String(pageContext.routeParams?.slug ?? '')
  const entry = getContentBySlug(slug)

  if (!entry) return 'Drops, loops, and experiments from The Neighborhood On The Block.'
  return entry.meta.summary ?? 'A piece from The Neighborhood On The Block content library.'
}
