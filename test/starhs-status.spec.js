'use strict'

/* global describe, it */

const expect = require('chai').expect
import {StaRHsStatus, StaRHsStatusType} from '../src'

describe('StaRHsStatus', () => {
  it('should accept values', () => {
    const status = new StaRHsStatus(1, 2, 3, 4, 5)
    StaRHsStatusType(status)
    expect(status.cycleShared).to.equal(1)
    expect(status.cycleReceived).to.equal(2)
    expect(status.cycleLeft).to.equal(3)
    expect(status.totalShared).to.equal(4)
    expect(status.totalReceived).to.equal(5)
  })
})
