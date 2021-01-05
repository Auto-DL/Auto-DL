import axios from 'axios'
// const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class HomeService {
	
	async step_1(token,data) {
		try {
			const response = await axios.post(`v1/project/new`, data
			,
			{headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			}})
			return response
		} catch (error) {
			return error.response
		}
    }

}

export default new HomeService()
