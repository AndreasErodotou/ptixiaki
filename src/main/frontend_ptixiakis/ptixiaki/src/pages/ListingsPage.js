import React from "react";
import Listing from "../components/Listings/Listing";
import FullListing from "../components/Listings/FullListing.js";
import Template from "./TemplatePage";

import axios from "axios";

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

  componentDidMount() {
    let jwtToken = localStorage.getItem("myJwtToken");
    axios
      .get("http://localhost:4567/api/listings", {
        headers: {
          Authorization: jwtToken
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          listings: response.data.data
        });
      })
      .catch(error => {
        if (error.response === undefined) {
          return this.props.history.push("/signin");
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
    let listings = this.state.listings.map(listing => {
      return (
        <Listing
          key={listing.LID}
          title={listing.title}
          imgsrc={listing.pics}
          descr={listing.description}
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
      />
    ) : null;

    let content = [];
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
