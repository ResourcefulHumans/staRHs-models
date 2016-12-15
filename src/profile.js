import {String as StringType, irreducible, maybe} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'
import EmailValue from 'rheactor-value-objects/email'

export class Profile {
  /**
   * @param {{email: {EmailValue}, firstname: {String}, lastname: {String}, avatar: {URIValue}}} fields
   */
  constructor (fields) {
    const {email, firstname, lastname, avatar} = fields
    StringType(firstname)
    StringType(lastname)
    EmailValue.Type(email)
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
    let name = this.firstname
    if (name.length) name = name + ' '
    name = name + this.lastname
    return name
  }

  /**
   * @returns {{email: {String}, firstname: {String}, lastname: {String}, avatar: ({String}|undefined), $context: {String}}}
   */
  toJSON () {
    return {
      email: this.email.toString(),
      firstname: this.firstname,
      lastname: this.lastname,
      avatar: this.avatar ? this.avatar.toString() : undefined,
      $context: this.$context
    }
  }

  /**
   * @param {{email: {String}, firstname: {String}, lastname: {String}, avatar: {String}}} data
   * @returns {Profile}
   */
  static fromJSON (data) {
    const {email, firstname, lastname, avatar} = data
    return new Profile({
      email: new EmailValue(email),
      firstname,
      lastname,
      avatar: avatar ? new URIValue(avatar) : avatar
    })
  }
}

export const ProfileContext = 'https://github.com/ResourcefulHumans/staRHs-models#Profile'
export const ProfileType = irreducible('ProfileType', (x) => x instanceof Profile)
