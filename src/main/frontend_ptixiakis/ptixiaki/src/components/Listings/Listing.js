import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import CardDeck from 'react-bootstrap/CardDeck'
// import CardGroup from "react-bootstrap/CardGroup";

const Listing = props => {
  return (
    <Card
      className="border-primary  m-2 shadow onHoverBackroundColor"
      style={{ width: "16rem" }}
      onClick={props.listingClicked}
    >
      <Card.Img
        style={{ width: "100%", height: "12rem" }}
        variant="top"
        src={props.imgsrc[0]}
        alt="img.."
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.descr}</Card.Text>
      </Card.Body>
      <Button style={{ margin: "2%" }} variant="primary">
        Bid Now
      </Button>
      {/* <footer className="blockquote-footer">
        Created by: <cite title="Source Title">testUser</cite>
      </footer> */}
    </Card>
    // </div>
  );
};

Listing.propTypes = {
  title: PropTypes.string,
  imgsrc: PropTypes.array,
  descr: PropTypes.string
};

export default Listing;
