import axios from 'axios';
import {USERS_API_ROUTES} from './apiConfig';

const authService = {
  login: async (data) =>{
    try {
      const object = {
        "username": "",
        "email": data.email,
        "password": data.password
      }
      const response = await axios.post("http://127.0.0.1:8000/login", object);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  register: async (username, email, password) => {
    try {
      const response = await axios.post(USERS_API_ROUTES.REGISTER, {username, email, password});
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  getUsers: async () => {
    try {
      const response = await axios.get(USERS_API_ROUTES.GET_USERS);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}

export default authService;