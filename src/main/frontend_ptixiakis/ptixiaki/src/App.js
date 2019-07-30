import './App.css';
import React, { Component } from 'react';
import Signin from './Forms/Signin/Signin';
import Signup from './Forms/Signup/Signup';

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
      user: null,
      isLoginOpen: true,
      isRegisterOpen: false,
    }
  }
  
  signIn(email, password) {
      this.setState({
        user: {
          "email"   : email,
          "password": password
        },
      isLoginOpen: false,
      isRegisterOpen: false
      })
  }

  signUp( name, surname, username, email, password, birthday, address, phoneNum, gender, 
    accountType, jobs, servedLoc, jobExp, aboutMe)    {
      this.setState({
        user: {
          "name"        :   name, 
          "surname"     :   surname, 
          "username"    :   username, 
          "email"       :   email, 
          "password"    :   password, 
          "birthday"    :   birthday, 
          "address"     :   address, 
          "phoneNum"    :   phoneNum, 
          "gender"      :   gender, 
          "accountType" :   accountType, 
          "jobs"        :   jobs, 
          "servedLoc"   :   servedLoc, 
          "jobExp"      :   jobExp, 
          "aboutMe"     :   aboutMe
        },
      })
  }

  changeAccountType(accountType){
    this.setState({user: {
      ...this.state.user, accountType : accountType.label}
    })
    // console.log("changeAccTypeState:"+this.state)
  }

  signOut() {
    this.setState({user: null,
                  isLoginOpen: true})
  }

  changeToSignUp(){
    this.setState({
      isLoginOpen: false,
      isRegisterOpen: true
    })
  } 

  changeToSignIn(){
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
        onSignIn={ this.signIn.bind(this) }
        onChangeToSignUp={ this.changeToSignUp.bind(this) }
        />)
    }else if(this.state.isRegisterOpen){
      s_up=(
        <Signup
        onSignup={ this.signUp.bind(this) } 
        onChangeToSignIn={ this.changeToSignIn.bind(this) }
        onChangeAccountType={ this.changeAccountType.bind(this) }
        accountType={ (this.state.user)? this.state.user.accountType : "" }
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
