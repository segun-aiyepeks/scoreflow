function showSkeletons(){
    const threeSkeletons = Array(3).fill(null).map(() => renderSkeletonCard()).join('');

    document.getElementById('live-container').innerHTML = threeSkeletons;
    document.getElementById('upcoming-container').innerHTML = threeSkeletons;
    document.getElementById('finished-container').innerHTML = threeSkeletons;
}

// Render dateNavigator(dateString)
function renderDateNavigator(dateString){
    const container = document.getElementById('dateNavigator');

    container.innerHTML = 
    `
        <div class="date-navigator">
            <button class="btn btn-sm btn-outline-secondary" onClick="changeDate('${getPrevDay(dateString)}')" aria-label="Previous day">
                <i class="bi bi-chevron-left"></i>
            </button>
            
            <span class="current-date fw-semibold">${getDateLabel(dateString)}</span>
            
            <button class="btn btn-sm btn-outline-secondary" onClick="changeDate('${getNextDay(dateString)}')">
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>
     `
}

// getDateLabel(dateString)
function getDateLabel(dateString){
    const today = getTodayString();
    const yesterday = getPrevDay(today);

    if(dateString === today) return 'Today';
    if(dateString === yesterday) return 'Yesterday';
    return formatDateLabel(dateString);
}

// renderFavourites
function renderFavourites() {
    const section = document.getElementById('favorites-section');
    const container = document.getElementById('favorites-container');
    const savedIds = getFavourites();

    if(savedIds.length === 0){
        section.classList.add('none');
        return;
    }
    // Get all matches
    const allMatches = [
    ...MockData.liveFootball,
    ...MockData.upcomingFootball,
    ...MockData.finishedFootball,
    ...MockData.liveBasketball,
    ...MockData.upcomingBasketball,
    ...MockData.finishedBasketball,
    ];

    // Filter Favourite Matches
    const favouriteMatches = allMatches.filter(match => savedIds.includes(String(match.id)));

    if(favouriteMatches.length === 0){
        section.classList.add('d-none');
        return;
    }
}

// Render Live Function
function renderLive() {
    const headerE1 = document.getElementById('live-header');
    const containerE1 = document.getElementById('live-container');

    const matches = MockData.allLive;

    //Render section header with util function
    headerE1.innerHTML = renderSectionHeader(
        'bi-circle-fill text-danger',
        'Live Now',
        matches.length
    );

    if(matches.length === 0){
        containerE1.innerHTML = renderEmptyState('No Live matches right now. Check back Later');
        return;
    }

    containerE1.innerHTML = matches.map(match => renderMatchCard(match)).join('');
}

// Render Upcoming
function renderUpcoming() {
    const headerE1 = document.getElementById('upcoming-header');
    const containerE1 = document.getElementById('upcoming-container');

    const matches = [
        ...MockData.upcomingFootball,
        ...MockData.upcomingBasketball
    ];

    headerE1.innerHTML = renderSectionHeader(
        'bi bi-clock-fill text-primary',
        'Upcoming',
        matches.length
    );

    if(matches.length === 0){
        containerE1.innerHTML = renderEmptyState('No upcoming matches today.');
        return;
    }
    containerE1.innerHTML = matches.map(match => renderMatchCard(match)).join('');
}

//Render Finished
function renderFinished(){
    const containerE1 = document.getElementById('finished-container');
    const headerText = document.getElementById('finished-header-text');

    const matches = [
        ...MockData.finishedBasketball,
        ...MockData.finishedBasketball
    ];

    headerText.textContent = `Finished (${matches.length})`;

    if(matches.length === 0){
        containerE1.innerHTML = renderEmptyState('No finished matches today.');
        return;
    }

    containerE1.innerHTML = matches.map(match => renderMatchCard(match)).join('');
}

// Change date String
function changeDate(dateString){
    renderDateNavigator(dateString);

    //Phase 2: Fetch new data for this date from the API.
    //Rendering mock data
    renderUpcoming();
    renderFinished();

    //Scrolling to the top smoothly after change date
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// Init
function init() {
    showSkeletons();

    renderDateNavigator();

    setTimeout(() => {
        renderFavourites();
        renderLive();
        renderUpcoming();
        renderFinished();
    }, 500)
}

init();