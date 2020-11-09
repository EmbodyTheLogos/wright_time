import axios from 'axios'

const SESSION_REST_API_URL = 'http://localhost:8080/api/sessions';

class SessionService {
    getAll(){
        return axios.get(SESSION_REST_API_URL);
    }

    getOne(id) {
        return axios.get(SESSION_REST_API_URL + '/' + id)
    }

    post(session) {
        return axios.post(SESSION_REST_API_URL, session)
    }

    put(id, session) {
        return axios.put(SESSION_REST_API_URL + '/' + id, session)
    }

    delete(id) {
        return axios.delete(SESSION_REST_API_URL + '/' + id)
    }

    getPending() {
        return axios.get(SESSION_REST_API_URL + '/pending');
    }
}

export default new SessionService();