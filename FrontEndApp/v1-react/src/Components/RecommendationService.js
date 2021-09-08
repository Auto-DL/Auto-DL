import axios from "axios";
const baseurl = process.env.NODE_ENV == "production" ? "/api" : "";
const FASTAPI_URL = process.env.REACT_APP_FASTAPI_URL || baseurl;

class RecommendationService {
  async getRecommendations(data) {
    try {
      let recommendationArr = data.map(x => x.name);
      const response = await axios.post(`${FASTAPI_URL}/predict`, {
        layers: recommendationArr,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}

export default new RecommendationService();
