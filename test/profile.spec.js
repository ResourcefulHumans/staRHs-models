'use strict'

/* global describe, it */

const expect = require('chai').expect
import {Profile, ProfileType, ProfileContext} from '../src/profile'
import URIValue from 'rheactor-value-objects/uri'
import EmailValue from 'rheactor-value-objects/email'

describe('Profile', () => {
  it('should accept values', () => {
    const profile = new Profile({
      email: new EmailValue('john.doe@example.com'),
      firstname: 'John',
      lastname: 'Doe',
      avatar: new URIValue('https://secure.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y')
    })
    ProfileType(profile)
    expect(profile.email).to.equal('john.doe@example.com')
    expect(profile.firstname).to.equal('John')
    expect(profile.lastname).to.equal('Doe')
    expect(profile.name).to.equal('John Doe')
    expect(profile.avatar).to.equal('https://secure.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y')
    expect(profile.$context).to.equal(ProfileContext)
  })
  it('should not add spaces if name parts ar missing', () => {
    const profile = new Profile({
      email: new EmailValue('john.doe@example.com'),
      firstname: '',
      lastname: 'Doe'
    })
    ProfileType(profile)
    expect(profile.email).to.equal('john.doe@example.com')
    expect(profile.firstname).to.equal('')
    expect(profile.lastname).to.equal('Doe')
    expect(profile.avatar).to.equal(undefined)
    expect(profile.name).to.equal('Doe')
  })
})
