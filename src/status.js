import {String as StringType, Date as DateType, irreducible} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'

export class Status {
  /**
   * @param {{status: string, time: Date}} fields
   */
  constructor (fields) {
    const {status, time} = fields
    StringType(status)
    DateType(time)
    this.status = status
    this.time = time
    this.$context = this.constructor.$context
  }

  /**
   * @returns {{status: string, time: string, $context: string}}
   */
  toJSON () {
    return {
      status: this.status,
      time: this.time.toISOString(),
      $context: this.$context.toString()
    }
  }

  /**
   * @param {{status: string, time: Date}} data
   * @returns {Status}
   */
  static fromJSON (data) {
    return new Status(data)
  }

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return new URIValue('https://github.com/ResourcefulHumans/staRHs-models#Status')
  }
}

export const StatusType = irreducible('StatusType', (x) => x instanceof Status)
