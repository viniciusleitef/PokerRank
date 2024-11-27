import { GAME_API_ROUTES } from "./apiConfig";
import axios from 'axios'

const gameService = {
  createGame: async (data) => {
    try {
      const response = await axios.post(GAME_API_ROUTES.CREATE_GAME, data); 
      console.log(response)
    } catch (error){
      if (error.code == "ERR_NETWORK"){
        throw new Error(
          "Conexão com servidor perdida, tente recarregar a página em alguns estantes",
        );
        }
      throw new Error(error.response.data.detail);
    }
  },

  getGameById: async(game_id) =>{
    try {
      console.log(game_id)
      const response = await axios.get(`${GAME_API_ROUTES.GET_GAME_BY_ID}/${game_id}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      if (error.code == "ERR_NETWORK"){
        throw new Error(
          "Conexão perdida com o servidor. Tente novamente mais tarde"
        )
      }
      throw new Error(error.response.data.detail);
    }
  },

  getAllGamesByLeagueId: async(league_id) =>{
    try{
      const response = await axios.get(`${GAME_API_ROUTES.GET_ALL_GAMES_BY_LEAGUE_ID}/${league_id}`); 
      return response.data;
    }catch (error){
      if (error.code == "ERR_NETWORK"){
        throw new Error(
          "Conexão perdida com o servidor. Tente novamente mais tarde"
        )
      }
      throw new Error(error.response.data.detail);
    }
  },

  addPlayerGame: async(data) =>{
    try{
      const response = await axios.post(GAME_API_ROUTES.ADD_PLAYER_GAME, data); 
      return response.data;
    } catch (error){
      if (error.code == "ERR_NETWORK"){
        throw new Error(
          "Conexão perdida com o servidor. Tente novamente mais tarde"
        )
      }
      throw new Error(error.response.data.detail);
    }
  },

  getGameRanking: async(game_id) =>{
    try{
      const response = await axios.get(`${GAME_API_ROUTES.GET_GAME_RANKING_BY_GAME_ID}/${game_id}`); 
      console.log(response.data)
      return response.data;
    } catch (error){
      if (error.code == "ERR_NETWORK"){
        throw new Error(
          "Conexão perdida com o servidor. Tente novamente mais tarde"
        )
      }
      throw new Error(error.response.data.detail);
    }
  }
};

export default gameService;
