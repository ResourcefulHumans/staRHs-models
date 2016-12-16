import URIValue from 'rheactor-value-objects/uri'
import {irreducible, String as StringType, struct} from 'tcomb'

export class Model {
  /**
   * @param {{$context: URIValue}} fields
   */
  constructor (fields) {
    const {$context} = fields
    URIValue.Type($context)
    this.$context = $context
    this.$links = []
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
      $context: new URIValue(data.$context)
    })
  }
}

export const ModelJSONType = struct({
  $context: StringType
}, 'ModelJSONType')
export const ModelType = irreducible('ModelType', (x) => x instanceof Model)
