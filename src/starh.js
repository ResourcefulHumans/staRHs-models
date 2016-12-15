import {String as StringType, Number as NumberType, irreducible, refinement, struct, maybe} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'
import {Model} from './model'
import {merge} from 'lodash'
const $context = new URIValue('https://github.com/ResourcefulHumans/staRHs-models#StaRH')
const PositiveIntegerType = refinement(NumberType, n => n > 0 && n % 1 === 0, 'PositiveIntegerType')

export class StaRH extends Model {
  /**
   * @param {{from: PersonType, to: PersonType, amount: number, message: string, $createdAt: Date}} fields
   */
  constructor (fields) {
    const {from, to, amount, message, $createdAt} = fields
    super({$context, $createdAt})
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
   * @returns {{from: string, to: string, amount: number, message: string, $createdAt: string, $context: string, $links: Array<{href: string, $context: string}>}}
   */
  toJSON () {
    return merge(
      super.toJSON(),
      {
        from: {
          name: this.from.name,
          avatar: this.from.avatar ? this.from.avatar.toString() : undefined
        },
        to: {
          name: this.to.name,
          avatar: this.to.avatar ? this.to.avatar.toString() : undefined
        },
        amount: this.amount,
        message: this.message
      }
    )
  }

  /**
   * @param {{from: {name: string, avatar: string}, to: {name: string, avatar: string}, amount: number, message: string}} data
   * @returns {StaRH}
   */
  static fromJSON (data) {
    return new StaRH(
      merge(
        super.fromJSON(data),
        {
          from: {
            name: data.from.name,
            avatar: data.from.avatar ? new URIValue(data.from.avatar) : undefined
          },
          to: {
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
}

export const StaRHType = irreducible('StaRHType', (x) => x instanceof StaRH)
export const PersonType = struct({name: StringType, avatar: maybe(URIValue.Type)}, 'PersonType')
