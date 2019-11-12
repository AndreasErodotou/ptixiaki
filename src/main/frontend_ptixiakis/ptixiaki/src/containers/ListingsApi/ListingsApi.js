import React, { Component } from "react";
import Listings from "../../components/Listings/Listings";
import PropTypes from "prop-types";

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
    fetch("http://localhost:4567/api/listings", {
      method: "GET",
      headers: new Headers({
        Authorization: this.props.jwtToken
      })
    })
      .then(response => response.json())
      .then(resJson => {
        // const listings= resJson.data.slice(0,3);
        this.setState({
          ...this.state,
          listings: resJson.data
        });
        console.log(resJson.data);
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
    const searchListings = event.target.value;
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
    // console.log("listingApi:listing: "+JSON.stringify(listing));
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
