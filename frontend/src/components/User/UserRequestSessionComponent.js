import React from 'react';
import SessionService from '../../services/SessionService';
import {Button, Col, Container, Form, Row} from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Center from "react-center";
import UserService from "../../services/UserService";
import UserNavbar from "../Navbars/UserNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import AircraftService from "../../services/AircraftService";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import AuthService from "../../services/AuthService";
import UserComponent from "../Administrator/UserComponent";

class UserRequestSessionComponent extends React.Component {
    state = {
        mode: "",
        id: -1,
        sessionId: "",
        aircraftId: "",
        instructorId: "",
        studentId: "",
        date: new Date(),
        startTime: "",
        endTime: "",
        score: "",
        comments: "",
        state: "PENDING",
        aircrafts: [],
        students: [],
        instructors: [],
        errorMessage: "",
        user: "",
        jwtToken: ""
    };

    constructor(props){
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
        // if (!props.match.params.id) {
        //     this.state.mode = 'add'
        // } else {
        //     this.state.mode = 'edit'
        //     this.state.id = props.match.params.id
        // }
    }

    componentDidMount(){
        // if(this.state.mode === "edit") {
        //     SessionService.getOne(this.state.jwtToken, this.props.match.params.id).then(res => {
        //         let date = res.data.date.split('-')
        //         let year = parseInt(date[0])
        //         let month = parseInt(date[1]) - 1
        //         let day = parseInt(date[2])
        //
        //         this.setState({
        //             aircraftId: res.data.aircraft.id,
        //             instructorId: res.data.instructor.id,
        //             studentId: res.data.student.id,
        //             startTime: res.data.startTime,
        //             endTime: res.data.endTime,
        //             //score: res.data.score,
        //             //comments: res.data.comments,
        //             //state: res.data.state,
        //             date: new Date(year, month, day),
        //         });
        //     })
        // }
        UserService.getAllInstructors(this.state.jwtToken).then((response) => {
            this.setState({ instructors: response.data})
        })
        UserService.getAllStudents(this.state.jwtToken).then((response) => {
            this.setState({ students: response.data})
        })
        AircraftService.getAll(this.state.jwtToken).then((response) => {
            this.setState({aircrafts: response.data})
        })
        AuthService.user(this.state.jwtToken).then((res) => {
            this.setState({user: res.data})
            this.setState({studentId: this.state.user.id})
            //console.log(this.state.studentId)
        })
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
        let date = this.state.date.getFullYear() + "-"+ (this.state.date.getMonth() + 1) +"-"+ this.state.date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
        let session = {
            aircraft:{id:this.state.aircraftId},
            instructor:{id:this.state.instructorId},
            student:{id:this.state.studentId},
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            date: date,
            score: this.state.score,
            comments: this.state.comments,
            state: this.state.state,
        };

        console.log(JSON.stringify(session));
        if(this.state.mode === "add") {
            SessionService.post(this.state.jwtToken, session).then(res => {
                this.props.history.push('/admin/sessions')
            }).catch(res => {
                if(res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            SessionService.put(this.state.jwtToken, this.state.sessionId, session).then(res => {
                this.props.history.push('/admin/sessions')
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
                <UserNavbar/>
                <br/>

                {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}

                <Container>
                    <Center>
                        <Form>
                            <Form.Group as={Row} controlId={"aircraftId"}>
                                <Form.Label column sm={4}>Aircraft:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.aircraftId}
                                                  onChange={this.changeHandler} name={"aircraftId"}>
                                        <option value="empty"> </option>
                                        {this.state.aircrafts.map(aircraft => <option key={aircraft.id} value={aircraft.id}>
                                            {aircraft.manufacturer + " " + aircraft.model + " " + aircraft.name}</option>)}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"instructorId"}>
                                <Form.Label column sm={4}>Instructor:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.instructorId}
                                                  onChange={this.changeHandler} name={"instructorId"}>
                                        <option value="empty"> </option>
                                        {this.state.instructors.map(instructor => <option key={instructor.id} value={instructor.id}>
                                            {instructor.firstName + " " + instructor.lastName}</option>)}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"studentId"}>
                                <Form.Label column sm={4}>Student:</Form.Label>
                                <Col sm={8}>
                                    {/*<Form.Control as={"select"} className={"mr-sm-2"} value={this.state.studentId}*/}
                                    {/*              onChange={this.changeHandler} name={"studentId"} plaintext readOnly>*/}
                                    {/*    <option value="empty"> </option>*/}
                                    {/*    {this.state.students.map(student => <option key={student.id} value={student.id}>*/}
                                    {/*        {student.firstName + " " + student.lastName}</option>)}*/}
                                    {/*</Form.Control>*/}
                                    <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.studentId}
                                                  onChange={this.changeHandler} name={"studentId"} plaintext readOnly>
                                        {this.state.students.map(student => this.state.user.id === student.id && <option key={student.id} value={student.id}>
                                            {student.firstName + " " + student.lastName}</option>)}
                                    </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"date"}>
                                <Form.Label column sm={4}>Date:</Form.Label>
                                <Col sm={8}>
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.handleDateChange}
                                        name="date"
                                        dateFormat="MM/dd/yyyy"
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"startTime"}>
                                <Form.Label column sm={4}>Start Time:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control type={"text"} placeholder={"Start Time"}
                                                  value={this.state.startTime} onChange={this.changeHandler}
                                                  name={"startTime"}/>
                                </Col>
                            </Form.Group>

                            {/*<Form.Group as={Row} controlId={"score"}>*/}
                            {/*    <Form.Label column sm={4}>Score:</Form.Label>*/}
                            {/*    <Col sm={8}>*/}
                            {/*        <Form.Control type={"text"} placeholder={"Score"}*/}
                            {/*                      value={this.state.score} onChange={this.changeHandler}*/}
                            {/*                      name={"score"}/>*/}
                            {/*    </Col>*/}
                            {/*</Form.Group>*/}

                            {/*<Form.Group as={Row} controlId={"comments"}>*/}
                            {/*    <Form.Label column sm={4}>Comments:</Form.Label>*/}
                            {/*    <Col sm={8}>*/}
                            {/*        <Form.Control type={"text"} placeholder={"Comments"}*/}
                            {/*                      value={this.state.comments} onChange={this.changeHandler}*/}
                            {/*                      name={"comments"}/>*/}
                            {/*    </Col>*/}
                            {/*</Form.Group>*/}

                            <Form.Group as={Row} controlId={"state"}>
                                <Form.Label column sm={4}>State:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.state}
                                                  onChange={this.changeHandler} name={"state"} readOnly plaintext>
                                        <option value="PENDING">Pending</option>
                                    </Form.Control>
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

export default withCookies(withRouter(UserRequestSessionComponent))