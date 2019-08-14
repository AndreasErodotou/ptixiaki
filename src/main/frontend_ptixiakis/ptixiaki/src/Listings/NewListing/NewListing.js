import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewListingField from './NewListingField'
import './NewListing.css'

class NewListing extends Component {
    constructor(props){
        super(props);

        this.state={
            newListing: {
                UID             : "",
                title           : "",
                description     : "",
                pics            : [],
                available_from  : "",
                available_until : "",
                location        : "",
                jobCategory     : "",
                max_price       : ""
            },
            picsLoaded          : false
        }
    }

    
    picSelectedHandler = (event) => {
        ([...event.target.files]).map((file) =>{
            this.getBase64(file, (result) => {
                let picBase64 = result;
                console.log("pic Base64 type: "+typeof picBase64);
                this.setState(
                    {
                        newListing :
                        { 
                            ...this.state.newListing, 
                            pics : [...this.state.newListing.pics, picBase64]
                        }
                    }
                );
            });
        });
    }

    getBase64(file, callback) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload =  () => {
            callback(reader.result)
        };
        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }

    // componentDidUpdate(){
    
    // }

    render() {
        
        let selectedPics = this.state.newListing.pics.map((pic,indexed)=>{
            if(indexed===0){
                return <img className="img-responsive pic col-sm-12 form-control-file" id="nl_mainPic" src={pic}  alt="Select Picture"></img>
            }else{
                return <img className="img-responsive pic col-sm-3"  src={pic}  key= {indexed} alt="Select Picture"></img>
            }
        });

        let NewListingForm=(
            <div>
                <div className="container" id="simpleFullListing">
                    <div className="border border-info row" id="fullListing">
                        <div className="border-right border-info col-sm-5" id="nl_pics">
                            <div className="row" id="nl_allPicsdiv">
                                {/* <img className="img-responsive pic col-sm-12 form-control-file" id="nl_mainPic" src={data}  alt="Select Picture"></img>

                                <img className="img-responsive pic col-sm-3"  src={data}  alt="Select Picture"></img>
                                <img className="img-responsive pic col-sm-3"  src={data}  alt="Select Picture"></img>
                                <img className="img-responsive pic col-sm-3"  src={data}  alt="Select Picture"></img>
                                <img className="img-responsive pic col-sm-3"  src={data}  alt="Select Picture"></img> */}
                                {selectedPics}

                                <form className="md-form">
                                    <div className="file-field">
                                        <div className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0">
                                            <span>Select Pictures
                                            <input 
                                                className="custom-file-input" 
                                                type="file" multiple 
                                                onChange={(event) => this.picSelectedHandler(event)}
                                            />
                                            </span>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="col-sm-7" id="nl_info">

                            <NewListingField fieldName="Title"/>
                            <NewListingField fieldName="Description"/>
                            <NewListingField fieldName="Location"/>
                            <NewListingField fieldName="Category"/>
                            <NewListingField fieldName="Max Price"/>
                            <NewListingField fieldName="Available From"/>
                            <NewListingField fieldName="Available Until"/>
                            
                            <div className="form-row">
                                <div className="col-md-9"></div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0">Post</button>
                                    </div>
                                </div>
                            </div> 

                            {/* <h4 > Title: {this.state.newListing.title}</h4>
                            <h6 ><small> Description: {this.state.newListing.description}</small></h6>
                            <h6 id="loc"> Location: {this.state.newListing.location} </h6>
                            <h6 id="category"> Category: {this.state.newListing.jobCategory}</h6>
                            <h6 id="max_price"> Max Price: {this.state.newListing.max_price} </h6>
                            <h6 id="available_from"> Available From: {this.state.newListing.available_from} </h6>
                            <h6 id="available_until"> Available Until: {this.state.newListing.available_until} </h6> */}
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {NewListingForm}
            </div>
        );
    }
}

NewListing.propTypes = {

};

export default NewListing;