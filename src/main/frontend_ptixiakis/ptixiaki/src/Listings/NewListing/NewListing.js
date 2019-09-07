import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewListingField from './NewListingField'
import './NewListing.css'
import PickyDateTime from 'react-picky-date-time';

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
            picsLoaded          : false,
            
            // showPickyDateTime: true,
            // date: '30',
            // month: '01',
            // year: '2000',
            // hour: '03',
            // minute: '10',
            // second: '40',
            // meridiem: 'PM'
        }
    }

    
    picSelectedHandler = (event) => {
        ([...event.target.files]).map((file, index) =>{
            if(this.state.newListing.pics.length + (index+1) <= 5){
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
            }else{
                alert("You Can't Select Up To 5 Pictures!!");
            }
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

    removePicHandler = (pos) => {
        const pics = this.state.newListing.pics;
        pics.splice(pos,1);
        this.setState({
            newListing: {
                ...this.state.newListing,
                pics : [...pics]
            },
        })
    }

    postHandler = (event) => {
        let warnings="";
        if(document.getElementById("Title").value===""){
            warnings += "Please Fill The Title Field \n";
        }
        if(document.getElementById("Description").value===""){
            warnings += "Please Fill The Description Field \n";
        }
        if(document.getElementById("Location").value===""){
            warnings += "Please Fill The Location Field \n";
        }
        if(document.getElementById("Category").value===""){
            warnings += "Please Fill The Category Field \n";
        }
        if(document.getElementById("Max Price").value===""){
            warnings += "Please Fill The Max Price Field \n";
        }
        if(document.getElementById("Available From").value===""){
            warnings += "Please Fill The Available From Field \n";
        }
        if(document.getElementById("Available Until").value===""){
            warnings += "Please Fill The Available Until Field \n";
        }
        if(this.state.newListing.pics.length===0){
            warnings += "Please Add Some Photos";
        }

        if(warnings!==""){
            event.preventDefault();
            alert(warnings);
        }else{
            alert("Listing Posted");
        }
    }


    /* calendar functions */

    // onYearPicked(res) {
    //     const { year } = res;
    //     this.setState({ year: year});
    //   }
    
    //   onMonthPicked(res) {
    //     const { month, year } = res;
    //     this.setState({ year: year, month: month});
    //   }
    
    //   onDatePicked(res) {
    //     const { date, month, year } = res;
    //     this.setState({ year: year, month: month, date: date });
    //   }
    
    //   onResetDate(res) {
    //     const { date, month, year } = res;
    //     this.setState({ year: year, month: month, date: date });
    //   }
    
    //   onResetDefaultDate(res) {
    //     const { date, month, year } = res;
    //     this.setState({ year: year, month: month, date: date });
    //   }
    
    //   onSecondChange(res) {
    //     this.setState({ second: res.value });
    //   }
    
    //   onMinuteChange(res) {
    //     this.setState({ minute: res.value });
    //   }
    
    //   onHourChange(res) {
    //     this.setState({ hour: res.value });
    //   }
    
    //   onMeridiemChange(res) {
    //     this.setState({ meridiem: res });
    //   }
    
    //   onResetTime(res) {
    //     this.setState({
    //       second: res.clockHandSecond.value,
    //       minute: res.clockHandMinute.value,
    //       hour: res.clockHandHour.value
    //     });
    //   }
    
    //   onResetDefaultTime(res) {
    //     this.setState({
    //       second: res.clockHandSecond.value,
    //       minute: res.clockHandMinute.value,
    //       hour: res.clockHandHour.value
    //     });
    //   }
    
    //   onClearTime(res) {
    //     this.setState({
    //       second: res.clockHandSecond.value,
    //       minute: res.clockHandMinute.value,
    //       hour: res.clockHandHour.value
    //     });
    //   }
    
    //   // just toggle your outter component state to true or false to show or hide <PickyDateTime/>
    //   openPickyDateTime() {
    //     this.setState({showPickyDateTime: true});
    //   }
    
    //   onClose() {
    //     this.setState({showPickyDateTime: false});
    //   }
        

  /* End Of Calendar Functions */

    render() {
        
        let selectedPics = this.state.newListing.pics.map((pic,index)=>{
            if(index===0){
                return <img onClick={() => this.removePicHandler(index)} className="img-responsive pic col-sm-12 form-control-file" id="nl_mainPic" src={pic} key= {index}  alt="Select A Picture"></img>
            }else{
                return <img onClick={() => this.removePicHandler(index)}className="img-responsive pic col-sm-3"  src={pic}  key= {index} alt="Select A Picture"></img>
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
                            <form className="form" onSubmit={this.postHandler.bind(this)}>

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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div>
                {NewListingForm}
                {/* <PickyDateTime
                    size="xs"
                    mode={1}
                    show={this.state.showPickyDateTime}
                    locale="en-us"
                    defaultTime={this.state.hour+':'+this.state.minute+':'+this.state.second +' '+this.state.meridiem} // "HH:MM:SS AM"
                    defaultDate={this.state.month+'/'+this.state.date+'/'+this.state.year} // "MM/DD/YYYY"
                    onClose={() => this.setState({ showPickyDateTime: false })}
                    onYearPicked={res => this.onYearPicked(res)}
                    onMonthPicked={res => this.onMonthPicked(res)}
                    onDatePicked={res => this.onDatePicked(res)}
                    onResetDate={res => this.onResetDate(res)}
                    onResetDefaultDate={res => this.onResetDefaultDate(res)}
                    onSecondChange={res => this.onSecondChange(res)}
                    onMinuteChange={res => this.onMinuteChange(res)}
                    onHourChange={res => this.onHourChange(res)}
                    onMeridiemChange={res => this.onMeridiemChange(res)}
                    onResetTime={res => this.onResetTime(res)}
                    onResetDefaultTime={res => this.onResetDefaultTime(res)}
                    onClearTime={res => this.onClearTime(res)}
                /> */}
            </div>
        );
    }
}

NewListing.propTypes = {

};

export default NewListing;