'use strict'

/* global describe, it */

import {expect} from 'chai'
import {Model, ModelType} from '../src/model'
import URIValue from 'rheactor-value-objects/uri'

const $context = new URIValue('http://example.com/jsonld/some')

describe('Model', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const model = new Model({
        $context: $context,
        $createdAt: new Date('2016-01-01T00:00:00Z'),
        $updatedAt: new Date('2016-01-02T00:00:00Z'),
        $deletedAt: new Date('2016-01-03T00:00:00Z')
      })
      ModelType(model)
      expect(model.$context.equals($context)).to.equal(true)
      expect(model.$createdAt.toISOString()).to.equal(new Date('2016-01-01T00:00:00Z').toISOString())
      expect(model.$updatedAt.toISOString()).to.equal(new Date('2016-01-02T00:00:00Z').toISOString())
      expect(model.$deletedAt.toISOString()).to.equal(new Date('2016-01-03T00:00:00Z').toISOString())
      expect(model.$links).to.deep.equal([])
    })
    it('should parse it\'s own values', () => {
      const model = new Model({
        $context: $context,
        $createdAt: new Date('2016-01-01T00:00:00Z'),
        $updatedAt: new Date('2016-01-02T00:00:00Z'),
        $deletedAt: new Date('2016-01-03T00:00:00Z')
      })
      const model2 = new Model({
        $context: model.$context,
        $createdAt: model.$createdAt,
        $updatedAt: model.$updatedAt,
        $deletedAt: model.$deletedAt
      })
      ModelType(model2)
      expect(model2.$context.equals($context)).to.equal(true)
      expect(model2.$createdAt.toISOString()).to.equal(new Date('2016-01-01T00:00:00Z').toISOString())
      expect(model2.$updatedAt.toISOString()).to.equal(new Date('2016-01-02T00:00:00Z').toISOString())
      expect(model2.$deletedAt.toISOString()).to.equal(new Date('2016-01-03T00:00:00Z').toISOString())
      expect(model2.$links).to.deep.equal([])
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const model = Model.fromJSON(JSON.parse(JSON.stringify(new Model({
        $context: $context,
        $createdAt: new Date('2016-01-01T00:00:00Z'),
        $updatedAt: new Date('2016-01-02T00:00:00Z'),
        $deletedAt: new Date('2016-01-03T00:00:00Z')
      }))))
      ModelType(model)
      expect(model.$context.equals($context)).to.equal(true)
      expect(model.$createdAt.toISOString()).to.equal(new Date('2016-01-01T00:00:00Z').toISOString())
      expect(model.$updatedAt.toISOString()).to.equal(new Date('2016-01-02T00:00:00Z').toISOString())
      expect(model.$deletedAt.toISOString()).to.equal(new Date('2016-01-03T00:00:00Z').toISOString())
      expect(model.$links).to.deep.equal([])
    })
  })

  describe('.$modifiedAt', () => {
    it('should return $createdAt if defined', () => {
      const model = new Model({
        $context: $context,
        $createdAt: new Date('2016-01-01T00:00:00Z')
      })
      expect(model.$modifiedAt.toISOString()).to.equal(new Date('2016-01-01T00:00:00Z').toISOString())
    })
    it('should return $updatedAt if defined', () => {
      const model = new Model({
        $context: $context,
        $updatedAt: new Date('2016-01-02T00:00:00Z')
      })
      expect(model.$modifiedAt.toISOString()).to.equal(new Date('2016-01-02T00:00:00Z').toISOString())
    })
    it('should return $deletedAt if defined', () => {
      const model = new Model({
        $context: $context,
        $deletedAt: new Date('2016-01-03T00:00:00Z')
      })
      expect(model.$modifiedAt.toISOString()).to.equal(new Date('2016-01-03T00:00:00Z').toISOString())
    })
  })
})
