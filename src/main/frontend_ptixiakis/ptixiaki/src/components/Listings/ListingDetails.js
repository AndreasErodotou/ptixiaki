import React from "react";
import Form from "react-bootstrap/Form";

const ListingDetails = ({ listing }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label className="col-12 bold">{listing[0].title}</Form.Label>
        <Form.Label className="col-12 font-italic">
          {listing[0].description}
        </Form.Label>

        <Form.Label className="col-4">Category:</Form.Label>
        <Form.Label className="col-8">{listing[0].jobCategory}</Form.Label>
        <Form.Label className="col-4">Location:</Form.Label>
        <Form.Label className="col-8 bold">{listing[0].location}</Form.Label>
        <Form.Label className="col-4">available from:</Form.Label>
        <Form.Label className="col-8">{listing[0].available_from}</Form.Label>
        <Form.Label className="col-4">available until:</Form.Label>
        <Form.Label className="col-8">{listing[0].available_until}</Form.Label>
        <Form.Label className="col-4">Max price:</Form.Label>
        <Form.Label className="col-8 bold">{listing[0].max_price}€</Form.Label>
      </Form.Group>
    </Form>
  );
};

export default ListingDetails;
