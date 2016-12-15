import {String as StringType, Number as NumberType, irreducible, refinement} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'
const PositiveIntegerType = refinement(NumberType, n => n > 0 && n % 1 === 0, 'PositiveIntegerType')

export class StaRH {
  /**
   * @param {{from: string, to: string, amount: number, message: string}} fields
   */
  constructor (fields) {
    const {from, to, amount, message} = fields
    StringType(from)
    StringType(to)
    PositiveIntegerType(amount)
    StringType(message)
    this.from = from
    this.to = to
    this.amount = amount
    this.message = message
    this.$context = this.constructor.$context
  }

  /**
   * @returns {{from: string, to: string, amount: number, message: string, $context: string}}
   */
  toJSON () {
    return {
      from: this.from,
      to: this.to,
      amount: this.amount,
      message: this.message,
      $context: this.$context.toString()
    }
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
    return new URIValue('https://github.com/ResourcefulHumans/staRHs-models#StaRH')
  }
}

export const StaRHType = irreducible('StaRHType', (x) => x instanceof StaRH)
