export { data }
import { getAllContent } from '../../src/lib/content'

function data() {
  return { items: getAllContent() }
}
