import React from "react";
import NavBar from "../components/NavBar";
import Filters from "../components/Filters/Filters";

const TemplatePage = props => {
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
          <div className="row m-auto">{props.content}</div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
