'use strict'

/* global describe, it */

import {expect} from 'chai'
import {StaRH, StaRHType} from '../src'
import {URIValue} from 'rheactor-value-objects'

describe('StaRH', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const staRH = new StaRH({
        $id: 'some-id',
        from: {
          name: 'Markus Tacker',
          avatar: new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg')
        },
        to: {
          name: 'Heiko Fischer',
          avatar: new URIValue('https://starhs.net/profileimgs/8651161a-ac33-4837-9c33-87997ce7bdc1.jpg')
        },
        amount: 1,
        message: 'Test',
        $createdAt: new Date()
      })
      StaRHType(staRH)
      expect(staRH.from.name).to.equal('Markus Tacker')
      expect(staRH.from.avatar.equals(new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg'))).to.equal(true)
      expect(staRH.to.name).to.equal('Heiko Fischer')
      expect(staRH.to.avatar.equals(new URIValue('https://starhs.net/profileimgs/8651161a-ac33-4837-9c33-87997ce7bdc1.jpg'))).to.equal(true)
      expect(staRH.amount).to.equal(1)
      expect(staRH.message).to.equal('Test')
      expect(staRH.$context.equals(StaRH.$context)).to.equal(true)
    })
    it('should parse it\'s own values', () => {
      const staRH = new StaRH({
        $id: 'some-id',
        from: {
          name: 'Markus Tacker',
          avatar: new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg')
        },
        to: {
          name: 'Heiko Fischer',
          avatar: new URIValue('https://starhs.net/profileimgs/8651161a-ac33-4837-9c33-87997ce7bdc1.jpg')
        },
        amount: 1,
        message: 'Test',
        $createdAt: new Date()
      })
      const staRH2 = new StaRH({
        $id: staRH.$id,
        from: staRH.from,
        to: staRH.to,
        amount: staRH.amount,
        message: staRH.message,
        $createdAt: staRH.$createdAt
      })
      StaRHType(staRH2)
      expect(staRH2.from.name).to.equal('Markus Tacker')
      expect(staRH2.to.name).to.equal('Heiko Fischer')
      expect(staRH2.from.avatar.equals(new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg'))).to.equal(true)
      expect(staRH2.to.avatar.equals(new URIValue('https://starhs.net/profileimgs/8651161a-ac33-4837-9c33-87997ce7bdc1.jpg'))).to.equal(true)
      expect(staRH2.amount).to.equal(1)
      expect(staRH2.message).to.equal('Test')
      expect(staRH2.$context.equals(StaRH.$context)).to.equal(true)
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const staRH = StaRH.fromJSON(JSON.parse(JSON.stringify(new StaRH({
        $id: 'some-id',
        from: {
          name: 'Markus Tacker',
          avatar: new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg')
        },
        to: {
          name: 'Heiko Fischer',
          avatar: new URIValue('https://starhs.net/profileimgs/8651161a-ac33-4837-9c33-87997ce7bdc1.jpg')
        },
        amount: 1,
        message: 'Test',
        $createdAt: new Date()
      }))))
      StaRHType(staRH)
      expect(staRH.from.name).to.equal('Markus Tacker')
      expect(staRH.to.name).to.equal('Heiko Fischer')
      expect(staRH.from.avatar.equals(new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg'))).to.equal(true)
      expect(staRH.to.avatar.equals(new URIValue('https://starhs.net/profileimgs/8651161a-ac33-4837-9c33-87997ce7bdc1.jpg'))).to.equal(true)
      expect(staRH.amount).to.equal(1)
      expect(staRH.message).to.equal('Test')
      expect(staRH.$context.equals(StaRH.$context)).to.equal(true)
    })
  })
})
