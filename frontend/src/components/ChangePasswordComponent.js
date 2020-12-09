import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import AuthService from "../services/AuthService";

class ChangePasswordComponent extends React.Component {
    state = {
        password: "",
        jwtToken: "",
        user: null
    }

    constructor(props) {
        super(props)
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
    }

    componentDidMount() {
        AuthService.user(this.state.jwtToken).then(res => {
            this.setState({user: res.data})
        })
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]:value})
    }

    submitHandler = (event) => {
        event.preventDefault();
        AuthService.changePassword(this.state.jwtToken, this.state.password).then(res => {
            console.log(this.state.user)
            if(this.state.user.role === "ROLE_ADMIN") {
                this.props.history.push('/pending')
            } else {
                this.props.history.push('/user/home')
            }
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
            </div>
        );
    }
}

export default withCookies(withRouter(ChangePasswordComponent))