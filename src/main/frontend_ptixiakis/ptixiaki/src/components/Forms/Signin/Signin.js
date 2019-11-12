import React from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";

class Signin extends React.Component {
  async handleSignIn(event) {
    event.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.password.value;

    let user = { email: email, password: password };

    let response = await fetch("http://localhost:4567/api/login", {
      method: "post",
      body: JSON.stringify(user)
    });
    let isAuthenticated = await response.json();

    console.log("isAuthenticated? " + JSON.stringify(isAuthenticated));

    if (isAuthenticated.token) {
      this.props.onSignIn(isAuthenticated.token);
    } else {
      this.props.onLoginError();
    }
  }

  render() {
    let error = null;

    if (this.props.error) {
      console.log("login error...");
      const style = { color: "red" };
      error = <p style={style}>Login failed, please try again</p>;
    }

    return (
      <div className="container my-5 border border-light rounded p-4 w-25 h-50 shadow p-3 mb-5 bg-white rounded">
        <form className="form" onSubmit={this.handleSignIn.bind(this)}>
          <div className="form-group row justify-content-center">
            <h4>ServiceLink</h4>
          </div>
          <div className="text-center">{error}</div>
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
                <Link to="/signup" onClick={this.props.onChangeToSignUp}>
                  {" "}
                  Join Now{" "}
                </Link>
              </small>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Signin;
