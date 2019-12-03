import React, { Component } from "react";
import PropTypes from "prop-types";
// import Listing from "../components/Listings/Listing";
import NavBar from "../components/NavBar";

class BidsPage extends Component {
  render() {
    return (
      <div>
        <NavBar
        // onCreateYourOwnListingClicked={this.createYourOwnListingClickedHandler.bind(
        //   this
        // )}
        />

        {/* <Listing></Listing> */}
      </div>
    );
  }
}

BidsPage.propTypes = {};

export default BidsPage;
