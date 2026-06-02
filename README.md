# Civita / Avento — Sports & Events Platform

This repository contains the frontend client and local mock services for a community-first sports & events platform.

Purpose of this README: give any developer a complete, concise view of the project so they can run, extend, and contribute to it quickly.

---

## Concept & goals

- Help players discover and join local matches and events.
- Provide community features (group chat, profiles, memories).
- Support a multi-stage payment flow and a Trust Score reputation system.
- Provide a client-side mock backend so features can be developed and demoed without a real server.

---

## High-level architecture

```mermaid
flowchart TB
  A[Browser UI] --> B[Frontend (Vite + React + TS)]
  B --> C[Pages & Components]
  C --> D[Client Services]
  D --> E[Local Mock Services (apiService)]
  E --> F[matchService,paymentFlow,trustScore,mockData]
  F --> G[localStorageService]
  B ---|optional| H[Supabase / Firebase]
```

Overview: UI components call `apiService` which delegates to focused services (match, payment, trust). Mock services persist to `localStorage` for demos.

---

## Project layout (important folders)

- [src](src) — main application
  - [src/pages](src/pages) — route-level pages (Landing, Explore, Community, Events)
  - [src/components](src/components) — reusable components (chat/, layout/, ui/)
  - [src/services](src/services) — local mock backend services and facades
  - [src/lib](src/lib) — low-level clients and helpers (supabase client, utils)
  - [src/styles](src/styles) — tailwind/global styles
- [public](public) — static assets
- [tools](tools) — infra scripts and supabase helpers

If you want to implement or debug a feature: start at `src/pages/<FeaturePage>` → follow imports to `src/components` → then `src/services`.

---

## Quick start (developer)

1. Clone the repository and install:

```bash
git clone <repo-url>
cd CIVITA
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open the address Vite prints (commonly http://localhost:5173).

4. Build for production:

```bash
npm run build
npm run preview
```

---

## Environment

Create `.env.local` at repo root to supply any external service keys.

Minimum keys (example):

```env
VITE_SUPABASE_URL=""
VITE_SUPABASE_ANON_KEY=""

# Optional legacy Firebase
VITE_FIREBASE_API_KEY=""
```

If keys are missing the app will usually fall back to client-side mock services for most flows.

---

## Services (what to look for)

- `apiService` (facade) — entry point for auth, match, payment, trust APIs.
- `matchService` — match lifecycle and state transitions.
- `paymentFlowService` — implements 5-stage payment windows and recalculation rules.
- `trustScoreService` — reputation scoring, actions and badge logic.
- `friendshipStreakService` — co-play streaks and milestones.
- `mockDataService` — demo data generator.
- `localStorageService` — persistence layer for mock data (keys prefixed with `avento_`).

Look in `src/services` to inspect implementations and simulation parameters (delays, default data sizes).

---

## Developer tips & troubleshooting

- Resolving import errors: if an import path is incorrect, prefer adding a re-export shim in `src/components` (temporary) then update callers.
- Reset demo data: open dev console and run `mockDataService.resetData()` or clear localStorage entries starting with `avento_`.
- Type/compile errors: run `npm run dev` to get Vite/TypeScript diagnostics.
- If `docs/` is used for GitHub Pages, ensure `.gitignore` does not ignore it.

---

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run linters (if configured)

CI suggestion: `npm ci && npm run build` on PRs to catch unresolved imports early.

---

## How to add a new page/feature

1. Create the page under `src/pages` (e.g. `src/pages/NewFeature.tsx`).
2. Add small, focused components in `src/components/<feature>`.
3. Put business logic into `src/services` (or extend `apiService`).
4. Add mock data in `src/services/mockDataService` if the feature needs sample content.
5. Run dev server and fix TypeScript or import issues.

---

## Deployment notes

- Vercel / Netlify recommended for frontend. Provide environment variables in the hosting platform.
- If you use GitHub Pages via `docs/`, do not ignore `docs/` in `.gitignore`.

---

## Where to start reading code (recommended order)

1. `src/App.tsx` — app bootstrap and routing.
2. `src/pages/LandingPage.tsx` — example of a route-level page.
3. `src/components/chat/WhatsAppChat.tsx` — primary chat implementation.
4. `src/services/apiService.ts` — the facade wiring to services.
5. `src/services/matchService.ts` — match lifecycle logic.

---

## Want more?

- I can add `ARCHITECTURE.md` with sequence diagrams and more detailed data models.
- I can also add unit tests and CI config scaffolding.

---

## License & author

This repo follows the original project's license (check package.json). Author: Shubh Heda.

