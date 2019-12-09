import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { Component } from "react";
import SimpleTemplate from "./SimpleTemplatePage";
import Timetable from "../components/Timetable/Timetable";

class TimetablePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    let jwtToken = localStorage.getItem("myJwtToken");
    console.log("to token einai: " + jwtToken);
    fetch("http://localhost:4567/api/events/UserID", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: jwtToken
      }
    })
      .then(response => {
        // console.log("Get Listings Status: " + response.status);
        if (response.status >= 400) {
          return response.json().then(errorMsg => {
            let error;
            error.statusCode = response.status;
            error.msg = errorMsg;
            throw error;
          });
        }
        return response.json();
      })
      .then(resJson => {
        this.setState({
          events: resJson.data
        });
        console.log(resJson.data);
      })
      .catch(error => {
        console.log("ERROR: " + error.msg);
        if (error.statusCode === 403) {
          return this.props.history.push("/signin");
        }
      });
  }

  render() {
    // "UID": "UserID",
    // "date": "Apr 5, 2019",
    // "LID": "9badd118-ef1f-4f23-b33f-b29b065947bb",
    // "duration": 50,
    // "wonBID": "336a6f6b-7904-427c-b2a7-2a03c714e2a1",
    // "title": "test",
    // "descr": "test"

    console.log(`events: ${JSON.stringify(this.state.events)}`);
    // if (this.state.events !== null) {
    const userEvents = this.state.events.map(event => {
      const startDate = new Date(event.date);
      const endDate = new Date(startDate.getTime() + event.duration * 60000); // 1 min = 60000ms
      return {
        id: event.wonBID,
        title: `${event.title}  ${event.descr}`,
        allDay: false,
        start: startDate,
        end: endDate
        // start: new Date(),
        // end: new Date()
      };
    });
    console.log(`userEvents: ${JSON.stringify(userEvents)}`);

    if (this.state.events[0] !== undefined) {
      const date1 = new Date().getTime();
      const date2 = date1 + 60000;

      console.log(`date1: ${new Date(date1)}`);
      console.log(`date2: ${new Date(date2)}`);
    }
    // }

    // [
    //   {
    //     id: 0,
    //     title: "All Day Event very long title",
    //     allDay: true,
    //     start: new Date("December 17, 2019 03:24:00"),
    //     end: new Date("December 17, 2019 04:24:00")
    //   },
    //   {
    //     id: 1,
    //     title: "Long Event",
    //     start: new Date("December 15, 2019 03:24:00"),
    //     end: new Date("December 16, 2019 03:24:00")
    //   }
    // ];

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
