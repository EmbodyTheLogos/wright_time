import React from 'react';
import SessionService from '../../services/SessionService';
import {Link, withRouter} from "react-router-dom";
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";

class PerformanceReviewComponent extends React.Component {
    state = {
        sessions:[],
        jwtToken: ''
    }

    constructor(props){
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount(){
        SessionService.getAll().then((response) => {
            this.setState({ sessions: response.data})
        });
    }

    render (){
        return (
            <div>
                <UserNavbar/>

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
export default withCookies(withRouter(PerformanceReviewComponent))