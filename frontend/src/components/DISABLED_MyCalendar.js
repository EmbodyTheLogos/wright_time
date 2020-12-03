import React from 'react';
import Calendar from 'react-calendar';
import './DISABLED_MyCalendarStyle.css'
import {differenceInCalendarDays} from 'date-fns';
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";


const datesToAddClassTo  = [new Date(2020, 11, 4), new Date(2020, 11, 6),
    new Date(2020, 11, 11)];

// const datesToAddClassTo = SessionService.getByStudent()


class DISABLED_MyCalendar extends React.Component {
    state = {
        value: new Date(),
        jwtToken: "",
        sessionDates: []
    }

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.jwtToken = cookies.get('JWT-TOKEN')

    }

    componentDidMount() {
        // console.log("componentDidMount")
        // AuthService.user(this.state.jwtToken).then(res => {
        //     SessionService.getByStudent(this.state.jwtToken, res.data.id).then(sessionRes => {
        //         // console.log(sessionRes)
        //         let dates = []
        //         for(let index in sessionRes.data) {
        //             let session = sessionRes.data[index]
        //             // console.log(session)
        //             let date = session.date.split('-')
        //             let year = parseInt(date[0])
        //             let month = parseInt(date[1]) - 1
        //             let day = parseInt(date[2])
        //             dates.push(new Date(year, month, day))
        //         }
        //         // console.log(this.state)
        //         this.setState({sessionDates: dates})
        //         console.log("setState")
        //         // console.log(this.state)
        //     })
        // })
    }

    isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }

    tileContent = ({ date, view }) => {
        // console.log("tileContents")
        // Add class to tiles in month view only
        // console.log(date)
        // console.log(this.state)
        if (view === 'month') {
            if (datesToAddClassTo.find(dDate => this.isSameDay(dDate, date))) {
                return <p>Flight</p>;
            }
        }
    }

    onChange = (event) => {

    }

    render() {
        console.log("render")
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.value}
                    tileContent={this.tileContent}
                />
            </div>
        )
    }
}

export default  withCookies(withRouter(DISABLED_MyCalendar))