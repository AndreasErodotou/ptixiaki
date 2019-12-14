import React from "react";
import NavBar from "../../components/NavBar";
import Filters from "../../components/Filters/Filters";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Rating from "../../components/Rating";
// import UserIcon from "../../assets/User_sm.svg";

const FullTemplatePage = props => {
  return (
    <div>
      <NavBar key="navbar" />
      <div className="row px-0 mx-0">
        <div className="col-md-2 px-0">
          <Filters
            key="filters"
            categories={props.categories}
            locations={props.locations}
          />
        </div>
        <div className="col-10 pt-2">
          <div className="m-auto border-bottom border-info">
            <div className="h-50 py-2 mx-3">{props.contentTop}</div>
          </div>
          {props.contentDown}
        </div>
      </div>
    </div>
  );
};

export default FullTemplatePage;
