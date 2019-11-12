import React, { Component } from "react";
import PropTypes from "prop-types";
import NewListingField from "./NewListingField";
import "./NewListing.css";
import PickyDateTime from "react-picky-date-time";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class NewListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newListing: {
        UID: "test",
        title: "test",
        description: "test",
        pics: [],
        available_from: "2019-04-05",
        available_until: "2019-04-05",
        location: "NICOSIA",
        jobCategory: "test",
        max_price: "100"
      },
      picsLoaded: false,
      post: false
    };
  }

  picSelectedHandler = event => {
    [...event.target.files].map((file, index) => {
      if (this.state.newListing.pics.length + (index + 1) <= 5) {
        this.getBase64(file, result => {
          let picBase64 = result;
          console.log("pic Base64 type: " + typeof picBase64);
          this.setState({
            newListing: {
              ...this.state.newListing,
              pics: [...this.state.newListing.pics, picBase64]
            }
          });
        });
      } else {
        alert("You Can't Select Up To 5 Pictures!!");
      }
    });
  };

  getBase64(file, callback) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      callback(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  }

  removePicHandler = pos => {
    const pics = this.state.newListing.pics;
    pics.splice(pos, 1);
    this.setState({
      newListing: {
        ...this.state.newListing,
        pics: [...pics]
      }
    });
  };

  postHandler = event => {
    let warnings = "";
    let newListing = {};
    if (document.getElementById("Title").value === "") {
      warnings += "Please Fill The Title Field \n";
    } else {
      newListing.title = document.getElementById("Title").value;
    }
    if (document.getElementById("Description").value === "") {
      warnings += "Please Fill The Description Field \n";
    } else {
      newListing.description = document.getElementById("Description").value;
    }
    if (document.getElementById("Location").value === "") {
      warnings += "Please Fill The Location Field \n";
    } else {
      newListing.location = document.getElementById("Location").value;
    }
    if (document.getElementById("Category").value === "") {
      warnings += "Please Fill The Category Field \n";
    } else {
      newListing.jobCategory = document.getElementById("Category").value;
    }
    if (document.getElementById("Max Price").value === "") {
      warnings += "Please Fill The Max Price Field \n";
    } else {
      newListing.max_price = document.getElementById("Max Price").value;
    }
    if (document.getElementById("Available From").value === "") {
      warnings += "Please Fill The Available From Field \n";
    } else {
      newListing.available_from = document.getElementById(
        "Available From"
      ).value;
    }
    if (document.getElementById("Available Until").value === "") {
      warnings += "Please Fill The Available Until Field \n";
    } else {
      newListing.available_until = document.getElementById(
        "Available Until"
      ).value;
    }
    if (this.state.newListing.pics.length === 0) {
      warnings += "Please Add Some Photos";
    } else {
      newListing.pics = [...this.state.newListing.pics];
    }

    if (warnings !== "") {
      event.preventDefault();
      alert(warnings);
    } else {
      event.preventDefault();
      // console.log("new listing before setState:"+JSON.stringify(newListing));
      this.setState({
        ...this.state.picsLoaded,
        newListing: {
          UID: "test",
          title: newListing.title,
          description: newListing.description,
          pics: [...this.state.newListing.pics],
          available_from: newListing.available_from,
          available_until: newListing.available_until,
          location: newListing.location,
          jobCategory: newListing.jobCategory,
          max_price: newListing.max_price
        },
        post: true
      });
    }
  };

  componentDidUpdate() {
    // console.log("update state: "+JSON.stringify(this.state));
    if (this.state.post === true) {
      this.addListingToDB();
      alert("Listing Posted");
      // console.log("New Listing:" + JSON.stringify(this.state.newListing));

      this.setState({
        ...this.state,
        post: false
      });
    }
  }

  addListingToDB() {
    fetch("http://localhost:4567/api/listings", {
      method: "post",
      body: JSON.stringify(this.state.newListing)
    })
      .then(response => response.json())
      .then(myJson => console.log(myJson.msg));
  }

  render() {
    // console.log("new listing state "+JSON.stringify(this.state));
    let NewListingForm = null;
    if (this.props.createNewListing) {
      let selectedPics = this.state.newListing.pics.map((pic, index) => {
        if (index === 0) {
          return (
            <div>
              <p style={{ color: "red" }}>
                (To delete a picture just click on it)
              </p>
              <img
                onClick={() => this.removePicHandler(index)}
                className="img-responsive pic col-sm-12 form-control-file"
                id="nl_mainPic"
                src={pic}
                key={index}
                alt="Select A Picture"
              ></img>
            </div>
          );
        } else {
          return (
            <img
              onClick={() => this.removePicHandler(index)}
              className="img-responsive pic col-sm-3"
              src={pic}
              key={index}
              alt="Select A Picture"
            ></img>
          );
        }
      });

      NewListingForm = (
        // <><Modal size="lg" show={this.props.show} onHide={this.props.onHide} >
        //     <Modal.Header closeButton>
        //     <Modal.Title>Create Your Own Listing</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body >
        <div className="border border-info row m-4" id="fullListing">
          <div className="border-right border-info col-sm-5" id="nl_pics">
            <div className="row" id="nl_allPicsdiv">
              {selectedPics}

              <form className="md-form">
                <div className="file-field">
                  <div className="btn btn-outline-info btn-rounded btn-block my-3 waves-effect z-depth-0">
                    <label>Select Pictures</label>
                    <span>
                      <input
                        className="custom-file-input"
                        id="test"
                        type="file"
                        multiple
                        onChange={event => this.picSelectedHandler(event)}
                      />
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-7" id="nl_info">
            <form className="form" onSubmit={this.postHandler.bind(this)}>
              <NewListingField fieldName="Title" type="text" />
              <NewListingField fieldName="Description" type="textarea" />
              <NewListingField fieldName="Location" type="dropdown" />
              <NewListingField fieldName="Category" type="dropdown" />
              <NewListingField fieldName="Max Price" type="number" />
              <NewListingField fieldName="Available From" type="date" />
              <NewListingField fieldName="Available Until" type="date" />

              <div className="form-row">
                <div className="col-md-9"></div>
                <div className="col-md-3">
                  <div className="form-group">
                    <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        //     </Modal.Body>
        // </Modal>
        // </>
      );
    }

    return <div>{NewListingForm}</div>;
  }
}

NewListing.propTypes = {
  createNewListing: PropTypes.bool
};

export default NewListing;
