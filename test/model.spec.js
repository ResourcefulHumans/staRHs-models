'use strict'

/* global describe, it */

import {expect} from 'chai'
import {Model, ModelType} from '../src/model'
import URIValue from 'rheactor-value-objects/dist/uri'

const $context = new URIValue('http://example.com/jsonld/some')

describe('Model', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const model = new Model({
        $context: $context
      })
      ModelType(model)
      expect(model.$context.equals($context)).to.equal(true)
      expect(model.$links).to.deep.equal([])
    })
    it('should parse it\'s own values', () => {
      const model = new Model({
        $context: $context
      })
      const model2 = new Model({
        $context: model.$context
      })
      ModelType(model2)
      expect(model2.$context.equals($context)).to.equal(true)
      expect(model2.$links).to.deep.equal([])
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const model = Model.fromJSON(JSON.parse(JSON.stringify(new Model({
        $context: $context
      }))))
      ModelType(model)
      expect(model.$context.equals($context)).to.equal(true)
      expect(model.$links).to.deep.equal([])
    })
  })
})
