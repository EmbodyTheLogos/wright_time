import React from 'react';
import {NavLink} from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap'

class AdministratorNavbar extends React.Component {

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand style={{fontWeight:"bold", color:"LightSkyBlue"}}>Wright Time</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink exact to="/" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Home</NavLink>
                        <NavLink to="/aircraft" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Aircraft View</NavLink>
                        <NavLink to="/users" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Users View</NavLink>
                        <NavLink to="/sessions" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Sessions View</NavLink>
                        <NavLink to="/certifications" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Certifications View</NavLink>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default AdministratorNavbar