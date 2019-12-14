import React from "react";
import Form from "react-bootstrap/Form";
import UserIcon from "../assets/User_sm.svg";
import Rating from "../components/Rating";

const Review = ({ review }) => {
  console.log(`review:${JSON.stringify(review)}`);
  return (
    <Form className="mx-4 my-3 p-2 h-25 border border-info">
      <Form.Group as={Form.Row}>
        <div className="col-9">
          <img className="mr-2" src={UserIcon} alt="UserIcon"></img>
          <Form.Label className="bold mr-1 mt-1">{review.UID}</Form.Label>
        </div>
        <div className="col-3 d-flex justify-content-end pr-2">
          <div className="mt-1">
            <Rating rating={review.rating} />
          </div>

          <Form.Text className="ml-1 mt-2">({review.rating})</Form.Text>
        </div>
      </Form.Group>
      <Form.Group as={Form.Row} className="col-md-6 col-sm-12">
        <Form.Label className="w-100">{review.comments}</Form.Label>
      </Form.Group>
    </Form>
  );
};

export default Review;
