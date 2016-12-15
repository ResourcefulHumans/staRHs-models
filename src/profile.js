import {String as StringType, irreducible, maybe} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'
import EmailValue from 'rheactor-value-objects/email'
import {Model} from './model'
import {merge} from 'lodash'
const $context = new URIValue('https://github.com/ResourcefulHumans/staRHs-models#Profile')

export class Profile extends Model {
  /**
   * @param {{email: EmailValue, firstname: string, lastname: string, avatar: URIValue}} fields
   */
  constructor (fields) {
    super($context)
    const {email, firstname, lastname, avatar} = fields
    StringType(firstname)
    StringType(lastname)
    EmailValue.Type(email)
    maybe(URIValue.Type)(avatar)
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.avatar = avatar
  }

  /**
   * @returns string
   */
  get name () {
    let name = this.firstname
    if (name.length) name = name + ' '
    name = name + this.lastname
    return name
  }

  /**
   * @returns {{email: string, firstname: string, lastname: string, avatar: (string|undefined), $context: string, $links: Array<{href: string, $context: string}>}}
   */
  toJSON () {
    return merge(
      super.toJSON(),
      {
        email: this.email.toString(),
        firstname: this.firstname,
        lastname: this.lastname,
        avatar: this.avatar ? this.avatar.toString() : undefined
      }
    )
  }

  /**
   * @param {{email: string, firstname: string, lastname: string, avatar: string}} data
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

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return $context
  }
}

export const ProfileType = irreducible('ProfileType', (x) => x instanceof Profile)
