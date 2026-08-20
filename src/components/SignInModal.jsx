import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  )
}

function getErrorMessage(error) {
  const code = error?.code || ''
  const map = {
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect password. Try again.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/email-already-in-use': 'An account already exists with this email.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed before finishing.',
    'auth/cancelled-popup-request': 'Sign-in was cancelled.',
    'auth/popup-blocked': 'Popup was blocked. Allow popups and try again.',
    'auth/unauthorized-domain':
      'This domain is not authorized in Firebase. Add localhost in Authentication → Settings → Authorized domains.',
    'auth/operation-not-allowed':
      'This sign-in method is not enabled in Firebase Console.',
    'auth/configuration-not-found':
      'Firebase keys are missing. Copy .env.example to .env and paste values from Firebase Console.',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
    'auth/missing-email': 'Please enter your email address.',
  }
  return map[code] || error?.message || 'Something went wrong. Please try again.'
}

export default function SignInModal({ open, onClose }) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } =
    useAuth()
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      setError('')
      setInfo('')
      setPassword('')
    }
  }, [open, mode])

  if (!open) return null

  const title =
    mode === 'signup'
      ? 'Create account'
      : mode === 'forgot'
        ? 'Reset password'
        : 'Welcome back'

  const subtitle =
    mode === 'signup'
      ? 'Join Ozyma to track your practice'
      : mode === 'forgot'
        ? 'We will email you a link to set a new password'
        : 'Sign in to continue to Ozyma'

  const handleGoogle = async () => {
    setError('')
    setInfo('')
    setSubmitting(true)
    try {
      await signInWithGoogle()
      onClose()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setInfo('')
    setSubmitting(true)
    try {
      if (mode === 'forgot') {
        await resetPassword(email)
        setInfo(
          'Check your inbox for a password reset link from Firebase. After you reset, sign in with your new password.',
        )
        return
      }
      if (mode === 'signup') {
        await signUpWithEmail(name, email, password)
      } else {
        await signInWithEmail(email, password)
      }
      onClose()
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-[2px]"
        aria-label="Close sign in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl bg-cream p-6 shadow-xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-charcoal/60 transition-colors hover:bg-cream-soft hover:text-charcoal"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="mb-6 text-center">
          <img
            src="/logo.webp"
            alt=""
            className="mx-auto mb-3 h-14 w-14 rounded-full"
          />
          <h2 id="signin-title" className="text-2xl font-semibold text-charcoal">
            {title}
          </h2>
          <p className="mt-1 text-sm text-charcoal/70">{subtitle}</p>
        </div>

        {mode !== 'forgot' && (
          <>
            <button
              type="button"
              onClick={handleGoogle}
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-charcoal/20 bg-white px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:border-terracotta hover:bg-cream-soft disabled:cursor-not-allowed disabled:opacity-60"
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-nav-border" />
              <span className="text-xs font-medium uppercase tracking-wide text-charcoal/50">
                or
              </span>
              <div className="h-px flex-1 bg-nav-border" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-charcoal">
                Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full rounded-xl border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-terracotta"
                placeholder="Your name"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-charcoal">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-xl border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-terracotta"
              placeholder="you@example.com"
            />
          </label>

          {mode !== 'forgot' && (
            <label className="block">
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-charcoal">Password</span>
                {mode === 'signin' && (
                  <button
                    type="button"
                    className="text-xs font-medium text-terracotta hover:underline"
                    onClick={() => setMode('forgot')}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  mode === 'signin' ? 'current-password' : 'new-password'
                }
                className="w-full rounded-xl border border-charcoal/15 bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-terracotta"
                placeholder="At least 6 characters"
              />
            </label>
          )}

          {error && (
            <p
              className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}
          {info && (
            <p
              className="rounded-xl bg-green-50 px-3 py-2 text-sm text-green-800"
              role="status"
            >
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-terracotta px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? 'Please wait…'
              : mode === 'signup'
                ? 'Create Account'
                : mode === 'forgot'
                  ? 'Send reset email'
                  : 'Sign In'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-charcoal/70">
          {mode === 'signin' && (
            <>
              New here?{' '}
              <button
                type="button"
                className="font-semibold text-terracotta hover:underline"
                onClick={() => setMode('signup')}
              >
                Create an account
              </button>
            </>
          )}
          {mode === 'signup' && (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="font-semibold text-terracotta hover:underline"
                onClick={() => setMode('signin')}
              >
                Sign in
              </button>
            </>
          )}
          {mode === 'forgot' && (
            <>
              Remembered it?{' '}
              <button
                type="button"
                className="font-semibold text-terracotta hover:underline"
                onClick={() => setMode('signin')}
              >
                Back to sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
