import React,{ useState, useEffect,useContext } from 'react'
import PropTypes from 'prop-types'
import AuthContext from '../context/auth-context'
import Bid from './Bid'

import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios'

const BidsMade = (props) => {
    const [bids, updateBid] = useState(null);
    const [selectedBid,setSelectedBid] = useState(null);
    
    const context = useContext(AuthContext);
    useEffect(() => {
        async function fetchData() {
          const response = await axios.get(`http://localhost:4567/api/listings/${props.LID}/bids`,{headers: {
            Authorization: context.token
          }});
          const bids = await response.data.data;
          updateBid(bids);
        }
        fetchData();
    }, [props.LID]);

    useEffect(() => {
        if(props.sendReq && selectedBid !==null){
            selectedBid.selected = true;
            // selectedBid.when = new Date(selectedBid.when).toLocaleDateString('en-CA').replace(/\//g,'-')
            async function fetchData() {
            const response = await axios.put(`http://localhost:4567/api/bids/${selectedBid.BID}`,selectedBid,{
                headers: {
                    Authorization: context.token
                }});
            console.log(JSON.stringify(response.data));
            }
            fetchData();
            const title = "Bid Selected";
            const msg = `username: ${selectedBid.UID}\n
                        solution: ${selectedBid.solution_decription}\n
                        price: ${selectedBid.price}\n
                        time needed: ${selectedBid.time_to_fix}\n
                        when: ${selectedBid.when.split('T').join(' ')}`;
            props.setSuccess(msg,title);
        }
    }, [props.sendReq,selectedBid]);

    let data;
    if(bids!==null){
        data = bids.map((bid) => (
            <Bid bid = {bid} key = {bid.BID} onSelect = {() => setSelectedBid(bid)}/>
        ));
    }

    return (
        <div className="width-80 m-auto">
            <h4 className="mb-3">Select one of the following bids:</h4>
            <InputGroup>
            {data}
            </InputGroup>
        </div>
    )
}

BidsMade.propTypes = {
    LID: PropTypes.string,
    bids: PropTypes.array
}

export default BidsMade


