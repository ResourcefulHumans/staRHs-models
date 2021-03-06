/* global describe, it */

import {expect} from 'chai'
import {StaRH, StaRHType} from '../src'
import {URIValue} from 'rheactor-value-objects'

function validateStaRH (staRH) {
  StaRHType(staRH)
  expect(staRH.from.$id.equals(new URIValue('https://services.digital-bauhaus.solutions/RH-API/V0.94#profile:12345678'))).to.equal(true)
  expect(staRH.from.name).to.equal('Markus Tacker')
  expect(staRH.from.avatar.equals(new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg'))).to.equal(true)
  expect(staRH.to.$id.equals(new URIValue('https://services.digital-bauhaus.solutions/RH-API/V0.94#profile:87654321'))).to.equal(true)
  expect(staRH.to.name).to.equal('Heiko Fischer')
  expect(staRH.to.avatar.equals(new URIValue('https://starhs.net/profileimgs/8651161a-ac33-4837-9c33-87997ce7bdc1.jpg'))).to.equal(true)
  expect(staRH.amount).to.equal(1)
  expect(staRH.message).to.equal('Test')
  expect(staRH.$context.equals(StaRH.$context)).to.equal(true)
}

describe('StaRH', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const staRH = new StaRH({
        $id: new URIValue('http://example.com/user/some-id'),
        from: {
          $id: new URIValue('https://services.digital-bauhaus.solutions/RH-API/V0.94#profile:12345678'),
          name: 'Markus Tacker',
          avatar: new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg')
        },
        to: {
          $id: new URIValue('https://services.digital-bauhaus.solutions/RH-API/V0.94#profile:87654321'),
          name: 'Heiko Fischer',
          avatar: new URIValue('https://starhs.net/profileimgs/8651161a-ac33-4837-9c33-87997ce7bdc1.jpg')
        },
        amount: 1,
        message: 'Test',
        $createdAt: new Date()
      })
      validateStaRH(staRH)
    })
    it('should parse it\'s own values', () => {
      const staRH = new StaRH({
        $id: new URIValue('http://example.com/user/some-id'),
        from: {
          $id: new URIValue('https://services.digital-bauhaus.solutions/RH-API/V0.94#profile:12345678'),
          name: 'Markus Tacker',
          avatar: new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg')
        },
        to: {
          $id: new URIValue('https://services.digital-bauhaus.solutions/RH-API/V0.94#profile:87654321'),
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
      validateStaRH(staRH2)
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const staRH = StaRH.fromJSON(JSON.parse(JSON.stringify(new StaRH({
        $id: new URIValue('http://example.com/user/some-id'),
        from: {
          $id: new URIValue('https://services.digital-bauhaus.solutions/RH-API/V0.94#profile:12345678'),
          name: 'Markus Tacker',
          avatar: new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg')
        },
        to: {
          $id: new URIValue('https://services.digital-bauhaus.solutions/RH-API/V0.94#profile:87654321'),
          name: 'Heiko Fischer',
          avatar: new URIValue('https://starhs.net/profileimgs/8651161a-ac33-4837-9c33-87997ce7bdc1.jpg')
        },
        amount: 1,
        message: 'Test',
        $createdAt: new Date()
      }))))
      validateStaRH(staRH)
    })
  })

  describe('$context', () => {
    it('should exist', () => {
      expect(StaRH.$context.toString()).to.equal('https://github.com/ResourcefulHumans/staRHs-models#StaRH')
    })
  })
})
