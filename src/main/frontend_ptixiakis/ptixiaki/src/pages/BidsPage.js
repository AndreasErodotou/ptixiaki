import React, { Component } from "react";
// import PropTypes from "prop-types";
// import Listing from "../components/Listings/Listing";
import NavBar from "../components/NavBar";
import Filters from "../components/Filters/Filters";

class BidsPage extends Component {
  render() {
    return (
      <div>
        <NavBar key="navbar" />
        <Filters key="filters" categories={null} locations={null} />

        {/* <Listing></Listing> */}
      </div>
    );
  }
}

BidsPage.propTypes = {};

export default BidsPage;
