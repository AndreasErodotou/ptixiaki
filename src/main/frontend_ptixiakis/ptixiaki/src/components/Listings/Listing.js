import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import CardDeck from 'react-bootstrap/CardDeck'
// import CardGroup from "react-bootstrap/CardGroup";

const Listing = props => {
  return (
    <Card
      className="border-info  m-2 shadow onHoverBackroundColor"
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
        <Card.Title className="font-weight-bold">
          {props.title.length > 15
            ? `${props.title.substring(0, 15)}...`
            : props.title}
        </Card.Title>
        <Card.Subtitle className="font-italic blue-color">{`(Max price: ${props.maxPrice}€)`}</Card.Subtitle>
        <Card.Text>
          {props.descr.length > 70
            ? `${props.descr.substring(0, 70)}...`
            : props.descr}
        </Card.Text>
      </Card.Body>
      <footer className="blockquote-footer">
        Created by: <cite title="Source Title">{props.username}</cite>
      </footer>
      <Button style={{ margin: "2%" }} variant="primary">
        {props.buttonTitle}
      </Button>
    </Card>
  );
};

Listing.propTypes = {
  title: PropTypes.string,
  imgsrc: PropTypes.array,
  descr: PropTypes.string
};

export default Listing;
