import React from 'react';
import CertificationService from '../../services/CertificationService';
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap'
import Center from "react-center";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";

class AddCertificationComponent extends React.Component {

    constructor(props){
        super(props)
        if(!props.match.params.id) {
            this.state = {
                mode: "add",
                userId: "",
                aircraftId: "",
                dateObtained: new Date(),
                errorMessage: ""
            };
        } else {
            this.state = {
                mode: "edit",
                id: props.match.params.id,
                userId: "",
                aircraftId: "",
                dateObtained: new Date(),
                errorMessage: ""
            };
        }

    }

    componentDidMount(){
        if(this.state.mode === "edit") {
            CertificationService.getOne(this.props.match.params.id).then(res => {
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
        this.setState({[name]:value})
    }

    handleDateChange = (date) => {
        this.setState({
            'date': date
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let dateObtained = this.state.dateObtained.getFullYear() + "-"+ (this.state.dateObtained.getMonth() + 1) +"-"+ this.state.dateObtained.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        let cert = {
            aircraft:{id:this.state.aircraftId},
            user:{id:this.state.userId},
            dateObtained: dateObtained,
        };

        console.log(JSON.stringify(cert));
        if(this.state.mode === "add") {
            CertificationService.post(cert).then(res => {
                this.props.history.push('/admin/certifications')
            }).catch(res => {
                if(res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            CertificationService.put(this.state.id, cert).then(res => {
                this.props.history.push('/admin/certifications')
            }).catch(res => {
                if(res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        }

    }

    render (){
        return (
            <div>
                <AdministratorNavbar/>
                <br/>

                {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}

                <Container>
                    <Center>
                        <Form>
                            <Form.Group controlId={"userId"}>
                                <Form.Control type={"text"} placeholder={"User ID"}
                                              value={this.state.userId} onChange={this.changeHandler}
                                              name={"userId"}/>
                            </Form.Group>

                            <Form.Group controlId={"aircraftId"}>
                                <Form.Control type={"text"} placeholder={"Aircraft ID"}
                                              value={this.state.aircraftId} onChange={this.changeHandler}
                                              name={"aircraftId"}/>
                            </Form.Group>

                            <Form.Group controlId={"dateObtained"}>
                                <DatePicker
                                    selected={this.state.dateObtained}
                                    onChange={this.handleDateChange}
                                    name="dateObtained"
                                    dateFormat="MM/dd/yyyy"
                                />
                            </Form.Group>

                            <Button variant="dark" type="submit" onClick={this.submitHandler}>Submit</Button>
                        </Form>
                    </Center>
                </Container>

            </div>

        )
    }
}

export default AddCertificationComponent