import URIValue from 'rheactor-value-objects/uri'
import {irreducible, maybe, Date as DateType, String as StringType, struct} from 'tcomb'
import {Model} from './model'
import {merge} from 'lodash'
const maybeDate = maybe(DateType)

export class Entity extends Model {
  /**
   * @param {{$id: string, $context: URIValue, $createdAt: Date|undefined, $updatedAt: Date|undefined, $deletedAt: Date|undefined}} fields
   */
  constructor (fields) {
    const {$id, $createdAt, $updatedAt, $deletedAt} = fields
    super(fields)
    StringType($id)
    maybeDate($createdAt)
    maybeDate($updatedAt)
    maybeDate($deletedAt)
    this.$id = $id
    this.$createdAt = $createdAt
    this.$updatedAt = $updatedAt
    this.$deletedAt = $deletedAt
  }

  /**
   * @returns {{$id: string, $context: string, $links: Array<Link>, $createdAt: string|undefined, $updatedAt: string|undefined, $deletedAt: string|undefined}}
   */
  toJSON () {
    return merge(
      super.toJSON(),
      {
        $id: this.$id,
        $createdAt: this.$createdAt ? this.$createdAt.toISOString() : undefined,
        $updatedAt: this.$updatedAt ? this.$updatedAt.toISOString() : undefined,
        $deletedAt: this.$deletedAt ? this.$deletedAt.toISOString() : undefined
      }
    )
  }

  /**
   * @param {{$id: string, $context: string, $links: Array<Link>, $createdAt: string|undefined, $updatedAt: string|undefined, $deletedAt: string|undefined}} data
   * @returns {Entity}
   */
  static fromJSON (data) {
    EntityJSONType(data)
    return new Entity(merge(
      super.fromJSON(data), {
        $id: data.$id,
        $context: new URIValue(data.$context),
        $createdAt: data.$createdAt ? new Date(data.$createdAt) : undefined,
        $updatedAt: data.$updatedAt ? new Date(data.$updatedAt) : undefined,
        $deletedAt: data.$deletedAt ? new Date(data.$deletedAt) : undefined
      })
    )
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

export const EntityJSONType = struct({
  $id: StringType,
  $createdAt: maybe(StringType),
  $updatedAt: maybe(StringType),
  $deletedAt: maybe(StringType)
}, 'EntityJSONType')
export const EntityType = irreducible('EntityType', (x) => x instanceof Entity)
