import React from "react";
import "./FilterCategory";
import Category from "./FilterCategory";
import PropTypes from "prop-types";

const Filters = props => {
  let categories = null;
  let locations = null;
  if (props.categories !== null) {
    categories = props.categories.map((category, indexed) => (
      <Category key={indexed} category={category} />
    ));
  }
  if (props.locations !== null) {
    locations = props.locations.map((location, indexed) => (
      <Category key={indexed} category={location} />
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
                  />
                </div>
                <div className="form-group col-md-6 text-right">
                  <label>Max (€)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=""
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
