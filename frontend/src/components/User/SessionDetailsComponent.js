import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import AuthService from "../../services/AuthService";
import SessionService from "../../services/SessionService";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";

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

            var startDate = new Date(year, month, day)
            startDate.setHours(res.data.startTime)

            this.setState({
                aircraftId: res.data.aircraft.id,
                instructorId: res.data.instructor.id,
                studentId: res.data.student.id,
                startTime: res.data.startTime,
                score: res.data.score,
                comments: res.data.comments,
                state: res.data.state,
                date: startDate,
                aircraft: res.data.aircraft,
                instructor: res.data.instructor,
                student: res.data.student
            });

            console.log(this.state.date)
        })
    }

    render() {
        const role = this.state.user.role
        const state = this.state.state
        return (
            <div>
                <UserNavbar/>
                <br/>

                <h3>Session Details</h3>
                <br/>
                {state === "COMPLETE" ? <h5>Completed at: {this.state.date + ""}</h5> :
                    <h5>Scheduled for: {this.state.date + ""}</h5>}

                <h5>Aircraft: {this.state.aircraft.manufacturer + " " + this.state.aircraft.model + " " + this.state.aircraft.name}</h5>
                <h5>Instructor: {this.state.instructor.firstName + " " + this.state.instructor.lastName}</h5>
                <h5>Student: {this.state.student.firstName + " " + this.state.student.lastName}</h5>
                {this.state.state === "PENDING" && <h5>State: Pending</h5>}
                {this.state.state === "DECLINED" && <h5>State: Declined</h5>}
                {this.state.state === "CANCELLED" && <h5>State: Cancelled</h5>}
                {this.state.state === "APPROVED" && <h5>State: Approved</h5>}
                {this.state.state === "COMPLETED" && <h5>State: Completed</h5>}

                {this.state.state === "COMPLETED" && <h5>Score: {this.state.score}</h5>}
                {this.state.state === "COMPLETED" && <h5>Comments: {this.state.comments}</h5>}

            </div>
        )
    }
}

export default withCookies(withRouter(SessionDetailsComponent))