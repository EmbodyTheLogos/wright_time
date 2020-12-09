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
import UserNavbar from "../Navbars/UserNavbar";
import AuthService from "../../services/AuthService";

class InstructorReviewComponent extends React.Component {
    state = {
        id: -1,
        aircraftId: "-1",
        instructorId: "-1",
        studentId: "-1",
        date: new Date(),
        startTime: "",
        score: "",
        comments: "",
        state: "empty",
        errorMessage: "",
        jwtToken: "",
        user: ""
    };

    constructor(props) {
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
        this.state.id = props.match.params.id
    }

    componentDidMount() {
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
        AuthService.user(this.state.jwtToken).then((res) => {
            this.setState({user: res.data})})
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    }

    handleDateChange = (date) => {
        this.setState({
            'date': date
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.aircraftId === "-1") {
            this.setState({errorMessage: "Aircraft must not be empty"});
            return
        }
        if (this.state.studentId === "-1") {
            this.setState({errorMessage: "Student must not be empty"});
            return
        }
        if (this.state.instructorId === "-1") {
            this.setState({errorMessage: "Instructor must not be empty"});
            return
        }
        if (this.state.state === "empty") {
            this.setState({errorMessage: "State must not be empty"});
            return
        }

        let date = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate().toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        let session = {
            aircraft: {id: this.state.aircraftId},
            instructor: {id: this.state.instructorId},
            student: {id: this.state.studentId},
            startTime: this.state.startTime,
            date: date,
            score: this.state.score,
            comments: this.state.comments,
            state: "COMPLETE",
        };

        //console.log(JSON.stringify(session));
        // if(this.state.mode === "add") {
        //     SessionService.post(this.state.jwtToken, session).then(res => {
        //         this.props.history.push('/sessions')
        //     }).catch(res => {
        //         if(res.response) {
        //             this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
        //         } else {
        //             this.setState({errorMessage: res.message});
        //         }
        //     })
        // } else {
        SessionService.put(this.state.jwtToken, this.state.id, session).then(res => {
            this.props.history.push('/sessions')
        }).catch(res => {
            if (res.response) {
                this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
            } else {
                this.setState({errorMessage: res.message});
            }
        })
        //}
    }

    render() {
        const role = this.state.user.role
        return (
            <div>
                {role === "ROLE_ADMIN" ? <AdministratorNavbar/> : <UserNavbar/>}
                <br/>

                <Container>
                    {this.state.errorMessage &&
                    <Alert variant="danger">
                        <Alert.Heading>Input Error</Alert.Heading>
                        <p>{this.state.errorMessage}</p>
                    </Alert>}

                    <Center>
                        <Form>
                            <Form.Group as={Row} controlId={"score"}>
                                <Form.Label column sm={4}>Score:</Form.Label>
                                <Col sm={8}>
                                    <Form.Control as={"select"} className={"mr-sm-2"} value={this.state.score}
                                                  onChange={this.changeHandler} name={"score"}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Form.Control>
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

                            <Button variant="dark" type="submit" onClick={this.submitHandler}>Submit</Button>
                        </Form>
                    </Center>
                </Container>

            </div>

        )
    }
}

export default withCookies(withRouter(InstructorReviewComponent))