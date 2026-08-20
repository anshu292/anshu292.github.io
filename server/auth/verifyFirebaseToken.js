import { createRemoteJWKSet, jwtVerify } from 'jose'

const projectId = process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID

const JWKS = createRemoteJWKSet(
  new URL(
    'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com',
  ),
)

export async function verifyFirebaseIdToken(idToken) {
  if (!projectId) {
    throw new Error('FIREBASE_PROJECT_ID / VITE_FIREBASE_PROJECT_ID is not set on the server')
  }
  if (!idToken) {
    throw new Error('Missing Firebase ID token')
  }

  const { payload } = await jwtVerify(idToken, JWKS, {
    issuer: `https://securetoken.google.com/${projectId}`,
    audience: projectId,
  })

  if (!payload.sub || !payload.email) {
    throw new Error('Token is missing required user claims')
  }

  const firebaseClaim = payload.firebase || {}
  const signInProvider = firebaseClaim.sign_in_provider || 'password'

  return {
    uid: payload.sub,
    email: payload.email,
    emailVerified: Boolean(payload.email_verified),
    name: payload.name || null,
    picture: payload.picture || null,
    provider: signInProvider === 'google.com' ? 'google' : 'email',
  }
}
