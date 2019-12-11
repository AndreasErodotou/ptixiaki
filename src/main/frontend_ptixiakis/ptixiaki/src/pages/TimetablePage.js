import { momentLocalizer } from "react-big-calendar";
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
