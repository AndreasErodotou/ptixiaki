import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Listing from "./Listing/Listing";
import FullListing from "./FullListing/FullListing.js";
import NewListing from "./NewListing/NewListing";
import "./Listings.css";
import CardGroup from "react-bootstrap/CardGroup";

const Listings = props => {
  // console.log("state: "+JSON.stringify(this.state.listings["f48e2c2d-1506-4f5a-b75d-5254a4104e30"]));

  const [fullLShow, setFullLShow] = React.useState(false);
  const handlefullLClose = () => setFullLShow(false);
  const handlefullLShow = () => setFullLShow(true);

  const [newLShow, setNewLShow] = React.useState(false);
  const handleNewLClose = () => {
    setNewLShow(false);
    props.disableCNL();
  };
  const handleNewLShow = () => setNewLShow(true);

  var content;

  useEffect(() => {
    // console.log("useEffect:"+props.createNewListing);
    if (props.createNewListing) {
      handleNewLShow();
    }
  }, [props.createNewListing]);

  let listingClickedModalHandler = LID => {
    props.listingClickedHandler(LID);
    handlefullLShow();
  };

  // let NewListingClickedModalHander = () => {
  //     handleNewLShow();
  // }

  var listings = props.listings.map(listing => {
    return (
      <Listing
        key={listing.LID}
        title={listing.title}
        imgsrc={listing.pics}
        descr={listing.description}
        listingClicked={() => listingClickedModalHandler(listing.LID)}
      />
    );
  });

  if (props.createNewListing) {
    // content =   <NewListing
    //                 createNewListing={props.createNewListing}
    //                 onHide = {handleNewLClose}
    //                 show = {newLShow}
    //             />
  } else if (props.listingClickedId) {
    content = (
      <FullListing
        key={props.listingClickedId}
        listing={props.listingClicked}
        onHide={handlefullLClose}
        show={fullLShow}
      />
    );
  }

  // console.log("listings:listing: " + JSON.stringify(props.listingClicked));

  // if(props.createNewListing){
  //     handleNewLShow();
  // }

  return (
    <div>
      <div id="listingsContainer">
        <div className="row mx-0 px-0">{listings}</div>

        {props.showFullListing ? (
          <div id="fullListing">
            <FullListing
              listing={props.listingClicked}
              onHide={handlefullLClose}
              show={fullLShow}
            />
          </div>
        ) : null}

        <div id="newListing">
          {/* {content} */}
          <NewListing
            createNewListing={props.createNewListing}
            onHide={handleNewLClose}
            show={newLShow}
            // modalHandler = {NewListingClickedModalHander}
            close={handleNewLShow}
          />
          {/* <p>Listings: {JSON.stringify(props.createNewListing)}</p> */}
        </div>
      </div>
    </div>
  );
};

Listings.propTypes = {
  // onShowListings : PropTypes.func
};

export default Listings;
