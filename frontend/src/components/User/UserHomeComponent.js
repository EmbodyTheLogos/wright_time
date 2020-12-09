import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {Col, Container, Row} from "react-bootstrap";
import {withCookies} from "react-cookie";
import {Link, withRouter} from "react-router-dom"
import UserService from '../../services/UserService';
import AuthService from "../../services/AuthService";
import MyBigCalendar from "../Calendar/MyBigCalendar";
import SessionService from "../../services/SessionService";

class UserHomeComponent extends React.Component {
    state = {
        jwtToken: '',
        user: "",
        hours: 0,
        recentSessions: [],
        upcomingSessions: []
    }

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount(){
        AuthService.user(this.state.jwtToken).then((res) => {
            this.setState({user: res.data})
            UserService.getHours(this.state.jwtToken, this.state.user.id).then((res) => {
                this.setState({hours: res.data})
            })
            SessionService.getRecent(this.state.jwtToken, this.state.user.id).then((response) => {
                this.setState({recentSessions: response.data})
            });
            SessionService.getUpcoming(this.state.jwtToken, this.state.user.id).then((response) => {
                this.setState({upcomingSessions: response.data})
            });
        })
    }

    render() {
        return (
            <div>
                <UserNavbar/>
                <br/>

                <Container>
                    <Row>
                        <Col md={7}>
                            <Row>
                                <h4>Full Schedule</h4>
                                <MyBigCalendar/>
                            </Row>
                            <br/>
                            <Row className={"justify-content-md-left"}>
                                Flight Hours this Week: {this.state.hours}
                            </Row>
                        </Col>

                        <Col md={1}> </Col>

                        <Col md={4}>
                            <Row>
                                <h4>Upcoming Flights</h4>
                                <table className="table table-bordered table-hover">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" width="100">Date</th>
                                        <th scope="col" width="100">State</th>
                                        <th scope={"col"} width="50">Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.upcomingSessions.map(
                                            session =>
                                                <tr key={session.id}>
                                                    <td> {session.date}</td>
                                                    {session.state === "PENDING" && <td>Pending</td>}
                                                    {session.state === "APPROVED" && <td>Approved</td>}
                                                    {session.state === "COMPLETE" && <td>Complete</td>}
                                                    <td><Link to={"/user/session/details/" + session.id}
                                                              className={"btn btn-primary btn-block"}>View</Link>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </Row>
                            <Row>
                                <h4>Recent Flights</h4>
                                <table className="table table-bordered table-hover">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" width="100">Date</th>
                                        <th scope="col" width="100">State</th>
                                        <th scope={"col"} width="50">Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.recentSessions.map(
                                            session =>
                                                <tr key={session.id}>
                                                    <td> {session.date}</td>
                                                    {session.state === "PENDING" && <td>Pending</td>}
                                                    {session.state === "APPROVED" && <td>Approved</td>}
                                                    {session.state === "COMPLETE" && <td>Complete</td>}
                                                    <td><Link to={"/user/session/details/" + session.id}
                                                              className={"btn btn-primary btn-block"}>View</Link>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default withCookies(withRouter(UserHomeComponent))