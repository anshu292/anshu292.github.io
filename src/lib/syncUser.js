import { apiUrl } from './api'

/**
 * Persist the Firebase user into Neon after a successful login/signup.
 * For email/password, pass the plaintext password once so the API can bcrypt-hash it.
 * Never log or store the plaintext password on the client beyond this call.
 */
export async function syncUserToDatabase(firebaseUser, { password, displayName } = {}) {
  if (!firebaseUser) return null

  const idToken = await firebaseUser.getIdToken()
  const response = await fetch(apiUrl('/api/users/sync'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idToken,
      password: password || undefined,
      displayName: displayName || firebaseUser.displayName || undefined,
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    console.error('User sync failed:', data.error || response.statusText)
    return null
  }
  return data.user
}
