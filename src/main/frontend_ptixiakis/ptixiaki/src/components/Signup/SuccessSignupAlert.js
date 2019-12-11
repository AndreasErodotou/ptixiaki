import React, { useState } from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const SuccessSignupAlert = props => {
  const [show, setShow] = useState(true);
  let history = useHistory();

  return (
    <div>
      <>
        <Alert show={show} variant="success">
          <Alert.Heading>You Signed up Successfully</Alert.Heading>
          <p>Press ok to proceed to login</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => {
                setShow(false);
                history.push("/signin");
              }}
              variant="outline-success"
            >
              OK
            </Button>
          </div>
        </Alert>
      </>
    </div>
  );
};

SuccessSignupAlert.propTypes = {
  msg: PropTypes.string
};

export default SuccessSignupAlert;
