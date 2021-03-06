import React from 'react';
import CertificationService from '../../services/CertificationService';
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

class CertificationComponent extends React.Component {
    state = {
        certifications: [],
        jwtToken: ""
    }

    constructor(props) {
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount() {
        CertificationService.getAll(this.state.jwtToken).then((response) => {
            this.setState({certifications: response.data})
        });
    }

    render() {
        return (
            <div>
                <AdministratorNavbar/>
                <div style={bg}>
                    <Container style={content}>
                        <h1>Certification List</h1>
                        <div className="container mt-4">
                            <table className="table table-bordered table-hover">
                                <thead className="thead-dark">
                                <tr>
                                    <th scope={"col"} d> Certification ID</th>
                                    <th scope={"col"}> User</th>
                                    <th scope={"col"}> Aircraft</th>
                                    <th scope={"col"}> Date Obtained</th>
                                    <th scope={"col"}></th>
                                    <th scope={"col"}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.certifications.map(
                                        cert =>
                                            <tr key={cert.id}>
                                                <th scope={"row"}> {cert.id}</th>
                                                <td> {cert.user.firstName + ' ' + cert.user.lastName}</td>
                                                <td> {cert.aircraft.manufacturer + " " + cert.aircraft.model + " " + cert.aircraft.name}</td>
                                                <td> {cert.dateObtained}</td>
                                                <td>
                                                    <Link to={"/admin/certifications/edit/" + cert.id}
                                                          className={"btn btn-warning btn-block"}>Edit
                                                        Certification</Link>
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
                    </Container>
                </div>
            </div>
        )
    }
}

export default withCookies(withRouter(CertificationComponent))