import axios from 'axios'

const AUTH_REST_API_URL = 'http://localhost:8080/api/auth';

class AuthService {
    signin(email, password) {
        return axios.post(AUTH_REST_API_URL + "/signin", {
            email: email,
            password: password
        })
    }
}

export default new AuthService()