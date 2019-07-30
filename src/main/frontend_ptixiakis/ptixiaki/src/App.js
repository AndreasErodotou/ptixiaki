import './App.css';
import React, { Component } from 'react';
import Signin from './Forms/Signin/Signin';
import Signup from './Forms/Signup/Signup';

const Welcome = (props)=> {
  
  return (
    <div>
      Welcome <strong>{props.user.email}</strong>!
      <a href="http://localhost:3000/signin" onClick={props.onSignOut}>Sign out</a>
    </div>
  )
}

class App extends Component{
  constructor(props) {
    super(props)
    
    this.state = {
      user: null,
      // user: {accountType: "Customer"},
      isLoginOpen: false,
      isRegisterOpen: true,
    }
  }
  
  signIn(email, password) {
      this.setState({
        user: {
          email,
          password,
        },
      isLoginOpen: false,
      isRegisterOpen: false
      })
  }

  signUp( name, surname, username, email, password, birthday, address, phoneNum, gender, 
    accountType, jobs, servedLoc, jobExp, aboutMe)    {
      this.setState({
        user: {
          name, 
          surname, 
          username, 
          email, 
          password, 
          birthday, 
          address, 
          phoneNum, 
          gender, 
          accountType, 
          jobs, 
          servedLoc, 
          jobExp, 
          aboutMe
        },
      })
  }

  // changeAccountType(accountType){
  //   this.setState({
  //     ...this.state.user, accountType
  //   })
  // }

  signOut() {
    this.setState({user: null})
  }

  changeToSignUp(){
    console.log("ime stin change to sign up")
    this.setState({
      isLoginOpen: false,
      isRegisterOpen: true
    })
  } 

  changeToSignIn(){
    console.log("ime stin change to sign in")
    this.setState({
      isLoginOpen: true,
      isRegisterOpen: false
    })
  } 
  
  render() {
    console.log(this.state)
    let s_in = null
    let s_up = null
    let welc = null

    if(this.state.isLoginOpen){
      s_in=(
        <Signin
        onSignIn={this.signIn.bind(this)}
        onChangeToSignUp={this.changeToSignUp.bind(this)}
        />)
    }else if(this.state.isRegisterOpen){
      s_up=(
        <Signup
        onSignup={this.signUp.bind(this)} 
        onChangeToSignIn={this.changeToSignIn.bind(this)}
        // onChangeAccountType={this.changeAccountType.bind(this)}
        // accountType={this.state.user.accountType}
        />)
    }else{
      welc=(
        <Welcome 
        user={this.state.user} 
        onSignOut={this.signOut.bind(this)} 
        />)
    }

    return (
      <div>
        {
          (s_in) ? 
            s_in
          :
          (s_up) ?
            s_up
          :
            welc
        }
      </div>
    )
    
  }
}

export default App;
