import axios from 'axios'

const AIRCRAFT_REST_API_URL = 'http://localhost:8080/api/aircraft';

class AircraftService {
    getAircrafts(){
        return axios.get(AIRCRAFT_REST_API_URL);
    }

    getOneAircraft(id) {
        return axios.get(AIRCRAFT_REST_API_URL + '/' + id)
    }

    postAircraft(aircraft) {
        return axios.post(AIRCRAFT_REST_API_URL, aircraft)
    }

    putAircraft(id, aircraft) {
        return axios.put(AIRCRAFT_REST_API_URL + '/' + id, aircraft)
    }

    deleteAircraft(id) {
        return axios.delete(AIRCRAFT_REST_API_URL + '/' + id)
    }
}

export default new AircraftService();