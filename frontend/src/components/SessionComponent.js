import React from 'react';
import SessionService from '../services/SessionService';

class SessionComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            sessions:[]
        }
    }

    componentDidMount(){
        SessionService.getSessions().then((response) => {
            this.setState({ sessions: response.data})
        });
    }

    render (){
        return (
            <div>
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
                                    <tr key = {session.sessionId}>
                                        <th scope={"row"}> {session.sessionId}</th>
                                        <td> {session.aircraft.aircraftId}</td>
                                        <td> {session.instructor.userId}</td>
                                        <td> {session.student.userId}</td>
                                        <td> {session.date}</td>
                                        <td> {session.startTime}</td>
                                        <td> {session.endTime}</td>
                                        <td> {session.score}</td>
                                        <td> {session.comments}</td>
                                        <td> {session.state}</td>
                                        <td>
                                            <a href={"/sessions/edit/" + session.sessionId}
                                               className={"btn btn-warning btn-block"}>Edit Session</a>
                                        </td>
                                        <td>
                                            <a className={"btn btn-danger btn-block"}
                                               onClick={() => {
                                                   SessionService.deleteSession(session.sessionId);
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
                    <a href={"/sessions/add"} className={"btn btn-dark"}>Add Session</a>
                </div>

            </div>
        )
    }
}
export default SessionComponent