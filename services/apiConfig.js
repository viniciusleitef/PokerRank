const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const USERS_API_ROUTES = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  GET_USERS: `${BASE_URL}/users`,
  GET_USER_BY_ID: `${BASE_URL}/user/`,
  GET_USER_BY_EMAIL: `${BASE_URL}/user/email/`,
}

export default BASE_URL