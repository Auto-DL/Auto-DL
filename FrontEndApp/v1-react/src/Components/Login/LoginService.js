import axios from 'axios'
// const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class LoginService {
	
	login(data) {
		return axios.get(`http://127.0.0.1:8000/auth/login/`,data)
    }
    
    register(data) {
		return axios.get(`http://127.0.0.1:8000/auth/register/`,data)
	}

}

export default new LoginService()
