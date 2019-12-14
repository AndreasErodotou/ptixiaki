import React, { Component } from "react";
import FullTemplatePage from "./FullTemplatePage";
import Review from "../components/Review";
import UserDetails from "../components/UserDetails";
import axios from "axios";
import AuthContent from "../context/auth-context";

class UserProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        jobsDone: 0,
        reviewsCount: 0,
        reviewsRating: 0
      },
      reviews: []
    };
  }

  static contextType = AuthContent;

  componentDidMount() {
    console.log(
      `cmd user profile page context:${JSON.stringify(this.context)}`
    );
    axios
      .get(`http://localhost:4567/api/users/${this.context.username}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState({
          user: {
            ...this.state.user,
            ...response.data.data
          }
        });
      })
      .catch(error => {
        console.log(`error: ${JSON.stringify(error)}`);
      });

    axios
      .get(
        `http://localhost:4567/api/users/${this.context.username}/reviews/rating`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        this.setState({
          user: {
            ...this.state.user,
            ...response.data.data
          }
        });
      })
      .catch(error => {
        console.log(`error: ${JSON.stringify(error)}`);
      });

    axios
      .get(
        `http://localhost:4567/api/users/${this.context.username}/bids/selected/count`,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        this.setState({
          user: {
            ...this.state.user,
            ...response.data.data
          }
        });
      })
      .catch(error => {
        console.log(`error: ${JSON.stringify(error)}`);
      });

    axios
      .get(`http://localhost:4567/api/users/${this.context.username}/reviews`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState({
          reviews: response.data.data
        });
      })
      .catch(error => {
        console.log(`error: ${JSON.stringify(error)}`);
      });
  }

  render() {
    const Categories = ["Electrician", "Hydraulic", "Engineer"];
    const Locations = ["Nicosia", "Heraklion", "Athens"];
    let contentTop;
    if (this.state.user !== null && this.state.user !== undefined) {
      contentTop = <UserDetails user={this.state.user} />;
    }
    const contentDown = this.state.reviews.map((review, index) => (
      <Review review={review} key={index} />
    ));
    return (
      <div>
        <FullTemplatePage
          categories={Categories}
          locations={Locations}
          contentTop={contentTop}
          contentDown={contentDown}
        />
      </div>
    );
  }
}

export default UserProfilePage;
