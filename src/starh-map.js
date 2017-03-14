import {String as StringType, Integer as IntegerType, irreducible, refinement, struct, maybe, dict, list} from 'tcomb'
import {URIValue} from 'rheactor-value-objects'
import {Model} from 'rheactor-models'
const MaybeStringType = maybe(StringType)
const PositiveIntegerType = refinement(IntegerType, n => n > 0)

const $context = new URIValue('https://github.com/ResourcefulHumans/staRHs-models#StaRHmap')

const NodeType = struct({
  id: StringType,
  label: StringType,
  role: MaybeStringType,
  features: maybe(dict(StringType, StringType))
})
const NodeListType = list(NodeType)

const EdgeType = struct({
  id: StringType,
  source: StringType,
  target: StringType,
  size: PositiveIntegerType,
  date: StringType
})
const EdgeListType = list(EdgeType)

/**
 * FIXME: Dates a string as long as https://github.com/ResourcefulHumans/staRHs/issues/40 is not fixed
 */
export class StaRHmap extends Model {
  /**
   * @param {{nodes: Array.<Object>, edges: Array.<Object>}} fields
   */
  constructor (fields) {
    super(Object.assign(fields, {$context}))
    this.nodes = NodeListType(fields.nodes, ['StaRHmap', 'nodes:List<Node>'])
    this.edges = EdgeListType(fields.edges, ['StaRHmap', 'edges:List<Edge>'])
  }

  /**
   * @returns {{nodes: Array.<Object>, edges: Array.<Object>, $context: string}}
   */
  toJSON () {
    return Object.assign(
      super.toJSON(),
      {
        nodes: this.nodes,
        edges: this.edges
      }
    )
  }

  /**
   * @param {{nodes: Array.<Object>, edges: Array.<Object>}} data
   * @returns {StaRHmap}
   */
  static fromJSON (data) {
    StaRHmapJSONType(data)
    return new StaRHmap(Object.assign(super.fromJSON(data), data))
  }

  /**
   * @returns {URIValue}
   */
  static get $context () {
    return $context
  }

  /**
   * Returns true if x is of type StaRHmap
   *
   * @param {object} x
   * @returns {boolean}
   */
  static is (x) {
    return (x instanceof StaRHmap) || (x && x.constructor && x.constructor.name === StaRHmap.name && '$context' in x && URIValue.is(x.$context) && $context.equals(x.$context))
  }
}

export const StaRHmapJSONType = struct({
  $context: refinement(StringType, s => s === $context.toString(), 'StaRHmapContext'),
  edges: EdgeListType,
  nodes: NodeListType
}, 'StaRHmapJSONType')
export const StaRHmapType = irreducible('StaRHmapType', StaRHmap.is)
