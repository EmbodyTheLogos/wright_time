import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {Link, withRouter} from "react-router-dom";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import CertificationService from "../../services/CertificationService";
import {Button, Col, Container, Row} from "react-bootstrap";
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
                <div style={bg}>
                    <Container style={content}>
                        <h3 style={{textAlign: "left", marginLeft: "50px"}}>Profile
                            of {this.state.user.firstName + " " + this.state.user.lastName}</h3>
                        <h5 style={{textAlign: "left", marginLeft: "50px"}}>Contact at: {this.state.user.email}</h5>
                        <table className="table table-hover table-fixed">
                            <thead/>
                            <tbody>
                            <tr>
                                <td style={{textAlign: "right", fontSize: '20px'}} width={'50%'}>Role</td>
                                {this.state.user.role === "ROLE_ADMIN" && <td style={{textAlign: "left", fontSize: '20px'}}>Admin</td>}
                                {this.state.user.role === "ROLE_INSTRUCTOR" &&
                                <td style={{textAlign: "left", fontSize: '20px'}}>Instructor</td>}
                                {this.state.user.role === "ROLE_STUDENT" &&
                                <td style={{textAlign: "left", fontSize: '20px'}}>Student</td>}
                            </tr>
                            <tr>
                                <td style={{textAlign: "right", fontSize: '20px'}}>Born On</td>
                                <td style={{textAlign: "left", fontSize: '20px'}}>{this.state.user.dateOfBirth}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: "right", fontSize: '20px'}}>Total Flight time</td>
                                <td style={{textAlign: "left", fontSize: '20px'}}>{this.state.hours} Hours</td>
                            </tr>
                            </tbody>
                        </table>
                        <br/>
                        <h5>Certifications Acquired: </h5>
                        <table className="table table-hover table-fixed">
                            <thead/>
                            <tbody>
                            {
                                this.state.certifications.map(
                                    cert =>
                                        <tr key={cert.id}>
                                            <td style={{textAlign: "right", fontSize: '20px'}} width={'50%'}> {cert.aircraft.manufacturer + " " + cert.aircraft.model + " " + cert.aircraft.name}</td>
                                            <td style={{textAlign: "left", fontSize: '20px'}}> {cert.dateObtained}</td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </Container>
                </div>
            </div>
        )
    }
}

export default withCookies(withRouter(UserProfileComponent))