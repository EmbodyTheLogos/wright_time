import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";

class SessionDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <UserNavbar/>
                <br/>

                <h3>Session Details Placeholder</h3>

            </div>
        )
    }
}

export default withCookies(withRouter(SessionDetailsComponent))