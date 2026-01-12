import type { ComponentType } from 'react'

export type ContentMeta = {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
  creator?: string
  medium?: string
  series?: string
}

export type ContentEntry = {
  default: ComponentType
  meta: ContentMeta
}

const modules = import.meta.glob<ContentEntry>('../../content/**/*.mdx', { eager: true })

export function getAllContent(): ContentMeta[] {
  const items = Object.values(modules)
    .map((m) => m.meta)
    .filter(Boolean)

  items.sort((a, b) => (a.date < b.date ? 1 : -1)) // newest first
  return items
}

export function getContentEntryBySlug(slug: string): ContentEntry | null {
  const entry = Object.values(modules).find((m) => m.meta?.slug === slug)
  return entry ?? null
}
