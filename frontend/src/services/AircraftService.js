import axios from 'axios'

const AIRCRAFT_REST_API_URL = 'http://localhost:8080/api/aircraft';

class AircraftService {
    getAll(){
        return axios.get(AIRCRAFT_REST_API_URL);
    }

    getOne(id) {
        return axios.get(AIRCRAFT_REST_API_URL + '/' + id)
    }

    post(aircraft) {
        return axios.post(AIRCRAFT_REST_API_URL, aircraft)
    }

    put(id, aircraft) {
        return axios.put(AIRCRAFT_REST_API_URL + '/' + id, aircraft)
    }

    delete(id) {
        return axios.delete(AIRCRAFT_REST_API_URL + '/' + id)
    }
}

export default new AircraftService();