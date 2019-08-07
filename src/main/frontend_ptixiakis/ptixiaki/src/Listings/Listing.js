import React from 'react';
import PropTypes from 'prop-types';

const Listing = props => {
    return (
        <div className="border p-4 col px-md-5 mt-md-5 mx-md-2">
            <h4>{props.title}</h4>
            <img src={props.imgsrc} className="img-rounded" alt="pic"></img>
            <h6><small>{props.descr}</small></h6>
        </div>
    );
};

Listing.propTypes = {
    title : PropTypes.string,
    imgsrc: PropTypes.string,
    descr : PropTypes.string
};

export default Listing;