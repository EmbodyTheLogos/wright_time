import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";

class UserProfileComponent extends React.Component {
    state = {
        jwtToken: "",
        user: "",
        hours: 0
    }

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount(){
        AuthService.user(this.state.jwtToken).then((res) => {
            this.setState({user: res.data})
            //console.log(this.state.user)
            UserService.getHours(this.state.jwtToken, this.state.user.id).then((res) => {
                this.setState({hours: res.data})
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
                <h5>{this.state.hours} PLACEHOLDER -- want total flight hours?</h5>
                <br/>
                <h5>PLACEHOLDER -- way to get all of the user's certifications?</h5>

            </div>
        )
    }
}

export default withCookies(withRouter(UserProfileComponent))