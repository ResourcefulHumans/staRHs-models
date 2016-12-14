import {String as StringType, irreducible, maybe} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'
import EmailValue from 'rheactor-value-objects/email'

/**
 * @type Profile
 */
export class Profile {
  constructor (fields) {
    const {email, firstname, lastname, avatar} = fields
    EmailValue.Type(email)
    StringType(firstname)
    StringType(lastname)
    maybe(URIValue.Type)(avatar)
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.avatar = avatar
    this.$context = ProfileContext
  }

  /**
   * @returns {string}
   */
  get name () {
    return [this.firstname, this.lastname].join(' ')
  }
}

export const ProfileContext = 'https://github.com/ResourcefulHumans/staRHs-models#Profile'
export const ProfileType = irreducible('ProfileType', (x) => x instanceof Profile)
