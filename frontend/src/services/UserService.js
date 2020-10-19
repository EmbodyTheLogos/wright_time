import axios from 'axios'

const USER_REST_API_URL = 'http://localhost:8080/api/users';

class UserService {
    getUsers(){
        return axios.get(USER_REST_API_URL);
    }

    getOneUser(id) {
        return axios.get(USER_REST_API_URL + '/' + id)
    }

    postUser(user) {
        return axios.post(USER_REST_API_URL, user)
    }

    putUser(id, user) {
        return axios.put(USER_REST_API_URL + '/' + id, user)
    }

    deleteUser(id) {
        return axios.delete(USER_REST_API_URL + '/' + id)
    }
}

export default new UserService();