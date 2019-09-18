import React from 'react';
import PropTypes from 'prop-types';


const SignupField = ({field, type, onChange, placeholder, className, stateNow, isValid, ref}) => {
    let styleError={
        color: "#ff2929",
        // borderColor: "#ff2929"
    }

    let styleOk={
        color: "green",
        borderColor: "green"
    }

    return (
        <div className={className}>
            <div className={(isValid)?"form-group has-success":"form-group has-error"}>
                <label className="control-label" > {field}: <b></b>
                    <span style={(isValid)? styleOk : styleError}> 
                        { stateNow }
                    </span> </label>
                {!(type==="textarea")?
                    <input style={(isValid)? styleOk : {/*borderColor: "#ff2929"*/}} className="form-control" ref= {ref} onChange={onChange} type={type} id={field} placeholder={(placeholder)? placeholder : field} />
                    : 
                    <textarea class="form-control" ref= {ref} onChange={onChange} id={field} placeholder={(placeholder)? placeholder : field} rows="3"></textarea>
                }
            </div>
        </div>
    );
};

SignupField.propTypes = {
    field       :   PropTypes.string,
    type        :   PropTypes.string,
    onChange    :   PropTypes.func,
    placeholder :   PropTypes.string,
    className   :   PropTypes.string,
    stateNow    :   PropTypes.string,
    isValid     :   PropTypes.bool
    
};

SignupField.defaultProps = { 
    field       :   "",
    type        :   "text",
    onChange    :   null,
    placeholder :   "",
    className   :   "w-100",//"col-md-3",
    stateNow    :   "",
    isValid     :   true
};

export default SignupField;