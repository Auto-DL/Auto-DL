import axios from 'axios'
// const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL

class LoginService {
	
	login(data) {
		return axios.post(`auth/login/`,data)
		.then(response => response)
		// .catch(error => {
		//   if (error.response) {
		// 	console.log(error.response);
		//   }
		// });
		.catch(error => error.response)
    }
    
    register(data) {
		return axios.post(`auth/register/`,data)
		.then(response => response)
    //   	.catch(error => {
    //     if (error.response) {
    //       console.log(error.response);
    //     }
	//   });
	.catch(error => error.response)
	}

}

export default new LoginService()
