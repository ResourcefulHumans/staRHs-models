import {String as StringType, Number as NumberType, irreducible, refinement} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'
import {Model} from './model'
import {merge} from 'lodash'
const $context = new URIValue('https://github.com/ResourcefulHumans/staRHs-models#StaRH')
const PositiveIntegerType = refinement(NumberType, n => n > 0 && n % 1 === 0, 'PositiveIntegerType')

export class StaRH extends Model {
  /**
   * @param {{from: string, to: string, amount: number, message: string}} fields
   */
  constructor (fields) {
    super($context)
    const {from, to, amount, message} = fields
    StringType(from)
    StringType(to)
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
        from: this.from,
        to: this.to,
        amount: this.amount,
        message: this.message
      }
    )
  }

  /**
   * @param {{from: string, to: string, amount: number, message: string}} data
   * @returns {StaRH}
   */
  static fromJSON (data) {
    return new StaRH(data)
  }

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return $context
  }
}

export const StaRHType = irreducible('StaRHType', (x) => x instanceof StaRH)
