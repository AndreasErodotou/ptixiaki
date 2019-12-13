import "./App.css";
import React, { Component } from "react";

import { Route } from "react-router-dom";

import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import BidsPage from "../pages/BidsPage";
import ReviewsPage from "../pages/ReviewsPage";
import NewListing from "../pages/NewListingPage";
import AnaliticsPage from "../pages/AnaliticsPage";
import ListingsPage from "../pages/ListingsPage";
import TimetablePage from "../pages/TimetablePage";
import UserProfilePage from "../pages/UserProfilePage";

// import Button from 'react-bootstrap/Button';

// import { Button } from 'reactstrap';

import AuthContext from "../context/auth-context";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static contextType = AuthContext;

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      console.log(`token: ${token}`);
      let base64Url = token.split(".")[1];
      let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      let jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      // console.log(jsonPayload);
      const tokenPayload = JSON.parse(jsonPayload);

      this.context.token = token;
      this.context.isAuthenticated = true;
      this.context.userId = tokenPayload.jti;
      this.context.accountType = tokenPayload.accountType;
      this.context.username = tokenPayload.iss;
      console.log(`context:${JSON.stringify(this.context)}`);
    }
  }

  render() {
    console.log(JSON.stringify(this.state));

    return (
      <div>
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />

        <Route exact path="/" component={ListingsPage} />
        <Route exact path="/bids" component={BidsPage} />
        <Route exact path="/reviews" component={ReviewsPage} />
        <Route exact path="/listings" component={ListingsPage} />
        <Route exact path="/listings/create" component={NewListing} />
        <Route exact path="/user/listings" component={ListingsPage} />
        <Route exact path="/user/statistics" component={AnaliticsPage} />
        <Route exact path="/user/timetable" component={TimetablePage} />
        {/* testing */}
        <Route
          exact
          path="/user/profile"
          render={() => (
            <UserProfilePage
              categories={this.state.filterStars}
              locations={this.state.filterLocations}
              content={null}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
