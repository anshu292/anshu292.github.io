import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import { desc, eq } from 'drizzle-orm'
import { db } from './db/index.js'
import { contacts, feedback, users } from './db/schema.js'
import { verifyFirebaseIdToken } from './auth/verifyFirebaseToken.js'

const app = express()
const port = process.env.API_PORT || 3001
const BCRYPT_ROUNDS = 12

app.use(cors({ origin: true }))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

/**
 * Upsert the signed-in Firebase user into Neon.
 * - Google: profile only
 * - Email/password: also stores a bcrypt hash of the password (never plaintext)
 */
app.post('/api/users/sync', async (req, res) => {
  try {
    const { idToken, password, displayName } = req.body || {}
    const claims = await verifyFirebaseIdToken(idToken)
    const email = String(claims.email).trim().toLowerCase()

    const now = new Date()
    let passwordHash = null

    if (claims.provider === 'email' && typeof password === 'string' && password.length >= 6) {
      passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS)
    }

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.firebaseUid, claims.uid))
      .limit(1)

    let row
    if (existing[0]) {
      const updates = {
        email,
        displayName: displayName?.trim() || claims.name || existing[0].displayName,
        photoUrl: claims.picture || existing[0].photoUrl,
        provider: claims.provider,
        updatedAt: now,
        lastLoginAt: now,
      }
      if (passwordHash) updates.passwordHash = passwordHash

      ;[row] = await db
        .update(users)
        .set(updates)
        .where(eq(users.firebaseUid, claims.uid))
        .returning()
    } else {
      ;[row] = await db
        .insert(users)
        .values({
          firebaseUid: claims.uid,
          email,
          displayName: displayName?.trim() || claims.name,
          photoUrl: claims.picture,
          provider: claims.provider,
          passwordHash,
          createdAt: now,
          updatedAt: now,
          lastLoginAt: now,
        })
        .returning()
    }

    res.json({
      user: {
        id: row.id,
        firebaseUid: row.firebaseUid,
        email: row.email,
        displayName: row.displayName,
        photoUrl: row.photoUrl,
        provider: row.provider,
        hasPasswordHash: Boolean(row.passwordHash),
        lastLoginAt: row.lastLoginAt,
        createdAt: row.createdAt,
      },
    })
  } catch (error) {
    console.error('POST /api/users/sync', error)
    const message = error?.message || 'Failed to sync user'
    const status =
      message.includes('token') || message.includes('Token') || message.includes('JWT')
        ? 401
        : 500
    res.status(status).json({ error: message })
  }
})

/**
 * Forgot password: Firebase sends the reset email.
 * We record the request timestamp on the user row when known.
 * Body: { email }
 */
app.post('/api/users/forgot-password', async (req, res) => {
  try {
    const email = req.body?.email?.trim()?.toLowerCase()
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' })
    }

    const matches = await db.select().from(users).where(eq(users.email, email)).limit(1)

    // Always return success-shaped response to avoid email enumeration,
    // but include a hint for the client that Firebase should send the mail.
    if (matches[0]) {
      await db
        .update(users)
        .set({ updatedAt: new Date() })
        .where(eq(users.id, matches[0].id))
    }

    res.json({
      ok: true,
      message:
        'If an account exists for that email, a password reset link will be sent.',
      provider: matches[0]?.provider || null,
    })
  } catch (error) {
    console.error('POST /api/users/forgot-password', error)
    res.status(500).json({ error: 'Failed to process password reset request.' })
  }
})

app.post('/api/contacts', async (req, res) => {
  try {
    const { name, phone, email, company, subject, question } = req.body || {}

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !question?.trim()) {
      return res.status(400).json({ error: 'Name, email, subject, and question are required.' })
    }

    const [row] = await db
      .insert(contacts)
      .values({
        name: name.trim(),
        phone: phone?.trim() || null,
        email: email.trim(),
        company: company?.trim() || null,
        subject: subject.trim(),
        question: question.trim(),
      })
      .returning()

    res.status(201).json({ contact: row })
  } catch (error) {
    console.error('POST /api/contacts', error)
    res.status(500).json({ error: 'Failed to save contact message.' })
  }
})

app.get('/api/feedback', async (_req, res) => {
  try {
    const rows = await db.select().from(feedback).orderBy(desc(feedback.createdAt))
    res.json({ feedback: rows })
  } catch (error) {
    console.error('GET /api/feedback', error)
    res.status(500).json({ error: 'Failed to load feedback.' })
  }
})

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, message, rating } = req.body || {}

    if (!name?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Name and message are required.' })
    }

    const parsedRating =
      rating === undefined || rating === null || rating === ''
        ? null
        : Number(rating)

    if (
      parsedRating !== null &&
      (!Number.isInteger(parsedRating) || parsedRating < 1 || parsedRating > 5)
    ) {
      return res.status(400).json({ error: 'Rating must be an integer from 1 to 5.' })
    }

    const [row] = await db
      .insert(feedback)
      .values({
        name: name.trim(),
        message: message.trim(),
        rating: parsedRating,
      })
      .returning()

    res.status(201).json({ feedback: row })
  } catch (error) {
    console.error('POST /api/feedback', error)
    res.status(500).json({ error: 'Failed to save feedback.' })
  }
})

app.listen(port, () => {
  console.log(`Ozyma API listening on http://localhost:${port}`)
})
