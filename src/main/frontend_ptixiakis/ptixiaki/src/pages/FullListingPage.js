import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Rating from "../components/Rating";
import UserIcon from "../assets/User_sm.svg";
import AuthContext from "../context/auth-context";
import axios from "axios";
import SuccessAlert from "../components/SuccessAlert";
import ListingDetails from "../components/Listings/ListingDetails";
import BidForm from "../components/BidForm";
import ReviewForm from "../components/ReviewForm";
import BidsMade from "../components/BidsMade";

import {Link} from "react-router-dom"
// import ModalDialog from "react-bootstrap/ModalDialog";

class FullListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listingUser: {
        username: this.props.listing[0].UID,
        rating: 0,
        reviews: 0
      },
      postSuccessfully: false,
      sendReq: false,
      msg: null,
      title: null,
      selectedBid: null
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    // const lid = this.props.listing[0].LID;
    const username = this.props.listing[0].UID;
    axios
      .get(`http://localhost:4567/api/reviews/rating/${username}`, {
        headers: {
          Authorization: this.context.token
        }
      })
      .then(response => {
          const rating = response.data.data.rating;
          const reviews = response.data.data.count;
          this.setState({
            listingUser: {
              ...this.state.listingUser,
              rating: (rating===undefined)?0:rating,
              reviews: (reviews===undefined)?0:reviews
            }
          });
      })
      .catch(error => {
        console.log(`error:${JSON.stringify(error)}`);
      });
  }

  setSendReq() {
    this.setState({
      sendReq: true
    });
  }

  successReq(msg, title) {
    this.setState({
      postSuccessfully: true,
      sendReq: false,
      msg: msg,
      title: title
    });
  }

  goToUserProfile(){
      // this.history.push(`/user/profile/${this.state.listingUser.username}`);
  }

  render() {
    const listing = this.props.listing;
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
        <img className="mr-2" src={UserIcon} alt="UserIcon"/>
        <Form.Label className="mr-1 mt-1">Posted By:</Form.Label>
        <Form.Label className="bold mr-1 mt-1 onHoverBluePointer" onClick={this.goToUserProfile.bind(this)}> 
         <Link style={{ textDecoration: 'none' }} to= {`/users/${this.state.listingUser.username}`} > {this.state.listingUser.username} </Link>
        </Form.Label>
        <div className="pb-2">
          <Rating rating={this.state.listingUser.rating} />
        </div>
        <Form.Text className="ml-1 mt-2">
          ({this.state.listingUser.reviews})
        </Form.Text>
      </Form.Group>
    );

    const showBidForm = !(this.props.path.indexOf("reviews") > 0);
      // alert("path: "+this.props.path);
    let form = "The listing is active so you can't see bids made from other users...";
    if(showBidForm && this.context.accountType!=="CUSTOMER"){
    form = (
      <BidForm
        key="BidForm"
        sendReq={this.state.sendReq}
        listing={listing}
        setSuccess={this.successReq.bind(this)}
    />)
    }else if (!showBidForm) {
      form = (
      <ReviewForm
        key="ReviewForm"
        UID={listing[0].UID}
        LID={listing[0].LID}
        sendReq={this.state.sendReq}
        setSuccess={this.successReq.bind(this)}
      />);
    }else if(showBidForm && this.context.username===this.state.listingUser.username){
      form = 
      <BidsMade 
        LID = {listing[0].LID}
        sendReq={this.state.sendReq}
        setSuccess={this.successReq.bind(this)}
      />
      // form = "Here is the bids made for this listing, when you are ready choose one";
    }

    const feedbackAlert = (
      <Modal size="sm" show={this.props.show} onHide={this.props.onHide}>
        <SuccessAlert
          // title={this.context.accountType!=="CUSTOMER"?"Bid Posted Successfully":"Bid Selected"}
          title={this.state.title}
          msg={this.state.msg}
          // redirectPath="/listings"
          modalHide={this.props.onHide}
        />
      </Modal>
    );
    return (
      <div>
        {listing[0] && !this.state.postSuccessfully ? (
          <>
            <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>
              <Modal.Header className="pb-0" closeButton>
                <Modal.Title className="w-100 row ml-3 d-flex justify-content-between">
                  <title className="mt-1 d-flex">Listing Details</title>
                  <Form className="col-lg-6 col-sm-8 d-flex ">{postedBy}</Form>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <div className="rounded row d-flex justify-content-center">
                    <div className="lg-border-right sm-border-bottom border-info col-lg-4 col-sm-8">
                      <div className="row my-4 slef-item-center">
                        {/* <img className="img-responsive pic col-sm-12" id="mainPic" src={data}  alt="pic"></img> */}
                        {otherPics}
                      </div>
                    </div>
                    <div className="col-lg-8 col-sm-12 py-4 px-3">
                      <ListingDetails listing={listing} />
                    </div>
                    <div className="col-lg-12 col-sm-12 py-4 px-3 border-top border-info">
                      {!this.state.postSuccessfully ? form : null}
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="align-self-end"
                  variant="primary"
                  onClick={this.setSendReq.bind(this)}
                >
                  {showBidForm? this.context.accountType!=="CUSTOMER"? "Bid": "Select" : "Review"}
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : (
          feedbackAlert
        )}
      </div>
    );
  }
}

FullListing.propTypes = {
  listing: PropTypes.array,
  handleModal: PropTypes.object
};

export default FullListing;
