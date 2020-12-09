import React from 'react';
import SessionService from '../../services/SessionService';
import {Alert, Button, Col, Container, Form, Row} from 'react-bootstrap'

import "react-datepicker/dist/react-datepicker.css";
import Center from "react-center";
import AdministratorNavbar from "../Navbars/AdministratorNavbar";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import UserNavbar from "../Navbars/UserNavbar";
import AuthService from "../../services/AuthService";
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

class InstructorReviewComponent extends React.Component {
    state = {
        id: -1,
        score: "",
        comments: "",
        user: "",
        errorMessage: "",
        jwtToken: ""
    };

    constructor(props) {
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
        this.state.id = props.match.params.id
    }

    componentDidMount() {
        SessionService.getOne(this.state.jwtToken, this.props.match.params.id).then(res => {
            this.setState({
                score: res.data.score,
                comments: res.data.comments,
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

        let request = {
            score: this.state.score,
            comments: this.state.comments,
        };

        SessionService.complete(this.state.jwtToken, this.state.id, request).then(res => {
            this.props.history.push('/sessions')
        }).catch(res => {
            console.log(JSON.stringify(res.response.data))
            if (res.response) {
                this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
            } else {
                this.setState({errorMessage: res.message});
            }
        })
    }

    render() {
        const role = this.state.user.role
        return (
            <div>
                {role === "ROLE_ADMIN" ? <AdministratorNavbar/> : <UserNavbar/>}
                <div style={bg}>

                <Container style={content}>
                    <h3>Performance Review Form</h3>
                    <br/>

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

            </div>

        )
    }
}

export default withCookies(withRouter(InstructorReviewComponent))