import axios from 'axios'

const AUTH_REST_API_URL = 'http://localhost:8080/api/auth';

class AuthService {
    user(token) {
        return axios.get(AUTH_REST_API_URL + "/user", {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    signin(email, password) {
        return axios.post(AUTH_REST_API_URL + "/signin", {
            email: email,
            password: password
        })
    }

    changePassword(token, password) {
        return axios.post(AUTH_REST_API_URL + "/change_password/", {
            password: password
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}

export default new AuthService()