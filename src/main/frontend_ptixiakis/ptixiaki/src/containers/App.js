import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import React, { Component } from "react";
import Signin from "../components/Forms/Signin/Signin";
import Signup from "../components/Forms/Signup/Signup";
import Listings from "../components/Listings/Listings";
import NavBar from "../components/NavBar";
import Filters from "../components/Filters/Filters";
import ListingsApi from "./ListingsApi/ListingsApi";

import { Route } from "react-router-dom";

import NewListing from "../components/Listings/NewListing/NewListing";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import ModalDialog from 'react-bootstrap/ModalDialog';

// import { Button } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: null,
        password: null
      },
      isSigninOpen: false,
      isSignupOpen: false,
      showListings: true,
      createNewListing: false,
      search: false,
      logoClicked: false,
      loginError: false,

      filterCategories: ["Electrician", "Hydraulic", "Engineer"],
      filterLocations: ["Nicosia", "Heraklion", "Athens"],

      jwtToken: null
    };
  }

  logoClickedHandler() {}

  accountIconClickedHandler() {}

  signIn(jwtToken) {
    this.setState({
      ...this.state,
      token: jwtToken
    });
  }

  signOut() {
    this.setState({ user: null, isSigninOpen: true });
  }

  changeToSignUp() {
    this.setState({
      isSigninOpen: false,
      isSignupOpen: true
    });
  }

  changeToSignIn() {
    this.setState({
      isSigninOpen: true,
      isSignupOpen: false
    });
  }

  showListings() {
    this.setState({
      showListings: true
    });
  }

  loginError() {
    this.setState({
      ...this.state,
      loginError: true
    });
  }

  createYourOwnListingClickedHandler() {
    // this.props.createNewListing
    console.log("pati8ike to new listing");
    this.setState({
      ...this.state,
      createNewListing: true
    });
  }

  DisableCreateYourOwnListingHandler() {
    // this.props.createNewListing
    console.log("pati8ike to new listing");
    this.setState({
      ...this.state,
      createNewListing: false
    });
  }

  render() {
    console.log(JSON.stringify(this.state));

    const homepage = (
      <div>
        {/* <div className="col-12"> */}
        <NavBar
          key="navbar"
          onCreateYourOwnListingClicked={this.createYourOwnListingClickedHandler.bind(
            this
          )}
          // onSearch={this.searchClickedHandler.bind(this)}
          // onLogoClicked={this.logoClickedHandler.bind(this)}
        />
        {/* </div> */}
        <div className="row px-0 mx-0">
          <div className="col-md-2 px-0">
            <Filters
              key="filters"
              categories={this.state.filterCategories}
              locations={this.state.filterLocations}
            />
          </div>
          <div className="col-md-10 pt-3 px-3">
            <ListingsApi
              createNewListing={this.state.createNewListing}
              disableCNL={this.DisableCreateYourOwnListingHandler.bind(this)}
            />
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <Route
          exact
          path="/signin"
          render={({ history }) => (
            <Signin
              onSignIn={() => {
                this.signIn.bind(this);
                history.push("/");
              }}
              onChangeToSignUp={this.changeToSignUp.bind(this)}
              onLoginError={this.loginError.bind(this)}
              error={this.state.loginError}
            />
          )}
        />

        <Route
          exact
          path="/signup"
          render={() => (
            <Signup
              // onSignup={ this.signUp.bind(this) }
              onChangeToSignIn={this.changeToSignIn.bind(this)}
            />
          )}
        />

        <Route
          exact
          path="/create"
          render={() => (
            <div>
              <NavBar
                key="navbar"
                onCreateYourOwnListingClicked={this.createYourOwnListingClickedHandler.bind(
                  this
                )}
                // onSearch={this.searchClickedHandler.bind(this)}
                // onLogoClicked={this.logoClickedHandler.bind(this)}
              />
              <NewListing createNewListing={this.state.createNewListing} />
            </div>
          )}
        />

        <Route exact path="/" render={() => homepage} />
      </div>
    );
  }
}

export default App;
