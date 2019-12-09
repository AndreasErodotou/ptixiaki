import React from "react";
// import PropTypes from "prop-types";
// import React from 'react'
import { Calendar, Views } from "react-big-calendar";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import "./Timetable.css";

let allViews = Object.keys(Views).map(k => Views[k]);

const Timetable = props => {
  return (
    <div className="m-3 myCalendar">
      <Calendar
        localizer={props.localizer}
        events={props.events}
        startAccessor={"start"}
        endAccessor={"end"}
        defaultDate={new Date()}
      />
    </div>
  );
};

Timetable.propTypes = {};

export default Timetable;
