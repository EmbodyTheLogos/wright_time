import React from 'react';
import SessionService from '../../services/SessionService';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Center from "react-center";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import UserService from "../../services/UserService";
import AircraftService from "../../services/AircraftService";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";

class AddSessionComponent extends React.Component {
    state = {
        mode: "",
        id: -1,
        aircraftId: "-1",
        instructorId: "-1",
        studentId: "-1",
        date: new Date(),
        startTime: "",
        score: "",
        comments: "",
        state: "empty",
        aircrafts: [],
        students: [],
        instructors: [],
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
            SessionService.getOne(this.state.jwtToken, this.props.match.params.id).then(res => {
                let date = res.data.date.split('-')
                let year = parseInt(date[0])
                let month = parseInt(date[1]) - 1
                let day = parseInt(date[2])

                this.setState({
                    aircraftId: res.data.aircraft.id,
                    instructorId: res.data.instructor.id,
                    studentId: res.data.student.id,
                    startTime: res.data.startTime,
                    score: res.data.score,
                    comments: res.data.comments,
                    state: res.data.state,
                    date: new Date(year, month, day),
                });
            })
        }
        UserService.getAllInstructors(this.state.jwtToken).then((response) => {
            this.setState({ instructors: response.data})
        })
        UserService.getAllStudents(this.state.jwtToken).then((response) => {
            this.setState({ students: response.data})
        })
        AircraftService.getAll(this.state.jwtToken).then((response) => {
            this.setState({aircrafts: response.data})
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
        if(this.state.aircraftId === "-1") { this.setState({errorMessage: "Aircraft must not be empty"}); return}
        if(this.state.studentId === "-1") { this.setState({errorMessage: "Student must not be empty"}); return}
        if(this.state.instructorId === "-1") { this.setState({errorMessage: "Instructor must not be empty"}); return}
        if(this.state.state === "empty") { this.setState({errorMessage: "State must not be empty"}); return}

        let year = this.state.date.getFullYear()
        let month = (this.state.date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
        let day = this.state.date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
        let date = year + "-" + month + "-" + day

        let session = {
            aircraft:{id:this.state.aircraftId},
            instructor:{id:this.state.instructorId},
            student:{id:this.state.studentId},
            startTime: this.state.startTime,
            date: date,
            score: this.state.score,
            comments: this.state.comments,
            state: this.state.state,
        };

        console.log(JSON.stringify(session));
        if(this.state.mode === "add") {
            SessionService.post(this.state.jwtToken, session).then(res => {
                this.props.history.push('/sessions')
            }).catch(res => {
                if(res.response) {
                    if(res.response.status === 409) {
                        this.setState({errorMessage: 'Conflict detected with another session.'})
                        console.log(res.response.data.conflict)
                    } else if(res.response.status === 417) {
                        this.setState({errorMessage: 'Instructor not certified to pilot aircraft.'})
                    } else {
                        this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                    }
                } else {
                    this.setState({errorMessage: res.message});
                }
            });
        } else {
            SessionService.put(this.state.jwtToken, this.state.id, session).then(res => {
                this.props.history.push('/sessions')
            }).catch(res => {
                if(res.response) {
                    console.log(res.response)
                    if(res.response.status === 409) {
                        this.setState({errorMessage: 'Conflict detected with another session.'})
                        console.log(res.response.data.conflict)
                    } else if(res.response.status === 417) {
                        this.setState({errorMessage: 'Instructor not certified to pilot aircraft.'})
                    } else {
                        this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                    }
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

                <Container>
                    {this.state.errorMessage &&
                    <Alert variant="danger">
                        <Alert.Heading>Input Error</Alert.Heading>
                        <p>{this.state.errorMessage}</p>
                    </Alert>}

                    <Center>
                        <Form>
                            <Form.Group as={Row} controlId={"aircraftId"}>
                                <Form.Label column sm={4}>Aircraft:</Form.Label>
                                <Col sm={8}>
                                <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.aircraftId}
                                              onChange={this.changeHandler} name={"aircraftId"}>
                                    <option value="-1"> </option>
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
                                    <option value="-1"> </option>
                                    {this.state.instructors.map(instructor => <option key={instructor.id} value={instructor.id}>
                                        {instructor.firstName + " " + instructor.lastName}</option>)}
                                </Form.Control>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"studentId"}>
                                <Form.Label column sm={4}>Student:</Form.Label>
                                <Col sm={8}>
                                <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.studentId}
                                              onChange={this.changeHandler} name={"studentId"}>
                                    <option value="-1"> </option>
                                    {this.state.students.map(student => <option key={student.id} value={student.id}>
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

                            <Form.Group as={Row} controlId={"score"}>
                                <Form.Label column sm={4}>Score:</Form.Label>
                                <Col sm={8}>
                                <Form.Control type={"text"} placeholder={"Score"}
                                              value={this.state.score} onChange={this.changeHandler}
                                              name={"score"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"comments"}>
                                <Form.Label column sm={4}>Comments:</Form.Label>
                                <Col sm={8}>
                                <Form.Control type={"text"} placeholder={"Comments"}
                                              value={this.state.comments} onChange={this.changeHandler}
                                              name={"comments"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"state"}>
                                <Form.Label column sm={4}>State:</Form.Label>
                                <Col sm={8}>
                                <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.state}
                                              onChange={this.changeHandler} name={"state"}>
                                    <option value="empty"> </option>
                                    <option value="PENDING">Pending</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="DECLINED">Declined</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="COMPLETE">Completed</option>
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

export default withCookies(withRouter(AddSessionComponent))