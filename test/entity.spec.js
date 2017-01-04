'use strict'

/* global describe, it */

import {expect} from 'chai'
import {Entity, EntityType} from '../src/entity'
import URIValue from 'rheactor-value-objects/dist/uri'

const $context = new URIValue('http://example.com/jsonld/some')

describe('Entity', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const entity = new Entity({
        $id: 'some-id',
        $context: $context,
        $createdAt: new Date('2016-01-01T00:00:00Z'),
        $updatedAt: new Date('2016-01-02T00:00:00Z'),
        $deletedAt: new Date('2016-01-03T00:00:00Z')
      })
      EntityType(entity)
      expect(entity.$id).to.equal('some-id')
      expect(entity.$context.equals($context)).to.equal(true)
      expect(entity.$createdAt.toISOString()).to.equal(new Date('2016-01-01T00:00:00Z').toISOString())
      expect(entity.$updatedAt.toISOString()).to.equal(new Date('2016-01-02T00:00:00Z').toISOString())
      expect(entity.$deletedAt.toISOString()).to.equal(new Date('2016-01-03T00:00:00Z').toISOString())
      expect(entity.$links).to.deep.equal([])
    })
    it('should parse it\'s own values', () => {
      const entity = new Entity({
        $id: 'some-id',
        $context: $context,
        $createdAt: new Date('2016-01-01T00:00:00Z'),
        $updatedAt: new Date('2016-01-02T00:00:00Z'),
        $deletedAt: new Date('2016-01-03T00:00:00Z')
      })
      const entity2 = new Entity({
        $id: entity.$id,
        $context: entity.$context,
        $createdAt: entity.$createdAt,
        $updatedAt: entity.$updatedAt,
        $deletedAt: entity.$deletedAt
      })
      EntityType(entity2)
      expect(entity2.$id).to.equal('some-id')
      expect(entity2.$context.equals($context)).to.equal(true)
      expect(entity2.$createdAt.toISOString()).to.equal(new Date('2016-01-01T00:00:00Z').toISOString())
      expect(entity2.$updatedAt.toISOString()).to.equal(new Date('2016-01-02T00:00:00Z').toISOString())
      expect(entity2.$deletedAt.toISOString()).to.equal(new Date('2016-01-03T00:00:00Z').toISOString())
      expect(entity2.$links).to.deep.equal([])
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const entity = Entity.fromJSON(JSON.parse(JSON.stringify(new Entity({
        $id: 'some-id',
        $context: $context,
        $createdAt: new Date('2016-01-01T00:00:00Z'),
        $updatedAt: new Date('2016-01-02T00:00:00Z'),
        $deletedAt: new Date('2016-01-03T00:00:00Z')
      }))))
      EntityType(entity)
      expect(entity.$id).to.equal('some-id')
      expect(entity.$context.equals($context)).to.equal(true)
      expect(entity.$createdAt.toISOString()).to.equal(new Date('2016-01-01T00:00:00Z').toISOString())
      expect(entity.$updatedAt.toISOString()).to.equal(new Date('2016-01-02T00:00:00Z').toISOString())
      expect(entity.$deletedAt.toISOString()).to.equal(new Date('2016-01-03T00:00:00Z').toISOString())
      expect(entity.$links).to.deep.equal([])
    })
  })

  describe('.$modifiedAt', () => {
    it('should return $createdAt if defined', () => {
      const entity = new Entity({
        $id: 'some-id',
        $context: $context,
        $createdAt: new Date('2016-01-01T00:00:00Z')
      })
      expect(entity.$modifiedAt.toISOString()).to.equal(new Date('2016-01-01T00:00:00Z').toISOString())
    })
    it('should return $updatedAt if defined', () => {
      const entity = new Entity({
        $id: 'some-id',
        $context: $context,
        $updatedAt: new Date('2016-01-02T00:00:00Z')
      })
      expect(entity.$modifiedAt.toISOString()).to.equal(new Date('2016-01-02T00:00:00Z').toISOString())
    })
    it('should return $deletedAt if defined', () => {
      const entity = new Entity({
        $id: 'some-id',
        $context: $context,
        $deletedAt: new Date('2016-01-03T00:00:00Z')
      })
      expect(entity.$modifiedAt.toISOString()).to.equal(new Date('2016-01-03T00:00:00Z').toISOString())
    })
  })
})
