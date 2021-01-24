import axios from "axios";
// const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class HomeService {
  async delete_project(token, data) {
    try {
      const response = await axios.post(`v1/project/delete/`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async get_all(token, data) {
    try {
      const response = await axios.post(`v1/projects/all/`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async create_project(token, data) {
    try {
      const response = await axios.post(`v1/project/new/`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async edit_project(token, data) {
    try {
      const response = await axios.post(`v1/project/edit/`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async get_project(token, data) {
    try {
      const response = await axios.post(`v1/project/get/`, data, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new HomeService();
