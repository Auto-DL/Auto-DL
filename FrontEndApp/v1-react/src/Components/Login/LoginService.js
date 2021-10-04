import axios from "axios";
require('dotenv').config()
const baseurl = process.env.NODE_ENV === "production" ? "/api" : "";
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || baseurl;

class LoginService {
  async login(data) {
    try {
      console.log("loginService", data)
      const response = await axios.post(`${BACKEND_API_URL}/auth/login/`, data);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async register(data) {
    try {
      console.log("Register Service: ", data)
      const response = await axios.post(
        `${BACKEND_API_URL}/auth/register/`,
        data
      );
      console.log("Response: ", response)
      return response;
    } catch (error) {
      console.log("Register Error:")
      return error.response;
    }
  }
}

export default new LoginService();
