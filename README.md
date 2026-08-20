# Ozyma Website

 **Ozyma — A Spiritual Martial Art**.

Live site: **[https://anshu292.github.io](https://anshu292.github.io)**

## Features

- Home, Tools, Therapies, Levels (belt system), Classes, In Schools, TTC, Team, About
- Contact form + public feedback section
- Firebase Authentication (Google + email/password + forgot password)
- Neon Postgres for contacts, feedback, and user profiles (local/API server)

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React 19, Vite, Tailwind CSS v4, React Router |
| Auth | Firebase Auth |
| API | Express |
| Database | Neon (Lakebase Postgres) + Drizzle ORM |

## Quick start (local)

### 1. Install

```bash
npm install
```

### 2. Environment

Copy `.env.example` to `.env` and fill in:

- `VITE_FIREBASE_*` from Firebase Console → Project settings → Your apps
- `DATABASE_URL` / `DATABASE_URL_UNPOOLED` via Neon CLI (`npx neon checkout main`) or Neon Console

Never commit `.env` (it is gitignored). Database secrets must stay private.

### 3. Create database tables

```bash
npm run db:migrate
```

### 4. Run

```bash
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3001](http://localhost:3001) (proxied as `/api`)

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Vite UI + Express API together |
| `npm run build` | Production build for GitHub Pages |
| `npm run preview` | Preview the production build |
| `npm run db:migrate` | Ensure Neon tables exist |
| `npm run lint` | Lint the project |

## GitHub Pages hosting

This repo deploys the **static frontend** to GitHub Pages via `.github/workflows/deploy-pages.yml`.

### Enable Pages

1. Open repo **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` (or run the workflow manually)

### Firebase authorized domain

In Firebase Console → Authentication → Settings → **Authorized domains**, add:

- `anshu292.github.io`
- `localhost` (for local dev)

### Important: API on Pages

GitHub Pages serves **static files only**. The Express + Neon API does **not** run on Pages.

That means on the live GitHub Pages URL:

- Browsing pages works
- Firebase login works (after authorized domain is added)
- Contact / feedback / user-sync to Neon need a hosted API (`VITE_API_BASE_URL`) — run locally with `npm run dev`, or deploy the `server/` elsewhere later

## Project structure

```text
src/           React pages, components, auth
server/        Express API + Drizzle schema
public/        Static assets (logo, etc.)
.github/       GitHub Pages deploy workflow
```

## License

Private / project use for Ozyma unless otherwise stated.
