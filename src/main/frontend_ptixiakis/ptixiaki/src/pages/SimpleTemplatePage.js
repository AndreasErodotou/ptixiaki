import React from "react";
import NavBar from "../components/NavBar";
import Filters from "../components/Filters/Filters";

const TemplatePage = props => {
  return (
    <div>
      <NavBar key="navbar" />
      {props.content}
    </div>
  );
};

export default TemplatePage;
