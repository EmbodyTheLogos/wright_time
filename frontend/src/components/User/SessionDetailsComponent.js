import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import AuthService from "../../services/AuthService";
import SessionService from "../../services/SessionService";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {Container} from "react-bootstrap";
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
                <div style={bg}>
                    <Container style={content}>
                        <h2>Session Details</h2>
                        <br/>
                        {state === "COMPLETE" ? <h4>Completed at: {this.state.date + ""}</h4> :
                            <h4>Scheduled for: {this.state.date + ""}</h4>}
                        <br/>

                        <table className="table table-hover table-fixed">
                            <thead/>
                            <tbody>
                            <tr>
                                <td style={{textAlign: "right", fontSize: '20px'}} width={'50%'}>Aircraft:</td>
                                <td style={{
                                    textAlign: "left",
                                    fontSize: '20px'
                                }}>{this.state.aircraft.manufacturer + " " + this.state.aircraft.model + " " + this.state.aircraft.name}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "right", fontSize: '20px'}}>Instructor:</td>
                                <td style={{
                                    textAlign: "left",
                                    fontSize: '20px'
                                }}>{this.state.instructor.firstName + " " + this.state.instructor.lastName}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "right", fontSize: '20px'}}>Student:</td>
                                <td style={{
                                    textAlign: "left",
                                    fontSize: '20px'
                                }}>{this.state.student.firstName + " " + this.state.student.lastName}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "right", fontSize: '20px'}}>State:</td>
                                {this.state.state === "PENDING" &&
                                <td style={{textAlign: "left", fontSize: '20px'}}>Pending</td>}
                                {this.state.state === "DECLINED" &&
                                <td style={{textAlign: "left", fontSize: '20px'}}>Declined</td>}
                                {this.state.state === "CANCELLED" &&
                                <td style={{textAlign: "left", fontSize: '20px'}}>Cancelled</td>}
                                {this.state.state === "APPROVED" &&
                                <td style={{textAlign: "left", fontSize: '20px'}}>Approved</td>}
                                {this.state.state === "COMPLETE" &&
                                <td style={{textAlign: "left", fontSize: '20px'}}>Completed</td>}
                            </tr>
                            {this.state.state === "COMPLETE" && <tr>
                                <td style={{textAlign: "right", fontSize: '20px'}}>Score:</td>
                                <td style={{
                                    textAlign: "left",
                                    fontSize: '20px'
                                }}>{this.state.score}</td>
                            </tr>}
                            {this.state.state === "COMPLETE" && <tr>
                                <td style={{textAlign: "right", fontSize: '20px'}}>Comments:</td>
                                <td style={{
                                    textAlign: "left",
                                    fontSize: '20px'
                                }}>{this.state.comments}</td>
                            </tr>}
                            </tbody>
                        </table>
                    </Container>
                </div>

            </div>
        )
    }
}

export default withCookies(withRouter(SessionDetailsComponent))