import axios from 'axios'

const CERTIFICATION_REST_API_URL = 'http://localhost:8080/api/certifications';

class CertificationService {
    getAll(){
        return axios.get(CERTIFICATION_REST_API_URL);
    }

    getOne(id) {
        return axios.get(CERTIFICATION_REST_API_URL + '/' + id)
    }

    post(certification) {
        return axios.post(CERTIFICATION_REST_API_URL, certification)
    }

    put(id, certification) {
        return axios.put(CERTIFICATION_REST_API_URL + '/' + id, certification)
    }

    delete(id) {
        return axios.delete(CERTIFICATION_REST_API_URL + '/' + id)
    }
}

export default new CertificationService();