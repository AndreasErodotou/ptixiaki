package hy499.test_ptixiaki.controller;

import hy499.test_ptixiaki.data.Bid;
import java.util.HashMap;
import java.util.Map;

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
    private Map<String, Bid> Bids;

    BidService() {
        Bids = new HashMap();
    }

    public Map<String, Bid> getBids() {
        return Bids;
    }

    public Bid getBids(String UID) {
        return Bids.get(UID);
    }

    public void setBids(Map<String, Bid> Bids) {
        this.Bids = Bids;
    }

    public void setBids(Bid bid) {
//        this.Bids.put(bid.getUID(), bid);
    }

    public void addBid(Bid bid) {

    }

    public void removeBids(String bid) {
//        this.Bids.remove(bid.getUID(), bid);
    }
}
