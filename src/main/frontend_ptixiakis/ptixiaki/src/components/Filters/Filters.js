import React,{useState,useEffect} from "react";
import "./FilterCategory";
import Category from "./FilterCategory";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";

const Filters = props => {
  let categories = null;
  let locations = null;

  const [filters, setFilters] = useState({
    categoriesChecked : [],
    locationsChecked : [],
    minPrice: null,
    maxPrice: null
  })

  let location = useLocation();
  // alert(JSON.stringify(useLocation()));

  const history = useHistory();

  const [putSymbolAnd, setSymbolAnd] = useState(window.location.href.indexOf('search')?true:false);

  useEffect(() => {
    console.log(JSON.stringify(filters));
    const query = createQuery();
    // window.location.href = window.location.href+query;
    history.push(location.search.split('&')[0] + query);
    console.log("Query: "+query);
  }, [filters]);

  const createQuery = () => {
    let query = "";
    if(filters.categoriesChecked.length > 0){
      query += ((putSymbolAnd)? "&":"") + "categories=" + filters.categoriesChecked.join(',');
      setSymbolAnd(true);
    }
    if(filters.locationsChecked.length > 0){
      query += ((putSymbolAnd)? "&":"") + "locations=" + filters.locationsChecked.join(',');
      setSymbolAnd(true);
    }
    if(filters.minPrice> 0){
      query += ((putSymbolAnd)? "&":"") + "min_price=" + filters.minPrice;
      setSymbolAnd(true);
    }
    if(filters.maxPrice> 0){
      query += ((putSymbolAnd)? "&":"") + "max_price=" + filters.maxPrice;
      setSymbolAnd(true);
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
    if(minPrice <= filters.maxPrice && minPrice >= 0){
      setFilters({...filters ,minPrice :  e.target.value});
    }else{
      e.target.value = filters.minPrice;
    }
  }

  const maxPriceChanged = (e) => {
    const maxPrice = e.target.value;
    if(maxPrice >= filters.minPrice && maxPrice >= 0){
      setFilters({...filters ,maxPrice :  e.target.value});
    }else{
      e.target.value = filters.maxPrice;
    }
  }

  if (props.categories !== null) {
    categories = props.categories.map((category, indexed) => (
      <Category key={indexed} category={category} onChangeMade={categoryChanged} />
    ));
  }
  if (props.locations !== null) {
    locations = props.locations.map((location, indexed) => (
      <Category key={indexed} category={location} onChangeMade={locationChanged}/>
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
