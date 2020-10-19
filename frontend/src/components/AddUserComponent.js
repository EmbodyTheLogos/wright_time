import React from 'react';
import UserService from '../services/UserService';
import {Link} from "react-router-dom";

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
                dateOfBirth: "",
                dateJoined: "",
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
                dateOfBirth: "",
                dateJoined: "",
                errorMessage: ""
            };
        }

    }

    componentDidMount(){
        if(this.state.mode === "edit") {
            UserService.getOneUser(this.props.match.params.id).then(res => {
                this.setState({
                    username: res.data.username,
                    role: res.data.role,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    dateOfBirth: res.data.dateOfBirth,
                    dateJoined: res.data.dateJoined
                });
            })
        }
    }

    changeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]:value})
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
            dateJoined: this.state.dateJoined
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
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username"
                           value={this.state.username} onChange={this.changeHandler}/>
                    <br/>

                    <label htmlFor="role">Role:</label>
                    <input type="text" id="role" name="role"
                           value={this.state.role} onChange={this.changeHandler}/>
                    <br/>

                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName"
                           value={this.state.firstName} onChange={this.changeHandler}/>
                    <br/>

                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName"
                           value={this.state.lastName} onChange={this.changeHandler}/>
                    <br/>

                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email"
                           value={this.state.email} onChange={this.changeHandler}/>
                    <br/>

                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input type="text" id="dateOfBirth" name="dateOfBirth"
                           value={this.state.dateOfBirth} onChange={this.changeHandler}/>
                    <br/>

                    <label htmlFor="dateJoined">Date Joined:</label>
                    <input type="text" id="dateJoined" name="dateJoined"
                           value={this.state.dateJoined} onChange={this.changeHandler}/>
                    <br/>

                    {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}

                    <input type="submit" value="Submit" onClick={this.submitHandler}/>
                </form>
            </div>

        )
    }
}

export default AddUserComponent