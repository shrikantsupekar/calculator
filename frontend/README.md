# Calculator Frontend

Vue 3 SPA that renders calculator UI and paginated audit-log viewer. It talks to the NestJS backend over REST and persists a `userId` + counter in `localStorage` to keep logs grouped per browser.

## Stack

- Vite 7 + Vue 3 + TypeScript
- Vue Router for `/` (calculator) and `/logs` (audit viewer)
- ESLint + Prettier + vue-tsc for lint/type checks

## Requirements

- Node.js 20.19+ (or 22 LTS)
- Yarn 1.22 (classic)
- Backend API reachable at the URL configured in `src/config/index.ts`

## Setup

```bash
cd /Users/shrikantsupekar/calculator/frontend
yarn install
```

## Local Development

```bash
yarn dev     # starts Vite dev server on http://localhost:8080
```

- To run from the repo root alongside the backend use `yarn dev:frontend`.
- The dev server binds to `0.0.0.0`, so LAN devices can hit `http://<your-ip>:8080`.

## Build & Preview

```bash
yarn build        # production build in dist/
yarn preview      # serve the built app locally
```

## Lint & Type Check

```bash
yarn lint         # eslint --fix --cache
yarn type-check   # vue-tsc --build
```

## Routes & Views

- `/` → `Home.vue`: calculator keypad, input, and “View Audit Logs” CTA. Every number/operator press posts to the backend via `fetch`.
- `/logs` → `AuditLogs.vue`: paginated JSON viewer that calls `GET /logs?page=<n>&limit=<n>` and highlights pagination controls.

## Environment & API Config

- API base URL lives in `src/config/index.ts`. Both `development` and `production` currently point to `http://localhost:3000`; update before deploying.
- The app relies on `localStorage` keys:
  - `userId`: persisted UUID to group audit logs
  - `counter`: monotonically increasing ID used by log payloads

## Testing Endpoints from the UI

1. Start the backend (`yarn dev:backend` at the repo root).
2. Start the frontend (`yarn dev` here or `yarn dev:frontend` at the root).
3. Visit `http://localhost:8080` and press buttons — network tab should show `POST /logs`.
4. Navigate to `/logs` to confirm pagination and `GET /logs` responses.

## Deployment

- SPA URL: https://calculator-frontend-smartlead.vercel.app/
- Build with `yarn build` and deploy the `dist/` folder to any static host (Vercel, Netlify, S3, etc.). Ensure `config/index.ts` points to your production API base.

## Troubleshooting

- Seeing CORS errors? Confirm the backend has `app.enableCors()` and the frontend points to the correct API URL.
- Blank logs page? Check the browser console and verify the backend returns `{ success: true, data: [] }`.
- Ports already in use? Override with `VITE_PORT=9000 yarn dev`.
