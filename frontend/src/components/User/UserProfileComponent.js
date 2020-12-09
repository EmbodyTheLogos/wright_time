import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import CertificationService from "../../services/CertificationService";

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

    componentDidMount(){
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

                <h3>Profile of {this.state.user.firstName + " " + this.state.user.lastName}</h3>
                <br/>
                <br/>
                <h5>Contact at: {this.state.user.email}</h5>
                <br/>
                <h5>Born: {this.state.user.dateOfBirth}</h5>
                <br/>
                <h5>{this.state.hours} total flight hours</h5>
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