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
        certificates: ""
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
                this.setState({certificates: res.data})
            })
        })
    }

    render() {
        return (
            <div>
                <UserNavbar/>
                <br/>

                <h3>User Profile Formatting Placeholder</h3>
                <br/>
                <br/>
                <h5>{this.state.user.firstName + " " + this.state.user.lastName}</h5>
                <br/>
                <h5>{this.state.user.email}</h5>
                <br/>
                <h5>{this.state.user.dateOfBirth}</h5>
                <br/>
                <h5>{this.state.hours} total flight hours</h5>
                <br/>
                <h5>{JSON.stringify(this.state.certificates)}</h5>

            </div>
        )
    }
}

export default withCookies(withRouter(UserProfileComponent))