import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListingsApi extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            listings: [],
            newListing: {},
            fullListing: {}
        };
    }

    createYourOwnListingClickedHandler(){
        this.props.createNewListing
        this.setState({
            ...this.state,
            createNewListing: true
        });
    }
    
    searchClickedHandler(){

    }

    logoClickedHandler(){

    }

    accountIconClickedHandler(){
        
    }

    categoryClickedHandler(){

    }

    locationClickedHandler(){

    }

    priceClickedHandler(){

    }

    postedTodayClickedHandler(){

    }

    endingSoonClickedHandler(){

    }


    render() {
        return (
            <div>
                
            </div>
        );
    }
}

ListingsApi.propTypes = {

};

export default ListingsApi;