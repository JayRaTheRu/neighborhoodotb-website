import { getContentBySlug } from '../../../src/content/contentIndex'

const SITE_NAME = 'The Neighborhood On The Block'

export default function title(pageContext: any): string {
  const slug = String(pageContext.routeParams?.slug ?? '').trim()
  const entry = getContentBySlug(slug)
  return entry?.meta?.title ? `${entry.meta.title}` : `Content — ${SITE_NAME}`
}
