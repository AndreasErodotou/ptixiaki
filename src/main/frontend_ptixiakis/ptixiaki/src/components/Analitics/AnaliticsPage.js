import React, { Component } from "react";
import PropTypes from "prop-types";
import Analitics from "./Analitics";
import "./Analitics.css";

const AnaliticsPage = props => {
  return (
    <div className="mx-3 mt-2">
      <div className="d-flex justify-content-between">
        <div className="d-flex-column">
          <Analitics name="Listings" width="250px" height="110px" />
          <div className="d-flex justify-content-center">
            <div className="line"></div>
          </div>
        </div>
        <div>
          <Analitics name="Bids" width="250px" height="110px"></Analitics>
          <div className="invisible d-flex justify-content-center">
            <div className="line"></div>
          </div>
        </div>
        <div>
          <Analitics name="Reviews" width="250px" height="110px"></Analitics>
          <div className="invisible d-flex justify-content-center">
            <div className="line"></div>
          </div>
        </div>
        <div>
          <Analitics name="Money" width="250px" height="110px"></Analitics>
          <div className="invisible d-flex justify-content-center">
            <div className="line"></div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Analitics name="Listings" width="100%" height="280px"></Analitics>
      </div>
    </div>
  );
};

AnaliticsPage.propTypes = {};

export default AnaliticsPage;
