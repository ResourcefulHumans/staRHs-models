'use strict'

/* global describe, it */

import {expect} from 'chai'
import {Link, LinkType} from '../src/link'
import URIValue from 'rheactor-value-objects/uri'

describe('Link', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const link = new Link(new URIValue('http://example.com/some-item/42'), new URIValue('http://example.com/jsonld/some'))
      LinkType(link)
      expect(link.href.equals(new URIValue('http://example.com/some-item/42'))).to.equal(true)
      expect(link.subject.equals(new URIValue('http://example.com/jsonld/some'))).to.equal(true)
      expect(link.list).to.equal(false)
      expect(link.rel).to.equal(undefined)
      expect(link.$context.equals(Link.$context)).to.equal(true)
    })
    it('should accept list and rel arguments', () => {
      const link = new Link(
        new URIValue('http://example.com/some-item/42'),
        new URIValue('http://example.com/jsonld/some'),
        true,
        'next'
      )
      expect(link.list).to.equal(true)
      expect(link.rel).to.equal('next')
    })
    it('should parse it\'s own values', () => {
      const link = new Link(
        new URIValue('http://example.com/some-item/42'),
        new URIValue('http://example.com/jsonld/some')
      )
      const link2 = new Link(
        link.href,
        link.subject,
        link.list,
        link.rel
      )
      LinkType(link2)
      expect(link2.href.equals(new URIValue('http://example.com/some-item/42'))).to.equal(true)
      expect(link2.subject.equals(new URIValue('http://example.com/jsonld/some'))).to.equal(true)
      expect(link2.list).to.equal(false)
      expect(link2.rel).to.equal(undefined)
      expect(link2.$context.equals(Link.$context)).to.equal(true)
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const link = Link.fromJSON(JSON.parse(JSON.stringify(new Link(new URIValue('http://example.com/some-item/42'), new URIValue('http://example.com/jsonld/some')))))
      LinkType(link)
      expect(link.href.equals(new URIValue('http://example.com/some-item/42'))).to.equal(true)
      expect(link.subject.equals(new URIValue('http://example.com/jsonld/some'))).to.equal(true)
      expect(link.list).to.equal(false)
      expect(link.rel).to.equal(undefined)
      expect(link.$context.equals(Link.$context)).to.equal(true)
    })
  })
})
