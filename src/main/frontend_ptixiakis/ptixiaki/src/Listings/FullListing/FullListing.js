import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FullListing.css'

class FullListing extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          user: {
              UID: "UID",
              LID: "f48e2c2d-1506-4f5a-b75d-5254a4104e30",
              title: "title",
              description: "description",
              location: "location",
              available_from: "Apr 5, 2019",
              available_until: "Apr 5, 2019",
              jobCategory: "Listing jobCategory",
              max_price: 10
          }
        }
    }
    

    render() {
        const data ="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggZD0iTTIzLjQyOSwxN0g0N2MwLjU1MiwwLDEtMC40NDcsMS0xcy0wLjQ0OC0xLTEtMUgyMy40MjljLTAuNTUyLDAtMSwwLjQ0Ny0xLDFTMjIuODc3LDE3LDIzLjQyOSwxN3oiIGZpbGw9IiMwMDAwMDAiLz4KCTxwYXRoIGQ9Ik0yMy40MjksMzJINDdjMC41NTIsMCwxLTAuNDQ3LDEtMXMtMC40NDgtMS0xLTFIMjMuNDI5Yy0wLjU1MiwwLTEsMC40NDctMSwxUzIyLjg3NywzMiwyMy40MjksMzJ6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cGF0aCBkPSJNMjMuNDI5LDQ3SDQ3YzAuNTUyLDAsMS0wLjQ0NywxLTFzLTAuNDQ4LTEtMS0xSDIzLjQyOWMtMC41NTIsMC0xLDAuNDQ3LTEsMVMyMi44NzcsNDcsMjMuNDI5LDQ3eiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTU5LDBIMUMwLjQ0OCwwLDAsMC40NDcsMCwxdjU4YzAsMC41NTMsMC40NDgsMSwxLDFoNThjMC41NTIsMCwxLTAuNDQ3LDEtMVYxQzYwLDAuNDQ3LDU5LjU1MiwwLDU5LDB6IE01OCw1OEgyVjJoNTZWNTh6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8cG9seWdvbiBwb2ludHM9IjEyLjUwMSwxOC40NzQgMTQuOTI5LDE3LjE5NyAxNy4zNTcsMTguNDc0IDE2Ljg5NCwxNS43NyAxOC44NTgsMTMuODU0IDE2LjE0MywxMy40NiAxNC45MjksMTEgMTMuNzE1LDEzLjQ2ICAgIDExLDEzLjg1NCAxMi45NjUsMTUuNzcgICIgZmlsbD0iIzAwMDAwMCIvPgoJPHBvbHlnb24gcG9pbnRzPSIxMi41MDEsMzMuNTU3IDE0LjkyOSwzMi4yOCAxNy4zNTcsMzMuNTU3IDE2Ljg5NCwzMC44NTMgMTguODU4LDI4LjkzOCAxNi4xNDMsMjguNTQzIDE0LjkyOSwyNi4wODMgICAgMTMuNzE1LDI4LjU0MyAxMSwyOC45MzggMTIuOTY1LDMwLjg1MyAgIiBmaWxsPSIjMDAwMDAwIi8+Cgk8cG9seWdvbiBwb2ludHM9IjEyLjUwMSw0OSAxNC45MjksNDcuNzIzIDE3LjM1Nyw0OSAxNi44OTQsNDYuMjk2IDE4Ljg1OCw0NC4zODEgMTYuMTQzLDQzLjk4NiAxNC45MjksNDEuNTI2IDEzLjcxNSw0My45ODYgICAgMTEsNDQuMzgxIDEyLjk2NSw0Ni4yOTYgICIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo";

        return (
            <div>
                <div className="container" id="simpleListing">
                    <div className="border row" id="innerListing">
                        <div className="border-right col-sm-4" id="pics">
                            <div className="row" id="allPicsdiv">
                                <img className="img-responsive pic col-sm-12" id="mainPic" src={data}  alt="pic"></img>

                                <img className="img-responsive pic col-sm-3" id="pic1"    src={data}  alt="pic"></img>
                                <img className="img-responsive pic col-sm-3" id="pic2"    src={data}  alt="pic"></img>
                                <img className="img-responsive pic col-sm-3" id="pic3"    src={data}  alt="pic"></img>
                                <img className="img-responsive pic col-sm-3" id="pic4"    src={data}  alt="pic"></img>
                            </div>
                        </div>
                        <div className="col-sm-8" id="info">
                            <h4 > {this.state.user.title}</h4>
                            <h6 ><small>{this.state.user.description}</small></h6>
                            <h6 id="category">{this.state.user.jobCategory}</h6>
                            <h6 id="loc"> location: {this.state.user.location} </h6>
                            <h6 id="posted_by"> posted by: {this.state.user.UID} </h6>
                            <h6 id="posted_from"> posted from: {this.state.user.available_from} </h6>
                            <h6 id="available"> available until: {this.state.user.available_until} </h6>
                            <h6 id="max_price"> price: {this.state.user.max_price} </h6>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FullListing.propTypes = {

};

export default FullListing;