import axios from "axios";
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || "";

class LoginService {
  async login(data) {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/auth/login/`, data);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async register(data) {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/auth/register/`, data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new LoginService();
