import axios from 'axios'

const USER_REST_API_URL = 'http://localhost:8080/api/users';

class UserService {
    getAll(token){
        return axios.get(USER_REST_API_URL, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    }

    getOne(token, id) {
        return axios.get(USER_REST_API_URL + '/' + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    post(token, user) {
        return axios.post(USER_REST_API_URL, user, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    put(token, id, user) {
        return axios.put(USER_REST_API_URL + '/' + id, user, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    delete(token, id) {
        return axios.delete(USER_REST_API_URL + '/' + id,{
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    getAllInstructors(token) {
        return axios.get(USER_REST_API_URL + '/instructors', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    }

    getAllStudents(token) {
        return axios.get(USER_REST_API_URL + '/students', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    }

    getAllAdministrators(token) {
        return axios.get(USER_REST_API_URL + '/administrators', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    }
}

export default new UserService();