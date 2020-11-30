import React from 'react';
import SessionService from '../../services/SessionService';
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Center from "react-center";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import UserService from "../../services/UserService";
import AircraftService from "../../services/AircraftService";

class AddSessionComponent extends React.Component {

    constructor(props){
        super(props)
        if(!props.match.params.id) {
            this.state = {
                mode: "add",
                aircraftId: "",
                instructorId: "",
                studentId: "",
                date: new Date(),
                startTime: "",
                endTime: "",
                score: "",
                comments: "",
                state: "",
                aircrafts: [],
                students: [],
                instructors: [],
                errorMessage: ""
            };
        } else {
            this.state = {
                mode: "edit",
                sessionId: props.match.params.id,
                aircraftId: "",
                instructorId: "",
                studentId: "",
                date: new Date(),
                startTime: "",
                endTime: "",
                score: "",
                comments: "",
                state: "",
                aircrafts: [],
                students: [],
                instructors: [],
                errorMessage: ""
            };
        }

    }

    componentDidMount(){
        if(this.state.mode === "edit") {
            SessionService.getOne(this.props.match.params.id).then(res => {
                let date = res.data.date.split('-')
                let year = parseInt(date[0])
                let month = parseInt(date[1]) - 1
                let day = parseInt(date[2])

                this.setState({
                    aircraftId: res.data.aircraft.id,
                    instructorId: res.data.instructor.id,
                    studentId: res.data.student.id,
                    startTime: res.data.startTime,
                    endTime: res.data.endTime,
                    score: res.data.score,
                    comments: res.data.comments,
                    state: res.data.state,
                    date: new Date(year, month, day),
                });
            })
        }
        UserService.getAllInstructors().then((response) => {
            this.setState({ instructors: response.data})
        })
        UserService.getAllStudents().then((response) => {
            this.setState({ students: response.data})
        })
        AircraftService.getAll().then((response) => {
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
            SessionService.post(session).then(res => {
                this.props.history.push('/admin/sessions')
            }).catch(res => {
                if(res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            SessionService.put(this.state.sessionId, session).then(res => {
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
                <AdministratorNavbar/>
                <br/>

                {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}

                <Container>
                    <Center>
                        <Form>
                            {/*<Form.Group controlId={"aircraftId"}>*/}
                            {/*    <Form.Control type={"text"} placeholder={"Aircraft ID"}*/}
                            {/*                  value={this.state.aircraftId} onChange={this.changeHandler}*/}
                            {/*                  name={"aircraftId"}/>*/}
                            {/*</Form.Group>*/}
                            <Form.Group controlId={"aircraftId"}>
                                <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.aircraftId}
                                              onChange={this.changeHandler} name={"aircraftId"}>
                                    <option value="empty"> </option>
                                    {this.state.aircrafts.map(aircraft => <option value={aircraft.id}>
                                        {aircraft.manufacturer + " " + aircraft.model + " " + aircraft.name}</option>)}
                                </Form.Control>
                            </Form.Group>

                            {/*<Form.Group controlId={"instructorId"}>*/}
                            {/*    <Form.Control type={"text"} placeholder={"Instructor ID"}*/}
                            {/*                  value={this.state.instructorId} onChange={this.changeHandler}*/}
                            {/*                  name={"instructorId"}/>*/}
                            {/*</Form.Group>*/}
                            <Form.Group controlId={"instructorId"}>
                                <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.instructorId}
                                              onChange={this.changeHandler} name={"instructorId"}>
                                    <option value="empty"> </option>
                                    {this.state.instructors.map(instructor => <option value={instructor.id}>
                                        {instructor.firstName + " " + instructor.lastName}</option>)}
                                </Form.Control>
                            </Form.Group>

                            {/*<Form.Group controlId={"studentId"}>*/}
                            {/*    <Form.Control type={"text"} placeholder={"Student ID"}*/}
                            {/*                  value={this.state.studentId} onChange={this.changeHandler}*/}
                            {/*                  name={"studentId"}/>*/}
                            {/*</Form.Group>*/}
                            <Form.Group controlId={"studentId"}>
                                <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.studentId}
                                              onChange={this.changeHandler} name={"studentId"}>
                                    <option value="empty"> </option>
                                    {this.state.students.map(student => <option value={student.id}>
                                        {student.firstName + " " + student.lastName}</option>)}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId={"date"}>
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.handleDateChange}
                                    name="date"
                                    dateFormat="MM/dd/yyyy"
                                />
                            </Form.Group>

                            <Form.Group controlId={"startTime"}>
                                <Form.Control type={"text"} placeholder={"Start Time"}
                                              value={this.state.startTime} onChange={this.changeHandler}
                                              name={"startTime"}/>
                            </Form.Group>

                            <Form.Group controlId={"endTime"}>
                                <Form.Control type={"text"} placeholder={"End Time"}
                                              value={this.state.endTime} onChange={this.changeHandler}
                                              name={"endTime"}/>
                            </Form.Group>

                            <Form.Group controlId={"score"}>
                                <Form.Control type={"text"} placeholder={"Score"}
                                              value={this.state.score} onChange={this.changeHandler}
                                              name={"score"}/>
                            </Form.Group>

                            <Form.Group controlId={"comments"}>
                                <Form.Control type={"text"} placeholder={"Comments"}
                                              value={this.state.comments} onChange={this.changeHandler}
                                              name={"comments"}/>
                            </Form.Group>

                            <Form.Group controlId={"state"}>
                                <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.state}
                                              onChange={this.changeHandler} name={"state"}>
                                    <option value="empty"> </option>
                                    <option value="PENDING">Pending</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="DECLINED">Declined</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="COMPLETE">Completed</option>
                                </Form.Control>
                            </Form.Group>

                            <Button variant="dark" type="submit" onClick={this.submitHandler}>Submit</Button>
                        </Form>
                    </Center>
                </Container>

            </div>

        )
    }
}

export default AddSessionComponent