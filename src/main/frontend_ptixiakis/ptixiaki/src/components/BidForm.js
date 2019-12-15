import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AuthContext from "../context/auth-context";

class BidForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: {
        UID: this.props.listing[0].UID,
        LID: this.props.listing[0].LID,
        solution_decription: null,
        price: null,
        time_to_fix: null,
        when: null,
        selected: false
      },
      isBidValid: {
        solution_decription: false,
        price: false,
        time_to_fix: false,
        when: false
      },
      bidGeneralInfo: {
        bidsCount: -1,
        minBidPrice: -1
      }
    };
  }
  static contextType = AuthContext;

  componentDidUpdate() {
    if (this.props.sendReq) {
      this.handleBid();
    }

    if (this.state.bidGeneralInfo.bidsCount === -1) {
      axios
        .get(
          `http://localhost:4567/api/bids/${this.props.listing[0].LID}/min`,
          {
            headers: {
              Authorization: this.context.token
            }
          }
        )
        .then(response => {
          const bidsCount = response.data.data.count;
          const minBidPrice = response.data.data.price;
          this.setState({
            bidGeneralInfo: {
              bidsCount: bidsCount,
              minBidPrice: minBidPrice
            }
          });
        })
        .catch(error => {
          console.log(`error:${JSON.stringify(error)}`);
        });
    }
  }

  handleBid() {
    axios
      .post("http://localhost:4567/api/bids", this.state.bid, {
        headers: {
          Authorization: this.context.token
        }
      })
      .then(response => {
        console.log("response.data.status" + response.data.status);
        if (response.data.status === "SUCCESS") {
          const msg = `Bid price: ${this.state.bid.price}\n
                      Solution: ${this.state.bid.solution_decription}\n
                      Fixing Time: ${this.state.bid.time_to_fix}\n
                      when: ${this.state.bid.when} `;
          this.props.setMsg(msg);
          this.props.setSuccess();
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
    const price = event.target.value;
    if (price < this.props.listing[0].max_price) {
      this.setState({
        bid: {
          ...this.state.bid,
          price: price
        }
      });
    } else {
      alert(`max price = ${this.props.listing[0].max_price}`);
      event.target.value = this.state.bid.price;
    }
  }
  onTimeToFixChanged(event) {
    const time = event.target.value;
    if (time > 0) {
      this.setState({
        bid: {
          ...this.state.bid,
          time_to_fix: time
        }
      });
    } else {
      alert("time to fix must be > 0");
    }
  }
  onWhenChanged(event) {
    const when = event.target.value;
    if (new Date(when) >= new Date()) {
      this.setState({
        bid: {
          ...this.state.bid,
          when: event.target.value
        }
      });
    } else {
      alert("Date must be at least today");
      event.target.value = this.state.bid.when;
    }
  }
  render() {
    const generalInfo = this.state.bidGeneralInfo;
    return (
      <Form>
        <Form.Group as={Form.Row}>
          <Form.Label className="col-4 mb-3">Lowest Bid:</Form.Label>
          <Form.Label className="col-8 bold redColor mb-3">
            {generalInfo.minBidPrice}€
            {` ( ${generalInfo.bidsCount} bid${
              generalInfo.bidsCount > 1 ? "s" : ""
            } )`}
          </Form.Label>
          <Form.Label className="col-4 pt-1">Your Bid:</Form.Label>
          <Form.Control
            type="Number"
            className="col-8"
            placeholder="€"
            onChange={this.onPriceChanged.bind(this)}
            // required
          />
          <Form.Label className="col-4 mt-1">Your Solution:</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Solution Description"
            className="col-8 mt-1"
            onChange={this.onSolutionDescrChanged.bind(this)}
            // required
          />

          <Form.Label className="col-4 pt-1">When:</Form.Label>
          <Form.Control
            type="Date"
            className="col-8 mt-1"
            onChange={this.onWhenChanged.bind(this)}
            // required
          />
          <Form.Label className="col-4 pt-1">Time To Fix It:</Form.Label>
          <Form.Control
            type="Number"
            className="col-8 mt-1"
            placeholder="Time to fix it in minutes"
            onChange={this.onTimeToFixChanged.bind(this)}
            // required
          />
        </Form.Group>
      </Form>
    );
  }
}

export default BidForm;
