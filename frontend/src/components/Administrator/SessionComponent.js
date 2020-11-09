import React from 'react';
import SessionService from '../../services/SessionService';
import {Link} from "react-router-dom";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {Button} from 'react-bootstrap'

class SessionComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            sessions:[]
        }
    }

    componentDidMount(){
        SessionService.getAll().then((response) => {
            this.setState({ sessions: response.data})
        });
    }

    render (){
        return (
            <div>
                <AdministratorNavbar/>

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
                            <th scope={"col"}> End Time</th>
                            <th scope={"col"}> Score</th>
                            <th scope={"col"}> Comments</th>
                            <th scope={"col"}> State</th>
                            <th scope={"col"}> </th>
                            <th scope={"col"}> </th>
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
                                        <td> {session.endTime}</td>
                                        <td> {session.score}</td>
                                        <td> {session.comments}</td>
                                        <td> {session.state}</td>
                                        <td>
                                            <Link to={"/admin/sessions/edit/" + session.id}
                                               className={"btn btn-warning btn-block"}>Edit Session</Link>
                                        </td>
                                        <td>
                                            <Button variant={"danger"}
                                                    onClick={() => {
                                                        SessionService.delete(session.id);
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
                    <Link to={"/admin/sessions/add"} className={"btn btn-dark"}>Add Session</Link>
                </div>

            </div>
        )
    }
}
export default SessionComponent