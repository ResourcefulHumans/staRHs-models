/* global describe, it */

import {expect} from 'chai'
import {StaRHsStatus, StaRHsStatusType} from '../src'

describe('StaRHsStatus', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const status = new StaRHsStatus({cycleShared: 1, cycleReceived: 2, cycleLeft: 3, totalShared: 4, totalReceived: 5})
      StaRHsStatusType(status)
      expect(status.cycleShared).to.equal(1)
      expect(status.cycleReceived).to.equal(2)
      expect(status.cycleLeft).to.equal(3)
      expect(status.totalShared).to.equal(4)
      expect(status.totalReceived).to.equal(5)
      expect(status.$context.equals(StaRHsStatus.$context)).to.equal(true)
    })
    it('should parse it\'s own values', () => {
      const status = new StaRHsStatus({cycleShared: 1, cycleReceived: 2, cycleLeft: 3, totalShared: 4, totalReceived: 5})
      const status2 = new StaRHsStatus({
        cycleShared: status.cycleShared,
        cycleReceived: status.cycleReceived,
        cycleLeft: status.cycleLeft,
        totalShared: status.totalShared,
        totalReceived: status.totalReceived
      })
      StaRHsStatusType(status2)
      expect(status2.cycleShared).to.equal(1)
      expect(status2.cycleReceived).to.equal(2)
      expect(status2.cycleLeft).to.equal(3)
      expect(status2.totalShared).to.equal(4)
      expect(status2.totalReceived).to.equal(5)
      expect(status2.$context.equals(StaRHsStatus.$context)).to.equal(true)
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const status = StaRHsStatus.fromJSON(JSON.parse(JSON.stringify(new StaRHsStatus({cycleShared: 1, cycleReceived: 2, cycleLeft: 3, totalShared: 4, totalReceived: 5}))))
      StaRHsStatusType(status)
      expect(status.cycleShared).to.equal(1)
      expect(status.cycleReceived).to.equal(2)
      expect(status.cycleLeft).to.equal(3)
      expect(status.totalShared).to.equal(4)
      expect(status.totalReceived).to.equal(5)
      expect(status.$context.equals(StaRHsStatus.$context)).to.equal(true)
    })
  })

  describe('$context', () => {
    it('should exist', () => {
      expect(StaRHsStatus.$context.toString()).to.equal('https://github.com/ResourcefulHumans/staRHs-models#StaRHsStatus')
    })
  })
})
