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
                        <td> Aircraft Id</td>
                        <td> Aircraft Manufacturer</td>
                        <td> Aircraft Name</td>
                        <td> Aircraft Model</td>
                        <td> Aircraft Year</td>
                        <td> Aircraft Maintenance Day</td>
                        <td> Aircraft Min. Training Duration</td>
                        <td> Buttons</td>
                        <td> Buttons</td>
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
                                    <td> {aircraft.maintenance_day}</td>
                                    <td> {aircraft.minimum_training_duration}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>

                <Link to="/aircraft/add">
                    <button type="button">
                        Edit Aircraft
                    </button>
                </Link>

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

export default AircraftComponent