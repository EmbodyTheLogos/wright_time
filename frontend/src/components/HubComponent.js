import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {withCookies} from "react-cookie";
import AuthService from "../services/AuthService";

class HubComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    loginUser = (event) => {
        const {cookies} = this.props;
        AuthService.signin('lhn5032@psu.edu', 'password').then((response) => {
            cookies.set('JWT-TOKEN', response.data.accessToken)
        })
    }

    loginInstructor = (event) => {
        const {cookies} = this.props;
        AuthService.signin('bdw5230@psu.edu', 'password').then((response) => {
            cookies.set('JWT-TOKEN', response.data.accessToken)
        })
    }

    loginAdmin = (event) => {
        const {cookies} = this.props;
        AuthService.signin('jmd6724@psu.edu', 'password').then((response) => {
            cookies.set('JWT-TOKEN', response.data.accessToken)
        })
    }


    render() {
        return (
            <div>
                <div className="container mt-4">
                    <Link to={"/pending"} className={"btn btn-secondary btn-block"} onClick={this.loginAdmin}>Administrator</Link>
                    <br/>
                    <Link to={"/user/home"} className={"btn btn-info btn-block"} onClick={this.loginInstructor}>Instructor</Link>
                    <br/>
                    <Link to={"/user/home"} className={"btn btn-info btn-block"} onClick={this.loginUser}>User</Link>
                </div>
            </div>
        )
    }
}

export default withCookies(withRouter(HubComponent))