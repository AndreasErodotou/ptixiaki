import React from 'react';
import PropTypes from 'prop-types';

const NewListingField = props => {
    return (
        <div className="form-group row">
            <label className="col-form-label col-sm-5 text-right" > <h6>{props.fieldName}:</h6> </label>
            <input className="form-control col-sm-6" type="text" id={props.fieldName} placeholder={props.fieldName} />
        </div>
    );
};

NewListingField.propTypes = {
    
};

export default NewListingField;