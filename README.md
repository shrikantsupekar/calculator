# Calculator Audit Logger

## Overview

Full-stack calculator that streams every keypress to an audit-log service. The frontend is a Vue 3 SPA, and the backend is a NestJS API that persists logs to MongoDB with Mongoose. The repo is a Yarn workspace, so dependencies and scripts are shared at the root.

## Project Structure

```
.
├─ backend/        # NestJS API, MongoDB client, audit-log module
├─ frontend/       # Vite + Vue 3 UI, calculator + log pages
├─ package.json    # Workspace-level scripts (dev, build, lint)
└─ README.md
```

## Tech Stack

- Frontend: Vue 3, Vite, TypeScript, Vue Router, ESLint + Prettier
- Backend: NestJS, Express platform, Mongoose, MongoDB Atlas
- Tooling: Yarn 1 workspaces, npm-run-all, vue-tsc

## Prerequisites

- Node.js 20.19+ (or 22 LTS)
- Yarn 1.22 (Classic)
- MongoDB connection string (currently set in `backend/src/common/clients/mongo.client.ts`; update it or load from env before production)

## Setup

```bash
cd /Users/shrikantsupekar/calculator
yarn install
```

The root `yarn install` bootstraps both workspaces (`frontend`, `backend`).

## Live Demo

- Frontend: https://your-deployment-url.example.com

## Running the Project

### Run Frontend and Backend together

```bash
yarn dev
```

Uses `npm-run-all` to start `yarn dev:frontend` and `yarn dev:backend` concurrently. The calculator UI defaults to `http://localhost:8080` pointing at the API running on `http://localhost:3000`.

### Run services individually

- Backend (NestJS):
  ```bash
  yarn dev:backend         # from repo root
  # or
  cd backend && yarn start:dev
  ```
- Frontend (Vite + Vue):
  ```bash
  yarn dev:frontend        # from repo root
  # or
  cd frontend && yarn dev
  ```

## Build & Lint

```bash
yarn build          # builds both workspaces
yarn build:frontend # SPA production build
yarn build:backend  # NestJS dist output

yarn lint           # runs frontend + backend linters
```

## Environment Notes

- API base URL is configured in `frontend/src/config/index.ts`.
- MongoDB connection lives in `backend/src/common/clients/mongo.client.ts`; move credentials to secrets management before deploying.

## Documentation Map

- Frontend guide: [`frontend/README.md`](frontend/README.md)
- Backend guide: [`backend/README.md`](backend/README.md)

## Troubleshooting

- If ports 3000 or 8080 are in use, override them with `PORT` (backend) or `VITE_PORT` (frontend) environment variables before running `yarn dev`.
- Delete `node_modules` and rerun `yarn install` if dependency versions drift.
