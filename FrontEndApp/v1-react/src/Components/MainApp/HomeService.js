import axios from "axios";
// const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class HomeService {
  async download_code(token, data) {
    try {
      const response = await axios.post(`v1/code/download/`, data, {
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
  async generate_code(token, data) {
    try {
      const response = await axios.post(`v1/generate/`, data, {
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
  async save_pre(token, data) {
    try {
      const response = await axios.post(`v1/preprocessing/save/`, data, {
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
  async get_pre(token, data) {
    try {
      const response = await axios.post(`v1/preprocessing/get/`, data, {
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
  async train_model(token, data) {
    try {
      const response = await axios.post(`v1/train/`, data, {
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

  async get_layers(token, data) {
    try {
      const response = await axios.post(`v1/layers/get/`, data, {
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

  async save_layers(token, data) {
    try {
      const response = await axios.post(`v1/layers/save/`, data, {
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
