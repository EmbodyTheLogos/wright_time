import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {Button, Col, Container, Row} from "react-bootstrap";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom"
import MyCalendar from "../Calendar/DISABLED_MyCalendar";
import UserService from '../../services/UserService';
import AuthService from "../../services/AuthService";
import MyBigCalendar from "../Calendar/MyBigCalendar";

class UserHomeComponent extends React.Component {
    state = {
        jwtToken: '',
        user: ""
    }

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount(){
        AuthService.user(this.state.jwtToken).then((res) => {
            this.setState({user: res.data})
            console.log(this.state.user)
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
                                {/*<table className="table table-bordered table-hover">*/}
                                {/*    <thead className="thead-dark">*/}
                                {/*    <tr>*/}
                                {/*        <th scope="col" width="150">Calendar</th>*/}
                                {/*        <th scope="col" width="150">Calendar</th>*/}
                                {/*        <th scope="col" width="150">Calendar</th>*/}
                                {/*        <th scope="col" width="150">Calendar</th>*/}
                                {/*    </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody>*/}
                                {/*    <tr>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*    </tr>*/}
                                {/*    <tr>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*    </tr>*/}
                                {/*    <tr>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*    </tr>*/}
                                {/*    <tr>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*    </tr>*/}
                                {/*    <tr>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*    </tr>*/}
                                {/*    <tr>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*        <td>Calendar</td>*/}
                                {/*    </tr>*/}
                                {/*    </tbody>*/}
                                {/*</table>*/}
                                {/*<MyCalendar/>*/}
                                <MyBigCalendar/>
                            </Row>
                            <br/>
                            <Row className={"justify-content-md-left"}>
                                Weekly Flight Hours: __Only God Knows__
                                {/*{UserService.getHours(this.state.user.id)}*/}
                            </Row>
                        </Col>

                        <Col md={1}> </Col>

                        <Col md={4}>
                            <Row>
                                <h4>Upcoming Flights</h4>
                                <table className="table table-bordered table-hover">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" width="150">Date</th>
                                        <th scope={"col"} width="30"> </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Placeholder</td>
                                        <td>
                                            <Button variant={"danger"}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Placeholder</td>
                                        <td>
                                            <Button variant={"danger"}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Placeholder</td>
                                        <td>
                                            <Button variant={"danger"}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Placeholder</td>
                                        <td>
                                            <Button variant={"danger"}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Row>
                            <Row>
                                <h4>Recent Flights</h4>
                                <table className="table table-bordered table-hover">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" width="150">Date</th>
                                        <th scope={"col"} width="30"> </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Placeholder</td>
                                        <td>
                                            <Button variant={"danger"}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Placeholder</td>
                                        <td>
                                            <Button variant={"danger"}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Placeholder</td>
                                        <td>
                                            <Button variant={"danger"}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Placeholder</td>
                                        <td>
                                            <Button variant={"danger"}>
                                                View
                                            </Button>
                                        </td>
                                    </tr>
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