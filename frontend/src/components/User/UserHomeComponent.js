import React from 'react';
import UserNavbar from "../Navbars/UserNavbar";

class UserHomeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <UserNavbar/>

                <div className="container mt-4">
                    <h3>Database Tables Details</h3>
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" width="150">Type</th>
                            <th scope="col" width="150">Students</th>
                            <th scope="col" width="150">Instructors</th>
                            <th scope="col" width="150">Administrators</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className={"table-primary"}>
                            <td>Aircraft</td>
                            <td>View</td>
                            <td>View</td>
                            <td>Edit, View</td>
                        </tr>
                        <tr className={"table-info"}>
                            <td>Users</td>
                            <td>No Access</td>
                            <td>No Access</td>
                            <td>Edit, View</td>
                        </tr>
                        <tr className={"table-warning"}>
                            <td>Sessions</td>
                            <td>Limited View</td>
                            <td>Limited View</td>
                            <td>Edit, View</td>
                        </tr>
                        <tr className={"table-danger"}>
                            <td>Certifications</td>
                            <td>Limited View</td>
                            <td>Limited View</td>
                            <td>Edit, View</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default UserHomeComponent