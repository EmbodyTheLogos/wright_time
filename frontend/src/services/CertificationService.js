import axios from 'axios'

const CERTIFICATION_REST_API_URL = 'http://localhost:8080/api/certifications';

class CertificationService {
    getCertifications(){
        return axios.get(CERTIFICATION_REST_API_URL);
    }

    getOneCertification(id) {
        return axios.get(CERTIFICATION_REST_API_URL + '/' + id)
    }

    postCertification(certification) {
        return axios.post(CERTIFICATION_REST_API_URL, certification)
    }

    putCertification(id, certification) {
        return axios.put(CERTIFICATION_REST_API_URL + '/' + id, certification)
    }

    deleteCertification(id) {
        return axios.delete(CERTIFICATION_REST_API_URL + '/' + id)
    }
}

export default new CertificationService();