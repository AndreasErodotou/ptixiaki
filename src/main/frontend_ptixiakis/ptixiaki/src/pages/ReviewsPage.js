import React, { Component } from "react";
// import PropTypes from "prop-types";
import Listing from "../components/Listings/Listing";
import SimpleTemplate from "./templates/SimpleTemplatePage";
import axios from "axios";
import AuthContext from "../context/auth-context";
import FullListing from "./FullListingPage";

class ReviewsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFullListing: false,
      listingClicked: [],
      listings: []
    };
  }
  static contextType = AuthContext;
  componentDidMount() {
    axios
      .get(
        `http://localhost:4567/api/users/${this.context.username}/listings?selected=true`,
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
    let listings = <div className="container mt-3 ">
      <div className="row">
        {
          this.state.listings.map(listing => {
            return (
                <Listing
                    key={listing.LID}
                    username={listing.UID}
                    title={listing.title}
                    imgsrc={listing.pics}
                    descr={listing.description}
                    maxPrice={listing.max_price}
                    buttonTitle={"Review"}
                    listingClicked={() => this.listingClickedModalHandler(listing.LID)}
                />
            )
          })
        }
      </div>
    </div>;

    const fullListing = this.state.showFullListing ? (
      <FullListing
        key="FullListing"
        listing={this.state.listingClicked}
        onHide={this.handlefullLClose.bind(this)}
        show={true}
        path={this.props.location.pathname}
      />
    ) : null;

    let content = [];
    // content.push(`loc:${JSON.stringify(this.props.location)}`);
    content.push(listings);
    content.push(fullListing);

    return (
      <SimpleTemplate
        content={content}
      />
    );
  }
}

ReviewsPage.propTypes = {};

export default ReviewsPage;
