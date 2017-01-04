import {String as StringType, Boolean as BooleanType, irreducible, maybe, struct, refinement} from 'tcomb'
import URIValue from 'rheactor-value-objects/dist/uri'
const $context = new URIValue('https://github.com/ResourcefulHumans/staRHs-models#Link')

export class Link {
  /**
   * @param {URIValue} href The URL to retrieve the link
   * @param {URIValue} subject The context of the linked item
   * @param {boolean} list True if the linked item is a list
   * @param {string} rel Label for the relation
   */
  constructor (href, subject, list = false, rel) {
    URIValue.Type(href)
    URIValue.Type(subject)
    BooleanType(list)
    maybe(StringType)(rel)
    this.$context = $context
    this.href = href
    this.subject = subject
    this.list = list
    this.rel = rel
  }

  /**
   * @returns {{$context: string, subject: string, href: string, list: boolean|undefined, rel: string|undefined}}}
   */
  toJSON () {
    const d = {
      $context: this.$context.toString(),
      subject: this.subject.toString(),
      href: this.href.toString()
    }
    if (this.list) d.list = true
    if (this.rel) d.rel = this.rel
    return d
  }

  /**
   * @param {{$context: string, subject: string, href: string, list: boolean|undefined, rel: string|undefined}} data
   * @returns {Link}
   */
  static fromJSON (data) {
    LinkJSONType(data)
    const {href, subject, list, rel} = data
    return new Link(new URIValue(href), new URIValue(subject), list, rel)
  }

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return $context
  }
}

export const LinkJSONType = struct({
  $context: refinement(StringType, s => s === $context.toString(), 'LinkContext'),
  subject: StringType,
  href: StringType,
  list: maybe(BooleanType),
  rel: maybe(StringType)
}, 'LinkJSONType')
export const LinkType = irreducible('LinkType', (x) => x instanceof Link)
