import React from 'react';
import AircraftService from '../../services/AircraftService';
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap'
import Center from 'react-center';
import AdministratorNavbar from "../Navbars/AdministratorNavbar";

class AddAircraftComponent extends React.Component {

    constructor(props) {
        super(props)
        if (!props.match.params.id) {
            this.state = {
                mode: "add",
                manufacturer: "",
                name: "",
                model: "",
                year: "",
                maintenanceDay: "",
                minimumTrainingDuration: "",
                errorMessage: ""
            };
        } else {
            this.state = {
                mode: "edit",
                aircraftId: props.match.params.id,
                manufacturer: "",
                name: "",
                model: "",
                year: "",
                maintenanceDay: "",
                minimumTrainingDuration: "",
                errorMessage: ""
            };
        }
    }

    componentDidMount() {
        if (this.state.mode === "edit") {
            AircraftService.getOne(this.props.match.params.id).then(res => {
                this.setState({
                    manufacturer: res.data.manufacturer,
                    name: res.data.name,
                    model: res.data.model,
                    year: res.data.year,
                    maintenanceDay: res.data.maintenanceDay,
                    minimumTrainingDuration: res.data.minimumTrainingDuration
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
            minimumTrainingDuration: this.state.minimumTrainingDuration
        };

        console.log(JSON.stringify(aircraft));
        if (this.state.mode === "add") {
            AircraftService.post(aircraft).then(res => {
                this.props.history.push('/admin/aircraft')
            }).catch(res => {
                if (res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            AircraftService.put(this.state.aircraftId, aircraft).then(res => {
                this.props.history.push('/admin/aircraft')
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

                {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}

                <Container>
                    <Center>
                        <Form>
                            <Form.Group controlId={"manufacturer"}>
                                    <Form.Control type={"text"} placeholder={"Manufacturer"}
                                                  value={this.state.manufacturer} onChange={this.changeHandler}
                                                  name={"manufacturer"}/>
                            </Form.Group>

                            <Form.Group controlId={"name"}>
                                <Form.Control type={"text"} placeholder={"Name"}
                                              value={this.state.name} onChange={this.changeHandler}
                                              name={"name"}/>
                            </Form.Group>

                            <Form.Group controlId={"model"}>
                                <Form.Control type={"text"} placeholder={"Model"}
                                              value={this.state.model} onChange={this.changeHandler}
                                              name={"model"}/>
                            </Form.Group>

                            <Form.Group controlId={"year"}>
                                <Form.Control type={"text"} placeholder={"Year(YYYY)"}
                                              value={this.state.year} onChange={this.changeHandler}
                                              name={"year"}/>
                            </Form.Group>

                            <Form.Group controlId={"maintenanceDay"}>
                                <Form.Control type={"text"} placeholder={"Maintenance Day"}
                                              value={this.state.maintenanceDay} onChange={this.changeHandler}
                                              name={"maintenanceDay"}/>
                            </Form.Group>

                            <Form.Group controlId={"minimumTrainingDuration"}>
                                <Form.Control type={"text"} placeholder={"Min. Training Duration"}
                                              value={this.state.minimumTrainingDuration} onChange={this.changeHandler}
                                              name={"minimumTrainingDuration"}/>
                            </Form.Group>

                            <Button variant="dark" type="submit" onClick={this.submitHandler}>Submit</Button>
                        </Form>
                    </Center>
                </Container>
            </div>

        )
    }
}

export default AddAircraftComponent