import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";

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

export default UserProfileComponent