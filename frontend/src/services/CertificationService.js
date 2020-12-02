import axios from 'axios'

const CERTIFICATION_REST_API_URL = 'http://localhost:8080/api/certifications';

class CertificationService {
    getAll(token) {
        return axios.get(CERTIFICATION_REST_API_URL, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    }

    getOne(token, id) {
        return axios.get(CERTIFICATION_REST_API_URL + '/' + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    post(token, certification) {
        return axios.post(CERTIFICATION_REST_API_URL, certification, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    put(token, id, certification) {
        return axios.put(CERTIFICATION_REST_API_URL + '/' + id, certification, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    delete(token, id) {
        return axios.delete(CERTIFICATION_REST_API_URL + '/' + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}

export default new CertificationService();