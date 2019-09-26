import React from 'react'
import './Filters.css'
// import '../bootstrap/dist/css/bootstrap.css';

const Filters = (props) =>(
        <aside className="filters col-md-2">
            
            <div className="card">
                <article className="card-group-item">
                    <header className="card-header">
                        <h6 className="title">Category </h6>
                    </header>
                    <div className="card-body">
                        <form>
                            <label className="form-check">
                            <input className="form-check-input" type="checkbox" value=""/>
                            <span className="form-check-label">
                                Category 1
                            </span>
                            </label>
                            <label className="form-check">
                            <input className="form-check-input" type="checkbox" value=""/>
                            <span className="form-check-label">
                                Category 2
                            </span>
                            </label>  
                            <label className="form-check">
                            <input className="form-check-input" type="checkbox" value=""/>
                            <span className="form-check-label">
                                Category 3
                            </span>
                            </label>
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
                            <label className="form-check">
                            <input className="form-check-input" type="checkbox" value=""/>
                            <span className="form-check-label">
                                Location 1
                            </span>
                            </label>
                            <label className="form-check">
                            <input className="form-check-input" type="checkbox" value=""/>
                            <span className="form-check-label">
                                Location 2
                            </span>
                            </label>  
                            <label className="form-check">
                            <input className="form-check-input" type="checkbox" value=""/>
                            <span className="form-check-label">
                                Location 3
                            </span>
                            </label> 
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
                                    <input type="number" className="form-control" id="inputEmail4" placeholder=""/>
                                </div>
                                <div className="form-group col-md-6 text-right">
                                    <label>Max (€)</label>
                                    <input type="number" className="form-control" placeholder=""/>
                                </div>
                            </div>
                        </div> 
                </article> 

                <h4 className="pt_es">Posted Today</h4>
                <h4 className="pt_es">Ending Soon</h4>

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
    );


export default Filters;