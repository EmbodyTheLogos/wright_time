import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import CertificationService from "../../services/CertificationService";
import {Col, Container, Row} from "react-bootstrap";

class UserProfileComponent extends React.Component {
    state = {
        jwtToken: "",
        user: "",
        hours: 0,
        certifications: [],
    }

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount() {
        AuthService.user(this.state.jwtToken).then((res) => {
            this.setState({user: res.data})
            UserService.getTotalHours(this.state.jwtToken, this.state.user.id).then((res) => {
                this.setState({hours: res.data})
            })
            CertificationService.getByUser(this.state.jwtToken, this.state.user.id).then((res) => {
                this.setState({certifications: res.data})
            })
        })
    }

    render() {
        return (
            <div>
                <UserNavbar/>
                <br/>

                <h3 style={{textAlign: "left", marginLeft: "50px"}}>Profile
                    of {this.state.user.firstName + " " + this.state.user.lastName}</h3>
                <h5 style={{textAlign: "left", marginLeft: "50px"}}>Contact at: {this.state.user.email}</h5>

                <Container>
                    <Row>
                        <Col sm={6}>
                            <h5 style={{textAlign: "right"}}>Role:</h5>
                        </Col>
                        <Col sm={6}>
                            {this.state.user.role === "ROLE_ADMIN" && <h5 style={{textAlign: "left"}}>Admin</h5>}
                            {this.state.user.role === "ROLE_INSTRUCTOR" &&
                            <h5 style={{textAlign: "left"}}>Instructor</h5>}
                            {this.state.user.role === "ROLE_STUDENT" && <h5 style={{textAlign: "left"}}>Student</h5>}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <h5 style={{textAlign: "right"}}>Born on: </h5>
                        </Col>
                        <Col sm={6}>
                            <h5 style={{textAlign: "left"}}>{this.state.user.dateOfBirth}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <h5 style={{textAlign: "right"}}>Total flight time:</h5>
                        </Col>
                        <Col sm={6}>
                            <h5 style={{textAlign: "left"}}>{this.state.hours} Hours</h5>
                        </Col>
                    </Row>
                </Container>
                <br/>
                <h5>Aircraft You Are Certified to Fly: </h5>
                {
                    this.state.certifications.map(cert =>
                        <h5>{cert.aircraft.manufacturer + ' ' + cert.aircraft.name + ' ' + cert.aircraft.model}</h5>
                    )
                }


            </div>
        )
    }
}

export default withCookies(withRouter(UserProfileComponent))