const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const USERS_API_ROUTES = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/user`,
  GET_USERS: `${BASE_URL}/users`,
  GET_LIMITED_USERS: `${BASE_URL}/usersLimited`,
  GET_USER_BY_ID: `${BASE_URL}/user`,
  GET_USER_BY_EMAIL: `${BASE_URL}/user/email`,
}

export const LEAGUE_API_ROUTES = {
  GET_LEAGUE_BY_ID: `${BASE_URL}/leagues`,
  GET_ALL_LEAGUES_BY_USER_ID: `${BASE_URL}/leagues`,
  GET_ALL_LEAGUE_PARTICIPANTS: `${BASE_URL}/allLeagueParticipants`,
  GET_ALL_LEAGUE_PARTICIPANTS_BY_GAME_ID: `${BASE_URL}/allLeagueParticipantsGameid`,
  CREATE_LEAGUE: `${BASE_URL}/leagues`
}

export const GAME_API_ROUTES = {
  CREATE_GAME: `${BASE_URL}/game`,
  GET_GAME_BY_ID: `${BASE_URL}/game`,
  GET_ALL_GAMES_BY_LEAGUE_ID: `${BASE_URL}/games`,
  GET_GAME_RANKING_BY_GAME_ID: `${BASE_URL}/gameRanking`,
  ADD_PLAYER_GAME: `${BASE_URL}/addPlayerGame`
}