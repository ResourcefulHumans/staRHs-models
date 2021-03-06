import {String as StringType, Integer as IntegerType, irreducible, refinement, struct, maybe} from 'tcomb'
import {URIValue, URIValueType} from 'rheactor-value-objects'
import {Entity} from 'rheactor-models'
const $context = new URIValue('https://github.com/ResourcefulHumans/staRHs-models#StaRH')
const PositiveIntegerType = refinement(IntegerType, n => n > 0, 'PositiveIntegerType')

export class StaRH extends Entity {
  /**
   * @param {{$id: string, from: {name: string, avatar: URIValue|undefined}, to: {name: string, avatar: URIValue|undefined}, amount: number, message: string, $createdAt: Date}} fields
   */
  constructor (fields) {
    const {from, to, amount, message} = fields
    super(Object.assign(fields, {$context}))
    PersonType(from)
    PersonType(to)
    PositiveIntegerType(amount)
    StringType(message)
    this.from = from
    this.to = to
    this.amount = amount
    this.message = message
  }

  /**
   * @returns {{$id: string, from: string, to: string, amount: number, message: string, $createdAt: string, $context: string, $links: Array<{href: string, $context: string}>}}
   */
  toJSON () {
    return Object.assign(
      super.toJSON(),
      {
        from: {
          $id: this.from.$id.toString(),
          name: this.from.name,
          avatar: this.from.avatar ? this.from.avatar.toString() : undefined
        },
        to: {
          $id: this.to.$id.toString(),
          name: this.to.name,
          avatar: this.to.avatar ? this.to.avatar.toString() : undefined
        },
        amount: this.amount,
        message: this.message
      }
    )
  }

  /**
   * @param {{$id: string, from: {name: string, avatar: string}, to: {name: string, avatar: string}, amount: number, message: string}} data
   * @returns {StaRH}
   */
  static fromJSON (data) {
    StaRHJSONType(data)
    return new StaRH(
      Object.assign(
        super.fromJSON(data),
        {
          from: {
            $id: new URIValue(data.from.$id),
            name: data.from.name,
            avatar: data.from.avatar ? new URIValue(data.from.avatar) : undefined
          },
          to: {
            $id: new URIValue(data.to.$id),
            name: data.to.name,
            avatar: data.to.avatar ? new URIValue(data.to.avatar) : undefined
          },
          amount: data.amount,
          message: data.message
        }
      )
    )
  }

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return $context
  }

  /**
   * Returns true if x is of type StaRH
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof StaRH) || (x && x.constructor && x.constructor.name === StaRH.name && '$context' in x && URIValue.is(x.$context) && $context.equals(x.$context))
  }
}

export const PersonJSONType = struct({
  $id: StringType,
  name: StringType,
  avatar: maybe(StringType)
}, 'PersonJSONType')
export const StaRHJSONType = struct({
  $context: refinement(StringType, s => s === $context.toString(), 'StaRHsContext'),
  from: PersonJSONType,
  to: PersonJSONType,
  amount: IntegerType,
  message: StringType
}, 'StaRHJSONType')
export const StaRHType = irreducible('StaRHType', StaRH.is)
export const PersonType = struct({$id: URIValueType, name: StringType, avatar: maybe(URIValueType)}, 'PersonType')
