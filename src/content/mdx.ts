export type ContentFrontmatter = {
  title: string
  date?: string
  type?: string
  summary?: string
  featured?: boolean
}

export type ContentItem = {
  slug: string
  frontmatter: ContentFrontmatter
}

// Vite will include these MDX files in the build.
// Adjust the glob if your MDX is nested differently.
const modules = import.meta.glob('../../content/**/*.mdx', { eager: true }) as Record<
  string,
  { frontmatter?: ContentFrontmatter }
>

export function getAllContent(): ContentItem[] {
  const items: ContentItem[] = Object.entries(modules).map(([path, mod]) => {
    // path example: ../../content/drop-001.mdx
    const slug = path
      .replace(/^.*\/content\//, '')
      .replace(/\.mdx$/, '')
      .replace(/\/index$/, '')

    return {
      slug,
      frontmatter: mod.frontmatter ?? { title: slug }
    }
  })

  // Sort newest first when date exists
  items.sort((a, b) => (b.frontmatter.date ?? '').localeCompare(a.frontmatter.date ?? ''))
  return items
}

export function getContentSlugs(): string[] {
  return getAllContent().map((x) => x.slug)
}
