import React,{useState,useEffect} from "react";
import "./FilterCategory";
import Category from "./FilterCategory";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";

const Filters = props => {
  let categories = null;
  let locations = null;
  const [profFiltersUpdated, setProfFiltersUpdated] = useState(false);

  const [filters, setFilters] = useState({
    categoriesChecked : [],
    locationsChecked : [],
    starsChecked : [],
    withReview: false,
    withoutReview: false,
    activeListings:false,
    nonActiveListings:false,
    minPrice: 0,
    maxPrice: 0
  });

  let location = useLocation();

  const history = useHistory();

  useEffect(() => {
    console.log(JSON.stringify(filters) );
    const query = createQuery();

    if(location.pathname.indexOf("search") > 0){
      history.push(location.search.split('&')[0] + query);
    }
    else{
      history.push('?' +query);
    }
    console.log("Query: "+query);
  }, [filters,props.profFilters,props.order]);

  const createQuery = () => {
    let query = "";
    let putSymbolAnd = location.pathname.indexOf("search")>0;

    if((props.profFilters !==null && props.profFilters !==undefined) && !profFiltersUpdated &&!putSymbolAnd){
      const profCategories = props.profFilters.categories.map(category => category.charAt(0).toUpperCase() + category.slice(1).toLowerCase())
      const profLocations = props.profFilters.locations.map(location => location.charAt(0).toUpperCase() + location.slice(1).toLowerCase())

      filters.categoriesChecked = profCategories;
      filters.locationsChecked = profLocations;
      setProfFiltersUpdated(true);
    }
    if(filters.categoriesChecked.length > 0){
      query += ((putSymbolAnd)? "&":"") + "categories=" + filters.categoriesChecked.join(',');
      putSymbolAnd=true;
    }
    if(filters.locationsChecked.length > 0){
      query += ((putSymbolAnd)? "&":"") + "locations=" + filters.locationsChecked.join(',');
      putSymbolAnd=true;
    }
    if(filters.starsChecked.length > 0){
      query += ((putSymbolAnd)? "&":"") + "stars=" + filters.starsChecked.join(',');
      putSymbolAnd=true;
    }
    if(filters.withoutReview !== false && !(filters.withoutReview && filters.withReview)){
      query += ((putSymbolAnd)? "&":"") + "without_review=" + filters.withoutReview;
      putSymbolAnd=true;
    }
    if(filters.withReview !== false && !(filters.withoutReview && filters.withReview)){
      query += ((putSymbolAnd)? "&":"") + "with_review=" + filters.withReview;
      putSymbolAnd=true;
    }
    if(filters.activeListings !== false && !(filters.nonActiveListings && filters.activeListings)){
      query += ((putSymbolAnd)? "&":"") + "active_listings=true";
      putSymbolAnd=true;
    }
    if(filters.nonActiveListings !== false && !(filters.nonActiveListings && filters.activeListings)){
      query += ((putSymbolAnd)? "&":"") + "active_listings=false";
      putSymbolAnd=true;
    }
    if(filters.minPrice> 0){
      query += ((putSymbolAnd)? "&":"") + "min_price=" + filters.minPrice;
      putSymbolAnd=true;
    }
    if(filters.maxPrice> 0){
      query += ((putSymbolAnd)? "&":"") + "max_price=" + filters.maxPrice;
      putSymbolAnd=true;
    }
    if(props.order !=="all"){
      query += ((putSymbolAnd)? "&":"") + "order=" + props.order;
      // putSymbolAnd=true;
    }
    return query
  };

  const categoryChanged = (e) => {
    if(e.target.checked){
      setFilters({...filters ,categoriesChecked : [...filters.categoriesChecked ,e.target.value]});
    }else{
      setFilters({...filters ,categoriesChecked : filters.categoriesChecked.filter((category)=> category !== e.target.value)});
    }
  };

  const locationChanged = (e) => {
    if(e.target.checked){
      setFilters({...filters ,locationsChecked : [...filters.locationsChecked, e.target.value]})
    }else{
      setFilters({...filters ,locationsChecked : filters.locationsChecked.filter( location => location !== e.target.value)});
    }
  };

  const starsChanged = (e) => {
    if(e.target.checked){
      setFilters({...filters ,starsChecked : [...filters.starsChecked, e.target.value.split(' ')[0]]})
    }else{
      setFilters({...filters ,starsChecked : filters.starsChecked.filter( star => star !== e.target.value.split(' ')[0])});
    }
  };

  const withoutReviewChanged = (e) => {
    if(e.target.checked){
      setFilters({...filters ,withoutReview : true})
    }else{
      setFilters({...filters ,withoutReview : false});
    }
  };

  const withReviewChanged = (e) => {
    if(e.target.checked){
      setFilters({...filters ,withReview : true})
    }else{
      setFilters({...filters ,withReview : false});
    }
  };

  const activeListingsChanged = (e) => {
    if(e.target.checked){
      setFilters({...filters ,activeListings : true})
    }else{
      setFilters({...filters ,activeListings : false});
    }
  };

  const nonActiveListingsChanged = (e) => {
    if(e.target.checked){
      setFilters({...filters ,nonActiveListings : true})
    }else{
      setFilters({...filters ,nonActiveListings : false});
    }
  };

  const minPriceChanged = (e) => {
    const minPrice= e.target.value;
    if(parseInt(minPrice) <= parseInt(filters.maxPrice) && minPrice >= 0){
        setFilters({...filters ,minPrice :  e.target.value});
    }
    else if(minPrice===''){
        setFilters({...filters ,minPrice :  0});
    }
    else{
        e.target.value = filters.minPrice;
    }
  };

  const maxPriceChanged = (e) => {
    const maxPrice = e.target.value;
    if(parseInt(maxPrice) >= parseInt(filters.minPrice) && maxPrice >= 0){
      setFilters({...filters ,maxPrice :  e.target.value});
    }
    else if(maxPrice===''){
        setFilters({...filters ,maxPrice :  0});
    }else{
      e.target.value = filters.maxPrice;
    }
  };

  if (props.categories !== null) {
    categories = props.categories.map((category, indexed) => (
      <Category key={indexed} category={category} onChangeMade={categoryChanged} checked={filters.categoriesChecked.indexOf(category) > -1}/>
    ));
  }
  if (props.locations !== null) {
    locations = props.locations.map((location, indexed) => (
      <Category key={indexed} category={location} onChangeMade={locationChanged} checked={filters.locationsChecked.indexOf(location) > -1}/>
    ));
  }

  const listingFilters = (<div className="sticky-top">

      <article className="card-group-item" key={"listings"}>
        <header className="card-header">
          <h6 className="title">Listings Status</h6>
        </header>
        <div className="card-body">
          <form>
            <Category category={`Active`} onChangeMade={activeListingsChanged}/>
            <Category category={`Expired`} onChangeMade={nonActiveListingsChanged}/>
          </form>
        </div>
      </article>

        <article className="card-group-item">
          <header className="card-header">
            <h6 className="title">Category </h6>
          </header>
          <div className="card-body">
            <form>
              {categories}
              <a href="#show-more">Show more</a>
            </form>
          </div>
        </article>

        <article className="card-group-item">
          <header className="card-header">
            <h6 className="title">Location </h6>
          </header>
          <div className="card-body">
            <form>
              {locations}
              <a href="#show-more">Show more</a>
            </form>
          </div>
        </article>

        <article className="card-group-item">
          <header className="card-header">
            <h6 className="title">Max Price </h6>
          </header>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Min (€)</label>
                <input
                    type="number"
                    className="form-control"
                    id="inputEmail4"
                    placeholder=""
                    onChange = {minPriceChanged}
                />
              </div>
              <div className="form-group col-md-6 text-right">
                <label>Max (€)</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    onChange = {maxPriceChanged}
                />
              </div>
            </div>
          </div>
        </article>


        {/* <h4 className="onHoverBluePointer">Posted Today</h4>
          <h4 className="onHoverBluePointer">Ending Soon</h4> */}

  </div>);

  const ratingFilters = (
      <div className="sticky-top">
        <article className="card-group-item" key={"Jobs Done"}>
          <header className="card-header">
            <h6 className="title">Jobs Done </h6>
          </header>
          <div className="card-body">
            <form>
              <Category category={`With Review`} onChangeMade={withReviewChanged}/>
              <Category category={`Without Review`} onChangeMade={withoutReviewChanged}/>
            </form>
          </div>
        </article>

        <article className="card-group-item" key={"Min Price"}>
          <header className="card-header">
            <h6 className="title">Max Price </h6>
          </header>
          <div className="card-body">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Min (€)</label>
                <input
                    type="number"
                    className="form-control"
                    id="inputEmail4"
                    placeholder=""
                    onChange = {minPriceChanged}
                />
              </div>
              <div className="form-group col-md-6 text-right" key={"Max Price"}>
                <label>Max (€)</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder=""
                    onChange = {maxPriceChanged}
                />
              </div>
            </div>
          </div>
        </article>
      </div>
);
  const profileFilters = (
      <div className="sticky-top">
        <article className="card-group-item">
          <header className="card-header">
            <h6 className="title">Ratings </h6>
          </header>
          <div className="card-body">
            <form>
              {[1,2,3,4,5].map((star, indexed) => (
                  <Category key={indexed} category={`${star} star`} onChangeMade={starsChanged}/>
              ))}
            </form>
          </div>
        </article>
      </div>
  );

  const path=location.pathname;

  let content = null;
  if (path.indexOf("reviews") > 0){
    content = ratingFilters;
  }else if((path.indexOf("listings") > 0) || path.indexOf("bids") > 0 || (path.indexOf("search") > 0)){
    content = listingFilters;
  }else{
    content = profileFilters;
  }

  return (
    <aside className="filters">
      <div className="card" style={{ borderRadius: "0rem" }}>
        {content}
      </div>
    </aside>
  );
};

Filters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  locations: PropTypes.arrayOf(PropTypes.string)
};

export default Filters;
