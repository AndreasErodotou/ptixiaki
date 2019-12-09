import React, { Component } from "react";
import Listings from "../../pages/ListingsPage";
// import PropTypes from "prop-types";
// import { Redirect } from "react-router-dom";

class ListingsApi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      newListing: null,
      fullListing: {},
      searchKeywords: "",
      listingClickedId: "",
      showFullListing: false
      // createNewListing: false
    };
  }

  componentDidMount() {
    let jwtToken = localStorage.getItem("myJwtToken");
    console.log("to token einai: " + jwtToken);
    fetch("http://localhost:4567/api/listings", {
      method: "GET",
      mode: "cors",
      headers: {
        // token: jwtToken,
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
        // const listings = resJson.data.slice(0, 3);
        this.setState({
          ...this.state,
          listings: resJson.data
        });
        console.log(resJson.data);
      })
      .catch(error => {
        console.log("ERROR: " + error.msg);
        // if (error.statusCode == 403) {
        //   return <Redirect to="/signin" />;
        // }
      });
  }

  listingClickedHandler(LID) {
    const fullListing = this.state.listings.filter(
      listing => listing.LID === LID
    );
    this.setState({
      ...this.state,
      fullListing: fullListing,
      listingClickedId: LID,
      showFullListing: true
    });
  }

  searchClickedHandler(event) {
    // const searchListings = event.target.value;
  }

  categoryClickedHandler() {}

  locationClickedHandler() {}

  priceClickedHandler() {}

  postedTodayClickedHandler() {}

  endingSoonClickedHandler() {}

  componentDidUpdate() {
    console.log("componentDidUpdate??");
    if (this.state.showFullListing && this.state.fullListing !== null) {
      // this.setState({
      //     ...this.state
      // });
    }
  }

  render() {
    const listing = this.state.listings.filter(
      listing => listing.LID === this.state.listingClickedId
    );
    console.log("listingApi:listing: " + JSON.stringify(listing));
    // console.log("listingApi:fullListing: "+ JSON.stringify(this.state.fullListing));
    console.log("ListingApi: Listings" + JSON.stringify(this.state.listings));
    return (
      <div>
        <Listings
          listings={this.state.listings}
          newListing={this.state.newListing}
          createNewListing={this.props.createNewListing}
          listingClicked={this.state.fullListing}
          listingClickedHandler={this.listingClickedHandler.bind(this)}
          showFullListing={this.state.showFullListing}
          disableCNL={this.props.disableCNL}
        />
      </div>
    );
  }
}

ListingsApi.propTypes = {};

export default ListingsApi;
