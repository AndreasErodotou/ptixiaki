import React, {Component} from "react";
import Listing from "../components/Listings/Listing";
import FullListing from "./FullListingPage.js";
import Template from "./templates/TemplatePage";
import AuthContext from "../context/auth-context";

import axios from "axios";

class BidsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFullListing: false,
      listingClicked: [],
      listings: [],

      filterCategories: ["Electrician", "Plumber", "Engineer"],
      filterLocations: ["Heraklion","Nicosia", "Athens"],

      searchQuery:"",
      updated: false
    };
  }

  static contextType = AuthContext;


  componentDidUpdate() {
    const query=this.props.history.location.search;
    const prevQuery= this.state.searchQuery;

    if((query!=="" && (prevQuery === "" || prevQuery !== query)) || (query==="" && !this.state.updated)){
      axios
          .get(`http://localhost:4567/api/users/${this.context.username}/listings${query}`, {
            headers: {
              Authorization: this.context.token
            }
          })
          .then(response => {
            console.log(response);
            this.setState({
              listings: [...response.data.data],
              searchQuery: query,
              updated: (query==="")?true:false
            });
          })
          .catch(error => {
            // console.log(`error:${JSON.stringify(error)}`);
          });
    }
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
    let listings = <div className="container mt-3" key={"listings"}>
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
        <Template
            content={[listings,fullListing]}
            categories={this.state.filterCategories}
            locations={this.state.filterLocations}
            profFilters={null}
        />
    );
  }
}

export default BidsPage;


