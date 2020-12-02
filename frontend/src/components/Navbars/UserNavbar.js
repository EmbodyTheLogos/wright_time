import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap'
import {withCookies} from "react-cookie";

class UserNavbar extends React.Component {

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand style={{fontWeight:"bold",color:"LightSkyBlue"}} href={'/'}>Wright Time</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink exact to="/user/home" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Home</NavLink>
                        <NavLink to="/user/aircraft" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Aircraft Table</NavLink>
                        <NavLink to="/user/request-session" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Request Session</NavLink>
                        {/*<NavLink to="/sessions" style={{marginRight: '15px', color:"grey"}}*/}
                        {/*         activeStyle={{marginRight: '15px', color:"white"}}>All Sessions</NavLink>*/}
                        {/*<NavLink to="/pending" style={{marginRight: '15px', color:"grey"}}*/}
                        {/*         activeStyle={{marginRight: '15px', color:"white"}}>Pending Sessions</NavLink>*/}
                        {/*<NavLink to="/certifications" style={{marginRight: '15px', color:"grey"}}*/}
                        {/*         activeStyle={{marginRight: '15px', color:"white"}}>Certifications Table</NavLink>*/}
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default withCookies(withRouter(UserNavbar))