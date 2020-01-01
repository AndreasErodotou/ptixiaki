import React from "react";
import Listing from "../components/Listings/Listing";
import FullListing from "./FullListingPage.js";
import Template from "./templates/TemplatePage";
import AuthContext from "../context/auth-context";

import axios from "axios";

// import { Route } from "react-router-dom";

class Listings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFullListing: false,
      listingClicked: [],
      listings: [],

      filterCategories: ["Electrician", "Hydraulic", "Engineer"],
      filterLocations: ["Nicosia", "Heraklion", "Athens"]
    };
  }
  static contextType = AuthContext;
  componentDidMount() {
    const url1 = "/listings";
    const url2 = `/users/${this.context.username}/listings`;
    axios
      .get(
        `http://localhost:4567/api${
          this.props.location.pathname === `/listings/${this.context.username}` ? url2 : url1
        }`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        console.log(response);
        this.setState({
          listings: [...response.data.data]
        });
      })
      .catch(error => {
        if (error.response === undefined) {
          // return this.props.history.push("/signin");
        }
        console.log(`error:${JSON.stringify(error)}`);
      });
  }

  listingClickedModalHandler(LID) {
    this.setState({
      ...this.state,
      showFullListing: true,
      listingClicked: this.state.listings.filter(listing => {
        return listing.LID === LID;
      })
    });
  }

  handlefullLClose() {
    this.setState({
      ...this.state,
      showFullListing: false
    });
  }

  render() {
    const path = this.props.location.pathname;
    let listings = this.state.listings.map(listing => {
      return (
        <Listing
          key={listing.LID}
          username={listing.UID}
          title={listing.title}
          imgsrc={listing.pics}
          descr={listing.description}
          maxPrice={listing.max_price}
          buttonTitle={
            this.props.location.pathname === "/user/listings"
              ? "Show Bids"
              : "Bid Now"
          }
          listingClicked={() => this.listingClickedModalHandler(listing.LID)}
        />
      );
    });

    const fullListing = this.state.showFullListing ? (
      <FullListing
        key="FullListing"
        listing={this.state.listingClicked}
        onHide={this.handlefullLClose.bind(this)}
        show={true}
        path={path}
      />
    ) : null;

    let content = [];
    // content.push(`loc:${JSON.stringify(this.props.location)}`);
    content.push(listings);
    content.push(fullListing);

    return (
      <Template
        categories={this.state.filterCategories}
        locations={this.state.filterLocations}
        content={content}
      />
    );
  }
}

export default Listings;
