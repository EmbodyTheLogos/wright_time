import React from 'react';
import {Link} from "react-router-dom";

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>

                <div className="container mt-4">
                    <h3>Database Contents</h3>
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" width="150">Type</th>
                            <th scope="col" width="150">Students</th>
                            <th scope="col" width="150">Instructors</th>
                            <th scope="col" width="150">Administrators</th>
                            <th scope="col" width="150">Link</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class={"table-primary"}>
                            <td>Aircraft</td>
                            <td>View</td>
                            <td>View</td>
                            <td>Edit, View</td>
                            <td><a href={"/aircraft"} className={"btn btn-secondary btn-block"}>Check it out!</a></td>
                        </tr>
                        <tr class={"table-info"}>
                            <td>Users</td>
                            <td>No Access</td>
                            <td>No Access</td>
                            <td>Edit, View</td>
                            <td><a href={"/users"} className={"btn btn-secondary btn-block"}>Check it out!</a></td>
                        </tr>
                        <tr class={"table-warning"}>
                            <td>Sessions</td>
                            <td>Limited View</td>
                            <td>Limited View</td>
                            <td>Edit, View</td>
                            <td><a href={"/aircraft"} className={"btn btn-secondary btn-block"}>Check it out!</a></td>
                        </tr>
                        <tr class={"table-danger"}>
                            <td>Certifications</td>
                            <td>Limited View</td>
                            <td>Limited View</td>
                            <td>Edit, View</td>
                            <td><a href={"/aircraft"} className={"btn btn-secondary btn-block"}>Check it out!</a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default HomeComponent