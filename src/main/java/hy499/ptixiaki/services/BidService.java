package hy499.ptixiaki.services;

import hy499.ptixiaki.data.Bid;
import hy499.ptixiaki.db.BidDB;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Andreas
 */
public class BidService {
    private Map<String, Bid> bids;
    private String bidMsg;
    private final BidDB bidDB;

    public BidService() throws ClassNotFoundException {
        bidMsg = "";
        bidDB = new BidDB();
        bids = bidDB.getBids();
    }


    public Boolean addBid(Bid bid) throws ClassNotFoundException {
        if (checkFieldsBeforeAdd(bid)) {
            String uniqueBID = UUID.randomUUID().toString();
            bid.setBID(uniqueBID);
            bids.put(uniqueBID, bid);
            bidMsg = "Bid Added";
            bidDB.addBID(bid);
            return true;
        }
        return false;
    }

    public Bid editBid(Bid bid) {
        if (checkFieldsBeforeEdit(bid)) {
            Bid preExistBid = getBid(bid.getBID());
            if (preExistBid != null) {
                if (bid.getPrice() >= 0 && bid.getPrice() != preExistBid.getPrice()) {
                    preExistBid.setPrice(bid.getPrice());
                }
                if (bid.getSolution_decription() != null && !bid.getSolution_decription().equals(preExistBid.getSolution_decription())) {
                    preExistBid.setSolution_decription(bid.getSolution_decription());
                }
                if (bid.getTime_to_fix() >= 0 && bid.getTime_to_fix() != preExistBid.getTime_to_fix()) {
                    preExistBid.setPrice(bid.getPrice());
                }
                if (bid.getSelected() != null && !bid.getSelected().equals(preExistBid.getSelected())) {
                    preExistBid.setSelected(bid.getSelected());
                }
                bidMsg = "Bid Edited";
                return preExistBid;
            }
            bidMsg = "Bid Does Not Exist!!";
        }
        return null;
    }

    public Bid deleteBid(String BID) {
        Bid bid = bids.remove(BID);
        if (bid != null) {
            bidMsg = "Bid Removed!!";
            return bid;
        } else {
            bidMsg = "Bid Does Not Exist!!";
        }
        return null;
    }

    public Map<String, Bid> deleteListingBids(String LID) {
        Map<String, Bid> listingBids = new HashMap<>();
        Set<String> bidKeys = bids.keySet();
        int counter = 0;
        for (String key : bidKeys) {
            if (bids.get(key).getLID().equals(LID)) {
                listingBids.put(key, bids.remove(key));
                counter++;
            }
        }
        bidMsg = counter + " Bids deleted";

        return listingBids;
    }

    public Map<String, Bid> getListingBids(String LID) {
        Map<String, Bid> listingBids = new HashMap<>();
        Set<String> bidKeys = bids.keySet();
        for (String key : bidKeys) {
            if (bids.get(key).getLID().equals(LID)) {
                listingBids.put(key, bids.get(key));
            }
        }
        if (listingBids.isEmpty()) {
            bidMsg = "There Are No Bids From This Listing";
        } else {
            bidMsg = "Listing Bids";
        }
        return listingBids;
    }

    public Bid getUserBidForAListing(String UID, String LID) {
        Bid listingBid;
        Map<String, Bid> listingBids = getListingBids(LID);
        Set<String> listingBidsKeys = listingBids.keySet();
        for (String key : listingBidsKeys) {
            if (listingBids.get(key).getUID().equals(UID)) {
                bidMsg = "User Bid From Listing With LID = " + LID;
                return listingBids.get(key);
            }
        }
        bidMsg = "There Are No Bid From This User For The Listing With LID = " + LID;
        return null;
    }

    public Map<String, Bid> getSelectedBids(Boolean selected) {
        Map<String, Bid> selectedBids = new HashMap<>();
        Set<String> bidKeys = bids.keySet();
        for (String key : bidKeys) {
            if (Objects.equals(bids.get(key).getSelected(), selected)) {
                selectedBids.put(key, bids.get(key));
            }
        }
        if (selectedBids.isEmpty()) {
            bidMsg = "There Are No Bids With Field Selected = " + selected;
        } else {
            bidMsg = "All Bids With Field Selected = " + selected;
        }
        return selectedBids;
    }

    public int getListingBidsSum(String LID) {
        int sum = 0;
        Set<String> bidKeys = bids.keySet();
        for (String key : bidKeys) {
            if (bids.get(key).getLID().equals(LID)) {
                sum++;
            }
        }
        if (sum == 0) {
            bidMsg = "There Are No Bids From This Listing";
        } else {
            bidMsg = "Listing Bids";
        }
        return sum;
    }

    public Map<String, Bid> getBidsFromAUser(String UID) {
        Map<String, Bid> userBids = new HashMap<>();
        Set<String> bidKeys = bids.keySet();
        for (String key : bidKeys) {
            if (bids.get(key).getUID().equals(UID)) {
                userBids.put(key, bids.get(key));
            }
        }
        if (userBids.isEmpty()) {
            bidMsg = "There Are No Bids From This User";
        } else {
            bidMsg = "User Bids";
        }
        return userBids;
    }

    private Boolean checkFieldsBeforeEdit(Bid bid) {
        bidMsg = "";
        if (bid != null) {
            if (bid.getBID() == null) {
                bidMsg += "BID Cannot Be Blank\n";
            }
            if (bid.getUID() == null) {
                bidMsg += "UID Cannot Be Blank\n";
            }
            if (bid.getLID() == null) {
                bidMsg += "LID Cannot Be Blank\n";
            }
            return bidMsg.isEmpty();
        }
        bidMsg = "Bid Cannot Be Null";
        return false;
    }

    public Boolean checkFieldsBeforeAdd(Bid bid) {
        bidMsg = "";
        if (bid != null) {
            if (bid.getUID() == null) {
                bidMsg += "UID Cannot Be Blank\n";
            }
            if (bid.getPrice() <= 0) {
                bidMsg += "Price Cannot Be Less Than 0\n";
            }
            if (bid.getSolution_decription() == null) {
                bidMsg += "Solution Decription Cannot Be Blank\n";
            }
            if (bid.getTime_to_fix() <= 0) {
                bidMsg += "Time To Fix Cannot Be Less Than 0\n";
            }
            if (bid.getSelected() == null) {
                bidMsg += "Selected Cannot Be Blank\n";
            }
            return bidMsg.isEmpty();
        }
        bidMsg = "Bid Cannot Be Null";
        return false;
    }

    public Bid getBid(String BID) {
        Bid bid = bids.get(BID);
        if (bid == null) {
            bidMsg = "There Are No Bid With BID = " + BID;
        } else {
            bidMsg = "Bid With BID = " + BID;
        }
        return bid;
    }

    public Map<String, Bid> getBids() {
        if (bids.isEmpty()) {
            bidMsg = "There Are No Bids";
        } else {
            bidMsg = "All Bids";
        }
        return bids;
    }

    public void setBids(Map<String, Bid> Bids) {
        this.bids = Bids;
    }

    public String getBidMsg() {
        return bidMsg;
    }

    public void setBidMsg(String bidMsg) {
        this.bidMsg = bidMsg;
    }

}
