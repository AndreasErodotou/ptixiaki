import React from "react";
import Listing from "../components/Listings/Listing";
import FullListing from "./FullListingPage.js";
import Template from "./templates/TemplatePage";
import AuthContext from "../context/auth-context";

import axios from "axios";

// import { Route } from "react-router-dom";

class Listings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFullListing: false,
      listingClicked: [],
      listings: [],

      filterCategories: ["Electrician", "Plumber", "Engineer"],
      filterLocations: ["Heraklion","Nicosia", "Athens"],

      searchQuery : "",
      updated: false,
      profFilters: null
    };
  }
  
  static contextType = AuthContext;

  getListingsRequest (URL){
    axios
        .get(URL, {
          headers: {
            Authorization: this.context.token
          }
        })
        .then(response => {
          console.log(response);
          this.setState({
            listings: response.data.data
          });
        })
        .catch(error => {
          if (error.response === undefined) {
            // return this.props.history.push("/signin");
          }
          console.log(`error:${JSON.stringify(error)}`);
        });
  }

  async componentDidMount() {
    if(this.props.location.pathname.indexOf("/search")<0){

      if(this.props.location.pathname.indexOf("bids") > 0){
        this.getListingsRequest(`http://localhost:4567/api/users/${this.context.username}/listings`);
      }else{
        let url = `/users/${this.context.username}/listings`;
        let professionalFilters = null;
        if (this.context.accountType === "PROFESSIONAL") {
          let res = await axios.get(`http://localhost:4567/api/users/${this.context.username}`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
          let userDetails = await res.data.data;
          url = `/listings?categories=${userDetails.jobs.join(',', ',')}&locations=${userDetails.servedLoc.join(',', ',')}`;
          console.log("userDetails:" + userDetails);
          console.log("url:" + url);
          professionalFilters = {
            categories: userDetails.jobs,
            locations: userDetails.servedLoc
          };
          // this.props.history.push(`?categories=${userDetails.jobs.join(',',',')}&locations=${userDetails.servedLoc.join(',',',')}`);
        }
        axios
            .get(
                `http://localhost:4567/api${url}`,
                //   this.props.location.pathname === `/listings/${this.context.username}` ? url2 : url1
                // }`,
                {
                  headers: {
                    Authorization: this.context.token
                  }
                }
            )
            .then(response => {
              console.log(response);
              this.setState({
                listings: [...response.data.data],
                profFilters: professionalFilters
              });
            })
            .catch(error => {
              if (error.response === undefined) {
                // return this.props.history.push("/signin");
              }
              console.log(`error:${JSON.stringify(error)}`);
            });
      }
    }
  }

  componentDidUpdate() {
    const query=this.props.history.location.search;
    const prevQuery= this.state.searchQuery;
    let userUrl='';
    if(this.context.accountType==="CUSTOMER" && this.props.location.pathname!=="/search"){
      userUrl = `users/${this.context.username}/`;
    }
    if(query!=="" && (prevQuery === "" || prevQuery !== query)){
      axios
      .get(
        `http://localhost:4567/api/${userUrl}listings${this.props.history.location.search}` 
        ,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        console.log(response);
        this.setState({
          listings: [...response.data.data],
          searchQuery: query,
          updated: false
        });
      })
      .catch(error => {
        if (error.response === undefined) {
          // return this.props.history.push("/signin");
        }
        console.log(`error:${JSON.stringify(error)}`);
      });
    }
    else if(query==="" && !this.state.updated){
      // const url = `/users/${this.context.username}/listings`;
      axios
        .get(
          `http://localhost:4567/api/${userUrl}listings`,
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log(response);
          this.setState({
            listings: [...response.data.data],
            searchQuery: "",
            updated: true
          });
        })
        .catch(error => {
          if (error.response === undefined) {
            // return this.props.history.push("/signin");
          }
          console.log(`error:${JSON.stringify(error)}`);
        });
      }
  }
  

  listingClickedModalHandler(LID) {
    this.setState({
      ...this.state,
      showFullListing: true,
      listingClicked: this.state.listings.filter(listing => {
        return listing.LID === LID;
      })
    });
  }

  handlefullLClose() {
    this.setState({
      ...this.state,
      showFullListing: false
    });
  }

  render() {
    const path = this.props.location.pathname;
    let listings = this.state.listings.map(listing => {
      return (
        <Listing
          key={listing.LID}
          username={listing.UID}
          title={listing.title}
          imgsrc={listing.pics}
          descr={listing.description}
          maxPrice={listing.max_price}
          buttonTitle={
            this.context.accountType === "CUSTOMER"
            // this.props.location.pathname === "/user/listings"
              ? "Show Bids"
              : "Bid Now"
          }
          listingClicked={() => this.listingClickedModalHandler(listing.LID)}
        />
      );
    });

    const fullListing = this.state.showFullListing ? (
      <FullListing
        key="FullListing"
        listing={this.state.listingClicked}
        onHide={this.handlefullLClose.bind(this)}
        show={true}
        path={path}
      />
    ) : null;

    let content = [];
    // content.push(`loc:${JSON.stringify(this.props.location)}`);
    content.push(listings);
    content.push(fullListing);

    return (
      <Template
        categories={this.state.filterCategories}
        locations={this.state.filterLocations}
        content={content}
        profFilters={this.state.profFilters}
      />
    );
  }
}

export default Listings;
