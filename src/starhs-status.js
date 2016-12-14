import {Number as NumberType, irreducible, refinement} from 'tcomb'
const ZeroOrPositiveIntegerType = refinement(NumberType, n => n >= 0 && n % 1 === 0, 'ZeroOrPositiveIntegerType')

/**
 * @type StaRHsStatus
 */
export class StaRHsStatus {
  constructor (cycleShared, cycleReceived, cycleLeft, totalShared, totalReceived) {
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
    this.$context = StaRHsStatusContext
  }

  /**
   * @param {{cycleShared: {Number}, cycleReceived: {Number}, cycleLeft: {Number}, totalShared: {Number}, totalReceived: {Number}}} data
   * @returns {StaRHsStatus}
   */
  static fromJSON (data) {
    const {cycleShared, cycleReceived, cycleLeft, totalShared, totalReceived} = data
    return new StaRHsStatus(cycleShared, cycleReceived, cycleLeft, totalShared, totalReceived)
  }
}

export const StaRHsStatusContext = 'https://github.com/ResourcefulHumans/staRHs-models#StaRHsStatus'
export const StaRHsStatusType = irreducible('StaRHsStatusType', (x) => x instanceof StaRHsStatus)
