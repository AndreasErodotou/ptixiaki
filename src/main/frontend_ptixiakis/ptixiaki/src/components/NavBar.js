// import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import PropTypes from "prop-types";

import SearchIcon from "../assets/Search.svg";
import UserIcon from "../assets/User.svg";
import AddIcon from "../assets/Add.svg";

import { Link } from "react-router-dom";

import "./NavBar.css";

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

const NavBar = props => (
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
      </form>
    </nav>
  </div>
);

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
