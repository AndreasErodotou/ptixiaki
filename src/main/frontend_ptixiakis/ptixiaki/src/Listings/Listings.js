import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Listing from './Listing/Listing';
import FullListing from './FullListing/FullListing.js';
import NewListing from './NewListing/NewListing';
import "./Listings.css"

import SearchIcon from '../Icons/Search.svg'

class Listings extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          listings: [],
          listingClickedId: null
        }
    }

    componentDidMount(){
        fetch('http://localhost:4567/management/listings')
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
        const listings = this.state.listings.map(listing =>{
            return <Listing 
                        key={listing.LID} 
                        title={listing.title} 
                        imgsrc="" 
                        descr={listing.description} 
                        listingClicked={() => this.listingClickedHandler(listing.LID)}
                    />;
        });

        return (
            <div className="">
                <div className="border">
                    <nav className="navbar navbar-light bg-light">
                        <a className="navbar-brand">ServiceLink</a>
                        <form className="form-inline">
                            
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </nav>
                    {/* <div className="m-3">
                        
                        <h4>ServiceLink!!
                            <span>
                                <input className= "ml-5" type="text" placeholder="Search"></input>
                                <img className= "mb-2 p-1 border img-responsive" src={SearchIcon} ></img>
                            </span>
                        </h4>    
                        
                    </div> */}
                    
                </div>
                {/* <div className="topnav">
                    <a className="active" href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <input type="text" placeholder="Search.."></input>
                </div>  */}
            <div className ="container" id="listingsContainer">
                {/* <div>
                    test    
                </div> */}
                <div className="row" id="listingsRow">
                     {listings}
                </div>

                <div id="fullListing">
                    <FullListing id={this.state.listingClickedId}/>
                </div>

                <div id="newListing">
                    <NewListing/>
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