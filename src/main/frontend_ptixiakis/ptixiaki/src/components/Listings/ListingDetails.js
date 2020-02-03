import React from "react";
import Form from "react-bootstrap/Form";

const ListingDetails = ({ listing }) => {
  return (
    <Form className={"ml-5"}>
      <Form.Group>
        <Form.Label className="col-12 bold">{listing[0].title}</Form.Label>
        <Form.Label className="col-12 font-italic">
          {listing[0].description}
        </Form.Label>

        <Form.Label className="col-6">Category:</Form.Label>
        <Form.Label className="col-6">{listing[0].jobCategory}</Form.Label>
        <Form.Label className="col-6">Location:</Form.Label>
        <Form.Label className="col-6 bold">{listing[0].location}</Form.Label>
        <Form.Label className="col-6">available from:</Form.Label>
        <Form.Label className="col-6">{listing[0].available_from}</Form.Label>
        <Form.Label className="col-6">available until:</Form.Label>
        <Form.Label className="col-6">{listing[0].available_until}</Form.Label>
        <Form.Label className="col-6">Max price:</Form.Label>
        <Form.Label className="col-6 bold">{listing[0].max_price}€</Form.Label>
      </Form.Group>
    </Form>
  );
};

export default ListingDetails;
