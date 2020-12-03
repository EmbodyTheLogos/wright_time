import React from 'react';
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import { Calendar, momentLocalizer  } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import AuthService from "../../services/AuthService";
import SessionService from "../../services/SessionService";

//import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

class MyBigCalendar extends React.Component {
    state = {
        jwtToken: "",
        user: "",
        events: [
            // {
            //     start: moment().toDate(),
            //     end: moment()
            //         .add(1, "days")
            //         .toDate(),
            //     title: "Some title"
            // }
        ]
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')
        console.log(moment().toDate())
    }

    componentDidMount(){
        // AuthService.user(this.state.jwtToken).then((res) => {
        //     this.setState({user: res.data})
        //     //console.log(this.state.user)
        // })

        AuthService.user(this.state.jwtToken).then(res => {
            SessionService.getByStudent(this.state.jwtToken, res.data.id).then(sessionRes => {
                // console.log(sessionRes)
                let events = []
                for(let index in sessionRes.data) {
                    let session = sessionRes.data[index]
                    console.log(session)
                    let date = session.date.split('-')
                    let year = parseInt(date[0])
                    let month = parseInt(date[1]) - 1
                    let day = parseInt(date[2])
                    // dates.push(new Date(year, month, day))
                    var startDate = new Date(year, month, day)
                    startDate.setHours(session.startTime)

                    var endDate = new Date(year, month, day)
                    endDate.setHours(session.startTime + session.aircraft.trainingDuration)

                    events.push({start:startDate, end: endDate, title: "Class"})
                }
                // console.log(this.state)
                this.setState({events: events})
                //console.log("setState")
                // console.log(this.state)
            })
        })
    }

    render() {
        console.log(this.state.sessionDates)
        return (
            <div>
                <Calendar
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        )
    }
}

export default withCookies(withRouter(MyBigCalendar))