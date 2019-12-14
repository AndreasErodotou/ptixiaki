import React, { Component } from "react";
// import PropTypes from "prop-types";
import Listing from "../components/Listings/Listing";
import Template from "./TemplatePage";
import axios from "axios";
class ReviewsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewClicked: null,
      reviews: [],

      filterCategories: ["Electrician", "Hydraulic", "Engineer"],
      filterLocations: ["Nicosia", "Heraklion", "Athens"]
    };
  }

  componentDidMount() {
    let jwtToken = localStorage.getItem("myJwtToken");
    axios
      .get(`http://localhost:4567/api/reviews`, {
        headers: {
          Authorization: jwtToken
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          reviews: response.data.data
        });
      })
      .catch(error => {
        if (error.response === undefined) {
          //   return this.props.history.push("/signin");
        }
        console.log(`error:${JSON.stringify(error)}`);
      });
  }

  reviewClickedModalHandler(RID) {
    this.setState({
      ...this.state,
      // showFullListing: true,
      reviewClicked: this.state.reviews.filter(review => {
        return review.RID === RID;
      })
    });
  }

  render() {
    let content = this.state.reviews.map(review => {
      return (
        <Listing
          key={review.RID}
          title={review.title}
          imgsrc={review.pics}
          descr={review.description}
          reviewsClicked={() => this.reviewClickedModalHandler(review.RID)}
        />
      );
    });

    return (
      <Template
        categories={this.state.filterCategories}
        locations={this.state.filterLocations}
        // content={content}
      />
    );
  }
}

ReviewsPage.propTypes = {};

export default ReviewsPage;
