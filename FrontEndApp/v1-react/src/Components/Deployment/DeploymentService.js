import axios from "axios";
const baseurl = process.env.NODE_ENV == "production" ? "/api" : "";
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL || baseurl;

class DeploymentService {
    async local_deploy(platforms, localDeployVariant) {
        try {
            const res = await axios.get('https://api.github.com/repos/Aditya-ds-1806/Deployment-Flask/releases/latest');
            const data = await res.data;
            const response = {
                assets: [],
                status: res.status,
            }
            platforms.forEach(platform => {
                if (platform === 'windows' && localDeployVariant === 'zip') {
                    response.assets.push(data.zipball_url);
                }
                if (platform === 'linux' && localDeployVariant === 'zip') {
                    response.assets.push(data.tarball_url);
                }
            });
            data.assets.forEach(({browser_download_url, content_type}) => {
                if (
                    (content_type === 'application/octet-stream' && platforms.includes('linux') && localDeployVariant === 'executable') ||
                    (content_type === 'application/vnd.microsoft.portable-executable' && platforms.includes('windows') && localDeployVariant === 'executable')
                    ) {
                    response.assets.push(browser_download_url);
                }
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
    async cloud_deploy(token, data) {
        try {
            const response = await axios.post(`${BACKEND_API_URL}/deployments/cloud`, data, {
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
    async hybrid_deploy(token, data) {
        try {
            const response = await axios.post(`${BACKEND_API_URL}/deployments/hybrid`, data, {
                headers: {
                    "Content-Type": "application/json",
                    token: `${token}`,
                },
                responseType: 'blob',
            });
            return response;
        } catch (error) {
            return error.response;
        }
    }
}

export default new DeploymentService();
