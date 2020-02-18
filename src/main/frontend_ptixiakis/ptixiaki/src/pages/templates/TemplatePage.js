import React, {useState} from "react";
// import React, { useState, useContext } from "react";
import NavBar from "../../components/NavBar";
import Filters from "../../components/Filters/Filters";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useHistory, useLocation } from "react-router-dom";
// import { useState } from "react";
// import AuthContext from "../context/auth-context";

const TemplatePage = props => {
  // const authContext = useContext(AuthContext);
  const [order, setOrder] = useState("all");

  const orderClicked = (value) => {
    setOrder(value);
  }

  let location = useLocation();

  const template = <>
    <div>
      <NavBar key="navbar"/>
      <div className="row px-0 mx-0">
        <div className="col-md-2 px-0">
          <Filters
              key="filters"
              categories={props.categories}
              locations={props.locations}
              profFilters={props.profFilters}
              order={order}
          />
        </div>
        <div className="col-10 pt-2">
          <div className="row m-auto">
          {(location.pathname.indexOf("listings") > 0)?
            <DropdownButton
                id="dropdown-basic-button"
                title={`Listings ${order ? `: ${order}` : ''}`}
                size="sm"
                className="justify-content-end offset-9"

                // disabled
            >
              <Dropdown.Item onClick={() => orderClicked("posted-today")}>Posted
                Today</Dropdown.Item>
              <Dropdown.Item onClick={() => orderClicked("ending-soon")}>Ending
                Soon</Dropdown.Item>
              <Dropdown.Item onClick={() => orderClicked("all")}>All</Dropdown.Item>

            </DropdownButton>
          : null}
            {props.content}
          </div>
        </div>
      </div>
    </div>
  </>;
  return template;

};

export default TemplatePage;
