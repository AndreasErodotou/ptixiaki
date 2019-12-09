import React from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// import ModalDialog from "react-bootstrap/ModalDialog";

const FullListing = ({ listing, ...handleModal }) => {
  let otherPics = null;
  if (listing[0] !== null && listing[0] !== undefined) {
    if (listing[0].pics !== null && listing[0].pics !== undefined) {
      otherPics = listing[0].pics.map((pic, indexed) => {
        if (indexed === 0) {
          return (
            <img
              key={indexed}
              className="img-responsive pic col-sm-12"
              src={pic ? pic : null}
              alt="pic"
            ></img>
          );
        }
        return (
          <img
            key={indexed}
            className="img-responsive pic col-sm-3"
            src={pic ? pic : null}
            alt={"pic" + indexed}
          ></img>
        );
      });
    }
  }

  return (
    <div>
      {listing[0] ? (
        <>
          <Modal size="lg" {...handleModal}>
            <Modal.Header closeButton>
              <Modal.Title>Listing Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="border border-info row">
                  <div className="border-right border-info col-sm-4">
                    <div className="row my-4">
                      {/* <img className="img-responsive pic col-sm-12" id="mainPic" src={data}  alt="pic"></img> */}
                      {otherPics}
                    </div>
                  </div>
                  <div className="col-sm-8 p-4">
                    <h4> {listing[0].title}</h4>
                    <h6>
                      <small>{listing[0].description}</small>
                    </h6>
                    <h6 id="category">{listing[0].jobCategory}</h6>
                    <h6 id="loc"> location: {listing[0].location} </h6>
                    <h6 id="posted_by"> posted by: {listing[0].UID} </h6>
                    <h6 id="posted_from">
                      {" "}
                      posted from: {listing[0].available_from}{" "}
                    </h6>
                    <h6 id="available">
                      {" "}
                      available until: {listing[0].available_until}{" "}
                    </h6>
                    <h6 id="max_price"> price: {listing[0].max_price} </h6>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary">Bid</Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : null}
    </div>
  );
};

FullListing.propTypes = {
  listing: PropTypes.array,
  handleModal: PropTypes.object
};

export default FullListing;
