import React from 'react';
import AircraftService from '../../services/AircraftService';
import {Button, Container, Form, Row, Col, Alert} from 'react-bootstrap'
import Center from 'react-center';
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom"

class AddAircraftComponent extends React.Component {
    state = {
        mode: "",
        id: -1,
        aircraftId: "",
        manufacturer: "",
        name: "",
        model: "",
        year: "",
        maintenanceDay: "",
        trainingDuration: "",
        errorMessage: "",
        jwtToken: ''
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
        if (this.state.mode === "edit") {
            AircraftService.getOne(this.state.jwtToken, this.props.match.params.id).then(res => {
                this.setState({
                    manufacturer: res.data.manufacturer,
                    name: res.data.name,
                    model: res.data.model,
                    year: res.data.year,
                    maintenanceDay: res.data.maintenanceDay,
                    trainingDuration: res.data.trainingDuration
                });
            })
        }
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        let aircraft = {
            manufacturer: this.state.manufacturer,
            name: this.state.name,
            model: this.state.model,
            year: this.state.year,
            maintenanceDay: this.state.maintenanceDay,
            trainingDuration: this.state.trainingDuration
        };

        console.log(JSON.stringify(aircraft));
        if (this.state.mode === "add") {
            AircraftService.post(this.state.jwtToken, aircraft).then(res => {
                this.props.history.push('/aircraft')
            }).catch(res => {
                if (res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            AircraftService.put(this.state.jwtToken, this.state.aircraftId, aircraft).then(res => {
                this.props.history.push('/aircraft')
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
                <br/>

                <Container>
                    {this.state.errorMessage &&
                    <Alert variant="danger">
                        <Alert.Heading>Input Error</Alert.Heading>
                        <p>{this.state.errorMessage}</p>
                    </Alert>}

                    <Center>
                        <Form>
                            <Form.Group as={Row} controlId={"manufacturer"}>
                                <Form.Label column sm={4}>Manufacturer:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type={"text"} placeholder={"Manufacturer"}
                                                  value={this.state.manufacturer} onChange={this.changeHandler}
                                                  name={"manufacturer"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"name"}>
                                <Form.Label column sm={4}>Name:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type={"text"} placeholder={"Name"}
                                                  value={this.state.name} onChange={this.changeHandler}
                                                  name={"name"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"model"}>
                                <Form.Label column sm={4}>Model:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type={"text"} placeholder={"Model"}
                                                  value={this.state.model} onChange={this.changeHandler}
                                                  name={"model"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"year"}>
                                <Form.Label column sm={4}>Year:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type={"text"} placeholder={"Year(YYYY)"}
                                                  value={this.state.year} onChange={this.changeHandler}
                                                  name={"year"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"maintenanceDay"}>
                                <Form.Label column sm={5}>Maintenance Day:</Form.Label>
                                <Col sm={7}>
                                    <Form.Control type={"text"} placeholder={"Maintenance Day"}
                                                  value={this.state.maintenanceDay} onChange={this.changeHandler}
                                                  name={"maintenanceDay"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"trainingDuration"}>
                                <Form.Label column sm={5}>Training Duration:</Form.Label>
                                <Col sm={7}>
                                    <Form.Control type={"text"} placeholder={"Training Duration"}
                                                  value={this.state.trainingDuration} onChange={this.changeHandler}
                                                  name={"trainingDuration"}/>
                                </Col>
                            </Form.Group>

                            <Button variant="dark" type="submit" onClick={this.submitHandler}>Submit</Button>
                        </Form>
                    </Center>
                </Container>
            </div>

        )
    }
}

export default withCookies(withRouter(AddAircraftComponent))