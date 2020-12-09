import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import AuthService from "../../services/AuthService";

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
        let request = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(JSON.stringify(request));

        AuthService.signin(request).then(res => {
            this.props.history.push('/home')
        }).catch(res => {
            if(res.response) {
                this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
            } else {
                this.setState({errorMessage: res.message});
            }
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
            </div>
        );
    }
}

export default withCookies(withRouter(LoginComponent))