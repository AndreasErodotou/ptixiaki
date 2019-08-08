import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Listing from './Listing/Listing';
import FullListing from './FullListing/FullListing';
// import "./Listings.css"

class Listings extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          listings: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:4567/management/listings', {
        method: 'GET',
        // body: JSON.stringify(this.state.user)
        })
        .then( response => response.json())
        .then( resJson => {
            // const listings= resJson.data.slice(0,3);
            this.setState({listings: resJson.data})
            console.log(resJson.data);
        });
    }

    listingClicedHandler(LID){

    }

    render() {
        console.log("state: "+JSON.stringify(this.state.listings["f48e2c2d-1506-4f5a-b75d-5254a4104e30"]));
        // const listings = this.state.listings.map(listing =>{
        //     return <Listing 
        //                 key={listing.LID} 
        //                 title={listing.title} 
        //                 imgsrc="" 
        //                 descr={listing.description} 
        //                 listingCliced={() => this.listingClicedHandler(listing.LID)}
        //             />;
        // });

        return (
            <div className ="container" id="listingsContainer">
                {/* <div className="row" id="listingsRow"> */}
                    {/* <Listing title="t1" imgsrc="" descr="descr1" />
                    <Listing title="t2" imgsrc="" descr="descr2" />
                    <Listing title="t3" imgsrc="" descr="descr3" /> */}
                    {/* {listings}
                </div> */}
                <div id="fullListing">
                    <FullListing/>
                </div>
            </div>
        );
    }
}

Listings.propTypes = {
    onShowListings : PropTypes.func
};

export default Listings;