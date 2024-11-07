import axios from 'axios';
import {USERS_API_ROUTES} from './apiConfig';

const authService = {
  login: async (data) =>{
    try {
      const response = await axios.post(USERS_API_ROUTES.LOGIN, data);
      return response.data.access_token;
    } catch (error) {
      if(error.code === "ERR_NETWORK"){
        throw new Error("Conexão com servidor perdida, tente recarregar a página em alguns estantes");
      }
      throw new Error(error.response.data.detail);
    }
  },

  register: async (data) => {
    try {
      const response = await axios.post(USERS_API_ROUTES.REGISTER, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.detail);
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get(USERS_API_ROUTES.GET_USERS);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.detail);
    }
  }
}

export default authService;