import {String as StringType, irreducible, maybe, struct, refinement} from 'tcomb'
import {URIValue, EmailValue, EmailValueType, URIValueType} from 'rheactor-value-objects'
import {Entity} from 'rheactor-models'
const $context = new URIValue('https://github.com/ResourcefulHumans/staRHs-models#Profile')
const MaybeStringType = maybe(StringType)

export class Profile extends Entity {
  /**
   * @param {{$id: string, email: EmailValue, firstname: string, lastname: string, organization: String|undefined, avatar: URIValue, $links: Array.<Link>}} fields
   */
  constructor (fields) {
    const {email, firstname, lastname, organization, avatar} = fields
    super(Object.assign(fields, {$context}))
    StringType(firstname)
    StringType(lastname)
    MaybeStringType(organization)
    EmailValueType(email)
    maybe(URIValueType)(avatar)
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.organization = organization
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
   * @returns {{$id: string, email: string, firstname: string, lastname: string, organization: String|undefined, avatar: (string|undefined), $context: string, $links: Array<{href: string, $context: string}>}}
   */
  toJSON () {
    return Object.assign(
      super.toJSON(),
      {
        email: this.email.toString(),
        firstname: this.firstname,
        lastname: this.lastname,
        organization: this.organization,
        avatar: this.avatar ? this.avatar.toString() : undefined
      }
    )
  }

  /**
   * @param {{$id: string, email: string, firstname: string, lastname: string, organization: String|undefined, avatar: string, $links: Array<{href: string, $context: string}>}} data
   * @returns {Profile}
   */
  static fromJSON (data) {
    ProfileJSONType(data)
    const {email, firstname, lastname, organization, avatar} = data
    return new Profile(
      Object.assign(
        super.fromJSON(data),
        {
          email: new EmailValue(email),
          firstname,
          lastname,
          organization,
          avatar: avatar ? new URIValue(avatar) : avatar
        }
      )
    )
  }

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return $context
  }

  /**
   * Returns true if x is of type Profile
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof Profile) || (x && x.constructor && x.constructor.name === Profile.name && '$context' in x && URIValue.is(x.$context) && $context.equals(x.$context))
  }
}

export const ProfileJSONType = struct({
  $context: refinement(StringType, s => s === $context.toString(), 'ProfileContext'),
  email: StringType,
  firstname: StringType,
  lastname: StringType,
  organization: MaybeStringType,
  avatar: StringType
}, 'ProfileJSONType')
export const ProfileType = irreducible('ProfileType', Profile.is)
