import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import UserIcon from "../assets/User_sm.svg";
import Rating from "../components/Rating";
import AuthContent from "../context/auth-context";
import Button from "react-bootstrap/Button";

const UserDetails = ({ user }) => {
  const authContext = useContext(AuthContent);
  let labelsProf = [
    "Name:",
    "Surname:",
    "Address:",
    "Account Type:",
    "Skils:",
    "Served Locations:",
    "Work Experience: (in years)",
    "Jobs Done:",
    "About Me:"
  ];

  let labelsCust = ["Name:", "Surname:", "Address:", "Account Type:"];
  let profKeys = [
    "name",
    "surname",
    "address",
    "accountType",
    "jobs",
    "servedLoc",
    "workExperience",
    "jobsDone", 
    "aboutMe"
  ];

  const labels = user.accountType === "CUSTOMER" ? labelsCust : labelsProf;
  const formLabels = labels.map((label, index) => (
    <Form.Group as={Form.Row} className="col-md-6 col-sm-12" key={index}>
      <Form.Label className="w-25">{label}</Form.Label>
      <Form.Label
        className={`bold  w-75`}
      >
        {user[profKeys[index]]}
      </Form.Label>
    </Form.Group>
  ));
  return (
    <Form className="row">
      <Form.Group as={Form.Row} className="col-12">
        <img className="mr-2" src={UserIcon} alt="UserIcon"></img>
        <Form.Label className="bold mr-1 mt-1 blue-color">
          {user.UID}
        </Form.Label>
        <div className="mt-1">
          <Rating rating={user.rating} />
        </div>
        <Form.Text className="ml-1 mt-2 bold">{`( ${user.count} )`}</Form.Text>
        {/* <Form.Text className="ml-5 mt-2 bold">{`Reviews ( ${user.count} )`}</Form.Text> */}
      </Form.Group>

      {formLabels}
      {/* {user.UID === authContext.username ? (
        <Button
          className="col-1 offset-11 align-self-end"
          variant="primary"
          type="submit"
        >
          edit
        </Button>
      ) : null} */}
    </Form>
  );
};

export default UserDetails;
