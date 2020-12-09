import {withCookies} from "react-cookie";
import {Link, withRouter} from "react-router-dom";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import AuthService from "../services/AuthService";

class LoginComponent extends React.Component {
    state = {
        email: "",
        password: ""
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        console.log(name + ':' + value)
        this.setState({[name]:value})
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
            if(res.response) {
                console.log(res.response)
                if(res.response.status === 401) {
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
            <div>
                {this.state.errorMessage &&
                <Alert variant="danger">
                    <Alert.Heading>Input Error</Alert.Heading>
                    <p>{this.state.errorMessage}</p>
                </Alert>}
                <Form.Group as={Row} controlId={"email"}>
                    <Form.Label column sm={4}>Email:</Form.Label>
                    <Col sm={8}>
                        <Form.Control type={"text"} placeholder={"email"}
                                      value={this.state.email} onChange={this.changeHandler}
                                      name={"email"}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId={"password"}>
                    <Form.Label column sm={4}>Password:</Form.Label>
                    <Col sm={8}>
                        <Form.Control type={"password"} placeholder={"password"}
                                      defaultValue={this.state.password} onChange={this.changeHandler}
                                      name={"password"}/>
                    </Col>
                </Form.Group>
                <Button variant="dark" type="submit" onClick={this.submitHandler}>Submit</Button>

                <br/>

                <div>
                    <div className="container mt-4">
                        <Link to={"/pending"} className={"btn btn-secondary btn-block"} onClick={this.loginAdmin}>Administrator</Link>
                        <br/>
                        <Link to={"/user/home"} className={"btn btn-info btn-block"} onClick={this.loginInstructor}>Instructor</Link>
                        <br/>
                        <Link to={"/user/home"} className={"btn btn-info btn-block"} onClick={this.loginUser}>User</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(withRouter(LoginComponent))