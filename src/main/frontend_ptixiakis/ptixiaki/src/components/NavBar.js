import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '../assets/Search.svg'
import UserIcon from '../assets/User.svg'
import AddIcon from '../assets/Add.svg'


const NavBar = (props) => (<div className="border col-md-12">

                    <nav className="px-3 py-1">
                        
                        <form className=" form-inline row">
                            <h5 className="col-2 font-weight-bold pt_es" onClick={props.onLogoClicked} >ServiceLink</h5>
                            <div className="col-4">
                                <input className="form-control blue searchBox" type="search" placeholder="Search" aria-label="Search"></input>
                                <button className="btn p-1 ml-1 blue searchBox" type="submit" onClick={props.onSearch} ><img className="img-responsive" src={SearchIcon}></img></button>
                            </div>
                            <div className="col-5" onClick={props.onCreateYourOwnListingClicked} >
                                <img className="img-responsive" src={AddIcon}></img>
                                <a href="#">Create Your Own Listing</a>
                            </div>
                            {/* <div className="icontext col-1">
                                <div className="icon-wrap icon-xs bg-primary round text-light">
                                    <i className="fa fa-envelope"></i>
                                    <span className="notify">1</span>
                                </div>
                            </div> */}
                            <div className="col-1">
                                <img className="img-responsive float-md-right" id="userIcon" src={UserIcon}></img>
                            </div> 
                        </form>
                        
                    </nav>
                    
                </div>);

NavBar.propTypes = {
    onCreateYourOwnListingClicked: PropTypes.func,
    onLogoClicked: PropTypes.func,
    onSearch: PropTypes.func
};

export default NavBar;