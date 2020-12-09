import React from 'react';
import UserService from '../../services/UserService';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Center from "react-center";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";

class AddUserComponent extends React.Component {
    state = {
        mode: "edit",
        id: -1,
        role: "empty",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: new Date(),
        password: "",
        errorMessage: "",
        jwtToken: ""
    };

    constructor(props){
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

    componentDidMount(){
        if(this.state.mode === "edit") {
            UserService.getOne(this.state.jwtToken, this.props.match.params.id).then(res => {
                let dateOfBirth = res.data.dateOfBirth.split('-')
                let year = parseInt(dateOfBirth[0])
                let month = parseInt(dateOfBirth[1]) - 1
                let day = parseInt(dateOfBirth[2])

                this.setState({
                    username: res.data.username,
                    role: res.data.role,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    dateOfBirth: new Date(year, month, day),
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
            'dateOfBirth': date
        })
    }

    submitHandler = (event) => {
        event.preventDefault();

        if(this.state.role === "empty") { this.setState({errorMessage: "State must not be empty"}); return}

        let year = this.state.dateOfBirth.getFullYear()
        let month = (this.state.dateOfBirth.getMonth() + 1).toLocaleString('en-US',{minimumIntegerDigits: 2, useGrouping: false})
        let day = this.state.dateOfBirth.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
        let dateOfBirth = year + "-" + month + "-" + day
        let user = {
            role: this.state.role,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            dateOfBirth: dateOfBirth
        };

        console.log(JSON.stringify(user));
        if(this.state.mode === "add") {
            let user = {
                role: this.state.role,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                dateOfBirth: dateOfBirth
            };
            UserService.post(this.state.jwtToken, user).then(res => {
                this.props.history.push('/admin/users')
            }).catch(res => {
                if(res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            let user = {
                role: this.state.role,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                dateOfBirth: dateOfBirth
            };
            UserService.put(this.state.jwtToken, this.state.id, user).then(res => {
                this.props.history.push('/admin/users')
            }).catch(res => {
                if(res.response) {
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
                            {/*<Form.Group as={Row} controlId={"username"}>*/}
                            {/*    <Form.Label column sm={4}>Username:</Form.Label>*/}
                            {/*    <Col sm={8}>*/}
                            {/*        <Form.Control type={"text"} placeholder={"Username"}*/}
                            {/*                      value={this.state.username} onChange={this.changeHandler}*/}
                            {/*                      name={"username"}/>*/}
                            {/*    </Col>*/}
                            {/*</Form.Group>*/}

                            <Form.Group as={Row} controlId={"role"}>
                                <Form.Label column sm={4}>Role:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.role}
                                                  onChange={this.changeHandler} name={"role"}>
                                        <option value="empty"> </option>
                                        <option value="ROLE_ADMIN">Administrator</option>
                                        <option value="ROLE_INSTRUCTOR">Instructor</option>
                                        <option value="ROLE_STUDENT">Student</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"firstName"}>
                                <Form.Label column sm={4}>First Name:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type={"text"} placeholder={"First Name"}
                                                  value={this.state.firstName} onChange={this.changeHandler}
                                                  name={"firstName"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"lastName"}>
                                <Form.Label column sm={4}>Last Name:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type={"text"} placeholder={"Last Name"}
                                                  value={this.state.lastName} onChange={this.changeHandler}
                                                  name={"lastName"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"email"}>
                                <Form.Label column sm={4}>Email:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type={"email"} placeholder={"Email"}
                                                  value={this.state.email} onChange={this.changeHandler}
                                                  name={"email"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"dateOfBirth"}>
                                <Form.Label column sm={5}>Date of Birth:</Form.Label>
                                <Col sm={7}>
                                    <DatePicker
                                        selected={this.state.dateOfBirth}
                                        onChange={this.handleDateChange}
                                        name="dateOfBirth"
                                        dateFormat="MM/dd/yyyy"
                                    />
                                </Col>
                            </Form.Group>

                            {this.state.mode === "add" && <Form.Group as={Row} controlId={"password"}>
                                <Form.Label column sm={4}>Password:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type={"password"} placeholder={"Password"}
                                                  value={this.state.password} onChange={this.changeHandler}
                                                  name={"password"}/>
                                </Col>
                            </Form.Group>}

                            <Button variant="dark" type="submit" onClick={this.submitHandler}>Submit</Button>
                        </Form>
                    </Center>
                </Container>
            </div>

        )
    }
}

export default withCookies(withRouter(AddUserComponent))