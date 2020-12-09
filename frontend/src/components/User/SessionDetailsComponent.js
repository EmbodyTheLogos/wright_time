import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import AuthService from "../../services/AuthService";
import AircraftService from "../../services/AircraftService";
import SessionService from "../../services/SessionService";

class SessionDetailsComponent extends React.Component {
    state = {
        jwtToken: "",
        user: "",
        aircraftId: "",
        instructorId: "",
        studentId: "",
        date: new Date(),
        startTime: "",
        score: "",
        comments: "",
        state: "",
        aircraft: "",
        instructor: "",
        student: ""
    }

    constructor(props) {
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
        this.state.id = props.match.params.id
    }

    componentDidMount() {
        AuthService.user(this.state.jwtToken).then((res) => {
            this.setState({user: res.data})
            //console.log(this.state.user)
        })
        SessionService.getOne(this.state.jwtToken, this.props.match.params.id).then(res => {
            let date = res.data.date.split('-')
            let year = parseInt(date[0])
            let month = parseInt(date[1]) - 1
            let day = parseInt(date[2])

            this.setState({
                aircraftId: res.data.aircraft.id,
                instructorId: res.data.instructor.id,
                studentId: res.data.student.id,
                startTime: res.data.startTime,
                score: res.data.score,
                comments: res.data.comments,
                state: res.data.state,
                date: new Date(year, month, day),
                aircraft: res.data.aircraft,
                instructor: res.data.instructor,
                student: res.data.student
            });
        })
    }

    render() {
        return (
            <div>
                <UserNavbar/>
                <br/>

                <h3>Session Details Placeholder</h3>
                <br/>
                <h1>{this.state.aircraftId + " " + this.state.studentId + " " + this.state.instructorId}</h1>
                <h1>{this.state.date + " " + this.state.startTime}</h1>
                <h1>{this.state.score + " " + this.state.comments + " " + this.state.state}</h1>

            </div>
        )
    }
}

export default withCookies(withRouter(SessionDetailsComponent))