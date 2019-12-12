import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
// import Form from "react-bootstrap/Form";

const NewListingField = props => {
  let tmpInput = null;
  if (props.type === "textarea") {
    tmpInput = (
      <textarea
        className="form-control col-8"
        type={props.type}
        id={props.fieldName}
        placeholder={props.fieldName}
      />
    );
  } else if (props.type === "dropdown") {
    tmpInput = (
      <Select
        className="form-control col-8 m-0 p-0"
        type={props.type}
        options={props.options}
        id={props.fieldName}
        placeholder={props.fieldName}
        onChange={props.onChange}
      />
    );
  } else {
    if (props.type === "date") {
      tmpInput = (
        <div className="d-flex col-8 pl-0">
          <input
            className="form-control col-6 mr-3"
            type={props.type}
            id={props.fieldName}
            placeholder={props.fieldName}
            onChange={props.onChange}
          />
          <input
            className="form-control col-6"
            type="time"
            id={props.fieldName}
            placeholder={props.fieldName}
          />
        </div>
      );
    } else {
      tmpInput = (
        <input
          className="form-control col-8"
          type={props.type}
          id={props.fieldName}
          placeholder={props.fieldName}
        />
      );
    }
  }

  return (
    <div className="form-group row">
      <label className="col-form-label col-sm-3">
        <h6>{props.fieldName}:</h6>
      </label>

      {tmpInput}
    </div>
  );
};

NewListingField.propTypes = {
  fieldName: PropTypes.string
};

export default NewListingField;
