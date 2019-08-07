import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from './Listing'

class Listings extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          listings: null 
        }
    }

    render() {
        return (
            <div className ="container">
                <div className="row mx-md-n5">
                    <Listing title="t1" imgsrc="" descr="descr1" />
                    <Listing title="t2" imgsrc="" descr="descr2" />
                    <Listing title="t3" imgsrc="" descr="descr3" />
                </div>
            </div>
        );
    }
}

Listings.propTypes = {
    
};

export default Listings;