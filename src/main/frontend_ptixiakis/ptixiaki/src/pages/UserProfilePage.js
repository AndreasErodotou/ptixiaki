import React, { Component } from "react";
import SimpleTemplatePage from "./templates/SimpleTemplatePage";
import Review from "../components/Review";
import UserDetails from "../components/UserDetails";
import AuthContent from "../context/auth-context";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Filters from '../components/Filters/Filters';

import {getReq} from "../requests/Request";


class UserProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        jobsDone: 0,
        count: 0,
        rating: 0
      },
      reviews: [],
      query: "",
      update: false
    };
  }

  static contextType = AuthContent;

  componentDidMount() {
    const path=window.location.pathname;
    // console.log(`pathname:${window.location.pathname}`);

    [
      path.substring(1),
      `${path}/reviews/rating`.substring(1),
      `${path}/bids/selected/count`.substring(1)
    ].forEach((path) => {
      getReq(path,response => {
        this.setState({
          user: {
            ...this.state.user,
            ...response.data.data
          }
        });
      });
    })

    getReq(`reviews?TO_UID=${path.split('/')[2]}`,response => {
      this.setState({
        reviews: response.data.data
      });
    });
  }

  componentDidUpdate() {
    const query= this.state.query;
    if(query!=="" && this.state.update){
      // const path = window.location.pathname;

      getReq(`reviews?TO_UID=${this.context.username}${this.state.query}`,response => {
        this.setState({
          reviews: [...response.data.data],
          update:false
        });
      });
    }
  }

  queryChanged(value){
    this.setState({
      ...this.state,
      query:`&order=${value}`,
      update: true
    });
  }

  render(){
    // const Categories = ["Electrician", "Hydraulic", "Engineer"];
    // const Locations = ["Nicosia", "Heraklion", "Athens"];
    let contentTop;
    if (this.state.user !== null && this.state.user !== undefined) {
      contentTop = <UserDetails user={this.state.user} />;
    }
    const contentDown = this.state.reviews.map((review, index) => (
      <Review review={review} key={index} />
    ));

    const content = (
        <div className="container mt-4">
          {contentTop}
          {/*<div className={"d-flex"}>*/}
          {/*<div className={"col-2 mt-3"}>*/}
          {/*  <Filters*/}
          {/*    categories={null}*/}
          {/*    locations={null}*/}
          {/*    order={"all"}*/}
          {/*  />*/}
          {/*</div>*/}
          {/*  <div className={"col-10 "}>*/}
          <DropdownButton
              id="dropdown-basic-button"
              title={`Reviews: ${this.state.query.replace('&order=',' ').replace('all','')}`}
              size="sm"
              className="justify-content-end offset-9 my-3"

              // disabled
          >
            <Dropdown.Item onClick={() => this.queryChanged("positive-first")}>Positive First</Dropdown.Item>
            <Dropdown.Item onClick={() => this.queryChanged("negative-first")}>Negative First</Dropdown.Item>
            <Dropdown.Item onClick={() => this.queryChanged("all")}>All</Dropdown.Item>

          </DropdownButton>
          {contentDown}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
    );
    return (

        <SimpleTemplatePage
          // categories={Categories}
          // locations={Locations}
          // contentTop={contentTop}
          // contentDown={contentDown}
          content={content}
        />

    );
  }
}

export default UserProfilePage;
