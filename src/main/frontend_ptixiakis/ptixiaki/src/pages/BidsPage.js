import React, {Component} from "react";
import Listing from "../components/Listings/Listing";
import FullListing from "./FullListingPage.js";
import SimpleTemplate from "./templates/SimpleTemplatePage";
import AuthContext from "../context/auth-context";

import axios from "axios";

class BidsPage extends Component {
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
      .get(`http://localhost:4567/api/users/${this.context.username}/listings`, {
        headers: {
          Authorization: this.context.token
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

  bidClickedModalHandler(LID) {
    this.setState({
      ...this.state,
      // showFullListing: true,
      listingClicked: this.state.listings.filter(listing => {
        return listing.LID === LID;
      })
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
                    buttonTitle={"Show Bid"}
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
            path={path}
        />
    ) : null;


    return (
        <SimpleTemplate
            content={[listings,fullListing]}
        />
    );
  }
}

export default BidsPage;


