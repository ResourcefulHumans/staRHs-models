import {String as StringType, Number as NumberType, irreducible, refinement, struct} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'
import {Model} from './model'
import {merge} from 'lodash'
const $context = new URIValue('https://github.com/ResourcefulHumans/staRHs-models#StaRH')
const PositiveIntegerType = refinement(NumberType, n => n > 0 && n % 1 === 0, 'PositiveIntegerType')

export class StaRH extends Model {
  /**
   * @param {{from: PersonType, to: PersonType, amount: number, message: string}} fields
   */
  constructor (fields) {
    super($context)
    const {from, to, amount, message} = fields
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
   * @returns {{from: string, to: string, amount: number, message: string, $context: string, $links: Array<{href: string, $context: string}>}}
   */
  toJSON () {
    return merge(
      super.toJSON(),
      {
        from: {
          name: this.from.name,
          avatar: this.from.avatar.toString()
        },
        to: {
          name: this.to.name,
          avatar: this.to.avatar.toString()
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
    return new StaRH({
      from: {
        name: data.from.name,
        avatar: new URIValue(data.from.avatar)
      },
      to: {
        name: data.to.name,
        avatar: new URIValue(data.to.avatar)
      },
      amount: data.amount,
      message: data.message
    })
  }

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return $context
  }
}

export const StaRHType = irreducible('StaRHType', (x) => x instanceof StaRH)
export const PersonType = struct({name: StringType, avatar: URIValue.Type}, 'PersonType')
