import $ from "jquery";
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

  signIn(jwtToken) {
    this.setState({
      ...this.state,
      token: jwtToken
    });
  }

  render() {
    console.log(JSON.stringify(this.state));

    return (
      <div>
        <Route
          exact
          path="/signin"
          render={({ history }) => (
            <SigninPage
              onSignIn={() => {
                this.signIn.bind(this);
                this.history.push("/");
              }}
              error={this.state.loginError}
            />
          )}
        />

        <Route
          exact
          path="/signup"
          render={() => (
            <SignupPage
              onSignup={() => {
                this.history.push("/signin");
              }}
            />
          )}
        />

        {/* <Route exact path="/signup" component={SignupPage} /> */}
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
