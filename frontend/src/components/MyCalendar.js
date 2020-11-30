import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './MyCalendarStyle.css'

export default function MyCalendar() {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={value}
            />
        </div>
    );
}