import axios from 'axios'

const AIRCRAFT_REST_API_URL = 'http://localhost:8080/api/aircraft';

class AircraftService {
    getUsers(){
        return axios.get(AIRCRAFT_REST_API_URL);
    }
}

export default new AircraftService();