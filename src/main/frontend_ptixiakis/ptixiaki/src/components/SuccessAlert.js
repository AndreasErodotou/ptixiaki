import React, { useState } from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const SuccessSignupAlert = ({ title, msg, redirectPath, modalHide }) => {
  const [show, setShow] = useState(true);
  let history = useHistory();

  return (
    <>
      <Alert show={show} variant="success" className="mb-0">
        <Alert.Heading className="mb-4">{title}</Alert.Heading>
        {msg.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}

        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              setShow(false);
              history.push(redirectPath);
              if (modalHide !== null) {
                modalHide();
              }
            }}
            variant="outline-success"
          >
            OK
          </Button>
        </div>
      </Alert>
    </>
  );
};

SuccessSignupAlert.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string,
  redirectPath: PropTypes.string
};

export default SuccessSignupAlert;
