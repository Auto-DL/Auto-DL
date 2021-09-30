import axios from "axios";
const baseurl = process.env.NODE_ENV === "production" ? "/api" : "";
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || baseurl;

class HomeService {
  async get_hyperparams(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/hyperparams/get/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async save_hyperparams(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/hyperparams/save/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async download_code(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/code/download/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async generate_code(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/generate/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async save_pre(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/preprocessing/save/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async get_pre(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/preprocessing/get/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async train_model(token, data) {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/v1/train/`, data, {
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
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/layers/get/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async save_layers(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/layers/save/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async delete_project(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/project/delete/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async get_all(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/projects/all/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async create_project(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/project/new/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async edit_project(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/project/edit/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async clone_project(token, data) {
    try {
      const response = await axios.post(`v1/project/clone/`, data, {
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
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/project/get/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async share_project(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/project/share/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async get_all_users(token) {
    try {
      const response = await axios.get(`${BACKEND_API_URL}/v1/users/all/`, {
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

  async gitUsername(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/github/getusername/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async publish_to_github(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/github/publish/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async authorize_github(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/github/authorize/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async logout_github(token, data) {
    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/v1/github/logout/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new HomeService();
