import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL
if (!url) {
  console.error('Missing DATABASE_URL')
  process.exit(1)
}

const sql = neon(url)

await sql`
  CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT NOT NULL,
    company TEXT,
    subject TEXT NOT NULL,
    question TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`

await sql`
  CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`

await sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firebase_uid TEXT NOT NULL,
    email TEXT NOT NULL,
    display_name TEXT,
    photo_url TEXT,
    provider TEXT NOT NULL DEFAULT 'email',
    password_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`

await sql`CREATE UNIQUE INDEX IF NOT EXISTS users_firebase_uid_idx ON users (firebase_uid)`

await sql`
  INSERT INTO feedback (name, message, rating)
  SELECT * FROM (
    VALUES
      ('Priya Sharma', 'Ozyma classes helped my children stay calm and focused at school.', 5),
      ('Rahul Mehta', 'The belt system gives a clear spiritual path. Highly recommend.', 5),
      ('Ananya Verma', 'Pranic healing sessions were gentle and deeply restorative.', 4)
  ) AS seed(name, message, rating)
  WHERE NOT EXISTS (SELECT 1 FROM feedback LIMIT 1)
`

console.log('Database tables ready (contacts, feedback, users).')
