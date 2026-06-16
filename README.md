# ⚡ ScoreFlow — Sports Livescore App

> Real-time soccer and basketball scores, standings, and match details — built for fans, designed for speed.

![ScoreFlow](https://img.shields.io/badge/ScoreFlow-Live%20Sports%20Data-0a84ff?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-010101?style=flat-square&logo=socket.io)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Phases](#development-phases)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [WebSocket Events](#websocket-events)
- [Deployment & Hosting](#deployment--hosting)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

---

## 🌍 Overview

**ScoreFlow** is a full-stack, real-time sports livescore web application covering **soccer** and **basketball**. It aggregates live match data from the API-Sports feed and delivers scores, fixtures, standings, and match statistics in real time via WebSockets.

The project is built in two clear phases:

- **Phase 1 — Frontend:** Pure HTML, CSS (Bootstrap 5), and Vanilla JavaScript with mock data. No build tools, no frameworks, no installation required. Open `index.html` and it works.
- **Phase 2 — Backend:** Node.js + Express + MongoDB Atlas wired to the live API-Sports data feed. The frontend mock data is replaced with real API responses.

This separation means you can see and interact with the full UI immediately, before writing a single line of backend code.

---

## ✨ Features

### ⚽ Soccer
- Live match scores with minute-by-minute updates
- Pre-match fixtures and post-match results
- League standings (EPL, La Liga, Serie A, UCL, AFCON, NPFL, and more)
- Match events: goals, cards, substitutions
- Top scorers per league
- Head-to-head stats

### 🏀 Basketball
- Live game scores and quarter-by-quarter updates
- NBA, EuroLeague, and other major leagues
- Game box scores
- Season standings
- Player stats per game

### 🌐 General
- Unified dashboard for both sports
- Dark mode by default (Bootstrap 5.3 native dark theme)
- Favourite matches saved to browser localStorage
- Date navigator — browse fixtures by day
- Fully responsive on mobile, tablet, and desktop
- Real-time score updates via Socket.io (Phase 2 — no page refresh)
- Smart API caching to protect the free-tier quota

---

## 🛠️ Tech Stack

### Frontend (Phase 1 — Active)

| Layer | Technology | Purpose |
|---|---|---|
| Markup | HTML5 | Page structure and semantics |
| Styling | Bootstrap 5.3 | Responsive grid, dark theme, components |
| Styling (Custom) | CSS3 | Brand colours, animations, overrides |
| Logic | Vanilla JavaScript (ES6+) | All interactivity, DOM manipulation |
| Icons | Bootstrap Icons | Match events, navigation icons |
| Data | Mock JSON (js/data/mockData.js) | Realistic fake data until backend is live |
| Storage | Browser localStorage | Save favourite matches client-side |
| Version Control | Git + GitHub | Source control, project history |
| Hosting (Frontend) | GitHub Pages + Netlify | Free live deployment |

### Backend (Phase 2 — Upcoming)

| Layer | Technology | Purpose |
|---|---|---|
| Runtime | Node.js 18+ | Server-side JavaScript |
| Framework | Express.js | REST API routing |
| Database | MongoDB Atlas + Mongoose | Persistent data storage |
| Real-time | Socket.io | Push live score updates to browser |
| Scheduler | node-cron | Poll API for score changes every 30s |
| Caching | node-cache (in-memory) | Protect free API quota |
| External API | API-Sports (api-sports.io) | Live soccer & basketball data feed |
| HTTP Client | Axios | API-Sports requests |
| Logging | Morgan + Winston | Request and error logging |
| Hosting (Backend) | Render | Free Node.js hosting |

---

## 🏛️ Architecture

### Phase 1 — Frontend Architecture (Current)

```
scoreflow/
│
├── HTML Pages (index.html, football.html, etc.)
│       │
│       ▼
├── js/data/mockData.js   ← Single source of truth for all fake data
│       │
│       ▼
├── js/utils.js           ← Shared helper functions (formatDate, getStatusBadge, etc.)
│       │
│       ▼
├── js/[page].js          ← Page-specific logic reads mock data and builds the DOM
│       │
│       ▼
└── css/style.css         ← Custom styles layered on top of Bootstrap
```

Data flows in one direction: **mockData → utils → page script → DOM**. When Phase 2 begins, `mockData.js` is replaced by real `fetch()` calls to the backend. The page scripts don't need to change — only where the data comes from changes.

### Phase 2 — Full Stack Architecture (Upcoming)

```
┌─────────────────────────────────────────────────────────────┐
│               FRONTEND (HTML + Bootstrap + JS)              │
│   Page Scripts → fetch()/Socket.io → Backend API           │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP REST + WebSocket
┌─────────────────────────▼───────────────────────────────────┐
│                  BACKEND (Node.js + Express)                 │
│                                                             │
│  Routes → Controllers → Services → Data Access (Mongoose)  │
│                │                                            │
│         Socket.io Server ← node-cron (polls every 30s)     │
│                                     │                       │
│                            API-Sports Feed                  │
│                                     │                       │
│                           node-cache (TTL)                  │
│                                     │                       │
│                           MongoDB Atlas                     │
└─────────────────────────────────────────────────────────────┘
```

**Why this two-phase approach?**
Building frontend-first with mock data means you can see and test the full UI immediately. It also forces a clean contract between the frontend and backend — the mock data defines the exact shape the backend must return, making integration seamless.

---

## 📂 Project Structure

```
scoreflow/
│
├── index.html              ← Home dashboard (live scores + today's fixtures)
├── football.html           ← Football hub (fixtures, standings, top scorers)
├── basketball.html         ← Basketball hub (games, standings)
├── match-detail.html       ← Single match detail (events, lineups, stats)
│
├── css/
│   └── style.css           ← Custom CSS layered on Bootstrap
│
├── js/
│   ├── data/
│   │   └── mockData.js     ← All fake/mock data (replaced by API in Phase 2)
│   │
│   ├── utils.js            ← Shared helper functions used by all page scripts
│   ├── home.js             ← Logic for index.html only
│   ├── football.js         ← Logic for football.html only
│   ├── basketball.js       ← Logic for basketball.html only
│   └── match-detail.js     ← Logic for match-detail.html only
│
├── assets/
│   └── img/                ← Local images and icons
│
├── server/                 ← (Added in Phase 2)
│   ├── config/
│   │   ├── db.js
│   │   ├── socket.js
│   │   └── constants.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── jobs/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── UX_CASE_STUDY.md
```

---

## 🚀 Getting Started

### Phase 1 — Frontend (No installation required)

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/scoreflow.git
cd scoreflow

# 2. Open in your browser — that's it
open index.html
# Or just double-click index.html in your file explorer
```

No npm, no Node.js, no build step. Bootstrap and Bootstrap Icons load from CDN links in each HTML file.

### Phase 2 — Full Stack (When backend is added)

```bash
# Install backend dependencies
cd server
npm install

# Copy environment variables template
cp .env.example .env
# Fill in your MongoDB URI and API-Sports key

# Start the backend server
npm run dev
# Server runs at http://localhost:5000

# Frontend still opens directly in the browser
# Update js/utils.js API_BASE_URL to point to http://localhost:5000/api
```

---

## 📅 Development Phases

| Phase | What Gets Built | Status |
|---|---|---|
| **Phase 0** | Project setup, GitHub repo, README, UX Case Study | ✅ Done |
| **Phase 1a** | HTML structure + Bootstrap navbar (index.html) | ✅ Done |
| **Phase 1b** | Custom CSS, dark theme, colour palette | 🔄 In Progress |
| **Phase 1c** | mockData.js — all fake score data | ⏳ Upcoming |
| **Phase 1d** | utils.js — shared helper functions | ⏳ Upcoming |
| **Phase 1e** | Home page — live scores + fixtures rendered from mock data | ⏳ Upcoming |
| **Phase 1f** | Football page — fixtures, standings, top scorers | ⏳ Upcoming |
| **Phase 1g** | Basketball page — games and standings | ⏳ Upcoming |
| **Phase 1h** | Match detail page — events, lineups, stats | ⏳ Upcoming |
| **Phase 1i** | Favourites (localStorage) + date navigator | ⏳ Upcoming |
| **Phase 2a** | Node.js + Express backend scaffold | ⏳ Upcoming |
| **Phase 2b** | MongoDB models + API-Sports integration | ⏳ Upcoming |
| **Phase 2c** | REST API endpoints (all sports) | ⏳ Upcoming |
| **Phase 2d** | Socket.io + live score polling | ⏳ Upcoming |
| **Phase 2e** | Replace mock data with real backend fetch() calls | ⏳ Upcoming |
| **Phase 3** | Deploy frontend (Netlify + GitHub Pages) + backend (Render) | ⏳ Upcoming |

---

## 🔐 Environment Variables

Only needed in Phase 2 when the backend is added. Create `server/.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/scoreflow?retryWrites=true&w=majority

# API-Sports (https://api-sports.io — free tier: 100 req/day)
API_SPORTS_KEY=your_api_sports_key_here
API_FOOTBALL_BASE_URL=https://v3.football.api-sports.io
API_BASKETBALL_BASE_URL=https://v1.basketball.api-sports.io

# Cache TTL (seconds)
CACHE_TTL_LIVE=30
CACHE_TTL_FIXTURES=300
CACHE_TTL_STANDINGS=3600

# CORS — your frontend URL
CLIENT_URL=http://localhost:5173
```

---

## 📡 API Documentation

All backend endpoints are prefixed with `/api`. These are built in Phase 2.

### Football Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/football/live` | All live matches right now |
| GET | `/api/football/fixtures?date=YYYY-MM-DD` | Fixtures for a specific date |
| GET | `/api/football/fixtures/:id` | Single match details + events |
| GET | `/api/football/standings/:leagueId/:season` | League standings table |
| GET | `/api/football/topscorers/:leagueId/:season` | Top scorers list |
| GET | `/api/football/leagues` | All supported leagues |

### Basketball Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/basketball/live` | All live games right now |
| GET | `/api/basketball/games?date=YYYY-MM-DD` | Games for a specific date |
| GET | `/api/basketball/games/:id` | Single game + box score |
| GET | `/api/basketball/standings/:leagueId/:season` | League standings |
| GET | `/api/basketball/leagues` | All supported leagues |

### Response Shape (consistent across all endpoints)

```json
{
  "success": true,
  "message": "Live football matches retrieved",
  "count": 12,
  "data": [ ... ]
}
```

---

## 🗄️ Database Schema

ScoreFlow uses MongoDB Atlas with Mongoose (Phase 2). Key collections:

- **matches** — Cached match data from API-Sports (reduces API calls)
- **leagues** — League and competition metadata
- **teams** — Team names, logos, country info
- **favorites** — User-saved matches (Phase 2, tied to session or device ID)

Full schema definitions live in `server/models/`.

---

## 📡 WebSocket Events

Added in Phase 2. Socket.io allows the server to push score changes directly to every open browser tab without the user refreshing.

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `connection` | Server → Client | — | Browser connects |
| `subscribe:football` | Client → Server | `{ date }` | Join live football room |
| `subscribe:basketball` | Client → Server | `{ date }` | Join live basketball room |
| `live:football` | Server → Client | `Match[]` | Updated live scores pushed every 30s |
| `live:basketball` | Server → Client | `Game[]` | Updated live scores pushed every 30s |
| `match:event` | Server → Client | `{ matchId, score, status }` | Triggered only when a score changes |
| `disconnect` | — | — | Browser tab closes |

---

## ☁️ Deployment & Hosting

### Frontend — Two free options (both recommended)

#### Option 1: GitHub Pages
Your app lives directly at `https://YOUR_USERNAME.github.io/scoreflow` — visible right from your GitHub profile. Great for recruiters.

1. Go to your GitHub repo → **Settings** → **Pages**
2. Source: Deploy from branch → `main` → `/ (root)`
3. Save. Your app is live in ~60 seconds.

#### Option 2: Netlify (Recommended for portfolio)
Better performance, custom domain support, and automatic deploys on every `git push`.

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connect your GitHub account and select the `scoreflow` repo
3. Build command: *(leave empty — no build step needed)*
4. Publish directory: `/` (root)
5. Deploy. Get a live URL like `scoreflow.netlify.app`

### Backend — Render (Phase 2)

1. Push your code to GitHub (server/ folder included)
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Root directory: `server`
5. Build command: `npm install`
6. Start command: `node server.js`
7. Add all environment variables from `server/.env`
8. Deploy. Get a URL like `scoreflow-api.onrender.com`

### MongoDB Atlas

Ensure your Atlas cluster's **Network Access** allows `0.0.0.0/0` (all IPs) so Render can connect to it, or whitelist Render's specific IP addresses.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes with clear, descriptive commits
4. Push: `git push origin feature/your-feature-name`
5. Open a Pull Request with a description of what you changed and why

**Commit message convention** (keeps your GitHub history clean and professional):
```
feat: add date navigator to football page
fix: correct score display on mobile screens
style: update live badge pulse animation
docs: update README deployment steps
```

---

## 🗺️ Roadmap

- [x] Phase 0: Project planning, documentation, architecture design
- [x] Phase 1a: HTML structure and Bootstrap navbar
- [ ] Phase 1b–1i: Full frontend UI with mock data
- [ ] Phase 2: Node.js backend + MongoDB + API-Sports integration
- [ ] Phase 3: Live deployment (Netlify + Render)
- [ ] Phase 4: Real-time Socket.io score updates
- [ ] Phase 5: User accounts + cross-device favourites (JWT auth)
- [ ] Phase 6: Progressive Web App (installable on mobile)
- [ ] Phase 7: Push notifications for followed matches
- [ ] Phase 8: Admin dashboard + analytics

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute with attribution.

---

<p align="center">Built with ❤️ — ScoreFlow | Never Miss a Goal</p>
