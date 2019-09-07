/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.main;

import com.google.gson.Gson;
import hy499.ptixiaki.data.Bid;
import hy499.ptixiaki.db.BidDB;
import hy499.ptixiaki.response.ServerResponse;
import hy499.ptixiaki.response.ServerResponse.Status;
import java.util.Map;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class BidAPI {
//    private BidService bidService;

    private BidDB bidDB;

    public BidAPI() throws ClassNotFoundException {
        bidDB = new BidDB();
    }

    public String createResponse(Response res, Map<String, Bid> bids, String[] msg) {
        res.header("Access-Control-Allow-Origin", "*");
        if (!bids.isEmpty()) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            msg[0],
                            new Gson().toJsonTree(bids)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.WARINING,
                        msg[1],
                        new Gson().toJsonTree(null)));
    }

    public String createResponse(Response res, Bid bid, Boolean bool, String[] msg) {
        res.header("Access-Control-Allow-Origin", "*");
        if (bool) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            msg[0],
                            new Gson().toJsonTree(bid)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.ERROR,
                        msg[1],
                        new Gson().toJsonTree(null)));
    }

    public String getReqHandler(Request req, Response res) throws ClassNotFoundException {
        if (req.queryParams("BID") != null) {
            return getABid(req, res);
        } else if (req.queryParams("LID") != null) {
            return getAllBidsForAListing(req, res);
        } else if (req.queryParams("UID") != null) {
            return getAllUserBids(req, res);
        } else if (req.queryParams("selected") != null) {
//            return getAllSelectedBids(req, res);
        }
        return getAllBids(req, res);
    }

    public String getAllBids(Request req, Response res) throws ClassNotFoundException {
        Map<String, Bid> bids = bidDB.getBids();
        String[] msgs = {"All Bids", "There Are No Bids"};
        return createResponse(res, bids, msgs);
    }

    public String getAllUserBids(Request req, Response res) throws ClassNotFoundException {
        String UID = req.queryParams("UID");
        Map<String, Bid> bids = bidDB.getUserBids(UID);
        String[] msgs = {"User Bids", "There Are No Bids From This User"};
        return createResponse(res, bids, msgs);
    }

    public String getAllBidsForAListing(Request req, Response res) throws ClassNotFoundException {
        String LID = req.queryParams("LID");
        Map<String, Bid> listingBids = bidDB.getListingBids(LID);
        String[] msgs = {"Listing Bids", "There Are No Bids For This Listing"};
        return createResponse(res, listingBids, msgs);
    }

//    public String getAllSelectedBids(Request req, Response res) {
//        Boolean selected = Boolean.valueOf(req.queryParams("selected"));
//        Map<String, Bid> listingBids = bidService.getSelectedBids(selected);
//        return createResponse(res, listingBids);
//    }

    public String getABid(Request req, Response res) throws ClassNotFoundException {
        String BID = req.queryParams("BID");
        Bid bid = bidDB.getBid(BID);
        String[] msgs = {"Bid With BID = " + BID, "There Is No Bid with BID = " + BID};
        return createResponse(res, bid, bid != null, msgs);
    }

    public String addABid(Request req, Response res) throws ClassNotFoundException {
        Bid bid = new Gson().fromJson(req.body(), Bid.class);
        Bid dbBid = bidDB.addBID(bid);
        String[] msgs = {"Bid Added", "Bid Cannot Be Added"};
        return createResponse(res, dbBid, dbBid != null, msgs);
    }

    public String editABid(Request req, Response res) throws ClassNotFoundException {
        String BID = req.params(":BID");
        Bid bid = new Gson().fromJson(req.body(), Bid.class);
        bid.setBID(BID);
        Bid editedBid = bidDB.updateBid(bid);
        String[] msgs = {"Bid Edited", "Bid Cannot Be Edited"};
        return createResponse(res, editedBid, editedBid != null, msgs);
    }

    public String deleteABid(Request req, Response res) throws ClassNotFoundException {
        String BID = req.params(":BID");
        Boolean deleted = bidDB.deleteBid(BID);
        String[] msgs = {"Bid Deleted", "Bid Cannot Be Deleted"};
        return createResponse(res, null, deleted, msgs);
    }

//    public BidService getBidService() {
//        return bidService;
//    }
//
//    public void setBidService(BidService bidService) {
//        this.bidService = bidService;
//    }

}
