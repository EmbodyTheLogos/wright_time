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
                <h1>Aircraft List</h1>
                <div className="container mt-4">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope={"col"}> ID Number</th>
                            <th scope={"col"}> Manufacturer</th>
                            <th scope={"col"}> Name</th>
                            <th scope={"col"}> Model</th>
                            <th scope={"col"}> Year</th>
                            <th scope={"col"}> Maintenance Day</th>
                            <th scope={"col"}> Min. Training Duration</th>
                            <th scope={"col"}> </th>
                            <th scope={"col"}> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.aircrafts.map(
                                aircraft =>
                                    <tr key = {aircraft.aircraftId}>
                                        <th scope={"row"}> {aircraft.aircraftId}</th>
                                        <td> {aircraft.manufacturer}</td>
                                        <td> {aircraft.name}</td>
                                        <td> {aircraft.model}</td>
                                        <td> {aircraft.year}</td>
                                        <td> {aircraft.maintenanceDay}</td>
                                        <td> {aircraft.minimumTrainingDuration}</td>
                                        <td>
                                            <a href={"/aircraft/edit/" + aircraft.aircraftId}
                                               className={"btn btn-warning btn-block"}>Edit Aircraft</a>
                                        </td>
                                        <td>
                                            <a className={"btn btn-danger btn-block"}
                                                    onClick={() => {
                                                        AircraftService.deleteAircraft(aircraft.aircraftId);
                                                        window.location.reload(false);
                                                    }}>
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                    <br/>
                    <a href={"/aircraft/add"} className={"btn btn-dark"}>Add Aircraft</a>
                </div>

            </div>
        )
    }
}
export default AircraftComponent