import React from 'react';
import UserService from '../../services/UserService';
import {Button, Container, Form} from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Center from "react-center";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";

class AddUserComponent extends React.Component {
    state = {
        mode: "edit",
        userId: -1,
        username: "",
        role: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: new Date(),
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
        console.log(this.state.dateOfBirth)
        let dateOfBirth = this.state.dateOfBirth.getFullYear() + "-"+ (this.state.dateOfBirth.getMonth() + 1) +"-"+ this.state.dateOfBirth.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        let user = {
            username: this.state.username,
            role: this.state.role,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            dateOfBirth: dateOfBirth
        };

        console.log(JSON.stringify(user));
        if(this.state.mode === "add") {
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
            UserService.put(this.state.jwtToken, this.state.userId, user).then(res => {
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

    render (){
        return (
            <div>
                <AdministratorNavbar/>
                <br/>

                {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}

                <Container>
                    <Center>
                        <Form>
                            <Form.Group controlId={"username"}>
                                <Form.Control type={"text"} placeholder={"Username"}
                                              value={this.state.username} onChange={this.changeHandler}
                                              name={"username"}/>
                            </Form.Group>

                            <Form.Group controlId={"role"}>
                                <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.role}
                                              onChange={this.changeHandler} name={"role"}>
                                    <option value="empty"></option>
                                    <option value="ROLE_ADMIN">Administrator</option>
                                    <option value="ROLE_INSTRUCTOR">Instructor</option>
                                    <option value="ROLE_STUDENT">Student</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId={"firstName"}>
                                <Form.Control type={"text"} placeholder={"First Name"}
                                              value={this.state.firstName} onChange={this.changeHandler}
                                              name={"firstName"}/>
                            </Form.Group>

                            <Form.Group controlId={"lastName"}>
                                <Form.Control type={"text"} placeholder={"Last Name"}
                                              value={this.state.lastName} onChange={this.changeHandler}
                                              name={"lastName"}/>
                            </Form.Group>

                            <Form.Group controlId={"email"}>
                                <Form.Control type={"email"} placeholder={"Email"}
                                              value={this.state.email} onChange={this.changeHandler}
                                              name={"email"}/>
                            </Form.Group>

                            <Form.Group controlId={"dateOfBirth"}>
                                <DatePicker
                                    selected={this.state.dateOfBirth}
                                    onChange={this.handleDateChange}
                                    name="dateOfBirth"
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

export default withCookies(withRouter(AddUserComponent))