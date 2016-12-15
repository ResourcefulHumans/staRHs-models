'use strict'

/* global describe, it */

const expect = require('chai').expect
import {StaRH, StaRHType} from '../src/starh'

describe('StaRH', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const staRH = new StaRH({
        from: 'mtacker',
        to: 'Antarctica',
        amount: 1,
        message: 'Test'
      })
      StaRHType(staRH)
      expect(staRH.from).to.equal('mtacker')
      expect(staRH.to).to.equal('Antarctica')
      expect(staRH.amount).to.equal(1)
      expect(staRH.message).to.equal('Test')
      expect(staRH.$context).to.equal(StaRH.$context)
    })
    it('should parse it\'s own values', () => {
      const staRH = new StaRH({
        from: 'mtacker',
        to: 'Antarctica',
        amount: 1,
        message: 'Test'
      })
      const staRH2 = new StaRH({
        from: staRH.from,
        to: staRH.to,
        amount: staRH.amount,
        message: staRH.message
      })
      StaRHType(staRH2)
      expect(staRH2.from).to.equal('mtacker')
      expect(staRH2.to).to.equal('Antarctica')
      expect(staRH2.amount).to.equal(1)
      expect(staRH2.message).to.equal('Test')
      expect(staRH2.$context).to.equal(StaRH.$context)
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const staRH = StaRH.fromJSON(JSON.parse(JSON.stringify(new StaRH({
        from: 'mtacker',
        to: 'Antarctica',
        amount: 1,
        message: 'Test'
      }))))
      StaRHType(staRH)
      expect(staRH.from).to.equal('mtacker')
      expect(staRH.to).to.equal('Antarctica')
      expect(staRH.amount).to.equal(1)
      expect(staRH.message).to.equal('Test')
      expect(staRH.$context).to.equal(StaRH.$context)
    })
  })
})
