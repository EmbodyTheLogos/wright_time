import React from 'react';
import CertificationService from '../services/CertificationService';
import {Link} from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap'
import AdministratorNavbar from "./AdministratorNavbar";

class CertificationComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            certifications:[]
        }
    }

    componentDidMount(){
        CertificationService.getAll().then((response) => {
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
                                            <Link to={"/certifications/edit/" + cert.id}
                                               className={"btn btn-warning btn-block"}>Edit Certification</Link>
                                        </td>
                                        <td>
                                            <button className={"btn btn-danger btn-block"}
                                               onClick={() => {
                                                   CertificationService.delete(cert.id);
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
                    <Link to={"/certifications/add"} className={"btn btn-dark"}>Add Certification</Link>
                </div>
            </div>
        )
    }
}
export default CertificationComponent