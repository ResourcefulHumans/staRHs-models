import {Number as NumberType, irreducible, refinement} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'
const ZeroOrPositiveIntegerType = refinement(NumberType, n => n >= 0 && n % 1 === 0, 'ZeroOrPositiveIntegerType')

export class StaRHsStatus {
  /**
   * @param {{cycleShared: number, cycleReceived: number, cycleLeft: number, totalShared: number, totalReceived: number}} fields
   */
  constructor (fields) {
    const {cycleShared, cycleReceived, cycleLeft, totalShared, totalReceived} = fields
    ZeroOrPositiveIntegerType(cycleShared)
    ZeroOrPositiveIntegerType(cycleReceived)
    ZeroOrPositiveIntegerType(cycleLeft)
    ZeroOrPositiveIntegerType(totalShared)
    ZeroOrPositiveIntegerType(totalReceived)
    this.cycleShared = cycleShared
    this.cycleReceived = cycleReceived
    this.cycleLeft = cycleLeft
    this.totalShared = totalShared
    this.totalReceived = totalReceived
    this.$context = this.constructor.$context
  }

  /**
   * @returns {{cycleShared: number, cycleReceived: number, cycleLeft: number, totalShared: number, totalReceived: number, $context: string}}
   */
  toJSON () {
    return {
      cycleShared: this.cycleShared,
      cycleReceived: this.cycleReceived,
      cycleLeft: this.cycleLeft,
      totalShared: this.totalShared,
      totalReceived: this.totalReceived,
      $context: this.$context.toString()
    }
  }

  /**
   * @param {{cycleShared: number, cycleReceived: number, cycleLeft: number, totalShared: number, totalReceived: number}} data
   * @returns {StaRHsStatus}
   */
  static fromJSON (data) {
    return new StaRHsStatus(data)
  }

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return new URIValue('https://github.com/ResourcefulHumans/staRHs-models#StaRHsStatus')
  }
}

export const StaRHsStatusType = irreducible('StaRHsStatusType', (x) => x instanceof StaRHsStatus)
