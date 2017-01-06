import {String as StringType, Number as NumberType, irreducible, refinement, struct} from 'tcomb'
import {URIValue} from 'rheactor-value-objects'
import {Model} from 'rheactor-models'
const ZeroOrPositiveIntegerType = refinement(NumberType, n => n >= 0 && n % 1 === 0, 'ZeroOrPositiveIntegerType')
const $context = new URIValue('https://github.com/ResourcefulHumans/staRHs-models#StaRHsStatus')

export class StaRHsStatus extends Model {
  /**
   * @param {{cycleShared: number, cycleReceived: number, cycleLeft: number, totalShared: number, totalReceived: number}} fields
   */
  constructor (fields) {
    super(Object.assign(fields, {$context}))
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
  }

  /**
   * @returns {{cycleShared: number, cycleReceived: number, cycleLeft: number, totalShared: number, totalReceived: number, $context: string, $links: Array<{href: string, $context: string}>}}
   */
  toJSON () {
    return Object.assign(
      super.toJSON(),
      {
        cycleShared: this.cycleShared,
        cycleReceived: this.cycleReceived,
        cycleLeft: this.cycleLeft,
        totalShared: this.totalShared,
        totalReceived: this.totalReceived
      }
    )
  }

  /**
   * @param {{cycleShared: number, cycleReceived: number, cycleLeft: number, totalShared: number, totalReceived: number}} data
   * @returns {StaRHsStatus}
   */
  static fromJSON (data) {
    StaRHsStatusJSONType(data)
    return new StaRHsStatus(Object.assign(super.fromJSON(data), data))
  }

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return $context
  }
}

export const StaRHsStatusJSONType = struct({
  $context: refinement(StringType, s => s === $context.toString(), 'StaRHsStatusContext'),
  cycleShared: NumberType,
  cycleReceived: NumberType,
  cycleLeft: NumberType,
  totalShared: NumberType,
  totalReceived: NumberType
}, 'StaRHsStatusJSONType')
export const StaRHsStatusType = irreducible('StaRHsStatusType', x => (x instanceof StaRHsStatus) || (x && x.constructor && x.constructor.name === StaRHsStatus.name && '$context' in x && URIValue.is(x.$context) && $context.equals(x.$context)))
