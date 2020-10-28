import React from 'react';
import CertificationService from '../services/CertificationService';
import {Nav, Navbar} from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddCertificationComponent extends React.Component {

    constructor(props){
        super(props)
        if(!props.match.params.id) {
            this.state = {
                mode: "add",
                userId: "",
                aircraftId: "",
                date: Date.now(),
                errorMessage: ""
            };
        } else {
            this.state = {
                mode: "edit",
                id: props.match.params.id,
                userId: "",
                aircraftId: "",
                date: Date.now(),
                errorMessage: ""
            };
        }

    }

    componentDidMount(){
        if(this.state.mode === "edit") {
            CertificationService.getOne(this.props.match.params.id).then(res => {
                let date = res.data.dateObtained.split('-')
                console.log(date)
                let year = parseInt(date[0])
                let month = parseInt(date[1]) - 1
                let day = parseInt(date[2])

                this.setState({
                    aircraftId: res.data.aircraft.aircraftId,
                    userId: res.data.user.userId,
                    dateObtained: new Date(year, month, day),
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
            'date': date
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let cert = {
            aircraft:{aircraftId:this.state.aircraftId},
            user:{userId:this.state.userId},
            dateObtained: this.state.dateObtained,
        };

        console.log(JSON.stringify(cert));
        if(this.state.mode === "add") {
            CertificationService.post(cert).then(res => {
                this.props.history.push('/certifications')
            }).catch(res => {
                if(res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            CertificationService.put(this.state.userId, cert).then(res => {
                this.props.history.push('/certifications')
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
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/aircraft">Aircraft View</Nav.Link>
                        <Nav.Link href="/users">Users View</Nav.Link>
                        <Nav.Link href="/sessions">Sessions View</Nav.Link>
                        <Nav.Link href="/certifications">Certifications View</Nav.Link>
                    </Nav>
                </Navbar>
                <br/>

                <form className={"form-horizontal"}>
                    {/*want these to be dropdowns in the future*/}
                    <div className={"form-group"}>
                        <label>User ID: <input type="text" name="userId" value={this.state.userId}
                                                   className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Aircraft ID: <input type="text" name="aircraftId" value={this.state.aircraftId}
                                                     className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className="form-group">
                        <label>Date Obtained: <DatePicker
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                            name="date"
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

export default AddCertificationComponent