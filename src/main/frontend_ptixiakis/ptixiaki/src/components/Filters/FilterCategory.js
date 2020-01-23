import React from "react";
import PropTypes from "prop-types";

const Category = props => {
  return (
    <label className="form-check">
      <input className="form-check-input" type="checkbox" value={props.category} onChange ={props.onChangeMade} />
      <span className="form-check-label">{props.category}</span>
    </label>
  );
};

Category.propTypes = {
  category: PropTypes.string
};

export default Category;
