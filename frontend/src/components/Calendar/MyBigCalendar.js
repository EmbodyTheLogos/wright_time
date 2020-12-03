import React from 'react';
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import { Calendar, momentLocalizer  } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'

const localizer = momentLocalizer(moment)

class MyBigCalendar extends React.Component {

    render() {
        console.log("render")
        return (
            <div>
                <Calendar
                    localizer={localizer}
                    events={[]}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        )
    }
}

export default withCookies(withRouter(MyBigCalendar))