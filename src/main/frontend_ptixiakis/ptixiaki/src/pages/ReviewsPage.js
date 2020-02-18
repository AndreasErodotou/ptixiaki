import React, { Component } from "react";
// import PropTypes from "prop-types";
import Listing from "../components/Listings/Listing";
import axios from "axios";
import AuthContext from "../context/auth-context";
import FullListing from "./FullListingPage";
import Template from "./templates/TemplatePage";

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
      axios
          .get(
              `http://localhost:4567/api/users/${this.context.username}/listings${query}&selected=true`,
              {
                headers: {
                  Authorization: this.context.token
                }
              }
          )
          .then(response => {
            this.setState({
              listings: [...response.data.data],
              searchQuery: query,
              updated: false
            });
          })
          .catch(error => {
            if (error.response === undefined) {
              // return this.props.history.push("/signin");
            }
            console.log(`error:${JSON.stringify(error)}`);
          });
    }else if(query==="" && !this.state.updated){
      axios
          .get(
              `http://localhost:4567/api/users/${this.context.username}/listings?selected=true`,
              {
                headers: {
                  Authorization: this.context.token
                }
              }
          )
          .then(response => {
            this.setState({
              listings: [...response.data.data],
              searchQuery: query,
              updated: true
            });
          })
          .catch(error => {
            if (error.response === undefined) {
              // return this.props.history.push("/signin");
            }
            console.log(`error:${JSON.stringify(error)}`);
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
