import React from 'react';
import AircraftService from '../../services/AircraftService';
import UserNavbar from "../Navbars/UserNavbar";

class UserAircraftViewComponent extends React.Component {

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
                <UserNavbar/>

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
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
export default UserAircraftViewComponent