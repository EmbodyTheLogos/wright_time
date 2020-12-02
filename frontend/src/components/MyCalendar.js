import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './MyCalendarStyle.css'
import { differenceInCalendarDays } from 'date-fns';
import SessionService from "../services/SessionService";
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";


// const datesToAddClassTo  = [new Date(2020, 11, 4), new Date(2020, 11, 6),
//     new Date(2020, 11, 11)];

//const datesToAddClassTo = SessionService.getByStudent()

function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
        // Check if a date React-Calendar wants to check is on the list of dates to add class to
        if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
            return <p>Flight</p>;
        }
    }
}

function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
}

function MyCalendar() {
    const [value, onChange] = useState(new Date());
    const {cookies} = props;
    this.state.jwtToken = cookies.get('JWT-TOKEN')

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={value}
                //tileClassName={tileClassName}
                //tileClassName={"Hello World"}
                tileContent={tileContent}
            />
        </div>
    );
}

export default  withCookies(withRouter(MyCalendar))