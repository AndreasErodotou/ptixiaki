import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, { Component } from 'react';
import Signin from '../components/Forms/Signin/Signin';
import Signup from '../components/Forms/Signup/Signup';
import Listings from '../components/Listings/Listings';
import NavBar from '../components/NavBar'
import Filters from '../components/Filters/Filters'



class App extends Component{
  constructor(props) {
    super(props)
    
    this.state = {
      user: {email: null},
      isSigninOpen: false,
      isSignupOpen: false,
      showListings: true,
      createNewListing: false,
      search: false,
      logoClicked: false
    }
  }
  
  signIn(email, password) {
      this.setState({
        user: {
          "email"   : email,
          "password": password
        },
      isSigninOpen: false,
      isSignupOpen: false
      })
  }

  signOut() {
    this.setState({user: null,
                  isSigninOpen: true})
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
  
  createYourOwnListingClickedHandler(){
    this.setState({
        ...this.state,
        createNewListing: true
    });
}

searchClickedHandler(){

}

logoClickedHandler(){

}

accountIconClickedHandler(){
    
}



  render() {
    console.log(this.state)
    let page = [];

    if(this.state.isSigninOpen){
      page.push(
        <Signin
        onSignIn={ this.signIn.bind(this) }
        onChangeToSignUp={ this.changeToSignUp.bind(this) }
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

    page.push(<Filters key="filters"/>);

    if(this.state.showListings){
      page.push(<Listings key="listings" onShowListings={this.showListings.bind(this)} createNewListing={this.state.createNewListing} />);
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
