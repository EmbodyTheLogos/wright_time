import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap'
import {withCookies} from "react-cookie";

class AdministratorNavbar extends React.Component {

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand style={{fontWeight:"bold",color:"LightSkyBlue"}} href={'/'}>Wright Time</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink exact to="/admin/home" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Home</NavLink>
                        <NavLink to="/admin/aircraft" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Aircraft Table</NavLink>
                        <NavLink to="/admin/users" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Users Table</NavLink>
                        <NavLink to="/admin/sessions" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>All Sessions</NavLink>
                        <NavLink to="/admin/pending" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Pending Sessions</NavLink>
                        <NavLink to="/admin/certifications" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Certifications Table</NavLink>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default withCookies(withRouter(AdministratorNavbar))