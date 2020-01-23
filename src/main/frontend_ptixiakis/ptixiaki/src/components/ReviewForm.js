import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AuthContext from "../context/auth-context";
import Select from "react-select";

const ratingArray = [1, 2, 3, 4, 5];
//   { label: "1", value: 1 },
//   { label: "2", value: 2 },
//   { label: "3", value: 3 },
//   { label: "4", value: 4 },
//   { label: "5", value: 5 }
// ];

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: {
        UID: this.props.UID,
        TO_UID: null,
        LID: this.props.LID,
        rating: 1,
        comments: ""
      },
      isReviewValid: {
        comments: false
      },
      reviewExists: null
    };
  }
  static contextType = AuthContext;

  componentDidUpdate() {
    if (this.props.sendReq && this.state.isReviewValid.comments) {
      this.handleReview();
    }

    if (this.state.reviewExists === null) {
      axios
        .get(`http://localhost:4567/api/users/${this.props.UID}/listings/${this.props.LID}/reviews`, {
          headers: {
            Authorization: this.context.token
          }
        })
        .then(response => {
          console.log(
            "get review: response.data" + JSON.stringify(response.data)
          );
          if (response.data.status === "SUCCESS") {
            console.log("SUCCESS");
            this.setState({
              review: { ...response.data.data[0] },
              isReviewValid: {comments: true},
              reviewExists: true
            });
          } else {
            this.setState({
              reviewExists: false
            });
          }
        })
        .catch(error => console.log(`Error${JSON.stringify(error)}`));
    }
  }

  handleReview() {
    if (this.state.isReviewValid.comments) {
      if(this.state.reviewExists){
        axios
        .put(`http://localhost:4567/api/reviews/${this.state.review.RID}`, this.state.review, {
          headers: {
            Authorization: this.context.token
          } 
        })
        .then(response => {
          console.log("response.data.status " + response.data.status);
          if (response.data.status === "SUCCESS") {
            const title="Review Edited";
           
            const msg = `rating: ${this.state.review.rating}\n
                       comments: ${this.state.review.comments} `;
            this.props.setSuccess(msg,title);
          }
        })
        .catch(error => console.log(`Error${JSON.stringify(error.response)}`));
      }else{
      axios
        .post("http://localhost:4567/api/reviews", this.state.review, {
          headers: {
            Authorization: this.context.token
          }
        })
        .then(response => {
          console.log("response.data.status " + response.data.status);
          if (response.data.status === "SUCCESS") {
            const title="Review Posted";
            const msg = `rating: ${this.state.review.rating}\n
                       comments: ${this.state.review.comments} `;
            this.props.setSuccess(msg,title);
          }
        })
        .catch(error => console.log(`Error${JSON.stringify(error.response)}`));
      }
    } else {
      alert("fileds are not valid...");
    }
  }

  onRatingChanged(event) {
    this.setState({
      review: {
        ...this.state.review,
        rating: event.target.value
      }
    });
  }

  onCommentsChanged(event) {
    this.setState({
      review: {
        ...this.state.review,
        comments: event.target.value
      },
      isReviewValid: {
        comments: true
      }
    });
  }

  render() {
    console.log(
      "STATE:" + JSON.stringify(this.state)
    );
    return (
      <Form>
        <Form.Group as={Form.Row}>
          <Form.Label className="col-4 pt-1 bold">Rate User:</Form.Label>
          <Form.Label className="col-8 pt-1 bold">UID</Form.Label>
          <Form.Label className="col-4 pt-1">Your Rating:</Form.Label>
          <Form.Control
            as="select"
            className="col-8"
            options={ratingArray}
            onChange={this.onRatingChanged.bind(this)}
            value={this.state.review.rating}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num}>{num}</option>
            ))}
          </Form.Control>
          <Form.Label className="col-4 mt-1">Comments:</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="More Details About Review"
            className="col-8 mt-1"
            onChange={this.onCommentsChanged.bind(this)}
            value={this.state.review.comments}
            // required
          />
        </Form.Group>
      </Form>
    );
  }
}

export default ReviewForm;
