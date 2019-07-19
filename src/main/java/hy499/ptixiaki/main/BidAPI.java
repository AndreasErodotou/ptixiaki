/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.main;

import com.google.gson.Gson;
import hy499.ptixiaki.services.BidService;
import hy499.ptixiaki.data.Bid;
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
    private BidService bidService;

    public BidAPI() {
        bidService = new BidService();
    }

    public String createResponse(Response res, Map<String, Bid> bids) {
        if (!bids.isEmpty()) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            bidService.getBidMsg(),
                            new Gson().toJsonTree(bids)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.WARINING,
                        bidService.getBidMsg(),
                        new Gson().toJsonTree(null)));
    }

    public String createResponse(Response res, Bid bid, Boolean bool) {
        if (bool) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            bidService.getBidMsg(),
                            new Gson().toJsonTree(bid)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.ERROR,
                        bidService.getBidMsg(),
                        new Gson().toJsonTree(null)));
    }

    public String getAllBids(Request req, Response res) {
        Map<String, Bid> bids = bidService.getBids();
        return createResponse(res, bids);
    }

    public String getAllUserBids(Request req, Response res) {
        String UID = req.params(":UID");
        Map<String, Bid> bids = bidService.getBidsFromAUser(UID);
        return createResponse(res, bids);
    }

    public String getAllBidsForAListing(Request req, Response res) {
        String LID = req.params(":LID");
        Map<String, Bid> listingBids = bidService.getListingBids(LID);
        return createResponse(res, listingBids);
    }

    public String getABid(Request req, Response res) {
        String BID = req.params(":BID");
        Bid bid = bidService.getBid(BID);
        return createResponse(res, bid, bid != null);
    }

    public String addABid(Request req, Response res) {
        Bid bid = new Gson().fromJson(req.body(), Bid.class);
        return createResponse(res, bid, bidService.addBid(bid));
    }

    public String editABid(Request req, Response res) {
        String BID = req.params(":BID");
        Bid bid = new Gson().fromJson(req.body(), Bid.class);
        bid.setBID(BID);
        Bid editedBid = bidService.editBid(bid);
        return createResponse(res, editedBid, editedBid != null);
    }

    public String deleteABid(Request req, Response res) {
        String BID = req.params(":BID");
        Bid bid = bidService.deleteBid(BID);
        return createResponse(res, bid, bid != null);
    }

    public BidService getBidService() {
        return bidService;
    }

    public void setBidService(BidService bidService) {
        this.bidService = bidService;
    }

}
