import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'

export default {
  extends: [vikeReact],
  prerender: true,

  // Global defaults (can be overridden per route)
  title: 'The Neighborhood On The Block',
  description: 'Culture house + creative studio + tools + drops. Built with intention.',

  // HTML shell basics
  htmlAttributes: { lang: 'en' },
  viewport: 'width=device-width, initial-scale=1'
} satisfies Config
