# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Commands

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build (Turbopack)
npm run start     # Run production server
npm run lint      # ESLint on src/**/*.{ts,tsx}
npm run format    # Prettier formatting
```

There is no test runner configured in this project.

## Commit Convention

Commits are enforced by Husky + commitlint. All commits **must** follow:

```
<type>(CODE-<number>): <lowercase message>
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `poc`

Example: `feat(CODE-110): add login button`  
Rules: max 100 chars, lowercase type and scope, no trailing period.

## Architecture

**Stack:** Next.js (App Router) + React 19 + TypeScript, Tailwind CSS 4, Zustand, TanStack Query v5,
React Hook Form + Zod, Axios, Next-intl.

### Routing & i18n

All routes are nested under `src/app/[locale]/` — the locale segment (`en` | `ru`) is always present
in the URL. Routes are further grouped under `(main)`. Protected routes (dashboard, profile, chats,
orders) are guarded client-side via the auth store.

### API Layer (`src/api/`)

Two Axios instances are configured in `src/api/axios.ts`:

- `publicAxios` — unauthenticated requests
- `privateAxios` — automatically injects `Authorization: Bearer <token>` from the auth store;
  401/419 responses trigger logout and redirect

React Query wrappers live in `get.api.ts` / `post.api.ts` / `patch.api.ts`. Use these hooks rather
than calling Axios directly in components:

```typescript
import { useGetQuery, usePostMutation, privateAxios } from '@/api';
```

The `useGetQuery` hook accepts a `withLocale` flag that appends the current locale as a query
parameter to the request.

### State Management (`src/store/`)

Zustand stores for client-side state, organized by domain: `useAuthStore`, `toursFilterStore`,
`chatsStore`, `orderStore`, `quizStore`, etc. Some stores use Zustand's persist middleware. Import
from the barrel:

```typescript
import { useAuthStore } from '@/store';
```

Auth token is stored both in the Zustand store and in a browser cookie (24-hour expiry).

### Centralized Imports

Always use barrel exports — each major directory has an `index.ts`:

```typescript
import { ITourist, IOrder, PaginatedData } from '@/types';
import { useAuthStore } from '@/store';
import { useGetQuery, usePostMutation } from '@/api';
import { cn, formatDate } from '@/utils';
```

### Component Conventions

- Components are PascalCase, each in its own folder with an `index.ts` re-export
- UI primitives live in `src/components/UI/`; feature components are grouped by domain
- Use dynamic imports (`next/dynamic`) for heavy components

### Configuration

App-wide env variables are centralized in `src/utils/config.ts`. The main env vars:

| Variable                         | Default                                                   |
| -------------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`            | `https://api.minzifatravel.com/api/v1`                    |
| `NEXT_PUBLIC_ARTICLES_API_URL`   | `https://articles.minzifatravel.com/api/v1`               |
| `NEXT_PUBLIC_CENTRIFUGE_URL`     | `wss://centrifugo.minzifatravel.com/connection/websocket` |
| `NEXT_PUBLIC_GOOGLE_CAPTCHA_KEY` | —                                                         |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID`   | —                                                         |
| `NEXT_PUBLIC_CRM_API_URL`        | —                                                         |

For local overrides, copy `.env.example` to `.env.local`.

### Real-time

Centrifugo WebSocket is used for live chat and data sync. The connection URL comes from
`NEXT_PUBLIC_CENTRIFUGE_URL`.

### Path Alias

`@/*` maps to `src/*` — use this for all internal imports.
