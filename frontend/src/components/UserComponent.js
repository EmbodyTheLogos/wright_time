import React from 'react';
import UserService from '../services/UserService';
import {Link} from "react-router-dom";

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
                <h1 className = "text-center"> User List</h1>
                <table className = "table table-striped">
                    <thead>

                    <tr>
                        <td> ID Number</td>
                        <td> Username</td>
                        <td> Role</td>
                        <td> First Name</td>
                        <td> Last Name</td>
                        <td> Email</td>
                        <td> D.O.B.</td>
                        <td> Date Joined</td>
                        <td> </td>
                        <td> </td>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        this.state.users.map(
                            user =>
                                <tr key = {user.userId}>
                                    <td> {user.userId}</td>
                                    <td> {user.username}</td>
                                    <td> {user.role}</td>
                                    <td> {user.firstName}</td>
                                    <td> {user.lastName}</td>
                                    <td> {user.email}</td>
                                    <td> {user.dateOfBirth}</td>
                                    <td> {user.dateJoined}</td>
                                    <td>
                                        <Link to={"/users/edit/" + user.userId}>
                                            <button type="button">
                                                Edit
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button type="button"
                                                onClick={() => {
                                                    UserService.deleteUser(user.userId);
                                                    window.location.reload(false);
                                                }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>

                <br/>
                <Link to="/users/add">
                    <button type="button">
                        Add User
                    </button>
                </Link>
            </div>
        )
    }
}
export default UserComponent