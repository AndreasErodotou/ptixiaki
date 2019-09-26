import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from './Listing/Listing';
import FullListing from './FullListing/FullListing.js';
import NewListing from './NewListing/NewListing';
import "./Listings.css"




class Listings extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          listings: [],
          listingClickedId: null
        }
    }

    componentDidMount(){
        fetch('http://localhost:4567/api/listings')
        .then( response => response.json())
        .then( resJson => {
            // const listings= resJson.data.slice(0,3);
            this.setState({listings: resJson.data})
            console.log(resJson.data);
        });
    }

    listingClickedHandler(LID){
        this.setState({listingClickedId: LID});
    }

    

    

    render() {
        // console.log("state: "+JSON.stringify(this.state.listings["f48e2c2d-1506-4f5a-b75d-5254a4104e30"]));
        
        var content;
        
        
        
        const listings = this.state.listings.map(listing =>{
            return <Listing 
                        key={listing.LID} 
                        title={listing.title} 
                        imgsrc="" 
                        descr={listing.description} 
                        listingClicked={() => this.listingClickedHandler(listing.LID)}
                    />;
        });

        if(this.props.createNewListing){
            content = <NewListing/> 
        }else if(this.state.listingClickedId!==null){
            content = <FullListing key={this.state.listingClickedId} id={this.state.listingClickedId}/>
        }



        return (
            <div>
                <div className ="container" id="listingsContainer">
                    

                    <div className="row" id="listingsRow">
                        {listings}
                    </div>

                    {/* <div id="fullListing">
                        <FullListing id={this.state.listingClickedId}/>
                    </div> */}

                    <div id="newListing">
                        {content}
                        {/* <NewListing/> */}
                    </div> 
                </div>
            </div>
        );
    }
}

Listings.propTypes = {
    onShowListings : PropTypes.func
};

export default Listings;