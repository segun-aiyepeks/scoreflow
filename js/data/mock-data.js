// LEAGUES
const LEAGUES = {
    EPL: {
        id: 39,
        name: 'English Premier League',
        country: 'England',
        logo: 'https://media.api-sports.io/football/leagues/39.png',
        flag: 'https://media.api-sports.io/flags/gb.svg'
    },
    LA_LIGA: {
        id: 140,
        name: 'Spanish La Liga',
        country: 'Spain',
        logo: 'https://media.api-sports.io/football/leagues/140.png',
        flag: 'https://media.api-sports.io/flags/es.svg'
    },
    UCL: {
        id: 2,
        name: 'UEFA Champions League',
        country: 'Europe',
        logo: 'https://media.api-sports.io/football/leagues/2.png',
        flag: null
    },
    SERIE_A: {
        id: 135,
        name: 'Serie A',
        country: 'Italy',
        logo: 'https://media.api-sports.io/football/leagues/135.png',
        flag: 'https://media.api-sports.io/flags/it.svg'
    },
    BUNDESLIGA: {
        id: 78,
        name: 'Bundesliga',
        country: 'Germany',
        logo: 'https://media.api-sports.io/football/leagues/78.png',
        flag: 'https://media.api-sports.io/flags/de.svg'
    },
    NBA: {
        id: 12,
        name: 'NBA',
        country: 'USA',
        logo: 'https://media.api-sports.io/football/leagues/12.png',
        flag: 'https://media.api-sports.io/flags/us.svg'
    }
}

// LIVE FOOTBALL MATCHES
const liveFootballMatches = [
    {
        id: 1001,
        sport: 'football',
        status: 'live',
        elapsed: 72,
        kickoff: '18:00',
        league: LEAGUES.EPL,
        home: {
            id: 42,
            name: 'Arsenal',
            shortName: 'ARS',
            logo: 'https://media.api-sports.io/football/teams/42.png',
            score: 2
        },
        away: {
            id: 49,
            name: 'Chelsea',
            shortName: 'CHE',
            logo: 'https://media.api-sports.io/football/teams/49.png',
            score: 1
        },
        events: [
            {minute: '23', type: 'goal' , player: 'Saka', team: 'home', assist: 'Gyokeres',},
            {minute: '45', type: 'goal' , player: 'Palmer', team: 'away', assist: null,},
            {minute: '67', type: 'goal' , player: 'Havertz', team: 'home', assist: 'Martinelli',},
            {minute: '71', type: 'yellow card' , player: 'Caceido', team: 'away', assist: null,}
        ]
    },
    {
        id: 1002,
        sport: 'football',
        status: 'live',
        elapsed: 45,
        kickoff: '18:30',
        league: LEAGUES.LA_LIGA,
        home: {
            id: 541,
            name: 'Real Madrid',
            shortName: 'RMA',
            logo: 'https://media.api-sports.io/football/teams/541.png',
            score: 1
        },
        away: {
            id: 529,
            name: 'Barcelona',
            shortName: 'BAR',
            logo: 'https://media.api-sports.io/football/teams/529.png',
            score: 1
        },
        events: [
            {minute: '12', type: 'goal' , player: 'K.Mbappe', team: 'home', assist: 'Vinicius Junior',},
            {minute: '38', type: 'goal' , player: 'L.Yamal', team: 'away', assist: 'Pedri',},
            {minute: '44', type: 'yellow card' , player: 'A.Rudiger', team: 'home', assist: null,}
        ]
    },
    {
        id: 1003,
        sport: 'football',
        status: 'live',
        elapsed: 88,
        kickoff: '16:45',
        league: LEAGUES.UCL,
        home: {
            id: 541,
            name: 'Paris Saint-Germain',
            shortName: 'PSG',
            logo: 'https://media.api-sports.io/football/teams/85.png',
            score: 0
        },
        away: {
            id: 157,
            name: 'Bayern Munich',
            shortName: 'BAY',
            logo: 'https://media.api-sports.io/football/teams/157.png',
            score: 2
        },
        events: [
            {minute: '55', type: 'goal' , player: 'M.Olise', team: 'away', assist: 'L.Diaz',},
            {minute: '78', type: 'goal' , player: 'H.Kane', team: 'away', assist: 'M.Olise',},
            {minute: '82', type: 'red card' , player: 'Marquinhous', team: 'home', assist: null,}
        ]
    },
]


// UPCOMING FOOTBALL MATCHES
const upcomingMatches = [
    {
        id: 1004,
        sport: 'football',
        status: 'upcoming',
        elapsed: null,
        kickoff: '20:45',
        league: LEAGUES.EPL,
        home: {
            id: 33,
            name: 'Manchester United',
            shortName: 'MUN',
            logo: 'https://media.api-sports.io/football/teams/33.png',
            score: null
        },
        away: {
            id: 40,
            name: 'Liverpool',
            shortName: 'LIV',
            logo: 'https://media.api-sports.io/football/teams/40.png',
            score: null
        },
        events: []
    },
    {
        id: 1005,
        sport: 'football',
        status: 'upcoming',
        elapsed: null,
        kickoff: '21:00',
        league: LEAGUES.BUNDESLIGA,
        home: {
            id: 165,
            name: 'Borussia Dortmund',
            shortName: 'BVB',
            logo: 'https://media.api-sports.io/football/teams/165.png',
            score: null
        },
        away: {
            id: 530,
            name: 'Atletico de Madrid',
            shortName: 'ATM',
            logo: 'https://media.api-sports.io/football/teams/530.png',
            score: null
        },
        events: []
    },
    {
        id: 1006,
        sport: 'football',
        status: 'upcoming',
        elapsed: null,
        kickoff: '21:00',
        league: LEAGUES.SERIE_A,
        home: {
            id: 489,
            name: 'AC Milan',
            shortName: 'MIL',
            logo: 'https://media.api-sports.io/football/teams/489.png',
            score: null
        },
        away: {
            id: 505,
            name: 'Inter Milan',
            shortName: 'INT',
            logo: 'https://media.api-sports.io/football/teams/505.png',
            score: null
        },
        events: []
    },
]

// FINISHED FOOTBALL MATCHES
const finishedFootballMatches = [
    {
        id: 1007,
        sport: 'football',
        status: 'finished',
        elapsed: null,
        kickoff: '12:30',
        league: LEAGUES.EPL,
        home: {
            id: 47,
            name: 'Tottenham',
            shortName: 'TOT',
            logo: 'https://media.api-sports.io/football/teams/47.png',
            score: 1
        },
        away: {
            id: 51,
            name: 'Brighton',
            shortName: "BRI",
            logo: 'https://media.api-sports.io/football/teams/51.png',
            score: 3
        },
        events: [
            {minute: '15', type: 'goal', player: 'D. Kulusevski', team: 'home', assist: 'X.Simmons'},
            {minute: '29', type: 'goal', player: 'K. Mitoma', team: 'away', assist: 'D.Welbeck'},
            {minute: '54', type: 'goal', player: 'D.Welbeck', team: 'away', assist: 'Z. Yohanna'},
            {minute: '77', type: 'goal', player: 'K. Mitoma', team: 'away', assist: 'Z. Yohanna'},
        ]
    },
    {
        id: 1008,
        sport: 'football',
        status: 'finished',
        elapsed: null,
        kickoff: '15:00',
        league: LEAGUES.LA_LIGA,
        home: {
            id: 532,
            name: 'Valencia',
            shortName: 'VAL',
            logo: 'https://media.api-sports.io/football/teams/532.png',
            score: 0
        },
        away: {
            id: 531,
            name: 'Sevilla',
            shortName: "SEV",
            logo: 'https://media.api-sports.io/football/teams/531.png',
            score: 3
        },
        events: [
            {minute: '64', type: 'red card', player: 'J.Rivero', team: 'home', assist: null},
            {minute: '89', type: 'yellow card', player: 'A. Adamas', team: 'away', assist: null},
        ]
    },
]



// LIVE BASKETBALL GAMES
const liveBasketballGames = [
    {
        id: 2001,
        sport: 'basketball',
        status: 'live',
        elapsed: null,
        quarter: 'Q3',
        kickoff: '01: 30',
        league: LEAGUES.NBA,
        home: {
            id: 145,
            name: "Los Angeles Lakers",
            shortName: 'LAL',
            logo: 'https://media.api-sports.io/basketball/teams/145.png',
            score: {
                total: 87,
                q1: 24, q2: 28, q3: 35, q4: null
            }
        },
        away: {
            id: 143,
            name: 'Boston Celtics',
            shortName: 'BOS',
            logo: 'https://media.api-sports.io/basketball/teams/143.png',
            score: {
                total: 91,
                q1: 29, q2: 25, q3: 37, q4: null
            }
        },
        events: []
    },
    {
        id: 2002,
        sport: 'basketball',
        status: 'live',
        elapsed: null,
        quarter: 'Q4',
        kickoff: '00: 00',
        league: LEAGUES.NBA,
        home: {
            id: 149,
            name: "Golden State Warriors",
            shortName: 'GSW',
            logo: 'https://media.api-sports.io/basketball/teams/149.png',
            score: {
                total: 112,
                q1: 39, q2: 27, q3: 29, q4: 25
            }
        },
        away: {
            id: 141,
            name: 'Miami Heat',
            shortName: 'MIA',
            logo: 'https://media.api-sports.io/basketball/teams/141.png',
            score: {
                total: 108,
                q1: 28, q2: 30, q3: 26, q4: 24
            }
        },
        events: []
    },
];

// Upcoming Basketball Games
const upcomingBasketballGames = [
    {
        id: 2003,
        sport: 'basketball',
        status: 'upcoming',
        elapsed: null,
        quarter: null,
        kickoff: '02:30',
        league: LEAGUES.NBA,
        home: {
            id: 146,
            name: 'Chicago Bulls',
            shortName: 'CHI',
            logo: 'https://media.api-sports.io/basketball/teams/146.png',
            score: { total: null, q1: null, q2: null, q3: null, q4: null}
        },
        away: {
            id: 150,
            name: 'New York Knicks',
            shortName: 'NYK',
            logo: 'https://media.api-sports.io/basketball/teams/150.png',
            score: { total: null, q1: null, q2: null, q3: null, q4: null}
        },
        events: []
    }
];

// Finished Basketball Games
const finishedBasketballGames = [
    {
        id: 2004,
        sport: 'basketball',
        status: 'finished',
        elapsed: null,
        quarter: 'FN',
        kickoff: '23:00',
        league: LEAGUES.NBA,
        home: {
            id: 154,
            name: 'Denver Nuggets',
            shortName: 'DEN',
            logo: 'https://media.api-sports.io/basketball/teams/154.png',
            score: {
                total: 118,
                q1: 32, q2: 29, q3: 31, q4: 26
            }
        },
        away: {
            id: 155,
            name: 'Phoenix Suns',
            shortName: 'PHX',
            logo: 'https://media.api-sports.io/basketball/teams/155.png',
            score: {
                total: 105,
                q1: 27, q2: 28, q3: 24, q4: 26
            }
        },
        events: []
    }
];




// STANDINGS DATA 
const eplStandings = [
  { rank: 1,  team: { id: 42,  name: 'Arsenal',  logo: 'https://media.api-sports.io/football/teams/42.png'  }, played: 32, won: 23, drawn: 5,  lost: 4,  goalsFor: 71, goalsAgainst: 33, goalDiff: 38, points: 74, form: 'WWWDW', description: 'Champions League' },
  { rank: 2,  team: { id: 50,  name: 'Manchester City',          logo: 'https://media.api-sports.io/football/teams/50.png'  }, played: 32, won: 22, drawn: 5,  lost: 5,  goalsFor: 80, goalsAgainst: 28, goalDiff: 52, points: 71, form: 'WWWWW', description: 'Champions League' },
  { rank: 3,  team: { id: 33,  name: 'Manchester United',        logo: 'https://media.api-sports.io/football/teams/33.png'  }, played: 32, won: 21, drawn: 7,  lost: 4,  goalsFor: 75, goalsAgainst: 36, goalDiff: 39, points: 70, form: 'WDWWW', description: 'Champions League' }, 
  { rank: 4,  team: { id: 40,  name: 'Liverpool',logo: 'https://media.api-sports.io/football/teams/40.png'  }, played: 32, won: 16, drawn: 6,  lost: 10, goalsFor: 62, goalsAgainst: 50, goalDiff: 12,points: 54, form: 'WLWDW', description: 'Champions League' },
  { rank: 5,  team: { id: 47,  name: 'Tottenham',        logo: 'https://media.api-sports.io/football/teams/47.png'  }, played: 32, won: 14, drawn: 5,  lost: 13, goalsFor: 55, goalsAgainst: 55, goalDiff: 0,  points: 47, form: 'LLWWL', description: 'Europa League' },
  { rank: 6,  team: { id: 49,  name: 'Chelsea',          logo: 'https://media.api-sports.io/football/teams/49.png'  }, played: 32, won: 12, drawn: 4,  lost: 16, goalsFor: 30, goalsAgainst: 49, goalDiff: -19, points: 40, form: 'LLLWL', description: '' },
  { rank: 17, team: { id: 62,  name: 'Sheffield Utd',    logo: 'https://media.api-sports.io/football/teams/62.png'  }, played: 32, won: 4,  drawn: 3,  lost: 25, goalsFor: 24, goalsAgainst: 92, goalDiff: -68,points: 15, form: 'LLLLL', description: 'Relegation' },
  { rank: 18, team: { id: 55,  name: 'Brentford',        logo: 'https://media.api-sports.io/football/teams/55.png'  }, played: 32, won: 6,  drawn: 4,  lost: 22, goalsFor: 34, goalsAgainst: 68, goalDiff: -34,points: 22, form: 'LLDLL', description: 'Relegation' }
];


//EXPORTS
const MockData = {
    //Football
    liveFootball: liveFootballMatches,
    upcomingFootball: upcomingMatches,
    finishedFootball: finishedFootballMatches,
    eplStandings: eplStandings,
    //Basketball
    liveBasketball: liveBasketballGames,
    upcomingBasketball: upcomingBasketballGames,
    finishedBasketball: finishedBasketballGames,

    allLive: [...liveFootballMatches, ...liveBasketballGames],

    getById(id) {
        const all = [
            ...liveFootballMatches,
            ...upcomingMatches,
            ...finishedFootballMatches,
            ...liveBasketballGames,
            ...upcomingBasketballGames,
            ...finishedBasketballGames
        ];
        return all.find(match => match.id === parseInt(id)) || null;
    } 
};