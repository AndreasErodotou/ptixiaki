import React from 'react';
import PropTypes from 'prop-types';


const SignupField = ({field, type, onChange, placeholder, className, stateNow, isValid, ref}) => {
    let styleError={
        color: "red"
    }

    let styleOk={
        color: "green"
    }

    return (
        <div className={className}>
            <div className="form-group">
                <label className="control-label" > {field}: <b></b>
                    <span style={(isValid)? styleOk : styleError}> 
                        { stateNow }
                    </span> </label>
                <input className="form-control" ref= {ref} onChange={onChange} type={type} id={field} placeholder={(placeholder)? placeholder : field} />
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
    className   :   "col-md-3",
    stateNow    :   "",
    isValid     :   false
};

export default SignupField;