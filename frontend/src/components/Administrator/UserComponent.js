import React from 'react';
import UserService from '../../services/UserService';
import {Link, withRouter} from "react-router-dom";
import {Button, Container} from 'react-bootstrap'
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {withCookies} from "react-cookie";
import BGImage from "../../Images/cloudy_sky.jpg"

var bg = {
    backgroundImage: `url(${BGImage})`,
    display: 'flex',
    height: '100vh',
    // borderStyle: 'solid',
    // borderColor: 'yellow',
}

var content = {
    backgroundColor: 'white',
    margin: '10px auto',
    paddingTop: '20px',
    paddingRight: '30px',
    paddingLeft: '30px',
    paddingBottom: '20px',
    // borderStyle: 'solid',
    // borderColor: 'red',
    overflow: 'auto',
}


class UserComponent extends React.Component {
    state = {
        users: [],
        jwtToken: ''
    }


    constructor(props) {
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount() {
        UserService.getAll(this.state.jwtToken).then((response) => {
            this.setState({users: response.data})
        });
    }

    render() {
        return (
            <div>
                <AdministratorNavbar/>
                <div style={bg}>

                    <Container style={content}>
                        <h1>User List</h1>
                        <div className="container mt-4">
                            <table className="table table-bordered table-hover">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope={"col"}> ID Number</th>
                                    <th scope={"col"}> Role</th>
                                    <th scope={"col"}> First Name</th>
                                    <th scope={"col"}> Last Name</th>
                                    <th scope={"col"}> Email</th>
                                    <th scope={"col"}> D.O.B.</th>
                                    <th scope={"col"}/>
                                    <th scope={"col"}/>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.users.map(
                                        user =>
                                            <tr key={user.id}>
                                                <th scope={"row"}> {user.id}</th>
                                                <td> {user.role}</td>
                                                <td> {user.firstName}</td>
                                                <td> {user.lastName}</td>
                                                <td> {user.email}</td>
                                                <td> {user.dateOfBirth}</td>
                                                <td>
                                                    <Link to={"/admin/users/edit/" + user.id}
                                                          className={"btn btn-warning btn-block"}>Edit User</Link>
                                                </td>
                                                <td>
                                                    <Button variant={"danger"}
                                                            onClick={() => {
                                                                UserService.delete(this.state.jwtToken, user.id);
                                                                window.location.reload(false);
                                                            }}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                    )
                                }
                                </tbody>
                            </table>

                            <br/>
                            <Link to={"/admin/users/add"} className={"btn btn-dark"}>Add User</Link>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default withCookies(withRouter(UserComponent))