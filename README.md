# Ozyma Website

**Ozyma — A Spiritual Martial Art**

Live site: **[https://anshu292.github.io](https://anshu292.github.io)**

## Branches

| Branch | Purpose |
| --- | --- |
| `source` | Full React app source (edit & develop here) |
| `main` | Production build only (served by GitHub Pages) |

Pushes to `source` build the site and update `main` automatically.

## Features

- Home, Tools, Therapies, Levels (belt system), Classes, In Schools, TTC, Team, About
- Contact form + public feedback section
- Firebase Authentication (Google + email/password + forgot password)
- Neon Postgres for contacts, feedback, and user profiles (local API)

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React 19, Vite, Tailwind CSS v4, React Router |
| Auth | Firebase Auth |
| API | Express |
| Database | Neon Postgres + Drizzle ORM |

## Local development

```bash
git clone https://github.com/anshu292/anshu292.github.io.git
cd anshu292.github.io
git checkout source
npm install
```

Copy `.env.example` to `.env` and add Firebase + Neon values (see below).

```bash
npm run db:migrate   # first time / when schema changes
npm run dev          # UI + API
```

- Frontend: http://localhost:5173  
- API: http://localhost:3001 (proxied as `/api`)

### Environment

- `VITE_FIREBASE_*` — Firebase Console → Project settings → Your apps  
- `DATABASE_URL` / `DATABASE_URL_UNPOOLED` — Neon Console or `npx neon checkout main`  

Never commit `.env`. Database URLs are secrets.

### Firebase for the live site

Authentication → Settings → **Authorized domains** → add `anshu292.github.io`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite UI + Express API |
| `npm run build` | Production build |
| `npm run db:migrate` | Create/update Neon tables |
| `npm run lint` | Lint |

## GitHub Pages note

GitHub Pages hosts **static files only**. Contact, feedback, and Neon user-sync need the Express API (`npm run dev` locally, or set `VITE_API_BASE_URL` to a hosted API later).

## License

Private / project use for Ozyma unless otherwise stated.
