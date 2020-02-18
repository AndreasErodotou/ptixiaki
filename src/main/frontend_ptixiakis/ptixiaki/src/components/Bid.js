import React,{ useState, useEffect,useContext } from "react";
import Form from "react-bootstrap/Form";
import UserIcon from "../assets/User_sm.svg";
import Rating from "../components/Rating";
import AuthContext from '../context/auth-context';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import {Link} from "react-router-dom";

const Bid = ({ bid, onSelect }) => {
    const [review, updateReview] = useState(undefined);
    
    const context = useContext(AuthContext);
    useEffect(() => {
        async function fetchData() {
          const response = await axios.get(`http://localhost:4567/api/users/${bid.UID}/reviews/rating`,{headers: {
            Authorization: context.token
          }});
          const review = await response.data.data;
          updateReview(review);
        }
        fetchData();
    }, [bid]);

    
  console.log(`review:${JSON.stringify(review)}`);

  return (
    (review!==undefined)?
    <InputGroup className="border border-info rounded justify-content-between my-2">
      <Form.Check
          type="radio"
          // label="first radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          className="d-flex justify-content-center align-items-center"
          style={{"backgroundColor": "#17a2b8","width": "40px", "height": "100%"}}  
          onChange={onSelect}
        />
      {/* <InputGroup.Radio onChange={onSelect}/> */}
    
        <Form className="mx-4 mt-3 h-25 width-90">
          <Form.Group as={Form.Row}>
            <div>
              <img className="mr-2" src={UserIcon} alt="UserIcon"/>
              {/*<Form.Label className="bold mr-1 mt-1">{bid.UID}</Form.Label>*/}
              <Form.Label className="onHoverBluePointer bold">
                <Link style={{ textDecoration: 'none' }} to= {`/users/${bid.UID}`} > {bid.UID} </Link>
              </Form.Label>
            </div>
            <div className=" d-flex px-2 w-25">
              <div className="mt-1">
                <Rating rating={review.rating} />
              </div>

              <Form.Text className="ml-1 mt-2">({review.count})</Form.Text>
            </div>
            <div className="d-flex justify-content-end pr-2 w-50">
              <Form.Label className="ml-1 mt-2 bold">({bid.price}€)</Form.Label>
            </div>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label className="w-50">{bid.solution_decription}</Form.Label>
            <Form.Label className="w-50">{`Time Needed: ${bid.time_to_fix}'`}</Form.Label>
          </Form.Group>
          <Form.Group as={Form.Row}>
            <Form.Label className="w-50"/>
            <Form.Label className="w-50">{`Date: ${bid.when}`}</Form.Label>
          </Form.Group>
        </Form>

      {/* </InputGroup.Prepend> */}
    </InputGroup>
  : null
  );
};

export default Bid;
