import React from 'react';
import CertificationService from '../../services/CertificationService';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap'
import Center from "react-center";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import UserService from "../../services/UserService";
import AircraftService from "../../services/AircraftService";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
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

class AddCertificationComponent extends React.Component {
    state = {
        mode: "",
        id: -1,
        userId: "-1",
        aircraftId: "-1",
        dateObtained: new Date(),
        aircrafts: [],
        users: [],
        errorMessage: "",
        jwtToken: ""
    };

    constructor(props) {
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
        if (!props.match.params.id) {
            this.state.mode = 'add'
        } else {
            this.state.mode = 'edit'
            this.state.id = props.match.params.id
        }
    }

    componentDidMount() {
        UserService.getAll(this.state.jwtToken).then((response) => {
            this.setState({users: response.data})
        })
        AircraftService.getAll(this.state.jwtToken).then((response) => {
            this.setState({aircrafts: response.data})
        })

        if (this.state.mode === "edit") {
            CertificationService.getOne(this.state.jwtToken, this.props.match.params.id).then(res => {
                let date = res.data.dateObtained.split('-')
                console.log(date)
                let year = parseInt(date[0])
                let month = parseInt(date[1]) - 1
                let day = parseInt(date[2])

                this.setState({
                    aircraftId: res.data.aircraft.id,
                    userId: res.data.user.id,
                    dateObtained: new Date(year, month, day),
                });
            })
        }
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    }

    handleDateChange = (date) => {
        this.setState({
            dateObtained: date
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.aircraftId === "-1") {
            this.setState({errorMessage: "Aircraft must not be empty"});
            return
        }
        if (this.state.userId === "-1") {
            this.setState({errorMessage: "Aircraft must not be empty"});
            return
        }

        let dateObtained = this.state.dateObtained.getFullYear() + "-" + (this.state.dateObtained.getMonth() + 1) + "-" + this.state.dateObtained.getDate().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        let cert = {
            aircraft: {id: this.state.aircraftId},
            user: {id: this.state.userId},
            dateObtained: dateObtained,
        };

        console.log(JSON.stringify(cert));
        if (this.state.mode === "add") {
            CertificationService.post(this.state.jwtToken, cert).then(res => {
                this.props.history.push('/admin/certifications')
            }).catch(res => {
                if (res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            CertificationService.put(this.state.jwtToken, this.state.id, cert).then(res => {
                this.props.history.push('/admin/certifications')
            }).catch(res => {
                if (res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        }

    }

    render() {
        return (
            <div>
                <AdministratorNavbar/>
                <div style={bg}>

                    <Container style={content}>
                        <h3>Add/Edit Certification Form</h3>
                        <br/>

                        {this.state.errorMessage &&
                        <Alert variant="danger">
                            <Alert.Heading>Input Error</Alert.Heading>
                            <p>{this.state.errorMessage}</p>
                        </Alert>}

                        <Center>
                            <Form>
                                <Form.Group as={Row} controlId={"userId"}>
                                    <Form.Label column sm={4}>User:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.userId}
                                                      onChange={this.changeHandler} name={"userId"}>
                                            <option value="-1"/>
                                            {this.state.users.map(user => <option key={user.id} value={user.id}>
                                                {user.firstName + " " + user.lastName}</option>)}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId={"aircraftId"}>
                                    <Form.Label column sm={4}>Aircraft:</Form.Label>
                                    <Col sm={8}>
                                        <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.aircraftId}
                                                      onChange={this.changeHandler} name={"aircraftId"}>
                                            <option value="-1"/>
                                            {this.state.aircrafts.map(aircraft => <option key={aircraft.id}
                                                                                          value={aircraft.id}>
                                                {aircraft.manufacturer + " " + aircraft.model + " " + aircraft.name}</option>)}
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId={"dateObtained"}>
                                    <Form.Label column sm={4}>Obtained:</Form.Label>
                                    <Col sm={8}>
                                        <DatePicker
                                            selected={this.state.dateObtained}
                                            onChange={this.handleDateChange}
                                            name="dateObtained"
                                            dateFormat="MM/dd/yyyy"
                                        />
                                    </Col>
                                </Form.Group>

                                <Button variant="dark" type="submit" onClick={this.submitHandler}>Submit</Button>
                            </Form>
                        </Center>
                    </Container>
                </div>
            </div>

        )
    }
}

export default withCookies(withRouter(AddCertificationComponent))