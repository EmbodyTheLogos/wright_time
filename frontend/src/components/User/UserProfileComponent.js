import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";

class UserProfileComponent extends React.Component {

    constructor(props) {
        super(props);
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