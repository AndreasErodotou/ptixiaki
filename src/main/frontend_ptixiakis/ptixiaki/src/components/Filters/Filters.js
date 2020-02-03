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
    minPrice: 0,
    maxPrice: 0
  })

  let location = useLocation();
  // alert(JSON.stringify(useLocation()));

  const history = useHistory();

  useEffect(() => {
    console.log(JSON.stringify(filters) );
    const query = createQuery();
    // window.location.href = window.location.href+query;
    if(location.pathname.indexOf("search") > 0){
      history.push(location.search.split('&')[0] + query);
    }
    else{
      history.push('?' +query);
      // location.search = '?'+query;
    }
    console.log("Query: "+query);
  }, [filters,props.profFilters]);

  const createQuery = () => {
    let query = "";
    let putSymbolAnd = location.pathname.indexOf("search")===1?true:false;
    if((props.profFilters !==null && props.profFilters !==undefined) && !profFiltersUpdated &&!putSymbolAnd){
      // alert(JSON.stringify(props.profFilters));
      // userDetails.jobs.charAt(0).toUpperCase() + userDetails.jobs.slice(1)
      const profCategories = props.profFilters.categories.map(category => category.charAt(0).toUpperCase() + category.slice(1).toLowerCase())
      const profLocations = props.profFilters.locations.map(location => location.charAt(0).toUpperCase() + location.slice(1).toLowerCase())
      
      filters.categoriesChecked = profCategories;
      filters.locationsChecked = profLocations;
      putSymbolAnd=true;
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
    if(filters.minPrice> 0){
      query += ((putSymbolAnd)? "&":"") + "min_price=" + filters.minPrice;
      putSymbolAnd=true;
    }
    if(filters.maxPrice> 0){
      query += ((putSymbolAnd)? "&":"") + "max_price=" + filters.maxPrice;
      putSymbolAnd=true;
    }
    return query
  }

  const categoryChanged = (e) => {
    if(e.target.checked){
      setFilters({...filters ,categoriesChecked : [...filters.categoriesChecked ,e.target.value]});
    }else{
      setFilters({...filters ,categoriesChecked : filters.categoriesChecked.filter((category)=> category !== e.target.value)});
    }
  }

  const locationChanged = (e) => {
    if(e.target.checked){
      setFilters({...filters ,locationsChecked : [...filters.locationsChecked, e.target.value]})
    }else{
      setFilters({...filters ,locationsChecked : filters.locationsChecked.filter( location => location !== e.target.value)});
    }
  }

  const minPriceChanged = (e) => {
    const minPrice= e.target.value;
    if(parseInt(minPrice) <= parseInt(filters.maxPrice) && minPrice >= 0){
      setFilters({...filters ,minPrice :  e.target.value});
    }else{
      e.target.value = filters.minPrice;
    }
  }

  const maxPriceChanged = (e) => {
    const maxPrice = e.target.value;
    if(parseInt(maxPrice) >= parseInt(filters.minPrice) && maxPrice >= 0){
      setFilters({...filters ,maxPrice :  e.target.value});
    }else{
      e.target.value = filters.maxPrice;
    }
  }

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

  return (
    <div className="sticky-top">
      <aside className="filters">
        <div className="card" style={{ borderRadius: "0rem" }}>
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

          <h4 className="onHoverBluePointer">Posted Today</h4>
          <h4 className="onHoverBluePointer">Ending Soon</h4>
        </div>
      </aside>
    </div>
  );
};

Filters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  locations: PropTypes.arrayOf(PropTypes.string)
};

export default Filters;
