import URIValue from 'rheactor-value-objects/uri'
import {irreducible, maybe, Date as DateType, String as StringType, struct} from 'tcomb'
const maybeDate = maybe(DateType)

export class Model {
  /**
   * @param {{$context: URIValue, $createdAt: Date|undefined, $updatedAt: Date|undefined, $deletedAt: Date|undefined}} fields
   */
  constructor (fields) {
    const {$context, $createdAt, $updatedAt, $deletedAt} = fields
    URIValue.Type($context)
    maybeDate($createdAt)
    maybeDate($updatedAt)
    maybeDate($deletedAt)
    this.$context = $context
    this.$links = []
    this.$createdAt = $createdAt
    this.$updatedAt = $updatedAt
    this.$deletedAt = $deletedAt
  }

  /**
   * @returns {{$context: string, $links: Array<{href: string, $context: string}>}}
   */
  toJSON () {
    return {
      $context: this.$context.toString(),
      $createdAt: this.$createdAt ? this.$createdAt.toISOString() : undefined,
      $updatedAt: this.$updatedAt ? this.$updatedAt.toISOString() : undefined,
      $deletedAt: this.$deletedAt ? this.$deletedAt.toISOString() : undefined,
      $links: this.$links
    }
  }

  /**
   * @param {{$context: string, $createdAt: string|undefined, $updatedAt: string|undefined, $deletedAt: string|undefined}} data
   * @returns {Model}
   */
  static fromJSON (data) {
    ModelJSONType(data)
    return new Model({
      $context: new URIValue(data.$context),
      $createdAt: data.$createdAt ? new Date(data.$createdAt) : undefined,
      $updatedAt: data.$updatedAt ? new Date(data.$updatedAt) : undefined,
      $deletedAt: data.$deletedAt ? new Date(data.$deletedAt) : undefined
    })
  }

  /**
   * Returns the timestamp when the model was modified the last time, which is the latest value of
   * createdAt, updatedAt or deletedAt
   *
   * @returns {Date|undefined}
   */
  get $modifiedAt () {
    if (this.$deletedAt) {
      return this.$deletedAt
    }
    if (this.$updatedAt) {
      return this.$updatedAt
    }
    return this.$createdAt
  }
}

export const ModelJSONType = struct({
  $context: StringType,
  $createdAt: maybe(StringType),
  $updatedAt: maybe(StringType),
  $deletedAt: maybe(StringType)
}, 'ModelJSONType')
export const ModelType = irreducible('ModelType', (x) => x instanceof Model)
