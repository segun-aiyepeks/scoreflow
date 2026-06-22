//Get Status Badge
function getStatusBadge(match) {
  if (match.status === 'live') {
    const liveText = match.sport === 'football'
      ? `${match.elapsed}'`
      : match.quarter;

    return `
      <span class="status-badge live">
        <span class="live-dot"></span>
        LIVE &nbsp;${liveText}
      </span>`;
  }

  if (match.status === 'upcoming') {
    return `
      <span class="status-badge upcoming">
        <i class="bi bi-clock" style="font-size:0.65rem"></i>
        ${match.kickoff}
      </span>`;
  }

  const finishedText = match.sport === 'football' ? 'FT' : 'FN';
  return `<span class="status-badge finished">${finishedText}</span>`;
}
// Get Score Display
function getScoreDisplay(match) {
    const homeScore = match.sport === 'basketball'? match.home.score.total: match.home.score;

    const awayScore = match.sport === 'basketball'? match.away.score.total: match.away.score;

    if(homeScore === null || awayScore === null) {
        return `<span class="text-muted"></span>`
    }

    return `<span id='score-home-${match.id}'> ${homeScore}</span>
            <span class='text-muted mx-2' style="font-size:1rem">-</span>
            <span id='score-away-${match.id}'>${awayScore}</span>
    `;
}

// Render Match Card
function renderMatchCard(match) {
  const liveClass = match.status === 'live' ? 'is-live' : '';
  const quarterRow = match.sport === 'basketball' ? renderQuarterScores(match) : '';

  return `
    <div class="card match-card ${liveClass} mb-3"
         data-id="${match.id}"
         data-sport="${match.sport}">
      <div class="card-body py-2 px-3">

        <!-- Row 1: League name (left) + Status badge (right) -->
        <div class="d-flex justify-content-between align-items-center mb-2">

          <small class="text-muted d-flex align-items-center gap-1">
            <img
              src="${match.league.logo}"
              alt="${match.league.name}"
              width="14" height="14"
              style="object-fit:contain"
              loading="lazy"
            />
            ${match.league.name}
          </small>

          ${getStatusBadge(match)}

        </div>

        <!-- Row 2: Home team | Score | Away team (true 3-column layout) -->
        <div class="match-teams">

          <!-- HOME: logo + name, left-aligned -->
          <div class="team-col team-home">
            <img
              src="${match.home.logo}"
              alt="${match.home.name}"
              class="team-logo"
              loading="lazy"
            />
            <span class="team-name">${match.home.name}</span>
          </div>

          <!-- SCORE: centred -->
          <div class="score-col">
            <div class="score-display">
              ${getScoreDisplay(match)}
            </div>
          </div>

          <!-- AWAY: name + logo, right-aligned (reversed order) -->
          <div class="team-col team-away">
            <span class="team-name text-end">${match.away.name}</span>
            <img
              src="${match.away.logo}"
              alt="${match.away.name}"
              class="team-logo"
              loading="lazy"
            />
          </div>

        </div>

        <!-- Basketball quarter scores -->
        ${quarterRow}

        <!-- Row 3: Details link + Favourite button -->
        <div class="d-flex justify-content-end align-items-center gap-2 mt-2 pt-2 card-footer-row">
          <a href="match-detail.html?id=${match.id}" class="btn btn-sm btn-outline-secondary py-0 px-2" style="font-size:0.75rem">
            Details →
          </a>
          <button
            class="btn-favourite ${isFavourite(match.id) ? 'saved' : ''}"
            onclick="toggleFavourite(${match.id}, this)"
            aria-label="Favourite">
            <i class="bi ${isFavourite(match.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
          </button>
        </div>

      </div>
    </div>
  `;
}

// Render Quarter Scores
function renderQuarterScores(match) {
    const quarters = ['q1', 'q2', 'q3', 'q4'];
    const headers = quarters.map(q => `<th> ${q.toUpperCase()}</th>`).join('');
    const homeScores = quarters.map(q=> `<td>${match.home.score[q] ?? '-'}</td>`).join('');
    const awayScores = quarters.map(q=> `<td>${match.away.score[q] ?? '-'}</td>`).join('');

    return `
        <div class="quarter-scores mt-2">
            <table class="table table-sm table-borderless mb-0 text-center" style = "font-size = 0.2rem">
                <thead>
                    <tr><th>${headers}</th></tr>
                </thead>
                <tbody>
                    <tr><td class='text-start'>${match.home.shortName}</td>${homeScores}</tr>
                    <tr><td class='text-start'>${match.away.shortName}</td>${awayScores}</tr>
                </tbody>
            </table>
        </div>
    `
}

// Render Skeleton Card
function renderSkeletonCard(){
    return `
        <div class="card match-card mb-3">
            <div class="card-body px-3 py-2">
                <div class="skeleton mb-2" style="height=12px; width=40%"></div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="skeleton" style="height:20px; width=35%;"></div>
                    <div class="skeleton" style="height:24px; width=15%;"></div>
                    <div class="skeleton" style="height:20px; width=35%;"></div>
                </div>
            </div>
        </div>
    `
}

// Render Error State
function renderErrorState(message = "Could not load data! Please try again.") {
    return `
        <div class = 'alert alert-warning d-flex align-items-center gap-2' role = "alert">
            <i class="bi bi-exclamation-triangle-fill"></i>
            <span>${message}</span>
        </div>
    `;
}

// Render Empty State
function renderEmptyState(message = "No matches available.") {
    return `
        <div class="text-center text-muted py-4">
            <i class="bi bi-calender-x" style="font-size: 2rem"></i>
            <p class= "mt-2 mb-0">${message}</p>
        </div>
    `;
}

//FAVORITES
function getFavourites(){
    const stored = localStorage.getItem('sf_favourites');
    return stored? JSON.parse(stored): [];
}

function isFavourite(matchId){
    return getFavourites().includes(String(matchId));
}

function toggleFavourite(matchId, buttonE1){
    const id = String(matchId);
    let favourites = getFavourites();

    if(favourites.includes(id)) {
        favourites = favourites.filter(f => f !== id);
        buttonE1.classList.remove('saved');
        buttonE1.querySelector('i').className = 'bi bi-heart';
    } else {
        favourites.push(id);
        buttonE1.classList.add('saved');
        buttonE1.querySelector('i').className = 'bi bi-heart-fill';
    }

    localStorage.setItem('sf_favourites', JSON.stringify(favourites));
}

// ── DATE HELPERS ──────────────────────────────────────────────

// Returns today's date as a YYYY-MM-DD string
// Used as the default date for fixture pages
function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

// Formats a YYYY-MM-DD string into a readable label
// '2024-06-13' → 'Thu, Jun 13'
function formatDateLabel(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

// Takes a YYYY-MM-DD string and returns the next day
// Used by the date navigator's → button
function getNextDay(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

// Takes a YYYY-MM-DD string and returns the previous day
// Used by the date navigator's ← button
function getPrevDay(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}


// ── renderSectionHeader(icon, title, count) ───────────────────
//
// Builds the "● LIVE NOW (3)" section header HTML.
// count is optional — pass null to hide it.

function renderSectionHeader(icon, title, count = null) {
  const countBadge = count !== null
    ? `<span class="badge bg-secondary ms-1">${count}</span>`
    : '';

  return `
    <div class="section-header text-uppercase">
      <i class="bi ${icon}"></i>
      <span>${title}</span>
      ${countBadge}
    </div>
  `;
}