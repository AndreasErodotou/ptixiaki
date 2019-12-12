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

import FullTemplatePage from "../pages/FullTemplatePage";

// import Button from 'react-bootstrap/Button';

// import { Button } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: false,

      filterCategories: ["Electrician", "Hydraulic", "Engineer"],
      filterLocations: ["Nicosia", "Heraklion", "Athens"],
      filterStars: ["5 stars", "4 stars", "3 stars", "2 stars", "1 stars"],

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
        <Route exact path="/reviews" component={ReviewsPage} />
        <Route exact path="/timetable" component={TimetablePage} />
        {/* testing */}
        <Route
          exact
          path="/FullTemplatePage"
          render={() => (
            <FullTemplatePage
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
