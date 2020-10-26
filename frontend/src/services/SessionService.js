import axios from 'axios'

const SESSION_REST_API_URL = 'http://localhost:8080/api/sessions';

class SessionService {
    getSessions(){
        return axios.get(SESSION_REST_API_URL);
    }

    getOneSession(id) {
        return axios.get(SESSION_REST_API_URL + '/' + id)
    }

    postSession(session) {
        return axios.post(SESSION_REST_API_URL, session)
    }

    putSession(id, session) {
        return axios.put(SESSION_REST_API_URL + '/' + id, session)
    }

    deleteSession(id) {
        return axios.delete(SESSION_REST_API_URL + '/' + id)
    }
}

export default new SessionService();