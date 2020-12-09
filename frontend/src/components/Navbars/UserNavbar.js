import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {Button, Nav, Navbar} from 'react-bootstrap'
import {withCookies} from "react-cookie";
import AuthService from "../../services/AuthService";
import logoImage from "../../Images/WrightTime_Logo.svg"

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

    logout = (event) => {
        this.props.history.push('/') //TODO: this is really bad practice but I don't have time to fix it.
    }

    render() {
        const role = this.state.user.role
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    {/*<Navbar.Brand style={{fontWeight: "bold", color: "LightSkyBlue"}} href={'/'}>Wright*/}
                    {/*    Time</Navbar.Brand>*/}
                    <Navbar.Brand>
                        <img
                            src={logoImage}
                            width="80"
                            height="80"
                            className="d-inline-block align-top"
                            alt={""}
                        />
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink exact to="/user/home" style={{marginRight: '15px', color: "grey", fontSize: '20px'}}
                                 activeStyle={{marginRight: '15px', color: "white", fontSize: '20px'}}>Home</NavLink>
                        <NavLink to="/aircraft" style={{marginRight: '15px', color: "grey", fontSize: '20px'}}
                                 activeStyle={{marginRight: '15px', color: "white", fontSize: '20px'}}>Aircraft Table</NavLink>
                        {role === "ROLE_STUDENT" &&
                        <NavLink to="/user/request-session" style={{marginRight: '15px', color: "grey", fontSize: '20px'}}
                                 activeStyle={{marginRight: '15px', color: "white", fontSize: '20px'}}>Request Session</NavLink>
                        }
                        {role === "ROLE_STUDENT" && <NavLink to="/pending" style={{marginRight: '15px', color: "grey", fontSize: '20px'}}
                                                             activeStyle={{marginRight: '15px', color: "white", fontSize: '20px'}}>Pending
                            Sessions</NavLink>}
                        {role === "ROLE_INSTRUCTOR" &&
                        <NavLink to="/sessions" style={{marginRight: '15px', color: "grey", fontSize: '20px'}}
                                 activeStyle={{marginRight: '15px', color: "white", fontSize: '20px'}}>Recent Sessions</NavLink>}
                        <NavLink to={"/user/profile"} style={{marginRight: '15px', color: "grey", fontSize: '20px'}}
                                 activeStyle={{marginRight: '15px', color: "white", fontSize: '20px'}}>Profile</NavLink>
                    </Nav>
                    {/*<Nav className="ml-auto">*/}
                    {/*    <NavLink to={"/change_password"} style={{marginRight: '15px', color: "grey"}}*/}
                    {/*               activeStyle={{marginRight: '15px', color: "white"}}>Change Password</NavLink>*/}
                    {/*    /!*<NavLink to="/" style={{marginRight: '15px', color: "CadetBlue"}}>Logout</NavLink>*!/*/}
                    {/*</Nav>*/}
                    <Nav>
                        <p className="text-center mt-2 mb-2 mr-4" style={{color: "white", fontSize: '20px'}}>Logged in
                            as: {this.state.user.firstName + " " + this.state.user.lastName}</p>
                    </Nav>
                    <Nav><p/></Nav>
                    <Nav>
                        <Button variant="outline-danger" onClick={this.logout}>Logout</Button>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default withCookies(withRouter(UserNavbar))