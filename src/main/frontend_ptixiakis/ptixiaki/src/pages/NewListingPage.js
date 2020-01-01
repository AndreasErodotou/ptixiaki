import React, { Component } from "react";
import PropTypes from "prop-types";
import NewListingField from "../components/Listings/NewListingField";
import Image from "react-bootstrap/Image";
import SimpleTemplatePage from "./templates/SimpleTemplatePage";
import AuthContext from "../context/auth-context";
import axios from "axios";

// import PickyDateTime from "react-picky-date-time";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

const categories = [
  { label: "electrician", value: 1 },
  { label: "plumber", value: 2 },
  { label: "car mechanic", value: 3 },
  { label: "painter", value: 4 }
];

const locations = [
  { label: "Heraklion", value: 1 },
  { label: "Chania", value: 2 },
  { label: "Rethimno", value: 3 },
  { label: "Nicosia", value: 4 },
  { label: "Limassol", value: 5 },
  { label: "Larnaca", value: 6 },
  { label: "Paphos", value: 7 },
  { label: "Athens", value: 8 }
];

class NewListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newListing: {
        UID: "test",
        title: "test",
        description: "test",
        pics: [],
        available_from: "2019-04-05T10:30",
        available_until: "2019-04-05",
        location: "NICOSIA",
        jobCategory: "test",
        max_price: "100"
      },
      picsLoaded: false,
      post: false
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    if (this.context.userId) {
      this.setState({
        newListing: {
          ...this.state.newListing,
          UID: this.context.userId
        }
      });
    } else {
      this.props.history.push("/");
    }
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
      return "ok";
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
    event.preventDefault();
    console.log("userId:" + this.context.userId);
    this.setState({
      newListing: {
        ...this.state.newListing,
        UID: this.context.userId,
        title: document.getElementById("Title").value,
        description: document.getElementById("Description").value,
        pics: [...this.state.newListing.pics],
        max_price: document.getElementById("Max Price").value
      },
      post: true
    });
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
    let jwtToken = this.context.token;
    axios
      .post("http://localhost:4567/api/listings", this.state.newListing, {
        headers: {
          Authorization: jwtToken
        }
      })
      .then(response => {
        console.log(response.data);
        alert("Listing Posted");
      })
      .catch(error => {
        console.log(`Error:${error}`);
      });
  }

  onLocChange(location) {
    this.setState({
      newListing: {
        ...this.state.newListing,
        location: location.label.toUpperCase()
      }
    });
  }

  onCategChange(category) {
    this.setState({
      newListing: {
        ...this.state.newListing,
        jobCategory: category.label
      }
    });
  }

  availableFromChanged(event) {
    let avail = event.target.value;
    console.log(`available from: ${avail}`);
    let tmpDate= this.state.newListing.available_from.split('T');
    this.setState({
      newListing: {
        ...this.state.newListing,
        available_from: `${avail}T${tmpDate[1]}`
      }
    });
  }

  availableUntilChanged(event) {
    let avail = event.target.value;
    console.log(`available Until: ${avail}`);
    let tmpDate= this.state.newListing.available_from.split('T');
    this.setState({
      newListing: {
        ...this.state.newListing,
        available_until: `${avail}T${tmpDate[1]}`
      }
    });
  }

  availTimeChanged(event) {
    let avail = event.target.value;
    console.log(`available: ${avail}`);
    let tmpDate= this.state.newListing.available_from.split('T');
    this.setState({
      newListing: {
        ...this.state.newListing,
        available_from: `${tmpDate[0]}T${avail}`
      }
    });
  }
  untilTimeChanged(event) {
    let avail = event.target.value;
    console.log(`available Until time: ${avail}`);
    let tmpDate= this.state.newListing.available_from.split('T');
    this.setState({
      newListing: {
        ...this.state.newListing,
        available_until: `${tmpDate[0]}T${avail}`
      }
    });
  }

  render() {
    // console.log("new listing state "+JSON.stringify(this.state));
    let NewListingForm = null;
    let selectedPics = this.state.newListing.pics.map((pic, index) => {
      if (index === 0) {
        return (
          <div key={index}>
            <p style={{ color: "red" }}>
              (To delete a picture just click on it)
            </p>
            {/* &times; */}
            {/* <span>
                <button type="button" class="close">
                  <span aria-hidden="true">×</span>
                  <span class="sr-only">Close</span>
                </button> */}
            <Image
              onClick={() => this.removePicHandler(index)}
              className="img-responsive pic col-sm-12 form-control-file mb-2"
              src={pic}
              alt="Select A Picture"
            ></Image>
            {/* </span> */}
          </div>
        );
      } else {
        return (
          <Image
            onClick={() => this.removePicHandler(index)}
            className="img-responsive pic col-sm-3"
            src={pic}
            key={index}
            alt="Select A Picture"
          ></Image>
        );
      }
    });

    let extraPadding = selectedPics.length < 5 ? " px-5" : "";

    NewListingForm = (
      <div className="border border-info row mx-3 mt-3">
        <div className="border-right border-info col-sm-5 p-4">
          <div className={"row d-flex justify-content-center" + extraPadding}>
            {selectedPics}

            {selectedPics.length < 5 ? (
              <form className="my-3">
                <div className="file-field">
                  <div className="btn btn-outline-info ">
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
            ) : null}
          </div>
        </div>
        <div className="col-sm-7 pt-4">
          <form className="form" onSubmit={this.postHandler.bind(this)}>
            <NewListingField fieldName="Title" type="text" />
            <NewListingField fieldName="Description" type="textarea" />
            <NewListingField
              fieldName="Location"
              type="dropdown"
              options={locations}
              onChange={this.onLocChange.bind(this)}
            />
            <NewListingField
              fieldName="Category"
              type="dropdown"
              options={categories}
              onChange={this.onCategChange.bind(this)}
            />
            <NewListingField fieldName="Max Price" type="number" />
            <NewListingField
              fieldName="Available From"
              type="date"
              onChange={this.availableFromChanged.bind(this)}
              onTimeChange={this.availTimeChanged.bind(this)}
            />
            <NewListingField
              fieldName="Available Until"
              type="date"
              onChange={this.availableUntilChanged.bind(this)}
              onTimeChange={this.untilTimeChanged.bind(this)}
            />

            <div className="d-flex justify-content-end">
              <button className="w-25 btn btn-outline-info btn-rounded btn-block my-3 waves-effect z-depth-0 mt-0">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    );

    return <SimpleTemplatePage content={NewListingForm} />;
  }
}

// NewListing.propTypes = {
// };

export default NewListing;
