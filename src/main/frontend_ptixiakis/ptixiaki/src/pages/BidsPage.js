import React, { Component } from "react";
// import PropTypes from "prop-types";
import Listing from "../components/Listings/Listing";
import NavBar from "../components/NavBar";
import Filters from "../components/Filters/Filters";
import axios from "axios";
class BidsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bidClicked: null,
      bids: [],

      filterCategories: ["Electrician", "Hydraulic", "Engineer"],
      filterLocations: ["Nicosia", "Heraklion", "Athens"]
    };
  }

  componentDidMount() {
    let jwtToken = localStorage.getItem("myJwtToken");
    axios
      .get(`http://localhost:4567/api/bids`, {
        headers: {
          Authorization: jwtToken
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          bids: response.data.data
        });
      })
      .catch(error => {
        if (error.response === undefined) {
          return this.props.history.push("/signin");
        }
        console.log(`error:${JSON.stringify(error)}`);
      });
  }

  bidClickedModalHandler(BID) {
    this.setState({
      ...this.state,
      // showFullListing: true,
      bidClicked: this.state.bids.filter(bid => {
        return bid.BID === BID;
      })
    });
  }

  render() {
    // let bids = this.state.bids.map(bid => {
    //   return (
    //     <Listing
    //       key={bid.BID}
    //       title={bid.title}
    //       imgsrc={bid.pics}
    //       descr={bid.description}
    //       bidClicked={() => this.bidClickedModalHandler(bid.BID)}
    //     />
    //   );
    // });
    return (
      <div>
        {/* <NavBar key="navbar" />
        <Filters
          key="filters"
          categories={this.state.filterCategories}
          locations={this.state.filterLocations}
        /> */}
      </div>
    );
  }
}

BidsPage.propTypes = {};

export default BidsPage;
