import {withCookies} from "react-cookie";
import {Link, withRouter} from "react-router-dom";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import React from "react";
import Center from 'react-center';
import AuthService from "../services/AuthService";
import BGImage from "../Images/cloudy_sky.jpg"

var bg = {
    backgroundImage: `url(${BGImage})`,
    display: 'flex',
    height: '100vh'
}

var content = {
    backgroundColor: 'white',
    margin: '10px auto',
    paddingTop: '20px',
    paddingRight: '30px',
    paddingLeft: '30px',
    paddingBottom: '-1px'
}

class LoginComponent extends React.Component {
    state = {
        email: "",
        password: ""
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        const {cookies} = this.props;
        console.log(this.state.password)
        AuthService.signin(this.state.email, this.state.password).then(res => {
            cookies.set('JWT-TOKEN', res.data.accessToken)
            AuthService.user(res.data.accessToken).then(res => {
                if (res.data.role === 'ROLE_ADMIN') {
                    this.props.history.push('/pending')
                } else {
                    this.props.history.push('/user/home')
                }
            })
        }).catch(res => {
            if (res.response) {
                console.log(res.response)
                if (res.response.status === 401) {
                    this.setState({errorMessage: 'Invalid Email or Password'});
                } else {
                    this.setState({errorMessage: "unknown error"})
                }

            } else {
                this.setState({errorMessage: res.message});
            }
        })
    }

    loginUser = (event) => {
        const {cookies} = this.props;
        AuthService.signin('lhn5032@psu.edu', 'password').then((response) => {
            cookies.set('JWT-TOKEN', response.data.accessToken)
        })
    }

    loginInstructor = (event) => {
        const {cookies} = this.props;
        AuthService.signin('bdw5230@psu.edu', 'password').then((response) => {
            cookies.set('JWT-TOKEN', response.data.accessToken)
        })
    }

    loginAdmin = (event) => {
        const {cookies} = this.props;
        AuthService.signin('jmd6724@psu.edu', 'password').then((response) => {
            cookies.set('JWT-TOKEN', response.data.accessToken)
        })
    }

    render() {
        return (
            <div style={bg}>
                <Container style={content}>
                    {this.state.errorMessage &&
                    <Alert variant="danger">
                        <Alert.Heading>Input Error</Alert.Heading>
                        <p>{this.state.errorMessage}</p>
                    </Alert>}
                    <Center>
                        <Form>
                            <Form.Group as={Row} controlId={"email"} style={{marginTop: "20px"}}>
                                <Form.Label column sm={3}>Email:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control type={"text"} placeholder={"Email"}
                                                  value={this.state.email} onChange={this.changeHandler}
                                                  name={"email"}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId={"password"} style={{marginTop: "20px"}}>
                                <Form.Label column sm={3}>Password:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control type={"password"} placeholder={"Password"}
                                                  defaultValue={this.state.password} onChange={this.changeHandler}
                                                  name={"password"}/>
                                </Col>
                            </Form.Group>
                            <Button variant="dark" type="submit" style={{marginTop: "20px"}}
                                    onClick={this.submitHandler}>Submit</Button>
                        </Form>
                    </Center>
                    <br/>

                    <div>
                        <div className="container mt-4">
                            <Link to={"/pending"} className={"btn btn-secondary btn-block"}
                                  onClick={this.loginAdmin}>Administrator</Link>
                            <br/>
                            <Link to={"/user/home"} className={"btn btn-info btn-block"}
                                  onClick={this.loginInstructor}>Instructor</Link>
                            <br/>
                            <Link to={"/user/home"} className={"btn btn-info btn-block"}
                                  onClick={this.loginUser}>User</Link>
                        </div>
                    </div>

                </Container>
            </div>
        );
    }
}

export default withCookies(withRouter(LoginComponent))