import React from 'react'
import './Filters.css'
// import '../bootstrap/dist/css/bootstrap.css';

const Filters = (props) =>(
        <aside className="filters col-md-2">
            
            <div class="card">
                <article class="card-group-item">
                    <header class="card-header">
                        <h6 class="title">Category </h6>
                    </header>
                    <div class="card-body">
                        <form>
                            <label class="form-check">
                            <input class="form-check-input" type="checkbox" value=""/>
                            <span class="form-check-label">
                                Category 1
                            </span>
                            </label>
                            <label class="form-check">
                            <input class="form-check-input" type="checkbox" value=""/>
                            <span class="form-check-label">
                                Category 2
                            </span>
                            </label>  
                            <label class="form-check">
                            <input class="form-check-input" type="checkbox" value=""/>
                            <span class="form-check-label">
                                Category 3
                            </span>
                            </label>
                            <a href="#">Show more</a>
                        </form>
                    </div> 
                </article> 

                <article class="card-group-item">
                    <header class="card-header">
                        <h6 class="title">Location </h6>
                    </header>
                    <div class="card-body">
                        <form>
                            <label class="form-check">
                            <input class="form-check-input" type="checkbox" value=""/>
                            <span class="form-check-label">
                                Location 1
                            </span>
                            </label>
                            <label class="form-check">
                            <input class="form-check-input" type="checkbox" value=""/>
                            <span class="form-check-label">
                                Location 2
                            </span>
                            </label>  
                            <label class="form-check">
                            <input class="form-check-input" type="checkbox" value=""/>
                            <span class="form-check-label">
                                Location 3
                            </span>
                            </label> 
                            <a href="#">Show more</a>
                        </form>
                    </div> 
                </article> 
                
                <article class="card-group-item">
                    <header class="card-header">
                        <h6 class="title">Max Price </h6>
                    </header>
                        <div class="card-body">
                            {/* <input class="custom-range" min="0" max="1000" name="" type="range"/> */}
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Min (€)</label>
                                    <input type="number" class="form-control" id="inputEmail4" placeholder=""/>
                                </div>
                                <div class="form-group col-md-6 text-right">
                                    <label>Max (€)</label>
                                    <input type="number" class="form-control" placeholder=""/>
                                </div>
                            </div>
                        </div> 
                </article> 

                <h4 className="pt_es">Posted Today</h4>
                <h4 className="pt_es">Ending Soon</h4>

                {/* <article class="card-group-item">
                    <header class="card-header">
                        <h6 class="title">Choose type </h6>
                    </header>
                    <div class="card-body">
                        <label class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadio" value=""/>
                        <span class="form-check-label">
                            First hand items
                        </span>
                        </label>
                        <label class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadio" value=""/>
                        <span class="form-check-label">
                            Brand new items
                        </span>
                        </label>
                        <label class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadio" value=""/>
                        <span class="form-check-label">
                            Some other option
                        </span>
                        </label>
                    </div> 
                </article>  */}
            </div> 

        </aside>
    );


export default Filters;