// import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import PropTypes from "prop-types";

import SearchIcon from "../assets/Search.svg";
import UserIcon from "../assets/User.svg";
import AddIcon from "../assets/Add.svg";

import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import "./NavBar.css";

const NavBar = props => (
  <div style={{ backgroundColor: "#E8F6F8" }} className="border">
    <nav className="px-3 py-1">
      <form className=" form-inline">
        <Link to="/" className="col-md-2 col-6 order-sm-2 order-md-1">
          <h5
            className="font-weight-bold pt_es onHover "
            onClick={props.onLogoClicked}
          >
            ServiceLink
          </h5>
        </Link>
        <div className="col-md-5  col-12 order-sm-3 order-md-3 justify-content-md-end">
          <input
            className="form-control blue searchBox"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <Link to="/search">
            <button
              className="btn p-1 ml-1 blue searchBox"
              type="submit"
              onClick={props.onSearch}
            >
              <img className="img-responsive" src={SearchIcon}></img>
            </button>
          </Link>
        </div>
        <div className="col-md-4  col-12 order-sm-4 order-md-2">
          <img
            className="img-responsive onHover"
            src={AddIcon}
            onClick={props.onCreateYourOwnListingClicked}
          ></img>
          <Link to="/create" onClick={props.onCreateYourOwnListingClicked}>
            Create Your Own Listing
          </Link>
        </div>
        {/* <div className="icontext col-1">
                                <div className="icon-wrap icon-xs bg-primary round text-light">
                                    <i className="fa fa-envelope"></i>
                                    <span className="notify">1</span>
                                </div>
                            </div> */}

        <div className="col-md-1 col-2 order-sm-1 order-md-4">
          <img
            className="img-responsive float-md-right onHover dropdown-toggle"
            data-toggle="dropdown"
            id="userIcon"
            src={UserIcon}
          ></img>

          <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">
            <li role="presentation">
              <a role="menuitem" tabIndex="-1" href="#">
                My Profile
              </a>
            </li>
            <li role="presentation">
              <a role="menuitem" tabIndex="-1" href="#">
                My Listings
              </a>
            </li>
            <li role="presentation">
              <a role="menuitem" tabIndex="-1" href="#">
                Reviews
              </a>
            </li>
            <li role="presentation" className="divider blue"></li>
            <li role="presentation">
              <a role="menuitem" tabIndex="-1" href="#">
                logout
              </a>
            </li>
          </ul>
        </div>

        {/* <ul className="nav nav-list dropdown-menu">
                                <li className="active"><a href="#"><i className="icon-fixed-width icon-home"></i> Home</a></li>
                                <li><a href="#"><i className="icon-fixed-width icon-book"></i> Library</a></li>
                                <li><a href="#"><i className="icon-fixed-width icon-pencil"></i> Applications</a></li>
                                <li><a href="#"><i className="icon-fixed-width icon-cogs"></i> Settings</a></li>
                            </ul> */}

        {/* <button className="btn" 
                            style={
                                {
                                    'background-color': 'DodgerBlue',
                                    'border': 'none',
                                    'color': 'white',
                                    'padding': '12px 16px',
                                    'width':'30px',
                                    'font-size': '20px',
                                    'cursor': 'pointer'
                                }
                            }
                            ><i className="fa fa-user icon-4x"></i></button> */}
      </form>
    </nav>
  </div>
);

NavBar.propTypes = {
  onCreateYourOwnListingClicked: PropTypes.func,
  onLogoClicked: PropTypes.func,
  onSearch: PropTypes.func
};

export default NavBar;
