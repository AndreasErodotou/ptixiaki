import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// import ModalDialog from "react-bootstrap/ModalDialog";

const FullListing = ({ listing, showFullListing, ...handleModal }) => {
  const data =
    "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggZD0iTTIzLjQyOSwxN0g0N2MwLjU1MiwwLDEtMC40NDcsMS0xcy0wLjQ0OC0xLTEtMUgyMy40MjljLTAuNTUyLDAtMSwwLjQ0Ny0xLDFTMjIuODc3LDE3LDIzLjQyOSwxN3oiIGZpbGw9IiMwMDAwMDAiLz4KCTxwYXRoIGQ9Ik0yMy40MjksMzJINDdjMC41NTIsMCwxLTAuNDQ3LDEtMXMtMC40NDgtMS0xLTFIMjMuNDI5Yy0wLjU1MiwwLTEsMC40NDctMSwxUzIyLjg3NywzMiwyMy40MjksMzJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMjMuNDI5LDQ3SDQ3YzAuNTUyLDAsMS0wLjQ0NywxLTFzLTAuNDQ4LTEtMS0xSDIzLjQyOWMtMC41NTIsMC0xLDAuNDQ3LTEsMVMyMi44NzcsNDcsMjMuNDI5LDQ3eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTU5LDBIMUMwLjQ0OCwwLDAsMC40NDcsMCwxdjU4YzAsMC41NTMsMC40NDgsMSwxLDFoNThjMC41NTIsMCwxLTAuNDQ3LDEtMVYxQzYwLDAuNDQ3LDU5LjU1MiwwLDU5LDB6IE01OCw1OEgyVjJoNTZWNTh6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cG9seWdvbiBwb2ludHM9IjEyLjUwMSwxOC40NzQgMTQuOTI5LDE3LjE5NyAxNy4zNTcsMTguNDc0IDE2Ljg5NCwxNS43NyAxOC44NTgsMTMuODU0IDE2LjE0MywxMy40NiAxNC45MjksMTEgMTMuNzE1LDEzLjQ2ICAgIDExLDEzLjg1NCAxMi45NjUsMTUuNzcgICIgZmlsbD0iIzAwMDAwMCIvPgoJPHBvbHlnb24gcG9pbnRzPSIxMi41MDEsMzMuNTU3IDE0LjkyOSwzMi4yOCAxNy4zNTcsMzMuNTU3IDE2Ljg5NCwzMC44NTMgMTguODU4LDI4LjkzOCAxNi4xNDMsMjguNTQzIDE0LjkyOSwyNi4wODMgICAgMTMuNzE1LDI4LjU0MyAxMSwyOC45MzggMTIuOTY1LDMwLjg1MyAgIiBmaWxsPSIjMDAwMDAwIi8+Cgk8cG9seWdvbiBwb2ludHM9IjEyLjUwMSw0OSAxNC45MjksNDcuNzIzIDE3LjM1Nyw0OSAxNi44OTQsNDYuMjk2IDE4Ljg1OCw0NC4zODEgMTYuMTQzLDQzLjk4NiAxNC45MjksNDEuNTI2IDEzLjcxNSw0My45ODYgICAgMTEsNDQuMzgxIDEyLjk2NSw0Ni4yOTYgICIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo";

  let otherPics = null;
  if (listing[0].pics !== null && listing[0].pics !== undefined) {
    otherPics = listing[0].pics.map((pic, indexed) => {
      if (indexed === 0) {
        return (
          <img
            className="img-responsive pic col-sm-12"
            src={pic ? pic : data}
            alt="pic"
          ></img>
        );
      }
      return (
        <img
          key={indexed}
          className="img-responsive pic col-sm-3"
          src={pic ? pic : data}
          alt={"pic" + indexed}
        ></img>
      );
    });
  }

  console.log("listing pics: " + JSON.stringify(listing[0].pics));
  // console.log("listing:listing " + JSON.stringify(listing));
  console.log("pics:" + otherPics);
  return (
    <div>
      {listing ? (
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
  // id: PropTypes.string
};

export default FullListing;
