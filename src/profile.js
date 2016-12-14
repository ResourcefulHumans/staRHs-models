import {String as StringType, irreducible, maybe} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'
import EmailValue from 'rheactor-value-objects/email'

/**
 * @type Profile
 */
export class Profile {
  /**
   * @param {{email: {EmailValue}, firstname: {String}, lastname: {String}, avatar: {URIValue}}} fields
   */
  constructor (fields) {
    const {email, firstname, lastname, avatar} = fields
    EmailValue.Type(email)
    StringType(firstname)
    StringType(lastname)
    maybe(URIValue.Type)(avatar)
    this.email = email.toString()
    this.firstname = firstname
    this.lastname = lastname
    this.avatar = avatar ? avatar.toString() : undefined
    this.$context = ProfileContext
  }

  /**
   * @returns {string}
   */
  get name () {
    let name = this.firstname
    if (name.length) name = name + ' '
    name = name + this.lastname
    return name
  }
}

export const ProfileContext = 'https://github.com/ResourcefulHumans/staRHs-models#Profile'
export const ProfileType = irreducible('ProfileType', (x) => x instanceof Profile)
