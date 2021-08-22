import axios from "axios";
const baseurl = process.env.NODE_ENV == "production" ? "/api" : "";
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || baseurl;

class DeploymentService {
    async local_deploy(token, data) {
        try {
            const response = await axios.post(`${BACKEND_API_URL}/v1/deploy/local`, data, {
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
    async cloud_deploy(token, data) {
        try {
            const response = await axios.post(`${BACKEND_API_URL}/v1/deploy/cloud`, data, {
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

export default new DeploymentService();
