import axios from 'axios'

const AIRCRAFT_REST_API_URL = 'http://localhost:8080/api/aircraft';

class AircraftService {
    getAircrafts(){
        return axios.get(AIRCRAFT_REST_API_URL);
    }

    postAircraft(aircraft) {
        return axios.post(AIRCRAFT_REST_API_URL, aircraft)
    }
}

export default new AircraftService();