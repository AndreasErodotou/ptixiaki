import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FullListing.css'

class FullListing extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          listing: null
        }
    }
    

    componentDidUpdate(){
        if(this.props.id){
            if(!this.state.listing || (this.state.listing && this.props.id !== this.state.listing.LID)){
                fetch('http://localhost:4567/management/listings?LID='+ this.props.id)
                .then( response => response.json())
                .then( resJson => {
                    console.log(resJson.data);
                    this.setState({listing : resJson.data});
                })
                .catch( error => console.log(error));
            }
        }
        
    }

    render() {
        const data ="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggZD0iTTIzLjQyOSwxN0g0N2MwLjU1MiwwLDEtMC40NDcsMS0xcy0wLjQ0OC0xLTEtMUgyMy40MjljLTAuNTUyLDAtMSwwLjQ0Ny0xLDFTMjIuODc3LDE3LDIzLjQyOSwxN3oiIGZpbGw9IiMwMDAwMDAiLz4KCTxwYXRoIGQ9Ik0yMy40MjksMzJINDdjMC41NTIsMCwxLTAuNDQ3LDEtMXMtMC40NDgtMS0xLTFIMjMuNDI5Yy0wLjU1MiwwLTEsMC40NDctMSwxUzIyLjg3NywzMiwyMy40MjksMzJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMjMuNDI5LDQ3SDQ3YzAuNTUyLDAsMS0wLjQ0NywxLTFzLTAuNDQ4LTEtMS0xSDIzLjQyOWMtMC41NTIsMC0xLDAuNDQ3LTEsMVMyMi44NzcsNDcsMjMuNDI5LDQ3eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTU5LDBIMUMwLjQ0OCwwLDAsMC40NDcsMCwxdjU4YzAsMC41NTMsMC40NDgsMSwxLDFoNThjMC41NTIsMCwxLTAuNDQ3LDEtMVYxQzYwLDAuNDQ3LDU5LjU1MiwwLDU5LDB6IE01OCw1OEgyVjJoNTZWNTh6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cG9seWdvbiBwb2ludHM9IjEyLjUwMSwxOC40NzQgMTQuOTI5LDE3LjE5NyAxNy4zNTcsMTguNDc0IDE2Ljg5NCwxNS43NyAxOC44NTgsMTMuODU0IDE2LjE0MywxMy40NiAxNC45MjksMTEgMTMuNzE1LDEzLjQ2ICAgIDExLDEzLjg1NCAxMi45NjUsMTUuNzcgICIgZmlsbD0iIzAwMDAwMCIvPgoJPHBvbHlnb24gcG9pbnRzPSIxMi41MDEsMzMuNTU3IDE0LjkyOSwzMi4yOCAxNy4zNTcsMzMuNTU3IDE2Ljg5NCwzMC44NTMgMTguODU4LDI4LjkzOCAxNi4xNDMsMjguNTQzIDE0LjkyOSwyNi4wODMgICAgMTMuNzE1LDI4LjU0MyAxMSwyOC45MzggMTIuOTY1LDMwLjg1MyAgIiBmaWxsPSIjMDAwMDAwIi8+Cgk8cG9seWdvbiBwb2ludHM9IjEyLjUwMSw0OSAxNC45MjksNDcuNzIzIDE3LjM1Nyw0OSAxNi44OTQsNDYuMjk2IDE4Ljg1OCw0NC4zODEgMTYuMTQzLDQzLjk4NiAxNC45MjksNDEuNTI2IDEzLjcxNSw0My45ODYgICAgMTEsNDQuMzgxIDEyLjk2NSw0Ni4yOTYgICIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo";

        let fullListing = null;

        

        
        
        if(this.props.id && this.state.listing){

            let otherPics = this.state.listing.pics.map((pic, indexed) =>{
                return <img key= {indexed}className="img-responsive pic col-sm-3"  src={pic}  alt={"pic"+indexed}></img>
            });

            fullListing=(
                <div>
                    <div className="container" id="simpleFullListing">
                        <div className="border border-info row" id="fullListing">
                            <div className="border-right border-info col-sm-4" id="pics">
                                <div className="row" id="allPicsdiv">
                                    <img className="img-responsive pic col-sm-12" id="mainPic" src={data}  alt="pic"></img>

                                    {otherPics}

                                </div>
                            </div>
                            <div className="col-sm-8" id="info">
                                <h4 > {this.state.listing.title}</h4>
                                <h6 ><small>{this.state.listing.description}</small></h6>
                                <h6 id="category">{this.state.listing.jobCategory}</h6>
                                <h6 id="loc"> location: {this.state.listing.location} </h6>
                                <h6 id="posted_by"> posted by: {this.state.listing.UID} </h6>
                                <h6 id="posted_from"> posted from: {this.state.listing.available_from} </h6>
                                <h6 id="available"> available until: {this.state.listing.available_until} </h6>
                                <h6 id="max_price"> price: {this.state.listing.max_price} </h6>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
            // <div className="container">
            //     <div className="modal fade" id="myModal" role="dialog">
            //         <div className="modal-dialog">

            //             <div className="modal-content">
            //                 <div className="modal-header">
            //                     <button type="button" className="close" data-dismiss="modal">&times;</button>
            //                     <h4 className="modal-title">Modal Header</h4>
            //                 </div>
            //                 <div className="modal-body">
            //                     <p>Some text in the modal.</p>
            //                 </div>
            //                 <div className="modal-footer">
            //                     <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            //                 </div>
            //             </div>
                    
            //         </div>
            //     </div>
            // </div>

        return (
            fullListing
        );
    }
}

FullListing.propTypes = {
    id: PropTypes.string
};

export default FullListing;