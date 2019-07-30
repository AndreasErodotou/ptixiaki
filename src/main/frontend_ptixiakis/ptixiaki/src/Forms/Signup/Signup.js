import React from 'react';
import Select from 'react-select';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Gender = [
    { label: "Male",    value: 1 },
    { label: "Female",  value: 2 }   
  ];

const AccountType = [
    { label: "Customer",        value: 1 },
    { label: "Professional",    value: 2 }   
];

const Jobs = [
    { label: "electrician",     value: 1 },
    { label: "plumber",         value: 2 },
    { label: "car mechanic",    value: 3 },
    { label: "painter",         value: 4 }
];

const ServedLocations = [
    { label: "Heraklion",   value: 1 },
    { label: "Chania",      value: 2 },  
    { label: "Rethimno",    value: 3 },  
    { label: "Nicosia",     value: 4 }, 
    { label: "Limassol",    value: 5 }, 
    { label: "Larnaca",     value: 6 },
    { label: "Paphos",      value: 7 } 
];

class Signup extends React.Component{
    handleSignup(e) {
        e.preventDefault()
        let name        =   this.refs.name.value
        let surname     =   this.refs.surname.value
        let username    =   this.refs.username.value
        let email       =   this.refs.email.value
        let password    =   this.refs.password.value
        let birthday    =   this.refs.birthday.value
        let address     =   this.refs.address.value
        let phoneNum    =   this.refs.phoneNum.value
        let gender      =   this.refs.gender.state.value.label
        let accountType =   this.refs.accountType.state.value.label
        let jobs        =   this.refs.jobs.state.value.map((value) =>{
                                return  value.label
                            })
        let servedLoc   =   this.refs.servedLoc.state.value.map((value) =>{
                                return  value.label
                            })
        let jobExp      =   this.refs.jobExp.value
        let aboutMe     =   this.refs.aboutMe.value
        
        this.props.onSignup( name, surname, username, email, password, birthday, address, 
            phoneNum, gender, accountType, jobs, servedLoc, jobExp, aboutMe)
    }
    
    
    render() {
        return (
        <div className="container my-4 border p-4 shadow p-3 mb-5 bg-white">
            <form className="form" onSubmit={this.handleSignup.bind(this)}>

                <div className="form-group row justify-content-center">
                    <h4>ServiceLink</h4>
                </div>
                
                <div className="form-row">

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" > Name: </label>
                            <input className="form-control" ref="name" type="text" placeholder="Name" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" > Surname: </label>
                            <input className="form-control" ref="surname" type="text" placeholder="Surname" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" > Email: </label>
                            <input className="form-control" ref="email" type="email" placeholder="Email" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" > Password: </label>
                            <input className="form-control" ref="password" type="password" placeholder="Password" />
                        </div>
                    </div>

                </div>

                    
                <div className="form-row">

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" > Username: </label>
                            <input className="form-control" ref="username" type="text" placeholder="Username" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" > Birthday: </label>
                            <input className="form-control" ref="birthday" type="text" placeholder="2000-04-25" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" > Address: </label>
                            <input className="form-control" ref="address" type="text" placeholder="Address" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" > Phone Number: </label>
                            <input className="form-control" ref="phoneNum" type="text" placeholder="Phone Number" />
                        </div>
                    </div>

                </div>


                <div className="form-row">

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" > Gender: </label>
                            <Select ref="gender" options={ Gender } />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" > Account Type: </label>
                            <Select onChange={this.props.onChangeAccountType} ref="accountType" options={ AccountType } />
                        </div>
                    </div>

                </div>

                {
                (this.props.accountType==="Professional") ?
                <div>
                    <div className="form-row">
                        
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label" > Jobs: </label>
                                <Select ref="jobs" options={ Jobs } isMulti />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label" > Served Locations: </label>
                                <Select ref="servedLoc" options={ ServedLocations } isMulti />
                            </div>
                        </div>

                    </div>


                    <div className="form-row">

                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="control-label" > Job Experience: </label>
                                <input className="form-control" ref="jobExp" type="text" placeholder="Years" />
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="form-group">
                                <label className="control-label" > About Me: </label>
                                <input className="form-control" ref="aboutMe" type="text" placeholder="About me..." />
                            </div>
                        </div>

                    </div>

                    
                </div>
                : <div></div>
                }

                <div className="form-row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Sign up</button>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                        <div className="md-form form-group border-top">
                            <p> 
                                <small>Not a member yet?  <b></b>
                                    <a href="javascript:void(0);" onClick={this.props.onChangeToSignIn} >Sign in </a>
                                </small>
                            </p>
                        </div>
                </div>
                 
            </form>
        </div>
        )
    }
}

export default Signup;