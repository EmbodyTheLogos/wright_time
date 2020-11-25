import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {Col, Row, Container, Button} from "react-bootstrap";
import AircraftService from "../../services/AircraftService";

class UserHomeComponent extends React.Component {

    constructor(props) {
        super(props);
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
                                <table className="table table-bordered table-hover">
                                    <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" width="150">Calendar</th>
                                        <th scope="col" width="150">Calendar</th>
                                        <th scope="col" width="150">Calendar</th>
                                        <th scope="col" width="150">Calendar</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                    </tr>
                                    <tr>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                    </tr>
                                    <tr>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                    </tr>
                                    <tr>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                    </tr>
                                    <tr>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                    </tr>
                                    <tr>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                        <td>Calendar</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Row>
                            <br/>
                            <Row className={"justify-content-md-center"}>
                                Weekly Flight Hours: __Only God Knows__
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

export default UserHomeComponent