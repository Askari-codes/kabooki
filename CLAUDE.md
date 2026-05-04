# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint via next lint

# Database
docker compose -f docker/docker-compose.yaml up -d   # Start MySQL container
npx prisma migrate dev                                # Run migrations
npx prisma generate                                   # Regenerate Prisma client
npx prisma db seed                                    # Seed database (uses prisma/seed.ts via tsx)
```

## Environment Variables

`.env` at project root must include:
```
DATABASE_URL="mysql://maskari:kabooki@localhost:3306/kabooki"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

`NEXT_PUBLIC_BASE_URL` is used by server components to call the local API routes via `fetch`.

## Architecture

**Stack:** Next.js 14 App Router, TypeScript, Prisma + MySQL, Tailwind CSS, Radix UI Themes, Swiper.js, Framer Motion.

### Directory layout

- `src/app/` — all Next.js pages and components (App Router)
- `src/app/api/` — API route handlers; each calls Prisma directly (no service layer)
- `prisma/` — schema, migrations, seed, Prisma client singleton (`client.ts`), shared types (`types.ts`, `model.ts`)

### Data flow

Server components (pages) fetch data by calling their own API routes using `fetch({ cache: 'no-cache' })`. API routes import the shared Prisma singleton from `prisma/client.ts`. There is no separate backend service.

### Domain modules

Each content domain (books, movies, podcasts, writers) follows the same component pattern:
- `{Entity}Card` — single item card
- `{Entity}Swiper` — Swiper.js carousel wrapper
- `{Entity}Carousel` — wraps Swiper with pagination
- `{Entity}Section` — homepage section
- `{Entity}Profile` — detail page layout (under `[id]/`)

Favorite variants of these components live in `FavoriteBooks/`, `favoriteMovies/`, etc.

### Key Prisma types

Extended types for API responses are defined in `prisma/types.ts` (not auto-generated). Use these rather than raw Prisma-generated types when relations need to be included:
- `WriterData` — writer with books → bookMovies → movies → director
- `MovieWithDirector` — movie with director and related movies
- `BookWithWriters` — book with writers, related books, and associated movies

### Search

Search state flows through a React Context (`src/app/Context/`): `SearchProvider` wraps pages, `useSearchContext` reads results, and the Navbar pushes `?query=` to `/searchResult`.

### Database schema notes

- `Movie → Director` is many-to-one (`directorId` FK on Movie)
- `Book ↔ Writer` is many-to-many via `BooksWriters` join table
- `Book ↔ Movie` is many-to-many via `BookMovies` join table
- `RelatedBook` and `RelatedWriters` are self-referential join tables
- `Movie` genres use `MoviesGenres` join table with `Genre`
