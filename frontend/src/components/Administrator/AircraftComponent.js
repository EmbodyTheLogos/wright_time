import React from 'react';
import AircraftService from '../../services/AircraftService';
import {Link, withRouter} from "react-router-dom";
import {Button, Container} from 'react-bootstrap'
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {withCookies} from "react-cookie";
import AuthService from "../../services/AuthService";
import UserNavbar from "../Navbars/UserNavbar";
import BGImage from "../../Images/cloudy_sky.jpg"

var bg = {
    backgroundImage: `url(${BGImage})`,
    display: 'flex',
    height: '100vh',
    // borderStyle: 'solid',
    // borderColor: 'yellow',
}

var content = {
    backgroundColor: 'white',
    margin: '10px auto',
    paddingTop: '20px',
    paddingRight: '30px',
    paddingLeft: '30px',
    paddingBottom: '20px',
    // borderStyle: 'solid',
    // borderColor: 'red',
    overflow: 'auto',
}

class AircraftComponent extends React.Component {
    state = {
        aircrafts: [],
        jwtToken: "",
        user: ""
    }

    constructor(props) {
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount() {
        AuthService.user(this.state.jwtToken).then((res) => {
            this.setState({user: res.data})
            console.log(this.state.user)
        })

        AircraftService.getAll(this.state.jwtToken).then((response) => {
            this.setState({aircrafts: response.data})
        });
    }

    render() {
        const role = this.state.user.role
        return (
            <div>
                {role === "ROLE_ADMIN" ? <AdministratorNavbar/> : <UserNavbar/>}
                <div style={bg}>
                    <Container style={content}>
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
                                    <th scope={"col"}> Training Duration</th>
                                    {role === "ROLE_ADMIN" && <th scope={"col"}></th>}
                                    {role === "ROLE_ADMIN" && <th scope={"col"}></th>}
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.aircrafts.map(
                                        aircraft =>
                                            <tr key={aircraft.id}>
                                                <th scope={"row"}> {aircraft.id}</th>
                                                <td> {aircraft.manufacturer}</td>
                                                <td> {aircraft.name}</td>
                                                <td> {aircraft.model}</td>
                                                <td> {aircraft.year}</td>
                                                <td> {aircraft.maintenanceDay}</td>
                                                <td> {aircraft.trainingDuration}</td>
                                                {role === "ROLE_ADMIN" &&
                                                <td>
                                                    <Link to={"/admin/aircraft/edit/" + aircraft.id}
                                                          className={"btn btn-warning btn-block"}>Edit Aircraft</Link>
                                                </td>
                                                }
                                                {role === "ROLE_ADMIN" &&
                                                <td>
                                                    <Button variant={"danger"}
                                                            onClick={() => {
                                                                AircraftService.delete(this.state.jwtToken, aircraft.id);
                                                                window.location.reload(false);
                                                            }}>
                                                        Delete
                                                    </Button>
                                                </td>
                                                }
                                            </tr>
                                    )
                                }
                                </tbody>
                            </table>

                            <br/>
                            {role === "ROLE_ADMIN" &&
                            <Link to={"/admin/aircraft/add"} className={"btn btn-dark"}>Add Aircraft</Link>}

                        </div>
                    </Container>
                </div>

            </div>
        )
    }
}

export default withCookies(withRouter(AircraftComponent))