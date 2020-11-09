import React from 'react';
import UserService from '../../services/UserService';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap'
import AdministratorNavbar from "../Navbars/AdministratorNavbar";


class UserComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        UserService.getAll().then((response) => {
            this.setState({ users: response.data})
        });
    }

    render (){
        return (
            <div>
                <AdministratorNavbar/>

                <h1>User List</h1>
                <div className="container mt-4">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope={"col"}> ID Number</th>
                            <th scope={"col"}> Username</th>
                            <th scope={"col"}> Role</th>
                            <th scope={"col"}> First Name</th>
                            <th scope={"col"}> Last Name</th>
                            <th scope={"col"}> Email</th>
                            <th scope={"col"}> D.O.B.</th>
                            <th scope={"col"}> </th>
                            <th scope={"col"}> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key = {user.id}>
                                        <th scope={"row"}> {user.id}</th>
                                        <td> {user.username}</td>
                                        <td> {user.role}</td>
                                        <td> {user.firstName}</td>
                                        <td> {user.lastName}</td>
                                        <td> {user.email}</td>
                                        <td> {user.dateOfBirth}</td>
                                        <td>
                                            <Link to={"/users/edit/" + user.id} className={"btn btn-warning btn-block"}>Edit User</Link>
                                        </td>
                                        <td>
                                            <Button variant={"danger"}
                                               onClick={() => {
                                                   UserService.delete(user.id);
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
                    <Link to={"/users/add"} className={"btn btn-dark"}>Add User</Link>
                </div>
            </div>
        )
    }
}
export default UserComponent