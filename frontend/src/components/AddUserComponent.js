import React from 'react';
import UserService from '../services/UserService';

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
                <form className={"form-horizontal"}>
                    <div className={"form-group"}>
                        <label>Username: <input type="text" name="username" value={this.state.username}
                                                className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Role: <input type="text" name="role" value={this.state.role}
                                            className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>

                    <div className="form-group">
                        <label>Role: <select multiple className="form-control">
                            <option>Student</option>
                            <option>Instructor</option>
                            <option>Administrator</option>
                        </select></label>
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


                    <div className={"form-group"}>
                        <label>Date of Birth: <input type="text" name="dateOfBirth" value={this.state.dateOfBirth}
                                                     className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Date Joined: <input type="text" name="dateJoined" value={this.state.dateJoined}
                                                   className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}

                    <button type="submit" className={"btn btn-dark"} onClick={this.submitHandler}>Submit</button>
                </form>
            </div>

        )
    }
}

export default AddUserComponent