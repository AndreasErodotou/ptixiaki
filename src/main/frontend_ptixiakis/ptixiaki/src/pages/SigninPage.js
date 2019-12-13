import React from "react";

import { Link } from "react-router-dom";

import AuthContext from "../context/auth-context";

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: false
    };
  }

  static contextType = AuthContext;

  componentDidMount() {
    let jwtToken = localStorage.getItem("token");
    console.log(`contex in login:${JSON.stringify(this.context)}`);
    fetch("http://localhost:4567/api/listings", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: jwtToken
      }
    })
      .then(response => {
        // console.log("Get Listings Status: " + response.status);
        if (response.status >= 400) {
          return response.json().then(errorMsg => {
            let error;
            error.statusCode = response.status;
            error.msg = errorMsg;
            throw error;
          });
        }
        return response.json();
      })
      .then(resJson => {
        this.setState({
          ...this.state,
          listings: resJson.data
        });
        this.props.history.push("/");
        console.log(resJson.data);
      })
      .catch(error => {
        if (error.statusCode === 403) {
          return this.props.history.push("/signin");
        }
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

    fetch("http://localhost:4567/api/login", {
      method: "post",
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(isAuthenticated => {
        if (isAuthenticated.token) {
          console.log("success");
          localStorage.setItem("token", isAuthenticated.token);
          this.props.history.push("/");
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
