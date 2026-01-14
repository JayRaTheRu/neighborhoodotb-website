import { getContentBySlug } from '../../../src/content/contentIndex'

const DEFAULT_DESCRIPTION = 'Culture house + creative studio + tools + drops. Built with intention.'

export default function description(pageContext: any): string {
  const slug = String(pageContext.routeParams?.slug ?? '').trim()
  const entry = getContentBySlug(slug)
  return entry?.meta?.summary ? entry.meta.summary : DEFAULT_DESCRIPTION
}
