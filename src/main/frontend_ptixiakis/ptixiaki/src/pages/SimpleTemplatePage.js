import React from "react";
import NavBar from "../components/NavBar";

const TemplatePage = props => {
  return (
    <div>
      <NavBar key="navbar" />
      {props.content}
    </div>
  );
};

export default TemplatePage;
