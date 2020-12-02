import axios from 'axios'

const SESSION_REST_API_URL = 'http://localhost:8080/api/sessions';

class SessionService {
    getAll(token) {
        return axios.get(SESSION_REST_API_URL, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    }

    getOne(token, id) {
        return axios.get(SESSION_REST_API_URL + '/' + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    post(token, session) {
        return axios.post(SESSION_REST_API_URL, session, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    put(token, id, session) {
        return axios.put(SESSION_REST_API_URL + '/' + id, session, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    delete(token, id) {
        return axios.delete(SESSION_REST_API_URL + '/' + id,{
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    getPending(token) {
        return axios.get(SESSION_REST_API_URL + '/pending', {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    }

    approve(token, id) {
        return axios.put(SESSION_REST_API_URL + '/' + id + '/approve', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    decline(token, id) {
        return axios.put(SESSION_REST_API_URL + '/' + id + '/decline', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}

export default new SessionService();