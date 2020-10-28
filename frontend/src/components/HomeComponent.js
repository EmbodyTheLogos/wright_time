import React from 'react';
import {Link} from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap'

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/aircraft">Aircraft View</Nav.Link>
                        <Nav.Link href="/users">Users View</Nav.Link>
                        <Nav.Link href="/sessions">Sessions View</Nav.Link>
                        <Nav.Link href="/certifications">Certifications View</Nav.Link>
                    </Nav>
                </Navbar>

                <div className="container mt-4">
                    <h3>Database Tables Details</h3>
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col" width="150">Type</th>
                            <th scope="col" width="150">Students</th>
                            <th scope="col" width="150">Instructors</th>
                            <th scope="col" width="150">Administrators</th>
                            {/*<th scope="col" width="150">Link</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        <tr className={"table-primary"}>
                            <td>Aircraft</td>
                            <td>View</td>
                            <td>View</td>
                            <td>Edit, View</td>
                            {/*<td><Link to={"/aircraft"} className={"btn btn-secondary btn-block"}>Check it out!</Link>*/}
                            {/*</td>*/}
                        </tr>
                        <tr className={"table-info"}>
                            <td>Users</td>
                            <td>No Access</td>
                            <td>No Access</td>
                            <td>Edit, View</td>
                            {/*<td><Link to={"/users"} className={"btn btn-secondary btn-block"}>Check it out!</Link></td>*/}
                        </tr>
                        <tr className={"table-warning"}>
                            <td>Sessions</td>
                            <td>Limited View</td>
                            <td>Limited View</td>
                            <td>Edit, View</td>
                            {/*<td><Link to={"/sessions"} className={"btn btn-secondary btn-block"}>Check it out!</Link>*/}
                            {/*</td>*/}
                        </tr>
                        <tr className={"table-danger"}>
                            <td>Certifications</td>
                            <td>Limited View</td>
                            <td>Limited View</td>
                            <td>Edit, View</td>
                            {/*<td><Link to={"/certifications"} className={"btn btn-secondary btn-block"}>Check it*/}
                            {/*    out!</Link></td>*/}
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default HomeComponent