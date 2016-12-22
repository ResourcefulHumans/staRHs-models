import {String as StringType, irreducible, maybe, struct, refinement, list} from 'tcomb'
import URIValue from 'rheactor-value-objects/uri'
import EmailValue from 'rheactor-value-objects/email'
import {Entity} from './entity'
import {merge} from 'lodash'
import {Link, LinkJSONType} from './link'
const LinkListType = list(Link)
const $context = new URIValue('https://github.com/ResourcefulHumans/staRHs-models#Profile')

export class Profile extends Entity {
  /**
   * @param {{$id: string, email: EmailValue, firstname: string, lastname: string, avatar: URIValue, $links: Array.<Link>}} fields
   */
  constructor (fields) {
    const {$id, email, firstname, lastname, avatar, $links} = fields
    super({$id, $context})
    StringType(firstname)
    StringType(lastname)
    EmailValue.Type(email)
    maybe(URIValue.Type)(avatar)
    LinkListType($links || [])
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.avatar = avatar
    this.$links = $links || []
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
   * @returns {{$id: string, email: string, firstname: string, lastname: string, avatar: (string|undefined), $context: string, $links: Array<{href: string, $context: string}>}}
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
   * @param {{$id: string, email: string, firstname: string, lastname: string, avatar: string, $links: Array<{href: string, $context: string}>}} data
   * @returns {Profile}
   */
  static fromJSON (data) {
    ProfileJSONType(data)
    const {email, firstname, lastname, avatar} = data
    return new Profile(
      merge(
        super.fromJSON(data),
        {
          email: new EmailValue(email),
          firstname,
          lastname,
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
}

export const ProfileJSONType = struct({
  $context: refinement(StringType, s => s === $context.toString(), 'ProfileContext'),
  email: StringType,
  firstname: StringType,
  lastname: StringType,
  avatar: StringType,
  $links: maybe(list(LinkJSONType))
}, 'ProfileJSONType')
export const ProfileType = irreducible('ProfileType', (x) => x instanceof Profile)
