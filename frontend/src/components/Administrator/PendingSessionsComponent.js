import React from 'react';
import SessionService from '../../services/SessionService';
import {withRouter} from "react-router-dom";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {Button} from 'react-bootstrap'
import {withCookies} from "react-cookie";

class PendingSessionsComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sessions: []
        }
    }

    componentDidMount() {
        SessionService.getPending().then((response) => {
            this.setState({sessions: response.data})
        });
    }

    render() {
        return (
            <div>
                <AdministratorNavbar/>

                <h1>Pending Sessions List</h1>
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
                            <th scope={"col"}> End Time</th>
                            <th scope={"col"}></th>
                            <th scope={"col"}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.sessions.map(
                                session =>
                                    <tr key={session.id}>
                                        <th scope={"row"}> {session.id}</th>
                                        <td> {session.aircraft.id}</td>
                                        <td> {session.instructor.id}</td>
                                        <td> {session.student.id}</td>
                                        <td> {session.date}</td>
                                        <td> {session.startTime}</td>
                                        <td> {session.endTime}</td>
                                        <td>
                                            <Button variant={"success"}
                                                    onClick={() => {
                                                        SessionService.approve(session.id);
                                                        window.location.reload(false);
                                                    }}>
                                                Approve
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant={"danger"}
                                                    onClick={() => {
                                                        SessionService.decline(session.id);
                                                        window.location.reload(false);
                                                    }}>
                                                Decline
                                            </Button>
                                        </td>
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

export default withCookies(withRouter(PendingSessionsComponent))