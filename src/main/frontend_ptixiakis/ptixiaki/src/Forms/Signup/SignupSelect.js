import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SignupSelect = ({field, options, onChange, className="col-md-3", isMulti, stateNow="", isValid=false}) => {
    let obj={isMulti}

    let styleError={
        color: "red"
    }

    let styleOk={
        color: "green"
    }

    return (
        <div className={ className }>
            <div className="form-group">
                <label className="control-label" > {field}: <b></b>
                    <span style={(isValid)? styleOk : styleError}> 
                        { stateNow }
                    </span> </label>
                <Select onChange={onChange} options={ options } {...(isMulti)? obj : null} />
            </div>
        </div>
    );
};

SignupSelect.propTypes = {
    field       :   PropTypes.string,
    options     :   PropTypes.array,
    onChange    :   PropTypes.func,
    className   :   PropTypes.string,
    isMulti     :   PropTypes.string
    
};

export default SignupSelect;