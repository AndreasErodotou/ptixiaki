import React from "react";
import Listing from "../components/Listings/Listing";
import FullListing from "../components/Listings/FullListing.js";
import Template from "./TemplatePage";
import { Redirect } from "react-router-dom";

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
    console.log("to token einai: " + jwtToken);
    fetch("http://localhost:4567/api/listings", {
      method: "GET",
      mode: "cors",
      headers: {
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
        this.setState({
          ...this.state,
          listings: resJson.data
        });
        console.log(resJson.data);
      })
      .catch(error => {
        console.log("ERROR: " + error.msg);
        if (error.statusCode === 403) {
          return this.props.history.push("/signin");
        }
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
