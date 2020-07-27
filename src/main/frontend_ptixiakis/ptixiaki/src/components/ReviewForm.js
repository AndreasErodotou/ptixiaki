import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import AuthContext from "../context/auth-context";
import Select from "react-select";

import {getReq, postReq, putReq} from "../requests/Request";


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
        RID: null,
        UID: null,
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
      // let UID=this.props.UID;
      // if(this.context.accountType==="PROFESSIONAL"){
      //   UID=this.context.username;
      // }
      getReq(`users/${this.context.username}/listings/${this.props.LID}/reviews`,response => {
        if (response.data.data[0] !== undefined && response.data.data[0] !== null  ) {
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
      });
    }
  }

  async handleReview() {
    if (this.state.isReviewValid.comments) {
      if(this.state.reviewExists){
        putReq(`reviews/${this.state.review.RID}`,this.state.review,response => {
          if (response.data.status === "SUCCESS") {
            const title="Review Edited";
           
            const msg = `rating: ${this.state.review.rating}\n
                       comments: ${this.state.review.comments} `;
            this.props.setSuccess(msg,title);
          }
        });
        
      }else{
        let review= this.state.review;
        const accountType = this.context.accountType;
        review.UID=(accountType === "PROFESSIONAL")?this.context.username:this.props.UID;
        review.TO_UID=(accountType === "PROFESSIONAL")?this.props.UID :null;
        if(accountType !== "PROFESSIONAL"){
          getReq(`listings/${this.props.LID}/bids?selected=true`,(response) => {
            review.TO_UID = response.data.data[0].UID;
            postReq('reviews',review, response => {
              if (response.data.status === "SUCCESS") {
                const title="Review Posted";
                const msg = `rating: ${this.state.review.rating}\n
                           comments: ${this.state.review.comments} `;
                this.props.setSuccess(msg,title);
              }
            });
          });
        }else{
          postReq('reviews',review, response => {
            if (response.data.status === "SUCCESS") {
              const title="Review Posted";
              const msg = `rating: ${this.state.review.rating}\n
                         comments: ${this.state.review.comments} `;
              this.props.setSuccess(msg,title);
            }
          });
        }
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
