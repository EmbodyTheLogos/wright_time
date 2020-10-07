import React from 'react';
import AircraftService from '../services/AircraftService';
import {Link} from "react-router-dom";

class AircraftComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            aircrafts:[]
        }
    }

    componentDidMount(){
        AircraftService.getAircrafts().then((response) => {
            this.setState({ aircrafts: response.data})
        });
    }

    render (){
        return (
            <div>
                <h1 className = "text-center"> Aircraft List</h1>
                <table className = "table table-striped">
                    <thead>

                    <tr>
                        <td> ID Number</td>
                        <td> Manufacturer</td>
                        <td> Name</td>
                        <td> Model</td>
                        <td> Year</td>
                        <td> Maintenance Day</td>
                        <td> Min. Training Duration</td>
                        <td> </td>
                        <td> </td>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        this.state.aircrafts.map(
                            aircraft =>
                                <tr key = {aircraft.aircraftId}>
                                    <td> {aircraft.aircraftId}</td>
                                    <td> {aircraft.manufacturer}</td>
                                    <td> {aircraft.name}</td>
                                    <td> {aircraft.model}</td>
                                    <td> {aircraft.year}</td>
                                    <td> {aircraft.maintenanceDay}</td>
                                    <td> {aircraft.minimumTrainingDuration}</td>
                                    <td>
                                        <Link to={"/aircraft/" + aircraft.aircraftId}>
                                            <button type="button">
                                                Edit
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to="/aircraft/add">
                                            <button type="button">
                                                Delete
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>

                <br/>
                <Link to="/aircraft/add">
                    <button type="button">
                        Add Aircraft
                    </button>
                </Link>

            </div>

        )
    }
}
// https://stackoverflow.com/questions/45598854/passing-values-through-react-router-v4-link
export default AircraftComponent