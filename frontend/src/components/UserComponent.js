import React from 'react';
import UserService from '../services/UserService';

class UserComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        UserService.getUsers().then((response) => {
            this.setState({ users: response.data})
        });
    }

    render (){
        return (
            <div>
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
                            <th scope={"col"}> Date Joined</th>
                            <th scope={"col"}> </th>
                            <th scope={"col"}> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr key = {user.userId}>
                                        <th scope={"row"}> {user.userId}</th>
                                        <td> {user.username}</td>
                                        <td> {user.role}</td>
                                        <td> {user.firstName}</td>
                                        <td> {user.lastName}</td>
                                        <td> {user.email}</td>
                                        <td> {user.dateOfBirth}</td>
                                        <td> {user.dateJoined}</td>
                                        <td>
                                            <a href={"/users/edit/" + user.userId}
                                               className={"btn btn-warning btn-block"}>Edit User</a>
                                        </td>
                                        <td>
                                            <a className={"btn btn-danger btn-block"}
                                               onClick={() => {
                                                   UserService.deleteUser(user.userId);
                                                   window.location.reload(false);
                                               }}>
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                    <br/>
                    <a href={"/users/add"} className={"btn btn-dark"}>Add User</a>
                </div>
            </div>
        )
    }
}
export default UserComponent