import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../firebase'
import { syncUserToDatabase } from '../lib/syncUser'
import { apiUrl } from '../lib/api'

const AuthContext = createContext(null)

const notConfiguredError = () => {
  const error = new Error(
    'Firebase is not configured. Add your keys to the .env file (see .env.example).',
  )
  error.code = 'auth/configuration-not-found'
  throw error
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return undefined
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setLoading(false)

      // Profile-only sync for session restores (no password available here)
      if (nextUser) {
        syncUserToDatabase(nextUser).catch(() => {})
      }
    })
    return unsubscribe
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isFirebaseConfigured,
      signInWithGoogle: async () => {
        if (!auth) return notConfiguredError()
        const credential = await signInWithPopup(auth, googleProvider)
        await syncUserToDatabase(credential.user)
        return credential
      },
      signInWithEmail: async (email, password) => {
        if (!auth) return notConfiguredError()
        const credential = await signInWithEmailAndPassword(auth, email, password)
        await syncUserToDatabase(credential.user, { password })
        return credential
      },
      signUpWithEmail: async (name, email, password) => {
        if (!auth) return notConfiguredError()
        const credential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        )
        if (name.trim()) {
          await updateProfile(credential.user, { displayName: name.trim() })
        }
        await syncUserToDatabase(credential.user, {
          password,
          displayName: name.trim(),
        })
        return credential
      },
      resetPassword: async (email) => {
        if (!auth) return notConfiguredError()
        const trimmed = email.trim()
        // Log request in Neon (non-blocking)
        fetch(apiUrl('/api/users/forgot-password'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed }),
        }).catch(() => {})

        // Firebase sends the actual reset email
        await sendPasswordResetEmail(auth, trimmed)
      },
      logout: () => {
        if (!auth) return Promise.resolve()
        return signOut(auth)
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
