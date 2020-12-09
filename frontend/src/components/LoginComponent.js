import {withCookies} from "react-cookie";
import {Link, withRouter} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";
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
        this.setState({[name]:value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        const {cookies} = this.props;
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
                this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
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
                        <Form.Control type={"text"} placeholder={"password"}
                                      value={this.state.startTime} onChange={this.changeHandler}
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