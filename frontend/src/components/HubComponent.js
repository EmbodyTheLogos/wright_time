import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {withCookies} from "react-cookie";
import AuthService from "../services/AuthService";

class HubComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {cookies} = this.props;
        AuthService.signin('jmd6724@psu.edu', 'password').then((response) => {
            console.log(response)
            console.log(response.data.accessToken)
            cookies.set('JWT-TOKEN', response.data.accessToken)
        })
    }

    render() {
        return (
            <div>

                <div className="container mt-4">
                    <Link to={"/admin/home"} className={"btn btn-secondary btn-block"}>Administrator</Link>
                    <br/>
                    <Link to={"/user/home"} className={"btn btn-info btn-block"}>User</Link>
                </div>


            </div>
        )
    }
}

export default withCookies(withRouter(HubComponent))