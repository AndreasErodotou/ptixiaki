import React, { Component } from "react";
// import PropTypes from "prop-types";
import Listing from "../components/Listings/Listing";
import AuthContext from "../context/auth-context";
import FullListing from "./FullListingPage";
import Template from "./templates/TemplatePage";

import {getReq} from "../requests/Request";


class ReviewsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFullListing: false,
      listingClicked: [],
      listings: [],

      searchQuery:"",
      updated: false
    };
  }
  static contextType = AuthContext;

  componentDidUpdate() {
    const query=this.props.history.location.search;
    const prevQuery= this.state.searchQuery;

    if(query!=="" && (prevQuery === "" || prevQuery !== query)){
      getReq(`users/${this.context.username}/listings${query}&selected=true`,null,(response) => {
        this.setState({
          listings: [...response.data.data],
          searchQuery: query,
          updated: false
        });
      });
    }else if(query==="" && !this.state.updated){
      getReq(`users/${this.context.username}/listings?selected=true`,null,(response) => {
        this.setState({
          listings: [...response.data.data],
          searchQuery: query,
          updated: true
        });
      });
    }
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
    let listings = <div className="container mt-3 " key={"listings"}>
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
      // <SimpleTemplate
      //   content={content}
      // />
        <Template
          categories={null}
          locations={null}
          content={content}
          profFilters={null}
        />
    );
  }
}

ReviewsPage.propTypes = {};

export default ReviewsPage;
