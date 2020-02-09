import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AuthContext from "../context/auth-context";

class BidForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: {
        UID: null,
        LID: this.props.listing[0].LID,
        solution_decription: "",
        price: 0,
        time_to_fix: 0,
        when: `${new Date().toLocaleDateString('en-CA')}T${new Date().getHours()+1}:${new Date().getMinutes()}`,
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
      },
      isBidExists: null
    };
  }
  static contextType = AuthContext;

  componentDidUpdate() {
    if (this.props.sendReq) {
      this.handleBid();
    }

    if (this.state.isBidExists === null) {
      axios
        .get(`http://localhost:4567/api/users/${this.context.username}/listings/${this.props.listing[0].LID}/bids`, {
          headers: {
            Authorization: this.context.token
          }
        })
        .then(response => {
          console.log(
            "get bid: response.data" + JSON.stringify(response.data)
          );
          if (response.data.data[0] !== undefined && response.data.data[0] !== null) {
            console.log("SUCCESS");
            this.setState({
              bid: { 
                ...response.data.data[0]
              },
              isBidValid: {
                solution_decription: true,
                price: true,
                time_to_fix: true,
                when: true
              },
              isBidExists: true
            });
          } else {
            this.setState({
              isBidExists: false
            });
          }
        })
        .catch(error => console.log(`Error${JSON.stringify(error)}`));
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
    if(this.checkValidity()){
      let data = this.state.bid
      data.UID = this.context.username;
      if(this.state.isBidExists){
        axios
      .put(`http://localhost:4567/api/bids/${this.state.bid.BID}`, data, {
        headers: {
          Authorization: this.context.token
        }
      })
      .then(response => {
        console.log("response.data.status" + response.data.status);
        if (response.data.status === "SUCCESS") {
          const title="Bid Edited";
          const msg = `Bid price: ${this.state.bid.price}\n
                      Solution: ${this.state.bid.solution_decription}\n
                      Fixing Time: ${this.state.bid.time_to_fix}\n
                      when: ${this.state.bid.when.split('T').join(' ')} `;
          this.props.setSuccess(msg,title);
        }
      });
      }else{
        axios
          .post("http://localhost:4567/api/bids", data, {
            headers: {
              Authorization: this.context.token
            }
          })
          .then(response => {
            console.log("response.data.status" + response.data.status);
            if (response.data.status === "SUCCESS") {
              const title="Bid Posted";
              const msg = `Bid price: ${this.state.bid.price}\n
                          Solution: ${this.state.bid.solution_decription}\n
                          Fixing Time: ${this.state.bid.time_to_fix}\n
                          when: ${this.state.bid.when.split('T').join(' ')} `;
              this.props.setSuccess(msg,title);
            }
          });
        }
      }
  }

  checkValidity(){
    return this.state.isBidValid.price &&
          this.state.isBidValid.solution_decription &&
          this.state.isBidValid.time_to_fix &&
          this.state.isBidValid.when 
  }

  onSolutionDescrChanged(event) {
    this.setState({
      bid: {
        ...this.state.bid,
        solution_decription: event.target.value
      },
      isBidValid: {
        ...this.state.isBidValid,
        solution_decription: true,
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
        },
        isBidValid: {
          ...this.state.isBidValid,
          price: true
        }
      });
    } else {
      // alert(`max price = ${this.props.listing[0].max_price}`);
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
        },
        isBidValid: {
          ...this.state.isBidValid,
          time_to_fix: true
        }
      });
    } else {
      // alert("time to fix must be > 0");
    }
  }

  onWhenDateChanged(event) {
    const when = event.target.value;
    let tmpWhen= this.state.bid.when.split('T');
    if ( when >= new Date().toLocaleDateString('en-CA')) {
      this.setState({
        bid: {
          ...this.state.bid,
          when: `${when}T${tmpWhen[1]}`
        },
        isBidValid: {
          ...this.state.isBidValid,
          when: true
        }
      });
    } else {
      // alert("Date must be at least today");
      event.target.value = this.state.bid.when;
    }
  }

  onWhenTimeChanged(event) {
    const time = event.target.value;
    let tmpWhen= this.state.bid.when.split('T');
    if (tmpWhen[0] >= new Date().toLocaleDateString('en-CA')) {
      this.setState({
        bid: {
          ...this.state.bid,
          when: `${tmpWhen[0]}T${time}`
        },
        isBidValid: {
          ...this.state.isBidValid,
          when: true
        }
      });
    } else {
      // alert("Date must be at least today");
      event.target.value = this.state.bid.when;
    }
  }

  render() {
    const generalInfo = this.state.bidGeneralInfo;
    return (
      <Form>
        <Form.Group as={Form.Row}>
          <Form.Label className="col-4 mb-3">Lowest Bid:</Form.Label>
          {(generalInfo.bidsCount>0)?(
            <Form.Label className="col-8 bold redColor mb-3">
              {generalInfo.minBidPrice}€
              {` ( ${generalInfo.bidsCount} bid${
                generalInfo.bidsCount > 1 ? "s" : ""
              } )`}
            </Form.Label>
          ): (<Form.Label className="col-8 bold mb-3">
                -
            </Form.Label>)}
          <Form.Label className="col-4 pt-1">Your Bid:</Form.Label>
          <Form.Control
            type="Number"
            className="col-8"
            placeholder="€"
            onChange={this.onPriceChanged.bind(this)}
            value={this.state.bid.price}
            // required
          />
          <Form.Label className="col-4 mt-1">Your Solution:</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Solution Description"
            className="col-8 mt-1"
            onChange={this.onSolutionDescrChanged.bind(this)}
            value={this.state.bid.solution_decription}
            // required
          />

          <Form.Label className="col-4 pt-1">When:</Form.Label>
          <Form.Control
            type="Date"
            className="col-4 mt-1"
            onChange={this.onWhenDateChanged.bind(this)}
            value={this.state.bid.when.split('T')[0]}
            // required
          />
          {/*<Form.Label className="col-4 pt-1"></Form.Label>*/}
          <Form.Control
              type="time"
              className="col-4 mt-1"
              onChange={this.onWhenTimeChanged.bind(this)}
              value={this.state.bid.when.split('T')[1]}
              // required
          />
          <Form.Label className="col-4 pt-1">Time To Fix It:</Form.Label>
          <Form.Control
            type="Number"
            className="col-8 mt-1"
            placeholder="Time to fix it in minutes"
            onChange={this.onTimeToFixChanged.bind(this)}
            value={this.state.bid.time_to_fix}
            // required
          />
        </Form.Group>
      </Form>
    );
  }
}

export default BidForm;
