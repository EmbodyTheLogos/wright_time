import React from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap'
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

    componentDidMount(){
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
                    <Navbar.Brand style={{fontWeight:"bold",color:"LightSkyBlue"}} href={'/'}>Wright Time</Navbar.Brand>
                    <Nav className="mr-auto">
                        <NavLink exact to="/user/home" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Home</NavLink>
                        <NavLink to="/aircraft" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Aircraft Table</NavLink>
                        <NavLink to="/user/request-session" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Request Session</NavLink>
                        <NavLink to={"/user/profile"} style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Profile</NavLink>
                        {role === "ROLE_STUDENT" && <NavLink to="/pending" style={{marginRight: '15px', color:"grey"}}
                                 activeStyle={{marginRight: '15px', color:"white"}}>Pending Sessions</NavLink>}
                        {/*<NavLink to="/certifications" style={{marginRight: '15px', color:"grey"}}*/}
                        {/*         activeStyle={{marginRight: '15px', color:"white"}}>Certifications Table</NavLink>*/}
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default withCookies(withRouter(UserNavbar))