import axios from 'axios'
// const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class HomeService {
	
	async step_1(data) {
		try {
			const response = await axios.post(`auth/new_project/`, data)
			return response
		} catch (error) {
			return error.response
		}
    }

}

export default new HomeService()
