import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';


class Signin extends React.Component{
    handleSignIn() {
        let email = this.refs.email.value
        let password = this.refs.password.value
        this.props.onSignIn(email, password)
    }
    
    render() {
        return (
        <div className="container my-5 border border-light rounded p-4 w-25 shadow p-3 mb-5 bg-white rounded">
            <form className="form" onSubmit={this.handleSignIn.bind(this)}>

                <div className="form-group row justify-content-center">
                    <h4>ServiceLink</h4>
                </div>

                <div className="md-form form-group">
                    <label className="control-label" > Email: </label>
                    <input className="form-control" ref="email" type="email" placeholder="Email" />
                </div>

                <div className="md-form form-group">
                    <label className="control-label" > Password: </label>
                    <input className="form-control" ref="password" type="password" placeholder="Password" />
                </div>
            
                <button className="btn btn-outline-info btn-rounded btn-block my-4" type="submit">Sign in</button>
                
                <div className="md-form form-group border-top">
                    <p> 
                        <small>Not a member yet?  <b></b>
                            <a href="javascript:void(0);" onClick={this.props.onChangeToSignUp}>Join Now </a>
                        </small>
                    </p>
                </div>
                        
            </form>
        </div>
        )
    }
}

export default Signin;