import React from 'react';
import CertificationService from '../../services/CertificationService';
import {Link, withRouter} from "react-router-dom";
import {Button} from 'react-bootstrap'
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {withCookies} from "react-cookie";

class CertificationComponent extends React.Component {
    state = {
        certifications: [],
        jwtToken: ""
    }

    constructor(props){
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount(){
        CertificationService.getAll(this.state.jwtToken).then((response) => {
            this.setState({ certifications: response.data})
        });
    }

    render (){
        return (
            <div>
                <AdministratorNavbar/>

                <h1>Certification List</h1>
                <div className="container mt-4">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th scope={"col"}> Certification ID</th>
                            <th scope={"col"}> User ID</th>
                            <th scope={"col"}> Aircraft ID</th>
                            <th scope={"col"}> Date Obtained</th>
                            <th scope={"col"}> </th>
                            <th scope={"col"}> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.certifications.map(
                                cert =>
                                    <tr key = {cert.id}>
                                        <th scope={"row"}> {cert.id}</th>
                                        <td> {cert.user.id}</td>
                                        <td> {cert.aircraft.id}</td>
                                        <td> {cert.dateObtained}</td>
                                        <td>
                                            <Link to={"/admin/certifications/edit/" + cert.id}
                                               className={"btn btn-warning btn-block"}>Edit Certification</Link>
                                        </td>
                                        <td>
                                            <Button variant={"danger"}
                                               onClick={() => {
                                                   CertificationService.delete(this.state.jwtToken, cert.id);
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
                    <Link to={"/admin/certifications/add"} className={"btn btn-dark"}>Add Certification</Link>
                </div>
            </div>
        )
    }
}
export default withCookies(withRouter(CertificationComponent))