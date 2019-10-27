import React from 'react';
import PropTypes from 'prop-types';

const Category = props => {
    return (
        <label className="form-check">
            <input className="form-check-input" type="checkbox" value=""/>
            <span className="form-check-label">
                {props.category}
            </span>
        </label>
    );
};

Category.propTypes = {
    
};

export default Category;