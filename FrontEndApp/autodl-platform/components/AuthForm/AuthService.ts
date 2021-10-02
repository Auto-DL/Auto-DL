import axios from "axios";
import { UserState } from "./AuthModel";

const baseurl = process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "/api" : "";
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || baseurl;

class AuthService {
  async login(data: UserState): Promise<boolean> {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/auth/login/`, data);
      if (response.status == 200) {
        return true;
      }
      else {
        return true;
      }
    } catch (error) {
      return true;
    }
  }

  async register(data: UserState): Promise<boolean> {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/auth/register/`,
        data
      );
      if (response.status == 200) {
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

export default new AuthService();
