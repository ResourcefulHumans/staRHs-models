/* global describe, it */

import {expect} from 'chai'
import {StaRHmap, StaRHmapType} from '../src'

const mapData = {
  nodes: [
    {
      id: '1d70ff1a-d5c9-4edf-b383-35a0074462c3',
      label: 'Angela Maus',
      role: 'Partner'
    },
    {
      id: '1b71e7a5-122b-489a-9def-e43cfba32adf',
      label: 'Heiko Fischer',
      role: 'Associate',
      features: {
        'Abteilung': 'Research and Development',
        'Geschlecht': 'Männlich',
        'Alter': '30 - 40'
      }
    },
    {
      id: 'aba2f87b-f669-458b-b39b-a57e5728a459',
      label: 'Senna Phillipa'
    }
  ],
  edges: [
    {
      id: 'e0',
      source: 'e4253fb9-fd29-43bf-b3aa-0555a931309e',
      target: '1d70ff1a-d5c9-4edf-b383-35a0074462c3',
      size: 1,
      date: '2014-8-1T14:54:00'
    },
    {
      id: 'e1',
      source: 'e4253fb9-fd29-43bf-b3aa-0555a931309e',
      target: '1d70ff1a-d5c9-4edf-b383-35a0074462c3',
      size: 1,
      date: '2015-1-29T14:19:00'
    },
    {
      id: 'e1897',
      source: '40179e5f-7f92-44a4-b6c6-f20d12da65db',
      target: '1d70ff1a-d5c9-4edf-b383-35a0074462c3',
      size: 5,
      date: '2015-2-25T15:20:00'
    }
  ]
}

const validateMap = map => {
  expect(map.$context.equals(StaRHmap.$context)).to.equal(true)
  expect(map.edges.length).to.equal(3)
  expect(map.edges).to.deep.equal(mapData.edges)
  expect(map.nodes.length).to.equal(3)
  expect(map.nodes[1]).to.deep.equal(mapData.nodes[1])
  expect(map.nodes[2].role).to.equal(undefined)
  expect(map.nodes[2].features).to.equal(undefined)
}

describe('StaRHmap', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const map = new StaRHmap(mapData)
      StaRHmapType(map)
      validateMap(map)
    })
    it('should parse it\'s own values', () => {
      const map = new StaRHmap(mapData)
      const map2 = new StaRHmap({
        nodes: map.nodes,
        edges: map.edges
      })
      StaRHmapType(map2)
      validateMap(map2)
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const map = StaRHmap.fromJSON(JSON.parse(JSON.stringify(new StaRHmap(mapData))))
      StaRHmapType(map)
      validateMap(map)
    })
  })

  describe('$context', () => {
    it('should exist', () => {
      expect(StaRHmap.$context.toString()).to.equal('https://github.com/ResourcefulHumans/staRHs-models#StaRHmap')
    })
  })
})
