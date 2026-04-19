# TimeTrackr ⏱️

A full-stack daily hours tracking web application built with React, TypeScript, and NestJS.

## Features

- 🔐 **Authentication** — Secure login with JWT tokens
- 📅 **Log Hours** — Select any date and manually enter start/end times
- 📊 **Daily, Weekly & Monthly Stats** — See your totals at a glance
- 📜 **History** — All entries grouped by date with individual durations
- 🗑️ **Delete Entries** — Remove any logged entry
- 👤 **Per-user data** — Each user sees only their own entries

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Material UI (MUI) v5
- Redux Toolkit + Reselect
- React Router v6
- Axios
- Day.js

### Backend
- NestJS
- PostgreSQL + TypeORM
- JWT Authentication
- REST API

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL

### Backend Setup

```bash
cd timetrackr-api
npm install
```

Create a `.env` file in `timetrackr-api/` — see `.env.example` for required variables.

Create the database:

```bash
psql -U postgres -c "CREATE DATABASE timetrackr;"
```

Seed default users:

```bash
npx ts-node src/seed.ts
```

Start the backend:

```bash
npm run start:dev
```

Backend runs on `http://localhost:3001`

### Frontend Setup

```bash
cd timetrackr
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | Login and get JWT token |
| POST | /sessions/entry | Add a new time entry |
| GET | /sessions/entries | Get all entries for user |
| DELETE | /sessions/entry/:id | Delete an entry |
| GET | /sessions/stats | Get daily/weekly/monthly totals |

## Related Repository

- **Backend:** [timetrackr-api](https://github.com/projecti-dev/timetrackr-api)

## Author

**projecti-dev**
