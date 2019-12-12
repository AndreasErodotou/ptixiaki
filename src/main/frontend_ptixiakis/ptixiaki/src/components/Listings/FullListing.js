import React from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Rating from "../Rating";
import UserIcon from "../../assets/User_sm.svg";

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

  const postedBy = (
    <Form.Group as={Form.Row} className="col-12">
      <img className="mr-2" src={UserIcon} alt="UserIcon"></img>
      <Form.Label className="mr-1 mt-1">Posted By:</Form.Label>
      <Form.Label className="bold mr-1 mt-1">{listing[0].UID}</Form.Label>
      <div className="pb-2">
        <Rating rating={4.0} />
      </div>
      <Form.Text className="ml-1 mt-2">(4.0)</Form.Text>
    </Form.Group>
  );

  return (
    <div>
      {listing[0] ? (
        <>
          <Modal size="lg" {...handleModal}>
            <Modal.Header className="pb-0" closeButton>
              <Modal.Title className="w-100 row ml-3 d-flex justify-content-between">
                <title className="mt-1 d-flex">Listing Details</title>
                <Form className="col-lg-6 col-sm-8 d-flex ">{postedBy}</Form>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="border border-info row d-flex justify-content-center">
                  <div className="lg-border-right sm-border-bottom border-info col-lg-4 col-sm-8">
                    <div className="row my-4 slef-item-center">
                      {/* <img className="img-responsive pic col-sm-12" id="mainPic" src={data}  alt="pic"></img> */}
                      {otherPics}
                    </div>
                  </div>
                  <div className="col-lg-8 col-sm-12 py-4 px-3">
                    <Form>
                      <Form.Group>
                        <Form.Label className="col-12 bold">
                          {listing[0].title}
                        </Form.Label>
                        <Form.Text className="col-12">
                          {listing[0].description}
                        </Form.Text>
                        <Form.Label className="col-4">Category:</Form.Label>
                        <Form.Label className="col-8">
                          {listing[0].jobCategory}
                        </Form.Label>
                        <Form.Label className="col-4">Location:</Form.Label>
                        <Form.Label className="col-8">
                          {listing[0].location}
                        </Form.Label>
                        <Form.Label className="col-4">
                          available from:
                        </Form.Label>
                        <Form.Label className="col-8">
                          {listing[0].available_from}
                        </Form.Label>
                        <Form.Label className="col-4">
                          available until:
                        </Form.Label>
                        <Form.Label className="col-8">
                          {listing[0].available_until}
                        </Form.Label>
                        <Form.Label className="col-4">Max price:</Form.Label>
                        <Form.Label className="col-8">
                          {listing[0].max_price}€
                        </Form.Label>
                      </Form.Group>
                    </Form>
                  </div>
                  <div className="col-lg-12 col-sm-12 py-4 px-3 border-top border-info">
                    <Form>
                      <Form.Group as={Form.Row}>
                        <Form.Label className="col-4 mb-3">
                          Lower Bid Price:
                        </Form.Label>
                        <Form.Label className="col-8 redColor bold mb-3">
                          {90.0}€
                        </Form.Label>
                        <Form.Label className="col-4 mb-3">
                          Your Solution:
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          placeholder="Solution Description"
                          className="col-8 mb-3"
                        />
                        <Form.Label className="col-4 pt-1">
                          Your Bid:
                        </Form.Label>
                        <Form.Control className="col-8" placeholder="€" />
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="align-self-end" variant="primary">
                Bid
              </Button>
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
