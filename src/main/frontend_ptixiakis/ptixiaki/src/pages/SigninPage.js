import React from "react";

import { Link } from "react-router-dom";

import AuthContext from "../context/auth-context";

import {getReq,postReq} from "../requests/Request";


class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: false
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    console.log(`contex in login:${JSON.stringify(this.context)}`);
    getReq('listings',null,response => {
      this.setState({
        ...this.state,
        listings: response.data
      });
      this.props.history.push("/");
      console.log(response.data);
    });
  }

  onLoginError() {
    this.setState({
      error: true
    });
  }

  handleSignIn(event) {
    event.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;

    let user = { email: email, password: password };

    postReq('login',user,isAuthenticated => {
      if (isAuthenticated.data.token) {
        console.log("success");
        localStorage.setItem("token", isAuthenticated.data.token);
        window.location.reload();
      } else {
        this.onLoginError();
      }
    });
  }

  render() {
    let errorMsg;
    if (this.state.error) {
      errorMsg = <p className="redColor">Signin Failed, Please Try Again</p>;
    }

    return (
      <div className="container my-5 border border-light rounded p-4 w-25 h-50 shadow p-3 mb-5 bg-white rounded">
        <form className="form" onSubmit={this.handleSignIn.bind(this)}>
          <div className="form-group row justify-content-center">
            <h4 className="blue-color bold">ServiceLink</h4>
          </div>
          <div className="text-center">{errorMsg}</div>
          <div className="md-form form-group">
            <label className="control-label"> Email: </label>
            <input
              className="form-control"
              ref="email"
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="md-form form-group">
            <label className="control-label"> Password: </label>
            <input
              className="form-control"
              ref="password"
              type="password"
              placeholder="Password"
            />
          </div>

          <button
            className="btn btn-outline-info btn-rounded btn-block my-4"
            type="submit"
          >
            Sign in
          </button>

          <div className="md-form form-group border-top">
            <p>
              <small>
                Not a member yet? <b></b>
                <Link to="/signup"> Join Now </Link>
              </small>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
