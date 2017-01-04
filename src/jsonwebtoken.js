import {irreducible} from 'tcomb'

// TODO: Update JsonWebToken implementation in rheactor-models
export const JsonWebTokenType = irreducible('JsonWebTokenType', (x = {}) => {
  return '$context' in x && x.$context === 'https://tools.ietf.org/html/rfc7519' && 'iss' in x && 'sub' in x && 'aud' in x && 'exp' in x && 'nbf' in x && 'iat' in x && 'jti' in x
})
