import axios from 'axios'
// const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class LoginService {
	
	login(data) {
		return axios.post(`auth/login/`,data)
    }
    
    register(data) {
		return axios.post(`auth/register/`,data)
	}

}

export default new LoginService()
