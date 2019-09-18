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
                {/* <div className="border">

                    <nav className="px-2">
                        
                        <form className=" form-inline row">
                            <a href="#" className="col-2 font-weight-bold">ServiceLink</a>
                            <div className="col-4">
                                <input className="form-control blue searchBox" type="search" placeholder="Search" aria-label="Search"></input>
                                <button className="btn p-1 ml-1 blue searchBox" type="submit"><img className="img-responsive" src={SearchIcon}></img></button>
                            </div>
                            <div className="col-5">
                                <img className="img-responsive" src={AddIcon}></img>
                                <a href="#">Create Your Own Listing</a>
                            </div>
                            <div className="col-1">
                                <img className="img-responsive float-md-right" id="userIcon" src={UserIcon}></img>
                            </div> 
                        </form>
                        
                    </nav>
                    
                </div> */}

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