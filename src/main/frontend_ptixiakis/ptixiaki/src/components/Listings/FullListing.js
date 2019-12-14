import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Rating from "../Rating";
import UserIcon from "../../assets/User_sm.svg";
import AuthContext from "../../context/auth-context";
import axios from "axios";
// import ModalDialog from "react-bootstrap/ModalDialog";

class FullListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: {
        UID: null,
        LID: null,
        solution_decription: null,
        price: null,
        time_to_fix: null,
        when: null,
        selected: false
      },
      listingUser: {
        username: null,
        rating: 0,
        bidsCount: 0,
        minBidPrice: 0
      }
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    const lid = this.props.listing[0].LID;
    const username = this.props.listing[0].UID;
    axios
      .get(`http://localhost:4567/api/reviews/rating/${username}`, {
        headers: {
          Authorization: this.context.token
        }
      })
      .then(response => {
        const rating = response.data.data.rating;
        this.setState({
          bid: {
            ...this.state.bid,
            LID: lid,
            UID: this.context.userId
          },
          listingUser: {
            ...this.state.listingUser,
            username: username,
            rating: rating
          }
        });
      })
      .catch(error => {
        console.log(`error:${JSON.stringify(error)}`);
      });

    axios
      .get(`http://localhost:4567/api/bids/${lid}/min`, {
        headers: {
          Authorization: this.context.token
        }
      })
      .then(response => {
        const bidsCount = response.data.data.count;
        const minBidPrice = response.data.data.price;
        this.setState({
          listingUser: {
            ...this.state.listingUser,
            bidsCount: bidsCount,
            minBidPrice: minBidPrice
          }
        });
      })
      .catch(error => {
        console.log(`error:${JSON.stringify(error)}`);
      });
  }

  handleBid() {
    axios.post("http://localhost:4567/api/bids", this.state.bid, {
      headers: {
        Authorization: this.context.token
      }
    });
  }

  onSolutionDescrChanged(event) {
    this.setState({
      bid: {
        ...this.state.bid,
        solution_decription: event.target.value
      }
    });
  }
  onPriceChanged(event) {
    this.setState({
      bid: {
        ...this.state.bid,
        price: event.target.value
      }
    });
  }
  onTimeToFixChanged(event) {
    this.setState({
      bid: {
        ...this.state.bid,
        time_to_fix: event.target.value
      }
    });
  }
  onWhenChanged(event) {
    this.setState({
      bid: {
        ...this.state.bid,
        when: event.target.value
      }
    });
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
        <img className="mr-2" src={UserIcon} alt="UserIcon"></img>
        <Form.Label className="mr-1 mt-1">Posted By:</Form.Label>
        <Form.Label className="bold mr-1 mt-1">
          {this.state.listingUser.username}
        </Form.Label>
        <div className="pb-2">
          <Rating rating={this.state.listingUser.rating} />
        </div>
        <Form.Text className="ml-1 mt-2">
          ({this.state.listingUser.rating})
        </Form.Text>
      </Form.Group>
    );

    return (
      <div>
        {listing[0] ? (
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
                          <Form.Label className="col-12">
                            {listing[0].description}
                          </Form.Label>
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
                            Lowest Bid:
                          </Form.Label>
                          <Form.Label className="col-8 redColor bold mb-3">
                            {this.state.listingUser.minBidPrice}€
                            {` ( ${this.state.listingUser.bidsCount} bid${
                              this.state.listingUser.bidsCount > 1 ? "s" : ""
                            } )`}
                          </Form.Label>
                          <Form.Label className="col-4 pt-1">
                            Your Bid:
                          </Form.Label>
                          <Form.Control
                            type="Number"
                            className="col-8"
                            placeholder="€"
                            onChange={this.onPriceChanged.bind(this)}
                          />
                          <Form.Label className="col-4 mt-1">
                            Your Solution:
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="3"
                            placeholder="Solution Description"
                            className="col-8 mt-1"
                            onChange={this.onSolutionDescrChanged.bind(this)}
                          />

                          <Form.Label className="col-4 pt-1">When:</Form.Label>
                          <Form.Control
                            type="Date"
                            className="col-8 mt-1"
                            onChange={this.onWhenChanged.bind(this)}
                          />
                          <Form.Label className="col-4 pt-1">
                            Time To Fix It:
                          </Form.Label>
                          <Form.Control
                            type="Number"
                            className="col-8 mt-1"
                            placeholder="Time to fix it in minutes"
                            onChange={this.onTimeToFixChanged.bind(this)}
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="align-self-end"
                  variant="primary"
                  onClick={this.handleBid.bind(this)}
                >
                  Bid
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ) : null}
      </div>
    );
  }
}

FullListing.propTypes = {
  listing: PropTypes.array,
  handleModal: PropTypes.object
};

export default FullListing;
