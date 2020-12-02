import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import AuthService from "../../services/AuthService";

class UserProfileComponent extends React.Component {
    state = {
        jwtToken: "",
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

                <h3>User Profile Placeholder</h3>

            </div>
        )
    }
}

export default withCookies(withRouter(UserProfileComponent))