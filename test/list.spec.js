'use strict'

/* global describe, it */

import {expect} from 'chai'
import {List, ListType} from '../src/list'
import {Link} from '../src/link'
import {StaRH} from '../src/starh'
import URIValue from 'rheactor-value-objects/uri'

const items = [new StaRH({
  $id: '17',
  from: {
    name: 'Markus Tacker',
    avatar: new URIValue('https://starhs.net/profileimgs/5d257110-49c4-45e4-b8d5-2b69abf2419d.jpg')
  },
  to: {
    name: 'Heiko Fischer',
    avatar: new URIValue('https://starhs.net/profileimgs/8651161a-ac33-4837-9c33-87997ce7bdc1.jpg')
  },
  amount: 1,
  message: 'Test'
})]

const link = new Link(
  new URIValue('http://example.com/some-item/42'),
  new URIValue('http://example.com/jsonld/some'),
  true,
  'next'
)

describe('List', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const list = new List(items, 1, 10, [link])
      ListType(list)
      expect(list.$context.equals(List.$context)).to.equal(true)
      expect(list.itemsPerPage).to.equal(10)
      expect(list.total).to.equal(1)
      expect(list.hasNext).to.equal(true)
      expect(list.hasPrev).to.equal(false)
      expect(list.$links).to.deep.equal([link])
    })
    it('should parse it\'s own values', () => {
      const list = new List(items, 1, 10, [link])
      const list2 = new List(
        list.items,
        list.total,
        list.itemsPerPage,
        list.$links
      )
      ListType(list2)
      expect(list2.$context.equals(List.$context)).to.equal(true)
      expect(list2.$context.equals(List.$context)).to.equal(true)
      expect(list2.itemsPerPage).to.equal(10)
      expect(list2.total).to.equal(1)
      expect(list2.hasNext).to.equal(true)
      expect(list2.hasPrev).to.equal(false)
      expect(list2.$links).to.deep.equal([link])
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const list = List.fromJSON(JSON.parse(JSON.stringify(new List(items, 1, 10, [link]))), StaRH.fromJSON)
      ListType(list)
      expect(list.$context.equals(List.$context)).to.equal(true)
      expect(list.itemsPerPage).to.equal(10)
      expect(list.total).to.equal(1)
      expect(list.hasNext).to.equal(true)
      expect(list.hasPrev).to.equal(false)
      expect(list.$links).to.deep.equal([link])
    })

    it('should always return empty item and link arrays', () => {
      let jsondata = JSON.parse(JSON.stringify(new List([], 0, 10)))
      expect(jsondata.items, 'if empty items given, it should be empty in JSON').to.be.instanceof(Array)
      expect(jsondata.$links, 'if empty $links given, it should be empty in JSON').to.be.instanceof(Array)
    })
  })
})
