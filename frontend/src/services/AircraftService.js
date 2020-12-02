import axios from 'axios'

const AIRCRAFT_REST_API_URL = 'http://localhost:8080/api/aircraft';

class AircraftService {
    getAll(token) {
        return axios.get(AIRCRAFT_REST_API_URL, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
    }

    getOne(token, id) {
        return axios.get(AIRCRAFT_REST_API_URL + '/' + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    post(token, aircraft) {
        return axios.post(AIRCRAFT_REST_API_URL, aircraft, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    put(token, id, aircraft) {
        return axios.put(AIRCRAFT_REST_API_URL + '/' + id, aircraft, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }

    delete(token, id) {
        return axios.delete(AIRCRAFT_REST_API_URL + '/' + id, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
    }
}

export default new AircraftService();