import URIValue from 'rheactor-value-objects/uri'
import {irreducible, String as StringType, struct, maybe, list} from 'tcomb'
import {Link, LinkJSONType} from './link'
const LinkListType = list(Link)

export class Model {
  /**
   * @param {{$context: URIValue}} fields
   */
  constructor (fields) {
    const {$context, $links} = fields
    URIValue.Type($context)
    LinkListType($links || [])
    this.$context = $context
    this.$links = $links || []
  }

  /**
   * @returns {{$context: string, $links: Array<Link>}}
   */
  toJSON () {
    const d = {
      $context: this.$context.toString()
    }
    if (this.$links.length) d.$links = this.$links.map(link => link.toJSON())
    return d
  }

  /**
   * @param {{$context: string}} data
   * @returns {Model}
   */
  static fromJSON (data) {
    ModelJSONType(data)
    return new Model({
      $context: new URIValue(data.$context),
      $links: data.$links ? data.$links.map(l => Link.fromJSON(l)) : []
    })
  }
}

export const ModelJSONType = struct({
  $context: StringType,
  $links: maybe(list(LinkJSONType))
}, 'ModelJSONType')
export const ModelType = irreducible('ModelType', (x) => x instanceof Model)
