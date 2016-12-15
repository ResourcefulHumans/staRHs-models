import {Number as NumberType, irreducible, refinement} from 'tcomb'
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
   * @param {{cycleShared: number, cycleReceived: number, cycleLeft: number, totalShared: number, totalReceived: number}} data
   * @returns {StaRHsStatus}
   */
  static fromJSON (data) {
    return new StaRHsStatus(data)
  }

  /**
   * @returns {string}
   */
  static get $context () {
    return 'https://github.com/ResourcefulHumans/staRHs-models#StaRHsStatus'
  }
}

export const StaRHsStatusType = irreducible('StaRHsStatusType', (x) => x instanceof StaRHsStatus)
