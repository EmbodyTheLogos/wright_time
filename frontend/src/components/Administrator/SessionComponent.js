import React from 'react';
import SessionService from '../../services/SessionService';
import {Link, withRouter} from "react-router-dom";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {Button} from 'react-bootstrap'
import {withCookies} from "react-cookie";
import AuthService from "../../services/AuthService";
import UserNavbar from "../Navbars/UserNavbar";

class SessionComponent extends React.Component {
    state = {
        sessions: [],
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
            //console.log(this.state.user)
            if (this.state.user.role === "ROLE_ADMIN") {
                SessionService.getAll(this.state.jwtToken).then((response) => {
                    this.setState({sessions: response.data})
                });
            } else {
                SessionService.getApprovedByUser(this.state.jwtToken, this.state.user.id).then((response) => {
                    this.setState({sessions: response.data})
                });
            }
        })
    }

    render() {
        const role = this.state.user.role
        return (
            <div>
                {role === "ROLE_ADMIN" ? <AdministratorNavbar/> : <UserNavbar/>}

                <h1>Session List</h1>
                <div className="container mt-4">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope={"col"}> Session ID</th>
                            <th scope={"col"}> Aircraft</th>
                            <th scope={"col"}> Instructor</th>
                            <th scope={"col"}> Student</th>
                            <th scope={"col"}> Date</th>
                            <th scope={"col"}> Start Time</th>
                            <th scope={"col"}> Score</th>
                            <th scope={"col"}> Comments</th>
                            <th scope={"col"}> State</th>
                            {role === "ROLE_ADMIN" &&<th scope={"col"}/>}
                            {role === "ROLE_ADMIN" && <th scope={"col"}/>}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.sessions.map(
                                session =>
                                    <tr key={session.id}>
                                        <th scope={"row"}> {session.id}</th>
                                        <td> {session.aircraft.manufacturer + " " + session.aircraft.model + " " + session.aircraft.name}</td>
                                        <td> {session.instructor.firstName + ' ' + session.instructor.lastName}</td>
                                        <td> {session.student.firstName + ' ' + session.student.lastName}</td>
                                        <td> {session.date}</td>
                                        <td> {session.startTime}</td>
                                        <td> {session.score}</td>
                                        <td> {session.comments}</td>
                                        <td> {session.state}</td>
                                        {this.state.user.role === "ROLE_ADMIN" &&
                                        <td>
                                            <Link to={"/admin/sessions/edit/" + session.id}
                                                  className={"btn btn-warning btn-block"}>Edit Session</Link>
                                        </td>}
                                        {this.state.user.role === "ROLE_ADMIN" &&
                                        <td>
                                            <Button variant={"danger"}
                                                    onClick={() => {
                                                        SessionService.delete(this.state.jwtToken, session.id);
                                                        window.location.reload(false);
                                                    }}>
                                                Delete
                                            </Button>
                                        </td>}
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                    <br/>
                    {role === "ROLE_ADMIN" &&
                    <Link to={"/sessions/add"} className={"btn btn-dark"}>Add Session</Link>}
                </div>

            </div>
        )
    }
}

export default withCookies(withRouter(SessionComponent))