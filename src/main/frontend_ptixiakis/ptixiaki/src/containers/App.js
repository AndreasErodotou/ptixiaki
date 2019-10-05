import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, { Component } from 'react';
import Signin from '../components/Forms/Signin/Signin';
import Signup from '../components/Forms/Signup/Signup';
import Listings from '../components/Listings/Listings';
import NavBar from '../components/NavBar';
import Filters from '../components/Filters/Filters';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModalDialog from 'react-bootstrap/ModalDialog';

// import { Button } from 'reactstrap';




class App extends Component{
  constructor(props) {
    super(props)
    
    this.state = {
      user: {
        email: null,
        password: null},
      // listings: [],
      isSigninOpen: false,
      isSignupOpen: false,
      showListings: true,
      createNewListing: false,
      search: false,
      logoClicked: false,
      loginError: false
    }
  }
  
  signIn(email, password) {
      this.setState({
        ...this.state,
        user: {
          "email"   : email,
          "password": password
        },
        isSigninOpen: false,
        isSignupOpen: false,
        loginError: false,
        showListings: true
      });
  }

  signOut() {
    this.setState({user: null,
      isSigninOpen: true
    })
  }

  changeToSignUp(){
    this.setState({
      isSigninOpen: false,
      isSignupOpen: true
    })
  } 

  changeToSignIn(){
    this.setState({
      isSigninOpen: true,
      isSignupOpen: false
    })
  } 

  showListings(){
    this.setState({
      showListings: true
    })
  }
  
  

  loginError(){
    this.setState({
      ...this.state,
      loginError: true
    });
  }



  render() {
    console.log(this.state)
    let page = [];

    if(this.state.isSigninOpen){
      page.push(
        <Signin
        onSignIn={ this.signIn.bind(this) }
        onChangeToSignUp={ this.changeToSignUp.bind(this)}
        onLoginError = {this.loginError.bind(this)}
        error={this.state.loginError}
        />)
    }else if(this.state.isSignupOpen){
      page.push(
        <Signup
        // onSignup={ this.signUp.bind(this) } 
        onChangeToSignIn={ this.changeToSignIn.bind(this) }
        />)
    }else{
      page.push(<NavBar
          key="navbar"
          onCreateYourOwnListingClicked={this.createYourOwnListingClickedHandler.bind(this)}
          onSearch={this.searchClickedHandler.bind(this)}
          onLogoClicked={this.logoClickedHandler.bind(this)}
        />)
    }

    

    if(this.state.showListings){
      page.push(<Filters key="filters"/>);
      page.push(<Listings 
        key="listings" 
        onShowListings={this.showListings.bind(this)}
        listings={this.state.listings}
        createNewListing={this.state.createNewListing} />);
    }

    

    return (
      <div className="row">
        {
          page
        }
        
      </div>
    )
    
  }
}

export default App;
