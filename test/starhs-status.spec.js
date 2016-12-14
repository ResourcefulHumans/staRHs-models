'use strict'

/* global describe, it */

const expect = require('chai').expect
import {StaRHsStatus, StaRHsStatusType, StaRHsStatusContext} from '../src/starhs-status'

describe('StaRHsStatus', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const status = new StaRHsStatus(1, 2, 3, 4, 5)
      StaRHsStatusType(status)
      expect(status.cycleShared).to.equal(1)
      expect(status.cycleReceived).to.equal(2)
      expect(status.cycleLeft).to.equal(3)
      expect(status.totalShared).to.equal(4)
      expect(status.totalReceived).to.equal(5)
      expect(status.$context).to.equal(StaRHsStatusContext)
    })
    it('should parse it\'s own values', () => {
      const status = new StaRHsStatus(1, 2, 3, 4, 5)
      const status2 = new StaRHsStatus(
        status.cycleShared,
        status.cycleReceived,
        status.cycleLeft,
        status.totalShared,
        status.totalReceived
      )
      StaRHsStatusType(status2)
      expect(status2.cycleShared).to.equal(1)
      expect(status2.cycleReceived).to.equal(2)
      expect(status2.cycleLeft).to.equal(3)
      expect(status2.totalShared).to.equal(4)
      expect(status2.totalReceived).to.equal(5)
      expect(status2.$context).to.equal(StaRHsStatusContext)
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const status = StaRHsStatus.fromJSON(JSON.parse(JSON.stringify(new StaRHsStatus(1, 2, 3, 4, 5))))
      StaRHsStatusType(status)
      expect(status.cycleShared).to.equal(1)
      expect(status.cycleReceived).to.equal(2)
      expect(status.cycleLeft).to.equal(3)
      expect(status.totalShared).to.equal(4)
      expect(status.totalReceived).to.equal(5)
      expect(status.$context).to.equal(StaRHsStatusContext)
    })
  })
})
