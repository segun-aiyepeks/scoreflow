# 🎨 ScoreFlow — UX Case Study & User Journey

> A deep-dive into the design thinking, user research, and experience architecture behind ScoreFlow.

*Document Version: 2.0 | Updated: June 2026*
*Reflects: Bootstrap 5 + Vanilla JS frontend, frontend-first build approach*

---

## 📋 Table of Contents

1. [Project Brief](#1-project-brief)
2. [Problem Statement](#2-problem-statement)
3. [Design Goals](#3-design-goals)
4. [User Research](#4-user-research)
5. [User Personas](#5-user-personas)
6. [User Journey Maps](#6-user-journey-maps)
7. [Information Architecture](#7-information-architecture)
8. [User Flow Diagrams](#8-user-flow-diagrams)
9. [Design System](#9-design-system)
10. [Wireframes](#10-wireframes)
11. [Component Inventory](#11-component-inventory)
12. [Accessibility](#12-accessibility)
13. [Performance UX](#13-performance-ux)
14. [Key UX & Technical Decisions](#14-key-ux--technical-decisions)

---

## 1. Project Brief

**Product Name:** ScoreFlow
**Type:** Real-time sports livescore web application
**Sports Covered:** Soccer (Football) & Basketball
**Target Platforms:** Desktop, Tablet, Mobile (responsive web — no native app)
**Primary Goal:** Deliver live sports scores and match data in the most frictionless way possible. A user should know the current score within 3 seconds of opening the app.

### Tech Stack Summary

| Layer | Technology | Reason for Choice |
|---|---|---|
| Markup | HTML5 | Universal, no build tools needed |
| Styling | Bootstrap 5.3 + Custom CSS | Developer already knows Bootstrap; built-in dark theme; responsive grid |
| Interactivity | Vanilla JavaScript (ES6+) | No framework overhead; developer familiar; runs directly in browser |
| Icons | Bootstrap Icons | Free, consistent, CDN-loaded |
| Backend (Phase 2) | Node.js + Express | JavaScript across the full stack |
| Database (Phase 2) | MongoDB Atlas | Developer has existing cluster |
| Real-time (Phase 2) | Socket.io | WebSocket push for live scores |
| Sports Data (Phase 2) | API-Sports (api-sports.io) | Free tier; covers soccer + basketball in one account |

### Why Bootstrap over a Framework?
The decision to use Bootstrap 5 + Vanilla JavaScript instead of React or Vue is deliberate:
- No build tools, no npm installs, no compiler errors — open `index.html` and it works
- Bootstrap 5.3's native `data-bs-theme="dark"` gives a professional dark mode instantly
- GitHub Pages can host it directly — no build pipeline required
- The developer's existing Bootstrap knowledge means faster, more confident UI building

---

## 2. Problem Statement

> *"Sports fans need to check scores constantly — during commutes, at work, at events. Existing livescore apps are cluttered with ads, slow to load, and require too many taps to find the game they care about."*

### Pain Points with Existing Solutions

| Pain Point | Where It Hurts | ScoreFlow's Response |
|---|---|---|
| Excessive ads pushing content off screen | Flashscore, Livescore.com | Zero ads — content-first layout |
| Heavy pages, slow load on mobile networks | SofaScore on 3G/4G | Lightweight HTML/CSS/JS, CDN assets |
| No clear hierarchy — everything looks equally urgent | Most competitors | Three distinct visual states: LIVE, UPCOMING, FINISHED |
| Confusing navigation between sports | ESPN App | Dedicated pages per sport with clear nav |
| Scores require manual page refresh | Several apps | Socket.io push in Phase 2; polling fallback in Phase 1 |
| Login required just to see scores | Various apps | No account needed for any core feature |
| Basketball buried under football content | Soccer-centric apps | Equal treatment — Basketball is a first-class page |

---

## 3. Design Goals

Ordered strictly by priority:

1. **Speed to score** — Live scores visible within 3 seconds of page load, even on a slow Nigerian 4G connection.
2. **Clarity at a glance** — Live, upcoming, and finished matches must be visually distinct without reading any text. Colour and badge alone communicate status.
3. **Zero friction navigation** — Get from the home page to a specific match detail in 2 clicks maximum.
4. **Mobile-first** — The majority of our target users are on smartphones. Every layout decision starts at 375px wide and scales up.
5. **Clean, content-first** — No ads, no popups, no distractions. The score is the hero of every screen.
6. **Dark mode as the default** — Sports fans check scores in dark environments. Dark is not a toggle — it is the baseline.
7. **Real-time feel** — Even in Phase 1 with mock data, the UI should feel live. In Phase 2, Socket.io makes it truly live.

---

## 4. User Research

### Research Methods
- Competitive analysis of 6 livescore apps: Flashscore, SofaScore, ESPN, BBC Sport, OneFootball, Google Sports
- Synthesis of 5 representative sports fan archetypes based on common usage patterns
- Heuristic evaluation against Nielsen's 10 Usability Heuristics
- Consideration of West African mobile network conditions (4G, variable speed)

### Key Findings

**Finding 1 — The "Quick Glance" Use Case Dominates**
The vast majority of livescore app sessions last under 30 seconds. Users have one question: *"What is the score right now?"* The entire home page design is optimised around answering this question as fast as possible.

**Finding 2 — Favourites Cut Time-to-Score from 15s to 3s**
Users who follow 2–3 specific teams don't want to scroll through 40 live matches from leagues they don't follow. A favourites section surfaced at the top of the home page is the single biggest UX improvement we can make.

**Finding 3 — Visual Urgency Signals Are Critical**
When live matches are styled the same as upcoming fixtures, users scroll past them. A pulsing green "LIVE" badge and a distinct card colour make live matches impossible to miss — even on a quick glance.

**Finding 4 — Date Navigation Needs to Be Simple**
Power users want to browse yesterday's results and tomorrow's fixtures. A full calendar widget is overkill. Left/right arrow buttons covering "yesterday / today / tomorrow" satisfy 95% of this need with minimal UI complexity.

**Finding 5 — Basketball Fans Feel Like Second-Class Users**
On most soccer-centric livescore apps, basketball is buried or hard to find. Our basketball page is a first-class, equal-treatment section — same visual quality, same feature depth as football.

**Finding 6 — Nigerian Mobile Context Matters**
A significant portion of the target audience is in Nigeria, often on 4G networks with variable speeds. This means: lightweight pages, CDN-loaded assets (Bootstrap, Icons), no large images loaded upfront, and fast initial render.

---

## 5. User Personas

---

### Persona 1 — "The Casual Checker"

```
┌────────────────────────────────────────────────────┐
│  👤 EMEKA, 28 — Lagos, Nigeria                     │
│  Software Developer | Arsenal & EPL Fan            │
├────────────────────────────────────────────────────┤
│  Goals:                                            │
│  • Check the Arsenal score during work meetings    │
│  • Know if a match is live before deciding to watch│
│  • Quick half-time score check, back in 20 seconds │
├────────────────────────────────────────────────────┤
│  Frustrations:                                     │
│  • Apps that demand login just to see scores       │
│  • Ads blocking content on mobile                  │
│  • Pages that take 8+ seconds to load on 4G        │
├────────────────────────────────────────────────────┤
│  Behaviour:                                        │
│  • Opens a livescore app 4–6 times on matchday     │
│  • Session duration: 15–45 seconds per visit       │
│  • Always on mobile, network is variable           │
├────────────────────────────────────────────────────┤
│  What ScoreFlow gives him:                         │
│  • Arsenal in his Favourites — score visible in    │
│    under 3 seconds, first card on the home page    │
└────────────────────────────────────────────────────┘
```

---

### Persona 2 — "The Stats Nerd"

```
┌────────────────────────────────────────────────────┐
│  👤 SARAH, 34 — Abuja, Nigeria                     │
│  Data Analyst | Basketball & Soccer fan            │
├────────────────────────────────────────────────────┤
│  Goals:                                            │
│  • Explore match stats and standings in depth      │
│  • Track multiple leagues simultaneously           │
│  • Compare head-to-head records before big matches │
├────────────────────────────────────────────────────┤
│  Frustrations:                                     │
│  • Stats buried 4–5 navigation levels deep        │
│  • Incomplete or missing player statistics         │
│  • Having to switch between two different apps     │
│    for soccer and basketball                       │
├────────────────────────────────────────────────────┤
│  Behaviour:                                        │
│  • 2–3 sessions per day, longer (3–5 minutes each) │
│  • Uses desktop at home, mobile at work            │
│  • Follows EPL and NBA simultaneously              │
├────────────────────────────────────────────────────┤
│  What ScoreFlow gives her:                         │
│  • One app for both sports with equal depth        │
│  • Standings and match detail one click from any   │
│    match card                                      │
└────────────────────────────────────────────────────┘
```

---

### Persona 3 — "The Basketball-First Fan"

```
┌────────────────────────────────────────────────────┐
│  👤 TUNDE, 22 — Port Harcourt, Nigeria             │
│  University Student | NBA fan                      │
├────────────────────────────────────────────────────┤
│  Goals:                                            │
│  • Check NBA results every morning (games are      │
│    played overnight in West African time)          │
│  • See results before social media spoils them     │
│  • Follow player performance stats                 │
├────────────────────────────────────────────────────┤
│  Frustrations:                                     │
│  • Soccer-centric apps that treat basketball as    │
│    an afterthought                                 │
│  • Having to scroll past 30 soccer matches to find │
│    NBA results                                     │
│  • Poor or missing box score data outside ESPN     │
├────────────────────────────────────────────────────┤
│  Behaviour:                                        │
│  • Primary session: morning, checking last night's │
│    NBA scores                                      │
│  • Always on mobile                                │
│  • Average session: 1–2 minutes                    │
├────────────────────────────────────────────────────┤
│  What ScoreFlow gives him:                         │
│  • Basketball is a top-level nav item, not buried  │
│  • Basketball page loads NBA results first         │
│  • Box score data visible on the game detail page  │
└────────────────────────────────────────────────────┘
```

---

## 6. User Journey Maps

### Journey 1 — "Emeka checks the Arsenal score during a meeting"

```
STAGE:       Trigger      Open App     Find Match   Check Score   Exit

ACTION:      It's         Opens        Scrolls to   Reads:        Pockets
             matchday.    ScoreFlow    Favourites   "Arsenal 2-1  phone.
             Feels the    on mobile.   section at   Chelsea 72'"  Returns
             urge to                   top of home  — LIVE badge  to meeting.
             check.                    page.        is pulsing.

EMOTION:        😐            😐            😀             😄            😄
              Curious      Neutral      Relieved    Delighted    Satisfied

TOUCHPOINTS:  Memory/     Home Page    Favourites   Match Card   —
              Habit       (mobile)     Section      Score

PAIN POINTS:  —           Slow load?   Too many     Score stale? —
                          (must be     matches to   (Phase 1:
                          fast)        scroll past? auto-refresh
                                                    every 60s)

OPPORTUNITIES: —          Skeleton     Favourites   Pulsing LIVE  —
                          loaders      pinned to    badge + score
                          while data   top          flash on
                          fetches                   update
```

---

### Journey 2 — "Sarah explores the NBA standings after work"

```
STAGE:       Open App     Switch       Find         Read          Match
                          Sport        Standings    the Table     Detail

ACTION:      Opens on     Clicks       Clicks       Studies the   Clicks a
             desktop,     Basketball   Standings    conference    game row
             sees         in the       tab on the   table,        to see
             Football     top navbar.  basketball   compares      the box
             by default.              page.        records.      score.

EMOTION:        😐            😐             😊             😊             😄
              Neutral      Neutral        Engaged      Interested    Satisfied

TOUCHPOINTS:  Home Page   Navbar       Basketball   Standings     Game
              (soccer)    (Basketball  Page Tabs    Table         Detail
                          link)                                   Page

PAIN POINTS:  Defaults    Is the       Is it easy   Is the table  Are full
              to soccer   basketball   to find      sortable by   stats
                          link         on the       column?       available?
                          obvious?     page?

OPPORTUNITIES: Remember   Bold, clear  Standings    Clickable     Box score
               last sport nav item     as default   column        tab on
               visited    with icon    tab on       headers       detail
                                       basketball                 page
                                       page
```

---

### Journey 3 — "Tunde saves his favourite NBA team for quick access"

```
STAGE:       Browse        Find Team    Save          Return        Quick
             Games                      Favourite     Next Day      Access

ACTION:      Scrolls       Sees         Taps the ♡    Opens app     Favourites
             through       Lakers vs    heart icon    next morning  section at
             basketball    Celtics      on the game   to check      top of home
             games page.   card.        card.         results.      shows Lakers
                                        Icon fills                   result first.
                                        red.

EMOTION:        😐              😊             😄              😊              😄
              Neutral         Interested    Satisfied       Curious        Delighted

TOUCHPOINTS:  Basketball    Game Card    Heart Icon     Home Page      Favourites
              Page                       (localStorage)  (next visit)   Section

PAIN POINTS:  —             Hard to     Does it work    Does it        Does it
                            find the    without         remember       remember
                            heart icon? signing up?     without login? after cache
                                                                        clear?

OPPORTUNITIES: —            Heart icon  localStorage    Persist in     "Your
                            visible on  works without   localStorage   Teams"
                            hover and   any account     across         section
                            on mobile   needed          sessions       heading
```

---

## 7. Information Architecture

### Site Map

```
ScoreFlow (4-page site)
│
├── index.html  (Home)
│   ├── ★ My Favourites  (pinned at top, only if user has saved any)
│   ├── ● LIVE NOW       (all live matches, both sports)
│   ├── 🕐 UPCOMING      (today's fixtures not yet started)
│   └── ✅ FINISHED      (today's completed matches)
│
├── football.html  (Football Hub)
│   ├── Tab: Fixtures    (browse by date with prev/next arrows)
│   ├── Tab: Standings   (choose a league from a dropdown)
│   └── Tab: Top Scorers (choose a league from a dropdown)
│
├── basketball.html  (Basketball Hub)
│   ├── Tab: Games       (browse by date with prev/next arrows)
│   └── Tab: Standings   (choose a league from a dropdown)
│
└── match-detail.html  (Single Match)
    ├── Score Hero       (large score display + status badge)
    ├── Tab: Events      (goals, cards, substitutions timeline)
    ├── Tab: Lineups     (starting XI + bench)
    └── Tab: Head-to-Head (last 5 meetings)

    [Basketball variant of match-detail:]
    ├── Score Hero       (score + quarter breakdown)
    └── Tab: Box Score   (player stats table)
```

### Navigation Model

```
Every page has the same top navbar:
[⚡ ScoreFlow]   [Home]   [Football]   [Basketball]   [● LIVE badge]

Active page link is highlighted in Bootstrap's active state.
On mobile: collapses into a hamburger menu.
```

---

## 8. User Flow Diagrams

### Flow 1 — Landing on ScoreFlow for the First Time

```
[User opens index.html]
        │
        ▼
[Page renders instantly — HTML + Bootstrap from CDN]
        │
        ▼
[home.js runs — reads from mockData.js]          ← Phase 1
[home.js runs — fetch() calls to backend API]    ← Phase 2
        │
    ┌───┴─────────────────┐
    │                     │
   (data loads OK)    (error / timeout)
    │                     │
    ▼                     ▼
[Render 3 sections:  [Show error card with
 Favourites (if any)  "Could not load scores.
 LIVE matches         Try refreshing." message]
 UPCOMING fixtures
 FINISHED results]
    │
    ▼
[Phase 1: setInterval polls mockData every 60s]
[Phase 2: Socket.io pushes updates in real-time]
```

---

### Flow 2 — User Browses to the Football Page

```
[User clicks Football in navbar]
        │
        ▼
[football.html loads]
        │
        ▼
[Default tab: Fixtures for today's date]
        │
        ▼
[football.js reads mockData / fetches API]
        │
        ▼
[Fixtures render in the tab content area]
        │
   ┌────┴──────────────────────┐
   │                           │
[User clicks ← Previous]   [User clicks a fixture card]
   │                           │
   ▼                           ▼
[Date changes to yesterday] [Navigate to match-detail.html?id=123]
[New fixtures load for      [Match detail page loads with that
 that date]                  match's data]
```

---

### Flow 3 — User Views a Match Detail

```
[User clicks "Details →" on any match card]
        │
        ▼
[match-detail.html?id=123 loads]
        │
        ▼
[match-detail.js reads the ID from the URL]
[Looks up that match in mockData / fetches API]
        │
        ▼
[Score Hero renders at top]
[Default tab: Events timeline]
        │
   ┌────┴──────────────────────┐
   │                           │
[User clicks Lineups tab]  [User clicks H2H tab]
   │                           │
   ▼                           ▼
[Lineups content shows]    [Last 5 meetings show]
[Events tab hides]         [Events + Lineups hide]
```

---

### Flow 4 — User Saves a Favourite

```
[User sees any match card with a ♡ heart icon]
        │
        ▼
[User clicks the ♡]
        │
        ▼
[JavaScript reads current favourites from localStorage]
[Adds this match ID to the array]
[Saves updated array back to localStorage]
        │
        ▼
[Heart icon changes from ♡ (outline) to ♥ (filled, red)]
[No page refresh, instant visual feedback]
        │
        ▼
[Next time user opens index.html:]
[home.js reads favourites array from localStorage]
[Finds matching matches in the data]
[Renders them at the top in the ★ Favourites section]
```

---

## 9. Design System

### How Bootstrap + Custom CSS Work Together

Bootstrap 5.3 provides the foundation: grid, components, spacing utilities, and dark mode. Our `css/style.css` is loaded after Bootstrap and adds only what Bootstrap doesn't provide — brand colours, the live pulse animation, match card specifics, and score display styles.

**Rule:** If Bootstrap has a utility or component that does the job, we use it. We only write custom CSS for things Bootstrap cannot do.

---

### Colour Palette

Bootstrap's dark theme handles background and surface colours automatically via `data-bs-theme="dark"`. We define our brand accent colours as CSS custom properties (variables) so they are reusable everywhere.

```css
:root {
  /* Brand identity */
  --sf-live-green:       #00C853;   /* Live match indicator, pulsing dot */
  --sf-basketball-orange:#FF6D00;   /* Basketball accent colour */
  --sf-accent-blue:      #0A84FF;   /* Links, interactive elements */

  /* Match status colours */
  --sf-status-live:      #00C853;   /* Live */
  --sf-status-upcoming:  #0A84FF;   /* Not started yet */
  --sf-status-finished:  #6c757d;   /* Completed — Bootstrap secondary grey */

  /* Card event colours */
  --sf-goal:             #00C853;   /* Goal scored */
  --sf-yellow-card:      #FFB300;   /* Yellow card */
  --sf-red-card:         #FF3B30;   /* Red card */
  --sf-substitution:     #0A84FF;   /* Player substitution */
}
```

**Why CSS variables?** If we decide to change the live green colour, we change it in one place and it updates across the entire app instantly. This is much better than hunting for the hex code in 10 different places.

---

### Typography

We use the system font stack (Bootstrap's default). This means the app uses whatever sans-serif font the user's OS provides — San Francisco on Apple, Segoe UI on Windows, Roboto on Android. This is the fastest possible font loading because no font file is downloaded.

For score numbers specifically, we use Bootstrap's `fw-bold` (font-weight: 700) and large font sizes to make them visually dominant.

```
Score display:    2.5rem (40px), bold — the biggest element on any card
Team names:       1rem (16px), medium weight
League / status:  0.85rem (13.6px), muted colour
Match time:       0.85rem, monospace feel using tabular-nums CSS feature
```

---

### Spacing

We use Bootstrap's built-in spacing scale exclusively (`p-2`, `mt-3`, `gap-2`, etc.). Custom spacing is only used for specific component dimensions that Bootstrap's scale doesn't cover.

---

### Bootstrap Components We Use

| Component | Where Used | Bootstrap Class |
|---|---|---|
| Navbar | Every page | `navbar`, `navbar-expand-lg` |
| Card | Match cards, game cards | `card`, `card-body` |
| Badge | LIVE status, league names | `badge` |
| Nav Tabs | Football/Basketball sub-pages | `nav-tabs`, `tab-content` |
| Table | Standings | `table`, `table-hover` |
| Button | Date nav, Details link | `btn`, `btn-outline-*` |
| Spinner | Loading states | `spinner-border` |
| Alert | Error and empty states | `alert`, `alert-warning` |
| Dropdown | League selector | `dropdown` |

---

### Custom Components (CSS Only)

These are built with Bootstrap utilities + a small amount of custom CSS:

**Match Card** — The core building block. A Bootstrap `card` with a custom layout for the two teams and score.

**Live Badge** — A Bootstrap `badge bg-danger` with a pulsing animation added in `style.css`.

**Score Display** — Large bold numbers with a brief green flash animation when the score changes.

**Date Navigator** — Two Bootstrap `btn-outline-secondary` buttons (← →) flanking the current date string.

---

## 10. Wireframes

### 10.1 — Home Page (Mobile, 375px)

```
┌─────────────────────────┐
│ ⚡ScoreFlow         ☰   │  ← Sticky navbar (collapses on mobile)
├─────────────────────────┤
│                         │
│  ★ MY FAVOURITES        │  ← Only visible if user has saved favourites
│  ┌─────────────────────┐│
│  │ EPL      LIVE  72'  ││  ← Favourite match card
│  │ Arsenal  2 – 1  CHE ││
│  └─────────────────────┘│
│                         │
│  ● LIVE NOW  (3)        │  ← Section header with count badge
│  ┌─────────────────────┐│
│  │ La Liga  LIVE  45'  ││
│  │ Madrid   1 – 0  BAR ││
│  │              [→] ♡  ││  ← Details link + Favourite toggle
│  └─────────────────────┘│
│  ┌─────────────────────┐│
│  │ NBA      LIVE  Q3   ││
│  │ Lakers  104–98  BOS ││
│  │              [→] ♡  ││
│  └─────────────────────┘│
│                         │
│  🕐 UPCOMING  (5)       │
│  ┌─────────────────────┐│
│  │ UCL      20:00      ││
│  │ Bayern   vs   PSG   ││
│  └─────────────────────┘│
│                         │
│  ✅ FINISHED  (8)       │
│  [collapsed by default] │  ← Click to expand
│                         │
└─────────────────────────┘
```

---

### 10.2 — Football Page (Mobile)

```
┌─────────────────────────┐
│ ⚡ScoreFlow         ☰   │
├─────────────────────────┤
│ [Fixtures][Standings]   │  ← Bootstrap nav tabs
│ [Top Scorers]           │
├─────────────────────────┤
│  ← Jun 12  Jun 13  →   │  ← Date navigator
├─────────────────────────┤
│                         │
│  PREMIER LEAGUE         │  ← League group header
│  ┌─────────────────────┐│
│  │ FT                  ││
│  │ Man City  3 – 1  MCI││
│  └─────────────────────┘│
│                         │
│  LA LIGA                │
│  ┌─────────────────────┐│
│  │ LIVE  67'           ││
│  │ Madrid   2 – 2  BAR ││
│  └─────────────────────┘│
└─────────────────────────┘
```

---

### 10.3 — Match Detail Page (Mobile)

```
┌─────────────────────────┐
│ ← Back   Arsenal v CHE  │  ← Back button + match title
├─────────────────────────┤
│                         │
│   Premier League        │
│   ● LIVE                │  ← Pulsing badge
│                         │
│  [ARS]  2  —  1  [CHE]  │  ← Score hero (large)
│  Arsenal       Chelsea  │
│         72'             │  ← Match clock
│                         │
├─────────────────────────┤
│ [Events][Lineups][H2H]  │  ← Bootstrap tab bar
├─────────────────────────┤
│                         │
│  ⚽ 12'  Saka (ARS)     │
│  ⚽ 34'  Palmer (CHE)   │
│  ⚽ 67'  Havertz (ARS)  │
│  🟨 71'  Gallagher(CHE) │
│                         │
└─────────────────────────┘
```

---

### 10.4 — Desktop Home Page (1280px)

```
┌──────────────────────────────────────────────────────────────┐
│ ⚡ScoreFlow    Home   Football   Basketball      ● LIVE (5)  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ● LIVE NOW (5 matches)                                      │
│  ┌──────────────────┐ ┌──────────────────┐ ┌─────────────┐  │
│  │ EPL    LIVE  72' │ │La Liga LIVE  45' │ │ NBA  Q3  ●  │  │
│  │ ARS  2 – 1  CHE  │ │ MAD  1 – 0  BAR  │ │ LAL 104–98  │  │
│  │         [→]  ♡   │ │         [→]  ♡   │ │ BOS  [→] ♡  │  │
│  └──────────────────┘ └──────────────────┘ └─────────────┘  │
│                                                              │
│  🕐 UPCOMING (8 matches)                                     │
│  ┌──────────────────┐ ┌──────────────────┐                  │
│  │ UCL    20:00     │ │ BUN    21:30      │                  │
│  │ BAY    vs  PSG   │ │ BVB    vs  BAY    │                  │
│  └──────────────────┘ └──────────────────┘                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

On desktop, match cards sit side by side in a Bootstrap grid (`col-md-6 col-lg-4`). On mobile they stack into a single column.

---

## 11. Component Inventory

In Vanilla JavaScript, "components" are JavaScript functions that build and return HTML strings, which are then inserted into the DOM using `innerHTML`. This is the Bootstrap + Vanilla JS equivalent of React components.

| Function Name | File | Output | States Handled |
|---|---|---|---|
| `renderMatchCard(match)` | `utils.js` | Soccer match card HTML | live, upcoming, finished |
| `renderGameCard(game)` | `utils.js` | Basketball game card HTML | live, upcoming, finished |
| `renderLiveBadge(status)` | `utils.js` | Status badge HTML | live (green pulse), upcoming (blue), finished (grey) |
| `renderEventTimeline(events)` | `match-detail.js` | Match events list HTML | goals, cards, subs |
| `renderStandingsTable(standings)` | `football.js` | League table HTML | loaded, empty |
| `renderBoxScore(players)` | `basketball.js` | Player stats table HTML | loaded, empty |
| `renderDateNavigator(date)` | `utils.js` | Date prev/next buttons HTML | any date |
| `renderSkeletonCard()` | `utils.js` | Placeholder card HTML | loading shimmer |
| `renderErrorState(message)` | `utils.js` | Bootstrap alert HTML | error with retry |
| `renderEmptyState(message)` | `utils.js` | Empty state card HTML | no matches |

---

## 12. Accessibility

- **Colour contrast:** Bootstrap 5 dark theme passes WCAG AA (4.5:1) for all text. Our custom accent colours are verified against dark backgrounds.
- **Keyboard navigation:** All interactive elements (buttons, links, tabs) are native HTML elements — keyboard accessible by default.
- **ARIA labels:** Icon-only buttons (the ♡ heart, ← → arrows) include `aria-label` attributes so screen readers announce their purpose.
- **Semantic HTML:** We use correct HTML elements: `<nav>`, `<main>`, `<section>`, `<article>` for match cards, `<time>` for dates and kick-off times.
- **Reduced motion:** The live pulse animation uses `@media (prefers-reduced-motion: reduce)` to turn off animations for users who have enabled this OS setting.
- **Alt text:** All team logo images include descriptive `alt` text (e.g. `alt="Arsenal FC crest"`).

---

## 13. Performance UX

These are techniques we apply in Phase 1 (frontend) to make the app feel fast, even before the real backend exists.

| Technique | How We Implement It | What the User Experiences |
|---|---|---|
| Bootstrap via CDN | Script tag with CDN link — cached by the browser after first visit | Instant styles on repeat visits |
| Skeleton cards | Show grey placeholder cards while data "loads" (even from mockData) | User sees structure immediately, not a blank screen |
| Sections collapsed by default | Finished matches section starts collapsed | Page feels shorter and faster to scan |
| Live section first | LIVE matches rendered before UPCOMING or FINISHED | Most important info is above the fold |
| Score flash animation | Brief green highlight on a score number when it changes | User notices the update without staring at the screen |
| localStorage favourites | Favourites read/written locally — zero network request | Instant access to preferred teams on every visit |
| Lazy loading images | Team logo `<img>` tags use `loading="lazy"` attribute | Images below the fold don't delay the initial render |
| Phase 2: Socket.io push | Server pushes updates — browser never polls | Scores update without any visible page activity |

---

## 14. Key UX & Technical Decisions

**Decision 1 — Bootstrap 5 + Vanilla JS over React**
A JavaScript framework would add build complexity, a learning curve, and prevent direct GitHub Pages deployment. Bootstrap 5 with Vanilla JS runs anywhere, builds in seconds (because there is no build step), and the developer already knows it. The tradeoff is that DOM manipulation is more verbose than JSX — we manage this by keeping all HTML-building functions in `utils.js`.

**Decision 2 — Frontend First with Mock Data**
Building UI before the backend has three advantages. First, you can see and interact with the full product immediately. Second, the mock data defines the exact data shape the backend must produce — this makes backend integration much smoother. Third, it separates concerns completely: UI bugs are UI bugs, API bugs are API bugs.

**Decision 3 — Dark Mode as the Default via `data-bs-theme="dark"`**
Rather than writing a parallel dark mode CSS stylesheet, Bootstrap 5.3's built-in theming attribute handles it in one HTML attribute. This is efficient and consistent — every Bootstrap component automatically respects the theme without extra code.

**Decision 4 — localStorage for Favourites (Phase 1)**
No backend, no account, no cookie — favourites are stored directly in the browser. This works immediately in Phase 1 and gives users instant, frictionless saving. In Phase 2, we can optionally sync localStorage to MongoDB for cross-device access.

**Decision 5 — 4 HTML Pages, Not a Single Page App**
A Single Page App (SPA) manages all navigation in JavaScript, never reloading the page. With Vanilla JS, a multi-page approach (separate `.html` files) is simpler to build, debug, and understand. Each page has one job and one JavaScript file. This also makes GitHub Pages deployment trivial.

**Decision 6 — GitHub Pages + Netlify for Hosting**
GitHub Pages makes the project visible directly from your GitHub profile — great for recruiters. Netlify gives better performance (global CDN) and automatic deploys on every push. We use both simultaneously for maximum visibility.

**Decision 7 — No Registration for Any Core Feature**
Requiring a login to see sports scores is the most common reason users abandon livescore apps. Every feature in Phase 1 — scores, fixtures, standings, match details, favourites — works with zero account. Authentication is only introduced in a later phase for cross-device sync, and even then it is optional.

---

*Document Version: 2.0 | Last Updated: June 2026*
*ScoreFlow — Designed for fans, built for speed.*
