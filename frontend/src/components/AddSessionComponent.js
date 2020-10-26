import React from 'react';
import SessionService from '../services/SessionService';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddSessionComponent extends React.Component {

    constructor(props){
        super(props)
        if(!props.match.params.id) {
            this.state = {
                mode: "add",
                aircraftId: "",
                instructorId: "",
                studentId: "",
                date: Date.now(),
                startTime: "",
                endTime: "",
                score: "",
                comments: "",
                state: "",
                errorMessage: ""
            };
        } else {
            this.state = {
                mode: "edit",
                sessionId: props.match.params.id,
                aircraftId: "",
                instructorId: "",
                studentId: "",
                date: Date.now(),
                startTime: "",
                endTime: "",
                score: "",
                comments: "",
                state: "",
                errorMessage: ""
            };
        }

    }

    componentDidMount(){
        if(this.state.mode === "edit") {
            SessionService.getOneSession(this.props.match.params.id).then(res => {
                let date = res.data.date.split('-')
                console.log(date)
                let year = parseInt(date[0])
                let month = parseInt(date[1]) - 1
                let day = parseInt(date[2])

                this.setState({
                    aircraftId: res.data.aircraft.aircraftId,
                    instructorId: res.data.instructor.userId,
                    studentId: res.data.student.userId,
                    startTime: res.data.startTime,
                    endTime: res.data.endTime,
                    score: res.data.score,
                    comments: res.data.comments,
                    state: res.data.state,
                    date: new Date(year, month, day),
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
        let session = {
            aircraft:{aircraftId:this.state.aircraftId},
            instructor:{userId:this.state.instructorId},
            student:{userId:this.state.studentId},
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            date: this.state.date,
            score: this.state.score,
            comments: this.state.comments,
            state: this.state.state,
        };

        console.log(JSON.stringify(session));
        if(this.state.mode === "add") {
            SessionService.postSession(session).then(res => {
                this.props.history.push('/sessions')
            }).catch(res => {
                if(res.response) {
                    this.setState({errorMessage: res.response.data.errors[0].defaultMessage});
                } else {
                    this.setState({errorMessage: res.message});
                }
            })
        } else {
            SessionService.putSession(this.state.sessionId, session).then(res => {
                this.props.history.push('/sessions')
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

                    {/*want these to be dropdowns in the future*/}
                    <div className={"form-group"}>
                        <label>Aircraft ID: <input type="text" name="aircraftId" value={this.state.aircraftId}
                                                className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Instructor ID: <input type="text" name="instructorId" value={this.state.instructorId}
                                                   className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Student ID: <input type="text" name="studentId" value={this.state.studentId}
                                                   className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className="form-group">
                        <label>Date of Session: <DatePicker
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                            name="date"
                            dateFormat="MM/dd/yyyy"
                        /></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Start Time: <input type="text" name="startTime" value={this.state.startTime}
                                                  className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>End Time: <input type="text" name="endTime" value={this.state.endTime}
                                                 className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Score: <input type="text" name="score" value={this.state.score}
                                             className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className={"form-group"}>
                        <label>Comments: <input type="text" name="comments" value={this.state.comments}
                                             className={"from-control"} onChange={this.changeHandler}/></label>
                    </div>


                    <div className="form-group">
                        <label>State: <select value={this.state.state} onChange={this.changeHandler}
                                             name="state" className={"form-control"}>
                            <option value="empty"> </option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="DECLINED">Declined</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="COMPLETE">Completed</option>
                        </select>
                        </label>
                    </div>


                    {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}

                    <button type="submit" className={"btn btn-dark"} onClick={this.submitHandler}>Submit</button>
                </form>

            </div>

        )
    }
}

export default AddSessionComponent