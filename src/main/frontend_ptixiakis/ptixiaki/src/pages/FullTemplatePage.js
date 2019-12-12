import React from "react";
import NavBar from "../components/NavBar";
import Filters from "../components/Filters/Filters";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";
import UserIcon from "../assets/User_sm.svg";

const FullTemplatePage = props => {
  let labels = [
    "From:",
    "Served Locations:",
    "Memeber Since:",
    "Skils:",
    "Work Experience:",
    "Jobs Done:",
    "About Me:"
  ];
  const formLabels = labels.map((label, index) => (
    <Form.Group as={Form.Row} className="col-md-6 col-sm-12" key={index}>
      <Form.Label className="w-25">{label}</Form.Label>
      <Form.Text className="w-25">{"test"}</Form.Text>
    </Form.Group>
  ));

  const reviews = (
    <Form className="mx-4 my-3 p-2 h-25 border border-info">
      <Form.Group as={Form.Row}>
        <div className="col-9">
          <img className="mr-2" src={UserIcon} alt="UserIcon"></img>
          <Form.Label className="bold mr-1 mt-1">user name</Form.Label>
        </div>
        <div className="col-3 d-flex justify-content-end pr-2">
          <div className="mt-1">
            <Rating rating={5.0} />
          </div>

          <Form.Text className="ml-1 mt-2">(5.0)</Form.Text>
        </div>
      </Form.Group>
      <Form.Group as={Form.Row} className="col-md-6 col-sm-12">
        <Form.Label className="w-100">{"comments"}</Form.Label>
      </Form.Group>
    </Form>
  );

  return (
    <div>
      <NavBar key="navbar" />
      <div className="row px-0 mx-0">
        <div className="col-md-2 px-0">
          <Filters
            key="filters"
            categories={props.categories}
            locations={props.locations}
          />
        </div>
        <div className="col-10 pt-2">
          <div className="m-auto border-bottom border-info">
            <div className="h-50 py-2 mx-3">
              <Form className="row">
                <Form.Group as={Form.Row} className="col-12">
                  <img className="mr-2" src={UserIcon} alt="UserIcon"></img>
                  <Form.Label className="bold mr-1 mt-1">user name</Form.Label>
                  <div className="mt-1">
                    <Rating rating={4.0} />
                  </div>
                  <Form.Text className="ml-1 mt-2">(4.0)</Form.Text>
                </Form.Group>

                {formLabels}

                {/* <Button
                  className="col-1 offset-11 align-self-end"
                  variant="primary"
                  type="submit"
                >
                  edit
                </Button> */}
              </Form>
            </div>
          </div>
          {reviews}
          {reviews}
          {reviews}
        </div>
      </div>
    </div>
  );
};

export default FullTemplatePage;
