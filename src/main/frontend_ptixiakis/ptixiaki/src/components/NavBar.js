// import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import SearchIcon from "../assets/Search.svg";
import UserIcon from "../assets/User.svg";
import AddIcon from "../assets/Add.svg";

import { Link } from "react-router-dom";

import "./NavBar.css";

import AuthContent from "../context/auth-context";
// import { LinkContainer } from "react-router-bootstrap";

// import {
//   Navbar,
//   NavItem,
//   Form,
//   FormControl,
//   Button,
//   Nav,
//   NavDropdown
// } from "react-bootstrap";

// import { Button } from "reactstrap";

import "./NavBar.css";

const deleteToken = () => {
  localStorage.removeItem("token");
};

const NavBar = props => {
  const [show, setShow] = useState(false);
  const menuClass = `dropdown-menu ${show ? " show" : ""}`;
  return (
    <div
      style={{ backgroundColor: "#E8F6F8" }}
      className="border position-sticky fixed-top"
    >
      <nav className="px-3 py-1">
        <form className=" form-inline">
          <Link to="/" className="col-md-2 col-6 order-sm-2 order-md-1">
            <h5 className="font-weight-bold pt_es onHover ">ServiceLink</h5>
          </Link>
          <div className="col-md-5  col-12 order-sm-3 order-md-3 justify-content-md-end">
            <input
              className="form-control blue searchBox"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <Link to="/search">
              <button className="btn p-1 ml-1 blue searchBox" type="submit">
                <img
                  className="img-responsive"
                  src={SearchIcon}
                  alt="SearchIcon"
                ></img>
              </button>
            </Link>
          </div>
          <div className="col-md-4  col-12 order-sm-4 order-md-2">
            <img
              className="img-responsive onHover"
              src={AddIcon}
              alt="AddIcon"
            ></img>

            <Link
              to="listings/create"
              onClick={props.onCreateYourOwnListingClicked}
            >
              Create Your Own Listing
            </Link>
          </div>

          <div className="col-md-1 col-2 order-sm-1 order-md-4">
            <img
              className="img-responsive float-md-right onHover dropdown-toggle"
              data-toggle="dropdown"
              id="dropdown-basic-button"
              src={UserIcon}
              onClick={() => setShow(!show)}
              alt="UserIcon"
            ></img>

            <ul className={menuClass} role="menu" aria-labelledby="menu1">
              <li role="presentation">
                <Link
                  className="link"
                  role="menuitem"
                  tabIndex="-1"
                  to="/user/profile"
                >
                  Profile
                </Link>
              </li>
              <li role="presentation">
                <Link
                  className="link"
                  role="menuitem"
                  tabIndex="-1"
                  to="/user/listings"
                >
                  Listings
                </Link>
              </li>
              <li role="presentation">
                <Link
                  className="link"
                  role="menuitem"
                  tabIndex="-1"
                  to="/user/reviews"
                >
                  Reviews
                </Link>
              </li>
              <li role="presentation">
                <Link
                  className="link"
                  role="menuitem"
                  tabIndex="-1"
                  to="/user/statistics"
                >
                  Statistics
                </Link>
              </li>
              <li role="presentation">
                <Link
                  className="link"
                  role="menuitem"
                  tabIndex="-1"
                  to="/user/timetable"
                >
                  Timetable
                </Link>
              </li>
              <li role="presentation" className="divider blue"></li>
              <li role="presentation">
                <Link
                  className="link"
                  role="menuitem"
                  tabIndex="-1"
                  to="/signin"
                  onClick={() => deleteToken()}
                >
                  logout
                </Link>
              </li>
            </ul>
          </div>
        </form>
      </nav>
    </div>
  );
};

// const NavBar = props => (
//   <Navbar bg="light" expand="lg">
//     <Navbar.Brand to="/search" href="#home">
//       ServiceLink
//     </Navbar.Brand>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="mr-auto">
//         <Nav.Link
//           href="/listings"
//           activeStyle={{
//             color: "white"
//           }}
//         >
//           Listings
//         </Nav.Link>
//         <Nav.Link href="/bids">Bids</Nav.Link>
//         <Nav.Link to="/reviews" href="/reviews">
//           reviews
//         </Nav.Link>
//         <Nav.Link href="/timetable">Timetable</Nav.Link>
//         <Nav.Link href="/statistics">Statistics</Nav.Link>
//         <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//           <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//           <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//           <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//           <NavDropdown.Divider />
//           <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//         </NavDropdown>
//       </Nav>
//       <Form inline>
//         <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//         <Button variant="outline-success">Search</Button>
//       </Form>
//     </Navbar.Collapse>
//   </Navbar>
// );

NavBar.propTypes = {
  onCreateYourOwnListingClicked: PropTypes.func,
  onLogoClicked: PropTypes.func,
  onSearch: PropTypes.func
};

export default NavBar;
