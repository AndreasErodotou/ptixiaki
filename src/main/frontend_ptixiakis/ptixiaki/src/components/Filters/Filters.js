import React from "react";
import "./FilterCategory";
import Category from "./FilterCategory";

const Filters = props => {
  const categories = props.categories.map((category, indexed) => (
    <Category key={indexed} category={category} />
  ));
  const locations = props.locations.map((location, indexed) => (
    <Category key={indexed} category={location} />
  ));

  return (
    <div>
      <aside className="filters">
        <div className="card">
          <article className="card-group-item">
            <header className="card-header">
              <h6 className="title">Category </h6>
            </header>
            <div className="card-body">
              <form>
                {categories}
                <a href="#">Show more</a>
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
                <a href="#">Show more</a>
              </form>
            </div>
          </article>

          <article className="card-group-item">
            <header className="card-header">
              <h6 className="title">Max Price </h6>
            </header>
            <div className="card-body">
              {/* <input className="custom-range" min="0" max="1000" name="" type="range"/> */}
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

          {/* <article className="card-group-item">
                    <header className="card-header">
                        <h6 className="title">Choose type </h6>
                    </header>
                    <div className="card-body">
                        <label className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadio" value=""/>
                        <span className="form-check-label">
                            First hand items
                        </span>
                        </label>
                        <label className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadio" value=""/>
                        <span className="form-check-label">
                            Brand new items
                        </span>
                        </label>
                        <label className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadio" value=""/>
                        <span className="form-check-label">
                            Some other option
                        </span>
                        </label>
                    </div> 
                </article>  */}
        </div>
      </aside>
    </div>
  );
};

export default Filters;
