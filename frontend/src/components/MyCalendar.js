import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './MyCalendarStyle.css'
import { differenceInCalendarDays } from 'date-fns';


const datesToAddClassTo  = [new Date(2020, 11, 4)];

function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
        // Check if a date React-Calendar wants to check is on the list of dates to add class to
        if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
            return 'myClassName';
        }
    }
}


function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
}

export default function MyCalendar() {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={value}
                // tileClassName={tileClassName}
                //tileClassName={"Hello World"}
                //tileContent={"Hello World"}
            />
        </div>
    );
}