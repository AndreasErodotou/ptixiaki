import React from "react";
import PropTypes from "prop-types";
import "./Listing.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import CardDeck from 'react-bootstrap/CardDeck'
import CardGroup from "react-bootstrap/CardGroup";

const Listing = props => {
  // const data ="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggZD0iTTIzLjQyOSwxN0g0N2MwLjU1MiwwLDEtMC40NDcsMS0xcy0wLjQ0OC0xLTEtMUgyMy40MjljLTAuNTUyLDAtMSwwLjQ0Ny0xLDFTMjIuODc3LDE3LDIzLjQyOSwxN3oiIGZpbGw9IiMwMDAwMDAiLz4KCTxwYXRoIGQ9Ik0yMy40MjksMzJINDdjMC41NTIsMCwxLTAuNDQ3LDEtMXMtMC40NDgtMS0xLTFIMjMuNDI5Yy0wLjU1MiwwLTEsMC40NDctMSwxUzIyLjg3NywzMiwyMy40MjksMzJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMjMuNDI5LDQ3SDQ3YzAuNTUyLDAsMS0wLjQ0NywxLTFzLTAuNDQ4LTEtMS0xSDIzLjQyOWMtMC41NTIsMC0xLDAuNDQ3LTEsMVMyMi44NzcsNDcsMjMuNDI5LDQ3eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTU5LDBIMUMwLjQ0OCwwLDAsMC40NDcsMCwxdjU4YzAsMC41NTMsMC40NDgsMSwxLDFoNThjMC41NTIsMCwxLTAuNDQ3LDEtMVYxQzYwLDAuNDQ3LDU5LjU1MiwwLDU5LDB6IE01OCw1OEgyVjJoNTZWNTh6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cG9seWdvbiBwb2ludHM9IjEyLjUwMSwxOC40NzQgMTQuOTI5LDE3LjE5NyAxNy4zNTcsMTguNDc0IDE2Ljg5NCwxNS43NyAxOC44NTgsMTMuODU0IDE2LjE0MywxMy40NiAxNC45MjksMTEgMTMuNzE1LDEzLjQ2ICAgIDExLDEzLjg1NCAxMi45NjUsMTUuNzcgICIgZmlsbD0iIzAwMDAwMCIvPgoJPHBvbHlnb24gcG9pbnRzPSIxMi41MDEsMzMuNTU3IDE0LjkyOSwzMi4yOCAxNy4zNTcsMzMuNTU3IDE2Ljg5NCwzMC44NTMgMTguODU4LDI4LjkzOCAxNi4xNDMsMjguNTQzIDE0LjkyOSwyNi4wODMgICAgMTMuNzE1LDI4LjU0MyAxMSwyOC45MzggMTIuOTY1LDMwLjg1MyAgIiBmaWxsPSIjMDAwMDAwIi8+Cgk8cG9seWdvbiBwb2ludHM9IjEyLjUwMSw0OSAxNC45MjksNDcuNzIzIDE3LjM1Nyw0OSAxNi44OTQsNDYuMjk2IDE4Ljg1OCw0NC4zODEgMTYuMTQzLDQzLjk4NiAxNC45MjksNDEuNTI2IDEzLjcxNSw0My45ODYgICAgMTEsNDQuMzgxIDEyLjk2NSw0Ni4yOTYgICIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo";

  return (
    // <div className="col-sm-3">
    //     <figure className="card card-product border  border-info" id="innerListing" onClick={props.listingClicked}>
    //         <div className="img-wrap media inner  p-1">
    //             <img className="img-responsive media-left" src={props.imgsrc[0]} />
    //         </div>
    //         <figcaption className="info-wrap  p-1">
    //                 <h4 className="title">{props.title}</h4>
    //                 <p className="desc">{props.descr}</p>

    //         </figcaption>
    //         <div className="bottom-wrap border-top  border-info  p-1">
    //             <a href="#" className="btn btn-sm btn-primary float-right">Bid Now</a>
    //             <div className="price-wrap h5">
    //                 <span className="max-price">Max Price: €10</span>
    //             </div>
    //         </div>
    //     </figure>
    // </div>

    // <div className="col-sm-3">
    <Card
      className="border-primary  m-2"
      id="innerListing"
      text=""
      style={{ width: "16rem" }}
      onClick={props.listingClicked}
    >
      <Card.Img variant="top" src={props.imgsrc[0]} alt="img.." />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.descr}</Card.Text>
      </Card.Body>
      <Button variant="primary">Bid Now</Button>
      {/* <footer className="blockquote-footer">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                </footer> */}
    </Card>
    // </div>
  );

  // return (
  //     <div className="col-sm-3" id="simpleListing" /*data-toggle="modal" data-target="#myModal"*/>
  //         <div className="border  border-info" id="innerListing" onClick={props.listingClicked} >
  //             <div className="media inner" id="picdiv">
  //                 <img className="img-responsive media-left" id="pic1" src={data}  alt="pic"></img>
  //             </div>
  //             <h4 id="title">{props.title}</h4>
  //             {/* <img className="img-responsive" src={`data:image/jpeg;base64,${data}`} className="img-rounded" alt="pic"></img> */}

  //             <h6 id="descr"><small>{props.descr}</small></h6>
  //             <span></span>
  //         </div>
  //     </div>
  // );
};

Listing.propTypes = {
  title: PropTypes.string,
  imgsrc: PropTypes.string,
  descr: PropTypes.string
};

export default Listing;
