import URIValue from 'rheactor-value-objects/uri'
import {irreducible} from 'tcomb'

export class Model {
  constructor ($context) {
    URIValue.Type($context)
    this.$context = $context
    this.$links = []
  }

  /**
   * @returns {{$context: string, $links: Array<{href: string, $context: string}>}}
   */
  toJSON () {
    return {
      $context: this.$context.toString(),
      $links: this.$links
    }
  }
}

export const ModelType = irreducible('ModelType', (x) => x instanceof Model)
