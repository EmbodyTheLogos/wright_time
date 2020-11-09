import React from 'react';
import AircraftService from '../../services/AircraftService';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap'
import AdministratorNavbar from "../Navbars/AdministratorNavbar";

class AircraftComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            aircrafts:[]
        }
    }

    componentDidMount(){
        AircraftService.getAll().then((response) => {
            this.setState({ aircrafts: response.data})
        });
    }

    render (){
        return (
            <div>
                <AdministratorNavbar/>

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
                                    <tr key = {aircraft.id}>
                                        <th scope={"row"}> {aircraft.id}</th>
                                        <td> {aircraft.manufacturer}</td>
                                        <td> {aircraft.name}</td>
                                        <td> {aircraft.model}</td>
                                        <td> {aircraft.year}</td>
                                        <td> {aircraft.maintenanceDay}</td>
                                        <td> {aircraft.minimumTrainingDuration}</td>
                                        <td>
                                            <Link to={"/aircraft/edit/" + aircraft.id}
                                               className={"btn btn-warning btn-block"}>Edit Aircraft</Link>
                                        </td>
                                        <td>
                                            <Button variant={"danger"}
                                                    onClick={() => {
                                                        AircraftService.delete(aircraft.id);
                                                        window.location.reload(false);
                                                    }}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                    <br/>
                    <Link to={"/aircraft/add"} className={"btn btn-dark"}>Add Aircraft</Link>
                </div>

            </div>
        )
    }
}
export default AircraftComponent