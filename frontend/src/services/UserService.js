import axios from 'axios'

const USER_REST_API_URL = 'http://localhost:8080/api/users';

class UserService {
    getAll(){
        return axios.get(USER_REST_API_URL);
    }

    getOne(id) {
        return axios.get(USER_REST_API_URL + '/' + id)
    }

    post(user) {
        return axios.post(USER_REST_API_URL, user)
    }

    put(id, user) {
        return axios.put(USER_REST_API_URL + '/' + id, user)
    }

    delete(id) {
        return axios.delete(USER_REST_API_URL + '/' + id)
    }

    getAllInstructors() {
        return axios.get(USER_REST_API_URL + '/instructors');
    }

    getAllStudents() {
        return axios.get(USER_REST_API_URL + '/students');
    }

    getAllAdministrators() {
        return axios.get(USER_REST_API_URL + '/administrators');
    }
}

export default new UserService();