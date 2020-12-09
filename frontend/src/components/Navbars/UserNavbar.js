import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {Button, Nav, Navbar} from 'react-bootstrap'
import {withCookies} from "react-cookie";
import AuthService from "../../services/AuthService";

class UserNavbar extends React.Component {
    state = {
        jwtToken: "",
        user: ""
    }

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount() {
        AuthService.user(this.state.jwtToken).then((res) => {
            this.setState({user: res.data})
            //console.log(this.state.user)
        })
    }

    render() {
        const role = this.state.user.role
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand style={{fontWeight: "bold", color: "LightSkyBlue"}} href={'/'}>Wright
                        Time</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink exact to="/user/home" style={{marginRight: '15px', color: "grey"}}
                                 activeStyle={{marginRight: '15px', color: "white"}}>Home</NavLink>
                        <NavLink to="/aircraft" style={{marginRight: '15px', color: "grey"}}
                                 activeStyle={{marginRight: '15px', color: "white"}}>Aircraft Table</NavLink>
                        {role === "ROLE_STUDENT" && <NavLink to="/user/request-session" style={{marginRight: '15px', color: "grey"}}
                                 activeStyle={{marginRight: '15px', color: "white"}}>Request Session</NavLink>
                        }
                        {role === "ROLE_STUDENT" && <NavLink to="/pending" style={{marginRight: '15px', color: "grey"}}
                                                             activeStyle={{marginRight: '15px', color: "white"}}>Pending
                            Sessions</NavLink>}
                        {role === "ROLE_INSTRUCTOR" &&
                        <NavLink to="/sessions" style={{marginRight: '15px', color: "grey"}}
                                 activeStyle={{marginRight: '15px', color: "white"}}>Recent Sessions</NavLink>}
                        <NavLink to={"/user/profile"} style={{marginRight: '15px', color: "grey"}}
                                 activeStyle={{marginRight: '15px', color: "white"}}>Profile</NavLink>
                    </Nav>
                    <Nav className="ml-auto">
                        <NavLink to={"/"} style={{marginRight: '15px', color: "grey"}}
                                   activeStyle={{marginRight: '15px', color: "white"}}>Change Password</NavLink>
                        {/*<NavLink to="/" style={{marginRight: '15px', color: "CadetBlue"}}>Logout</NavLink>*/}
                    </Nav>
                    <Nav>
                        <Button variant="outline-light">Logout</Button>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default withCookies(withRouter(UserNavbar))