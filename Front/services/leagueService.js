import { LEAGUE_API_ROUTES } from "./apiConfig";
import axios from "axios";

const leagueService = {
  createLeague: async (leagueSchema) => {
    try {
      const response = await axios.post(
        LEAGUE_API_ROUTES.CREATE_LEAGUE,
        leagueSchema,
      );
      console.log(response);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        throw new Error(
          "Conexão com servidor perdida, tente recarregar a página em alguns estantes",
        );
      }
      throw new Error(error.response.data.detail);
    }
  },

  getLeague: async (league_id) => {
    try {
      const response = await axios.get(
        `${LEAGUE_API_ROUTES.GET_LEAGUE_BY_ID}/${league_id}`,
      );
      console.log(response);
      return response;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        throw new Error(
          "Conexão com servidor perdida, tente recarregar a página em alguns estantes",
        );
      }
      throw new Error(error.response.data.detail);
    }
  },

  getAllLeagues: async (user_id) => {
    try {
      const response = await axios.get(
        `${LEAGUE_API_ROUTES.GET_ALL_LEAGUES_BY_USER_ID}/${user_id}`,
      );
      return response;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        throw new Error(
          "Conexão com servidor perdida, tente recarregar a página em alguns estantes",
        );
      }
      throw new Error(error.response.data.detail);
    }
  },

  getLeagueParticipants: async (league_id) => {
    try {
      const response = await axios.get(`${LEAGUE_API_ROUTES.GET_ALL_LEAGUE_PARTICIPANTS}/${league_id}`)
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        throw new Error(
          "Conexão com servidor perdida, tente recarregar a página em alguns estantes",
        );
      }
      throw new Error(error.response.data.detail);
    }
  },

  getLeagueParticipantsByGameId: async (game_id) => {
    try {
      const response = await axios.get(`${LEAGUE_API_ROUTES.GET_ALL_LEAGUE_PARTICIPANTS_BY_GAME_ID}/${game_id}`)
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        throw new Error(
          "Conexão com servidor perdida, tente recarregar a página em alguns estantes",
        );
      }
      throw new Error(error.response.data.detail);
    }
  }
};

export default leagueService;
