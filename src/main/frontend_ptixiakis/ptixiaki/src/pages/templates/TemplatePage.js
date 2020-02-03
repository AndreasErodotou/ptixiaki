import React from "react";
// import React, { useState, useContext } from "react";
import NavBar from "../../components/NavBar";
import Filters from "../../components/Filters/Filters";
// import AuthContext from "../context/auth-context";

const TemplatePage = props => {
  // const authContext = useContext(AuthContext);
  // const [profFilters, setProfFilters] = useState(null);
  return (
    <div>
      <NavBar key="navbar" />
      <div className="row px-0 mx-0">
        <div className="col-md-2 px-0">
          <Filters
            key="filters"
            categories={props.categories}
            locations={props.locations}
            profFilters= {props.profFilters}
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
