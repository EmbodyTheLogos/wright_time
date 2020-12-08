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
        sessions:[],
        jwtToken: "",
        user: ""
    }


    constructor(props){
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount(){
        AuthService.user(this.state.jwtToken).then((res) => {
            this.setState({user: res.data})
            //console.log(this.state.user)
        })

        SessionService.getAll(this.state.jwtToken).then((response) => {
            this.setState({ sessions: response.data})
        });
    }

    render (){
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
                            <th scope={"col"}> Aircraft ID</th>
                            <th scope={"col"}> Instructor ID</th>
                            <th scope={"col"}> Student ID</th>
                            <th scope={"col"}> Date</th>
                            <th scope={"col"}> Start Time</th>
                            <th scope={"col"}> Score</th>
                            <th scope={"col"}> Comments</th>
                            <th scope={"col"}> State</th>
                            <th scope={"col"}/>
                            {role === "ROLE_ADMIN" && <th scope={"col"}/>}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.sessions.map(
                                session =>
                                    <tr key = {session.id}>
                                        <th scope={"row"}> {session.id}</th>
                                        <td> {session.aircraft.id}</td>
                                        <td> {session.instructor.id}</td>
                                        <td> {session.student.id}</td>
                                        <td> {session.date}</td>
                                        <td> {session.startTime}</td>
                                        <td> {session.score}</td>
                                        <td> {session.comments}</td>
                                        <td> {session.state}</td>
                                        {role === "ROLE_ADMIN" &&
                                            <td>
                                                <Link to={"/admin/sessions/edit/" + session.id}
                                                  className={"btn btn-warning btn-block"}>Edit Session</Link>
                                            </td>
                                        }
                                        {role === "ROLE_ADMIN" &&
                                            <td>
                                                <Button variant={"danger"}
                                                        onClick={() => {
                                                            SessionService.delete(session.id);
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
                    <Link to={"/admin/sessions/add"} className={"btn btn-dark"}>Add Session</Link>
                </div>

            </div>
        )
    }
}
export default withCookies(withRouter(SessionComponent))