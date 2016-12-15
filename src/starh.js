import {String as StringType, Number as NumberType, irreducible, refinement} from 'tcomb'
const PositiveIntegerType = refinement(NumberType, n => n > 0 && n % 1 === 0, 'PositiveIntegerType')

export class StaRH {
  /**
   * @param {{from: {String}, to: {String}, amount: {Number}, message: {String}}} fields
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
    this.$context = StaRHContext
  }

  /**
   * @param {{email: {String}, firstname: {String}, lastname: {String}, avatar: {String}}} data
   * @returns {StaRH}
   */
  static fromJSON (data) {
    return new StaRH(data)
  }
}

export const StaRHContext = 'https://github.com/ResourcefulHumans/staRHs-models#StaRH'
export const StaRHType = irreducible('StaRHType', (x) => x instanceof StaRH)
