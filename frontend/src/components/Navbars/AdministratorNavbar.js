import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {Button, Nav, Navbar} from 'react-bootstrap'
import {withCookies} from "react-cookie";
import AuthService from "../../services/AuthService";

class AdministratorNavbar extends React.Component {
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
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg" className={"container-fluid"}>
                    <Navbar.Brand style={{fontWeight: "bold", color: "LightSkyBlue"}} href={'/'}>Wright
                        Time</Navbar.Brand>
                    <Nav className="mr-auto">
                        {/*<NavLink exact to="/admin/home" style={{marginRight: '15px', color:"grey"}}*/}
                        {/*         activeStyle={{marginRight: '15px', color:"white"}}>Home</NavLink>*/}
                        <NavLink to="/aircraft" style={{marginRight: '15px', color: "grey"}}
                                 activeStyle={{marginRight: '15px', color: "white"}}>Aircraft Table</NavLink>
                        <NavLink to="/admin/users" style={{marginRight: '15px', color: "grey"}}
                                 activeStyle={{marginRight: '15px', color: "white"}}>Users Table</NavLink>
                        <NavLink to="/sessions" style={{marginRight: '15px', color: "grey"}}
                                 activeStyle={{marginRight: '15px', color: "white"}}>All Sessions</NavLink>
                        <NavLink to="/pending" style={{marginRight: '15px', color: "grey"}}
                                 activeStyle={{marginRight: '15px', color: "white"}}>Pending Sessions</NavLink>
                        <NavLink to="/admin/certifications" style={{marginRight: '15px', color: "grey"}}
                                 activeStyle={{marginRight: '15px', color: "white"}}>Certifications Table</NavLink>
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

export default withCookies(withRouter(AdministratorNavbar))