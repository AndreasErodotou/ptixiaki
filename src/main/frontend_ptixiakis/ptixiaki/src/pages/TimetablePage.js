import { momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { Component } from "react";
import SimpleTemplate from "./templates/SimpleTemplatePage";
import Timetable from "../components/Timetable/Timetable";
import AuthContext from "../context/auth-context";

import {getReq} from "../requests/Request";


class TimetablePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    getReq(`events/${this.context.username}`,response => {
      this.setState({
        events: response.data.data
      });
    });
  }

  render() {
    console.log(`events: ${JSON.stringify(this.state.events)}`);
    const userEvents = this.state.events.map(event => {
      const startDate = new Date(event.date);
      const endDate = new Date(startDate.getTime() + event.duration * 60000); // 1 min = 60000ms
      return {
        id: event.wonBID,
        title: `${event.title}  ${event.descr}`,
        allDay: false,
        start: startDate,
        end: endDate
      };
    });

    const localizer = momentLocalizer(moment);

    const content =
      this.state.events !== null ? (
        <Timetable events={userEvents} localizer={localizer} />
      ) : null;

    return <SimpleTemplate content={content} />;
    // <TimetablePage events={events} localizer={localizer} />
  }
}

export default TimetablePage;
