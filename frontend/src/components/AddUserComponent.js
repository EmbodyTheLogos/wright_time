import React from 'react';
import UserService from '../services/UserService';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddUserComponent extends React.Component {

    constructor(props){
        super(props)
        if(!props.match.params.id) {
            this.state = {
                mode: "add",
                username: "",
                role: "",
                firstName: "",
                lastName: "",
                email: "",
                dateOfBirth: Date.now(),
                errorMessage: ""
            };
        } else {
            this.state = {
                mode: "edit",
                userId: props.match.params.id,
                username: "",
                role: "",
                firstName: "",
                lastName: "",
                email: "",
                dateOfBirth: Date.now(),
                errorMessage: ""
            };
        }

    }

    componentDidMount(){
        if(this.state.mode === "edit") {
            UserService.getOneUser(this.props.match.params.id).then(res => {
                let dataOfBirth = res.data.dateOfBirth.split('-')
                console.log(dataOfBirth)
                let year = parseInt(dataOfBirth[0])
                let month = parseInt(dataOfBirth[1]) - 1
                let day = parseInt(dataOfBirth[2])

                this.setState({
                    username: res.data.username,
                    role: res.data.role,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    dateOfBirth: new Date(year, month, day),
                });
            })
        }
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]:value})
    }

    handleDateChange = (date) => {
        this.setState({
            'dateOfBirth': date
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let user = {
            username: this.state.username,
            role: this.state.role,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            dateOfBirth: this.state.dateOfBirth,
        };

        console.log(JSON.stringify(user));
        if(this.state.mode === "add") {
            UserService.postUser(user).then(res => {
                this.props.history.push('/users')
            }).catch(res => {
                if(res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            UserService.putUser(this.state.userId, user).then(res => {
                this.props.history.push('/users')
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
                <br/>

                <form className={"form-horizontal"}>
                    <div className={"form-group"}>
                        <label>Username: <input type="text" name="username" value={this.state.username}
                                                className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className="form-group">
                        <label>Role: <select value={this.state.role} onChange={this.changeHandler}
                                             name="role" className={"form-control"}>
                            <option value="empty"> </option>
                            <option value="ROLE_ADMIN">Administrator</option>
                            <option value="ROLE_INSTRUCTOR">Instructor</option>
                            <option value="ROLE_STUDENT">Student</option>
                        </select>
                        </label>
                    </div>


                    <div className={"form-group"}>
                        <label>First Name: <input type="text" name="firstName" value={this.state.firstName}
                                                  className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Last Name: <input type="text" name="lastName" value={this.state.lastName}
                                                 className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Email: <input type="text" name="email" value={this.state.email}
                                             className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>

                    <div className="form-group">
                        <label>Date of Birth: <DatePicker
                            selected={this.state.dateOfBirth}
                            onChange={this.handleDateChange}
                            name="dateOfBirth"
                            dateFormat="MM/dd/yyyy"
                        /></label>
                    </div>


                    {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}

                    <button type="submit" className={"btn btn-dark"} onClick={this.submitHandler}>Submit</button>
                </form>

            </div>

        )
    }
}

export default AddUserComponent