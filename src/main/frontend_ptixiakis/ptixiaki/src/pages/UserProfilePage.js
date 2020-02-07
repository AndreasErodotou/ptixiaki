import React, { Component } from "react";
import SimpleTemplatePage from "./templates/SimpleTemplatePage";
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
        count: 0,
        rating: 0
      },
      reviews: []
    };
  }

  static contextType = AuthContent;

  componentDidMount() {
    const path=window.location.pathname;
    console.log(`pathname:${window.location.pathname}`);
    // console.log(`props pathname:${this.props.location.pathname}`);
    // if(window.location.pathname=='profile')
    //   username = this.context.username;
    // else
    //   username = window.location.pathname;
    // console.log(
    //   `user profile page context:${JSON.stringify(this.context)}`
    // );
    axios
      .get(`http://localhost:4567/api${path}`, {
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
        `http://localhost:4567/api${path}/reviews/rating`,
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
        `http://localhost:4567/api${path}/bids/selected/count`,
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
      .get(`http://localhost:4567/api/reviews?TO_UID=${path.split('/')[2]}`, {
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

    const content = (
        <div className="container mt-4">
          {contentTop}
          {contentDown}
        </div>
    )
    return (

        <SimpleTemplatePage
          // categories={Categories}
          // locations={Locations}
          // contentTop={contentTop}
          // contentDown={contentDown}
          content={content}
        />

    );
  }
}

export default UserProfilePage;
