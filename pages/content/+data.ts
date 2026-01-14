export { data }

import { getAllContentMeta } from '../../src/content/contentIndex'

function data() {
  return { items: getAllContentMeta() }
}
