import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import React, { Component } from 'react';
import Signin from '../components/Forms/Signin/Signin';
import Signup from '../components/Forms/Signup/Signup';
import Listings from '../components/Listings/Listings';

import SearchIcon from '../assets/Search.svg'
import UserIcon from '../assets/User.svg'
import AddIcon from '../assets/Add.svg'

const Welcome = (props)=> {
  console.log("user: "+props.user)
  return (
    <div>
      Welcome <strong>{props.user.email}</strong>! <b></b>
      <a href="javascript:void(0);" onClick={props.onSignOut}>Sign out</a>
    </div>
  )
}

class App extends Component{
  constructor(props) {
    super(props)
    
    this.state = {
      user: {email: null},
      isSigninOpen: false,
      isSignupOpen: true,
      showListings: false
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

  // signUp( name, surname, username, email, password, birthday, address, phoneNum, gender, 
  //   accountType, jobs, servedLoc, jobExp, aboutMe)    {
  //     this.setState({
  //       user: {
  //         "name"        :   name, 
  //         "surname"     :   surname, 
  //         "username"    :   username, 
  //         "email"       :   email, 
  //         "password"    :   password, 
  //         "birthday"    :   birthday, 
  //         "address"     :   address, 
  //         "phoneNum"    :   phoneNum, 
  //         "gender"      :   gender, 
  //         "accountType" :   accountType, 
  //         "jobs"        :   jobs, 
  //         "servedLoc"   :   servedLoc, 
  //         "jobExp"      :   jobExp, 
  //         "aboutMe"     :   aboutMe
  //       },
  //     })
  // }

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
  
  render() {
    console.log(this.state)
    let sign_in = null
    let sign_up = null
    let welc = null

    let navBar = (<div className="border">

                    <nav className="px-2">
                        
                        <form className=" form-inline row">
                            <a href="#" className="col-2 font-weight-bold">ServiceLink</a>
                            <div className="col-4">
                                <input className="form-control blue searchBox" type="search" placeholder="Search" aria-label="Search"></input>
                                <button className="btn p-1 ml-1 blue searchBox" type="submit"><img className="img-responsive" src={SearchIcon}></img></button>
                            </div>
                            <div className="col-5">
                                <img className="img-responsive" src={AddIcon}></img>
                                <a href="#">Create Your Own Listing</a>
                            </div>
                            <div className="col-1">
                                <img className="img-responsive float-md-right" id="userIcon" src={UserIcon}></img>
                            </div> 
                        </form>
                        
                    </nav>
                    
                  </div>);

    if(this.state.isSigninOpen){
      sign_in=(
        <Signin
        onSignIn={ this.signIn.bind(this) }
        onChangeToSignUp={ this.changeToSignUp.bind(this) }
        />)
    }else if(this.state.isSignupOpen){
      sign_up=(
        <Signup
        // onSignup={ this.signUp.bind(this) } 
        onChangeToSignIn={ this.changeToSignIn.bind(this) }
        />)
    }else{
      welc=(
        <Welcome 
        user={ this.state.user } 
        onSignOut={ this.signOut.bind(this) } 
        />)
    }

    return (
      <div>
        {
          
          (sign_in) ? 
            sign_in
          :
          (sign_up) ?
            sign_up
          :
            navBar
        }
        <Listings onShowListings={this.showListings.bind(this)}/>
      </div>
    )
    
  }
}

export default App;
