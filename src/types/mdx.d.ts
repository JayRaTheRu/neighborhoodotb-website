declare module '*.mdx' {
  export const meta: {
    slug: string
    title: string
    description: string
    date: string
    tags?: string[]
    creator?: string
    medium?: string
    series?: string
  }
  const Component: any
  export default Component
}
