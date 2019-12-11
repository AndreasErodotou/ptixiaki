import "./App.css";
import React, { Component } from "react";

import { Route } from "react-router-dom";

import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import BidsPage from "../pages/BidsPage";
import NewListing from "../pages/NewListingPage";
import AnaliticsPage from "../pages/AnaliticsPage";
import ListingsPage from "../pages/ListingsPage";
import TimetablePage from "../pages/TimetablePage";

// import Button from 'react-bootstrap/Button';

// import { Button } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: false,

      filterCategories: ["Electrician", "Hydraulic", "Engineer"],
      filterLocations: ["Nicosia", "Heraklion", "Athens"],

      jwtToken: null
    };
  }

  render() {
    console.log(JSON.stringify(this.state));

    return (
      <div>
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/statistics" component={AnaliticsPage} />

        <Route exact path="/" component={ListingsPage} />
        <Route exact path="/listings" component={ListingsPage} />
        <Route exact path="/listings/create" component={NewListing} />

        <Route exact path="/bids" component={BidsPage} />
        <Route exact path="/timetable" component={TimetablePage} />
      </div>
    );
  }
}

export default App;
