import axios from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import { AuthAPI, FormValues } from "./AuthModel";

const baseurl = process.env.NODE_ENV === "production" ? "/api" : "";
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || baseurl;

class AuthService {
  async login(data: FormValues): Promise<AuthAPI> {
    try {
      const response = await axios.post<AuthAPI>(`${BACKEND_API_URL}/auth/login/`, {
        username: data.username,
        password: data.password,
      });

      if (response.data.token) {
        setCookie(null, "token", response.data.token, {
          maxAge: 2 * 24 * 60 * 60,
        });
      }

      return {
        message: response.data.message,
        status: response.status == 200,
        username: response.data.user,
      };
    } catch (error) {
      return {
        message: "Server error! Please try again later in some time",
        status: false,
      };
    }
  }

  async register(data: FormValues): Promise<AuthAPI> {
    try {
      const response = await axios.post<AuthAPI>(`${BACKEND_API_URL}/auth/register/`, {
        username: data.username,
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
      });
      if (response.data.token) {
        setCookie(null, "token", response.data.token, {
          maxAge: 2 * 24 * 60 * 60,
        });
      }

      return {
        message: response.data.message,
        status: response.status == 200,
        username: response.data.user,
      };
    } catch (error) {
      return {
        message: "Server error! Please try again later in some time",
        status: false,
      };
    }
  }

  async verifyEmail(username: string): Promise<AuthAPI> {
    try {
      const response = await axios.post<AuthAPI>(`${BACKEND_API_URL}/auth/email/verify/`, {
        username: username,
      });
      return {
        message: response.data.message,
        status: response.status == 200,
      };
    } catch (error) {
      return {
        message: "Server error! Please try again later in some time",
        status: false,
      };
    }
  }

  async verifyOTP(username: string, otp: string): Promise<AuthAPI> {
    try {
      const response = await axios.post<AuthAPI>(`${BACKEND_API_URL}/auth/otp/verify/`, {
        username: username,
        received_otp: otp,
      });
      return {
        message: response.data.message,
        status: response.status == 200,
      };
    } catch (error) {
      return {
        message: "Server error! Please try again later in some time",
        status: false,
      };
    }
  }

  async forgotPassword(username: string): Promise<AuthAPI> {
    try {
      const response = await axios.post<AuthAPI>(`${BACKEND_API_URL}/auth/password/forgot/`, {
        username: username,
      });
      return {
        message: response.data.message,
        status: response.status == 200,
      };
    } catch (error) {
      return {
        message: "Server error! Please try again later in some time",
        status: false,
      };
    }
  }

  async updatePassword(username: string, password: string): Promise<AuthAPI> {
    try {
      const response = await axios.post<AuthAPI>(
        `${BACKEND_API_URL}/auth/password/update/`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + parseCookies().token,
          },
        }
      );
      return {
        message: response.data.message,
        status: response.status == 200,
      };
    } catch (error) {
      return {
        message: "Server error! Please try again in some time",
        status: false,
      };
    }
  }

  async logout(username: string): Promise<AuthAPI> {
    try {
      const response = await axios.post<AuthAPI>(
        `${BACKEND_API_URL}/auth/logout/`,
        {
          username: username,
        },
        {
          headers: {
            Authorization: "Bearer " + parseCookies().token,
          },
        }
      );

      destroyCookie({}, "token");

      return {
        message: response.data.message,
        status: response.status == 200,
      };
    } catch (error) {
      return {
        message: "Server error! Please try again in some time",
        status: false,
      };
    }
  }
}

export default new AuthService();
