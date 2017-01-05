'use strict'

/* global describe, it */

import {expect} from 'chai'
import {Profile, ProfileType} from '../src'
import {Link} from 'rheactor-models'
import {URIValue, EmailValue} from 'rheactor-value-objects'

describe('Profile', () => {
  describe('constructor()', () => {
    it('should accept values', () => {
      const profile = new Profile({
        $id: 'some-id',
        email: new EmailValue('john.doe@example.com'),
        firstname: 'John',
        lastname: 'Doe',
        avatar: new URIValue('https://secure.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y'),
        $links: [
          new Link(
            new URIValue('http://example.com/some-item/42'),
            new URIValue('http://example.com/jsonld/some'),
            true,
            'colleagues'
          )
        ]
      })
      ProfileType(profile)
      expect(profile.email.toString()).to.equal('john.doe@example.com')
      expect(profile.firstname).to.equal('John')
      expect(profile.lastname).to.equal('Doe')
      expect(profile.name).to.equal('John Doe')
      expect(profile.avatar.toString()).to.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y')
      expect(profile.$context.equals(Profile.$context)).to.equal(true)
      expect(profile.$links.length).to.equal(1)
      expect(profile.$links[0].rel).to.equal('colleagues')
    })
    it('should parse it\'s own values', () => {
      const profile = new Profile({
        $id: 'some-id',
        email: new EmailValue('john.doe@example.com'),
        firstname: 'John',
        lastname: 'Doe',
        avatar: new URIValue('https://secure.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y'),
        $links: [
          new Link(
            new URIValue('http://example.com/some-item/42'),
            new URIValue('http://example.com/jsonld/some'),
            true,
            'colleagues'
          )
        ]
      })
      const profile2 = new Profile({
        $id: profile.$id,
        email: profile.email,
        firstname: profile.firstname,
        lastname: profile.lastname,
        avatar: profile.avatar,
        $links: profile.$links
      })
      ProfileType(profile2)
      expect(profile2.email.toString()).to.equal('john.doe@example.com')
      expect(profile2.firstname).to.equal('John')
      expect(profile2.lastname).to.equal('Doe')
      expect(profile2.name).to.equal('John Doe')
      expect(profile2.avatar.toString()).to.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y')
      expect(profile2.$context.equals(Profile.$context)).to.equal(true)
      expect(profile2.$links.length).to.equal(1)
      expect(profile2.$links[0].rel).to.equal('colleagues')
    })
  })

  describe('.name', () => {
    it('should not add spaces if name parts ar missing', () => {
      const profile = new Profile({
        $id: 'some-id',
        email: new EmailValue('john.doe@example.com'),
        firstname: '',
        lastname: 'Doe'
      })
      ProfileType(profile)
      expect(profile.email.toString()).to.equal('john.doe@example.com')
      expect(profile.firstname).to.equal('')
      expect(profile.lastname).to.equal('Doe')
      expect(profile.avatar).to.equal(undefined)
      expect(profile.name).to.equal('Doe')
    })
  })

  describe('JSON', () => {
    it('should parse it\'s JSON representation', () => {
      const profile = Profile.fromJSON(JSON.parse(JSON.stringify(new Profile({
        $id: 'some-id',
        email: new EmailValue('john.doe@example.com'),
        firstname: 'John',
        lastname: 'Doe',
        avatar: new URIValue('https://secure.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y'),
        $links: [
          new Link(
            new URIValue('http://example.com/some-item/42'),
            new URIValue('http://example.com/jsonld/some'),
            true,
            'colleagues'
          )
        ]
      }))))
      ProfileType(profile)
      expect(profile.email.toString()).to.equal('john.doe@example.com')
      expect(profile.firstname).to.equal('John')
      expect(profile.lastname).to.equal('Doe')
      expect(profile.name).to.equal('John Doe')
      expect(profile.avatar.toString()).to.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y')
      expect(profile.$context.equals(Profile.$context)).to.equal(true)
      expect(profile.$links.length).to.equal(1)
      expect(profile.$links[0].rel).to.equal('colleagues')
    })
  })
})
