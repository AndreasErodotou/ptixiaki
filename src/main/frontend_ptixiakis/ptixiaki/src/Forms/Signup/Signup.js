import React from 'react';
import SignupField from './SignupField';
import SignupSelect from './SignupSelect';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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

    constructor(props) {
        super(props)
        
        this.state = {
          user: {
            "name"        :   "", 
            "surname"     :   "", 
            "username"    :   "", 
            "email"       :   "", 
            "password"    :   "", 
            "birthday"    :   "", 
            "address"     :   "", 
            "phoneNum"    :   "", 
            "gender"      :   "", 
            "accountType" :   "", 
            "jobs"        :   "", 
            "servedLoc"   :   "", 
            "jobExp"      :   "", 
            "aboutMe"     :   ""
          },
          isValid: {
            "name"        :   false, 
            "surname"     :   false, 
            "username"    :   false, 
            "email"       :   false, 
            "password"    :   false, 
            "bday"        :   false, 
            "address"     :   false, 
            "phoneNum"    :   false, 
            "gender"      :   false, 
            "accountType" :   false, 
            "jobs"        :   false, 
            "servedLoc"   :   false, 
            "jobExp"      :   false, 
            "aboutMe"     :   false
          }
        }

        this.jobExpRef = React.createRef();
      }

    handleSignup() {
        // let name        =   this.state.user.name
        // let surname     =   this.state.user.surname
        // let username    =   this.state.user.username
        // let email       =   this.state.user.email
        // let password    =   this.state.user.password
        // let birthday    =   this.refs.birthday.value
        // let address     =   this.refs.address.value
        // let phoneNum    =   this.refs.phoneNum.value
        // let gender      =   this.refs.gender.state.value.label
        // let accountType =   this.refs.accountType.state.value.label
        // let jobs        =   this.refs.jobs.state.value.map((value) =>{
        //                         return  value.label
        //                     })
        // let servedLoc   =   this.refs.servedLoc.state.value.map((value) =>{
        //                         return  value.label
        //                     })
        // let jobExp      =   this.refs.jobExp.value
        // let aboutMe     =   this.refs.aboutMe.value
        // console.log(this.state.user)

        let isValidFields={...this.state.isValid}
        let keys = Object.keys(isValidFields)
        let str=""
        for (let key in keys){
            if(!isValidFields[keys[key]]){
                str+="please fill the filed " + keys[key] + ",\n"
            }
        }
        console.log(isValidFields.bday)
        console.log(keys)
        let warnings= str.substring(0,str.length -2)
        alert(warnings)
        if(warnings===""){
            this.props.onSignup(this.state.user)
        }
    }
    
    // postReq(){
    //     const obj={
    //         "name": "Andreas",
    //         "surname": "Herodotou",
    //         "username": "AndreasHerodotou",
    //         "accountType": "CUSTOMER",
    //         "gender": "MALE",
    //         "bday": "2019-04-26",
    //         "address": "kyknon 14A",
    //         "email": "andreaserodotou@gmail.com",
    //         "phoneNum": "99994953",
    //         "password": "password"
    //     }

    
    // axios.get("http://localhost:4567/management/bids",{
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //     }
    //     }).then( response => {
    //         console.log(response)
    //         alert("response...")
    //      })

    // }

    // gia kapio logo den doulevi swsta, to 3anavlepw se kapia fasi...
    // Changed(event){
    //     this.setState({user: 
    //                     {
    //                         ...this.state.user, 
    //                         [event.target.Id] : event.target.value
    //                     },
    //                     isValid: 
    //                     {
    //                         ...this.state.isValid,
    //                         [event.target.Id] :(!event.target.value.isEmpty)? true : false
    //                     }
    //                 });
    // }

    nameChanged(event){
        const name = event.target.value
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "name" : name.charAt(0).toUpperCase() +name.slice(1)
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "name" :((name.length >= 4) && (name.length < 20))? true : false
                        }
                    });
    }

    surnameChanged(event){
        const surname=event.target.value
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "surname" : surname.charAt(0).toUpperCase() +surname.slice(1)
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "surname" :((surname.length >= 4) && (surname.length < 20))? true : false
                        }
                    });
    }

    emailChanged(event){
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "email" : event.target.value
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "email" :(event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))? true : false
                        }
                    });
    }

    passwordChanged(event){
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "password" : event.target.value
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "password" :(event.target.value.length >= 8)? true : false
                        }
                    });
    }

    usernameChanged(event){
        const username=event.target.value
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "username" : username
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "username" :((username.length >= 4) && (username.length < 20))? true : false
                        }
                    });
    }

    bdayChanged(event){
        let bday=event.target.value
        let tmparr=bday.split("-")
        let isValid =false
        if(tmparr.length >= 2){
            if(tmparr[1].length===1){
                tmparr[1]="0"+tmparr[1]
            }
            if(tmparr.length === 2){
                bday=tmparr.join('-')
            }
        }
        if(tmparr.length===3){
            if(tmparr[2].length===1){
                tmparr[2]="0"+tmparr[2]
            }
            
            bday=tmparr.join('-')
            isValid=(
                bday.match("[0-9]{4}-[0-9]{2}-[0-9]{2}") &&
                tmparr[0] <= 2010 &&
                tmparr[1] <= 12 && tmparr[1] >= 1 &&
                tmparr[2] <= 31 && tmparr[2] >= 1
                )? true : false
        }
        
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "bday" : bday
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "bday" :(isValid)? true : false
                        }
                    });
    }
    
    addressChanged(event){
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "address" : event.target.value
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "address" :(event.target.value.length >= 6)? true : false
                        }
                    });
    }

    phoneNumChanged(event){
        const phoneNum=event.target.value
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "phoneNum" : phoneNum
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "phoneNum" :(phoneNum.match("[0-9]{8,15}"))? true : false
                        }
                    });
    }

    genderChanged(gender){
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "gender" : gender.label
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "gender" :(!gender.label.isEmpty)? true : false
                        }
                    });
    }

    accountTypeChanged(accountType){
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "accountType" : accountType.label
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "accountType" :(!accountType.label.isEmpty)? true : false
                        }
                    });
    }

    jobsChanged(jobs){
        let allJobs 
        if(jobs!==null){
            allJobs = jobs.map((job)=>{
                return job.label+", "
            })
        }
        console.log("jobs:" + jobs)
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "jobs" : allJobs
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "jobs" :(allJobs)? true : false
                        }
                    });
    }

    servedLocChanged(locations){
        let allLocations
        if(locations!==null){
            allLocations = locations.map((location)=>{
                return location.label+", "
            })
        }
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "servedLoc" : allLocations
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "servedLoc" :(allLocations)? true : false
                        }
                    });
    }

    jobExpChanged(event){
        const jobExp=event.target.value
        const isMatch= jobExp.match('[0-9]+')? true : false
        
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "jobExp" : (isMatch)? jobExp : this.state.jobExp
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "jobExp" :(jobExp >= 0 && jobExp.match("[0-9]{1,2}"))? true : false
                        }
                    });
    }

    aboutMeChanged(event){
        this.setState({user: 
                        {
                            ...this.state.user, 
                            "aboutMe" : event.target.value
                        },
                        isValid: 
                        {
                            ...this.state.isValid,
                            "aboutMe" :(event.target.value.length > 20)? true : false
                        }
                    });
    }

    render() {
        
        return (

        <div className="container my-4 border p-4 shadow p-3 mb-5 bg-white">
            <form className="form" onSubmit={this.handleSignup.bind(this)}>

                <div className="form-group row justify-content-center">
                    <h4>ServiceLink</h4>
                </div>
                
                <div className="form-row">

                    <SignupField 
                        field="Name"       
                        type="text"     
                        onChange={ this.nameChanged.bind(this) }
                        stateNow={this.state.user.name}
                        isValid={this.state.isValid.name}
                    />
                    
                    <SignupField 
                        field="Surname"    
                        type="text"     
                        onChange={ this.surnameChanged.bind(this) }
                        stateNow={this.state.user.surname}
                        isValid={this.state.isValid.surname}
                    />
                    
                    <SignupField 
                        field="Email"      
                        type="email"    
                        onChange={ this.emailChanged.bind(this) }
                        stateNow={this.state.user.email}
                        isValid={this.state.isValid.email}
                    />
                    
                    <SignupField 
                        field="Password"   
                        type="password" 
                        onChange={ this.passwordChanged.bind(this) }
                        stateNow={(this.state.user.password.length > 0)? this.state.user.password.length +" (characters)" : ""}
                        isValid={this.state.isValid.password}
                    />
                    
                </div>

                    
                <div className="form-row">
                    <SignupField    
                        field="Username"       
                        type="text" 
                        onChange={ this.usernameChanged.bind(this) }
                        stateNow={this.state.user.username}
                        isValid={ this.state.isValid.username}
                    />

                    <SignupField 
                        field="Birthday"       
                        type="text" 
                        placeholder="2000-04-25" 
                        onChange={ this.bdayChanged.bind(this) }
                        stateNow={this.state.user.bday}
                        isValid={ this.state.isValid.bday}
                    />
                    
                    <SignupField 
                        field="Address"        
                        type="text" 
                        onChange={ this.addressChanged.bind(this) }
                        stateNow={this.state.user.address}
                        isValid={ this.state.isValid.address}
                    />
                    
                    <SignupField 
                        field="Phone Number"   
                        type="text" 
                        onChange={ this.phoneNumChanged.bind(this) }
                        stateNow={this.state.user.phoneNum}
                        isValid={ this.state.isValid.phoneNum}
                    />

                </div>


                <div className="form-row">

                    <SignupSelect 
                        field="Gender"
                        options={Gender}
                        onChange={ this.genderChanged.bind(this) }
                        stateNow={ this.state.user.gender }
                        isValid={ this.state.isValid.gender }
                    />

                    <SignupSelect 
                        field="Account Type"
                        options={AccountType}
                        onChange={ this.accountTypeChanged.bind(this) }
                        stateNow={ this.state.user.accountType }
                        isValid={ this.state.isValid.accountType }
                    />

                </div>

                {
                (this.state.user.accountType==="Professional") ?
                <div>
                    <div className="form-row">
                        
                        <SignupSelect 
                            field="Jobs"
                            options={Jobs}
                            onChange={ this.jobsChanged.bind(this) }
                            className="col-md-6"
                            isMulti="isMulti"
                            stateNow={ this.state.user.jobs }
                            isValid={ this.state.isValid.jobs }
                        />

                        <SignupSelect 
                            field="Served Locations"
                            options={ServedLocations}
                            onChange={ this.servedLocChanged.bind(this) }
                            className="col-md-6"
                            isMulti="isMulti"
                            stateNow={ this.state.user.servedLoc }
                            isValid={ this.state.isValid.servedLoc }
                        />


                    </div>


                    <div className="form-row">

                        <SignupField 
                            field="Job Experience"   
                            type="text" 
                            onChange={ this.jobExpChanged.bind(this) }
                            placeholder="Years"
                            stateNow={ this.state.user.jobExp }
                            isValid={ this.state.isValid.jobExp }
                            // ref={this.jobExpRef}
                        />

                        <SignupField 
                            field="About Me"   
                            type="text" 
                            onChange={ this.aboutMeChanged.bind(this) }
                            placeholder="About me..."
                            className="col-md-9"
                            stateNow={ this.state.user.aboutMe }
                            isValid={ this.state.isValid.aboutMe }
                        />

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

                    {/* <div className="form-row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <button onClick={this.postReq.bind(this)} className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="button">Test</button>
                            </div>
                        </div>
                    </div> */}

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