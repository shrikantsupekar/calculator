# Calculator Audit Logger API

NestJS REST API that stores calculator keypress logs in MongoDB. It exposes a simple `/logs` resource that the Vue frontend calls for audit tracking.

## Stack & Prerequisites

- Node.js 20.19+ (or 22 LTS)
- Yarn 1.22 (classic)
- MongoDB connection string configured in `src/common/clients/mongo.client.ts`

## Installation

```bash
cd /Users/shrikantsupekar/calculator/backend
yarn install
```

## Running the API

```bash
# watch mode for local dev (default port 3000)
yarn start:dev

# single-run build + serve
yarn build && yarn start:prod
```

The server enables CORS by default. Update the port inside `src/main.ts` if you need to run alongside other services.

## Deployment

- API URL: https://calculator-backend-gray.vercel.app

## Routes

### `POST /logs`

- **Description:** Persist a single calculator interaction for a user.
- **Query params:** `userId` (required) — UUID the frontend stores locally.
- **Body:**
  ```json
  {
    "id": "1",
    "timestamp": 1731900000000,
    "event": "numberEntered", // or operatorEntered, equalsPressed
    "value": "7"
  }
  ```
- **Response:** JSON representation of the MongoDB document that was created.

### `GET /logs`

- **Description:** Fetch paginated logs, optionally filtered by user.
- **Query params:**
  - `userId` (optional) — limit results to one user.
  - `page` (optional, default 1) — 1-based page index.
  - `limit` (optional, default 20) — page size.
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      /* array of log documents */
    ],
    "pagination": {
      "total": 120,
      "page": 1,
      "limit": 20,
      "totalPages": 6,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
  ```

## Testing the Endpoints

Use curl, HTTPie, or any REST client. Below are ready-made curl snippets.

```bash
# Create a log entry
curl -X POST "http://localhost:3000/logs?userId=test-user" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1",
    "timestamp": 1731900000000,
    "event": "numberEntered",
    "value": "7"
  }'

# Fetch paginated logs (page 1, 10 items)
curl "http://localhost:3000/logs?userId=test-user&page=1&limit=10"
```

For the deployed API swap the base URL with `https://calculator-backend-gray.vercel.app`.

## Notes

- Validation is enforced via `class-validator` DTOs; invalid payloads return 400 responses.
- Update `mongo.client.ts` to pull credentials from environment variables before shipping to production.
