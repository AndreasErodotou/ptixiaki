/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api.data;

import com.google.gson.Gson;
import hy499.ptixiaki.data.Bid;
import hy499.ptixiaki.db.BidDB;
import hy499.ptixiaki.api.ServerResponseAPI;
import hy499.ptixiaki.api.ServerResponseAPI.Status;
import java.util.Map;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class BidAPI implements DataApi {

    private final BidDB bidDB;

    public BidAPI() throws ClassNotFoundException {
        bidDB = new BidDB();
    }

    public String createResponse(Response res, Map<String, Bid> bids, String[] msg) {
        res.header("Access-Control-Allow-Origin", "*");
        if (!bids.isEmpty()) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponseAPI(Status.SUCCESS,
                            msg[0],
                            new Gson().toJsonTree(bids)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponseAPI(Status.WARINING,
                        msg[1],
                        new Gson().toJsonTree(null)));
    }

    public String createResponse(Response res, Bid bid, Boolean bool, String[] msg) {
        res.header("Access-Control-Allow-Origin", "*");
        if (bool) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponseAPI(Status.SUCCESS,
                            msg[0],
                            new Gson().toJsonTree(bid)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponseAPI(Status.ERROR,
                        msg[1],
                        new Gson().toJsonTree(null)));
    }

    public String getReqHandler(Request req, Response res) throws ClassNotFoundException {
        System.out.println("Listings: getReqHandler");
        StringBuilder getQuery = new StringBuilder();
        Boolean test = false;
        if (req.queryParams("BID") != null) {
            getQuery.append("BID = ").append("'").append(req.queryParams("BID")).append("'");
            test = true;
        }
        if (req.queryParams("LID") != null) {
            getQuery.append((test) ? " and " : "");
            getQuery.append(" LID = ").append("'").append(req.queryParams("LID")).append("'");
            test = true;
        }
        if (req.queryParams("UID") != null) {
            getQuery.append((test) ? " and " : "");
            getQuery.append("UID = ").append("'").append(req.queryParams("UID")).append("'");
            test = true;
        }
        if (req.queryParams("selected") != null) {
            getQuery.append((test) ? " and " : "");
            getQuery.append(" selected = ").append(req.queryParams("selected"));
            test = true;
        }
        if (req.queryParams("COUNT") != null) {
            getQuery.append((test) ? " and " : "");
            getQuery.append("COUNT = ").append(req.queryParams("COUNT"));
        }
        if (!getQuery.toString().isEmpty()) {
            System.out.println(getQuery.toString());
            return getQuery(res, getQuery.toString());
        }

        return getAll(req, res);
    }

    @Override
    public String getAll(Request req, Response res) throws ClassNotFoundException {
        return new Gson().toJson(bidDB.getAll());
    }

    public String getQuery(Response res, String queryParams) throws ClassNotFoundException {
        return new Gson().toJson(bidDB.getQuery(queryParams));
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

    public String getAllSelectedBids(Request req, Response res) throws ClassNotFoundException {
        Boolean selected = Boolean.valueOf(req.queryParams("selected"));
        Map<String, Bid> listingBids = bidDB.getSelectedBids(selected);
        String[] msgs = {"All Selected Bids", "There Are No Selected Bids"};
        return createResponse(res, listingBids, msgs);
    }

    public String getAllUserSelectedBids(Request req, Response res) throws ClassNotFoundException {
        Boolean selected = Boolean.valueOf(req.queryParams("selected"));
        String UID = req.queryParams("UID");
        Map<String, Bid> listingBids = bidDB.getUserSelectedBids(selected, UID);
        String[] msgs = {"All Selected Bids", "There Are No Selected Bids"};
        return createResponse(res, listingBids, msgs);
    }

    @Override
    public String get(Request req, Response res) throws ClassNotFoundException {
        String BID = req.queryParams("BID");
        return new Gson().toJson(bidDB.get(BID));
    }

    @Override
    public String add(Request req, Response res) throws ClassNotFoundException {
        Bid bid = new Gson().fromJson(req.body(), Bid.class);
        return new Gson().toJson(bidDB.add(bid));
    }

    @Override
    public String edit(Request req, Response res) throws ClassNotFoundException {
        String BID = req.params(":BID");
        Bid bid = new Gson().fromJson(req.body(), Bid.class);
        return new Gson().toJson(bidDB.edit(bid));
    }

    @Override
    public String delete(Request req, Response res) throws ClassNotFoundException {
        String BID = req.params(":BID");
        return new Gson().toJson(bidDB.delete(BID));
    }

    public String deleteAllUserBids(Request req, Response res) throws ClassNotFoundException {
        String UID = req.params(":UID");
        Boolean deleted = bidDB.deleteUserBids(UID);
        String[] msgs = {"User Bids Deleted", "User Bids Cannot Be Deleted"};
        return createResponse(res, null, deleted, msgs);
    }

    public String deleteAllListingBids(Request req, Response res) throws ClassNotFoundException {
        String LID = req.params(":LID");
        Boolean deleted = bidDB.deleteListingBids(LID);
        String[] msgs = {"Bid Deleted", "Bid Cannot Be Deleted"};
        return createResponse(res, null, deleted, msgs);
    }

    public String countAllBidsForAListing(Request req, Response res) throws ClassNotFoundException {
        String LID = req.queryParams("COUNT");
        int listingBids = bidDB.countListingBids(LID);
        String[] msgs = {"Listing Bids", "There Are No Bids For This Listing"};
        System.out.println("There Are: " + listingBids + " Bids For This Listig ");
        return createResponse(res, null, true, msgs);
    }

    public String countAllUserBids(Request req, Response res) throws ClassNotFoundException {
        String UID = req.queryParams("COUNT");
        int userBids = bidDB.countListingBids(UID);
        String[] msgs = {"User Bids", "There Are No Bids From This User"};
        System.out.println("There Are: " + userBids + " Bids From This User ");
        return createResponse(res, null, true, msgs);
    }

    public String countAllSelectedBids(Request req, Response res) throws ClassNotFoundException {
        Boolean selected = Boolean.valueOf(req.queryParams("selected"));
        int userBids = bidDB.countSelectedBids(selected);
        String[] msgs = {"Selected Bids", "There Are No Selected Bids"};
        return createResponse(res, null, true, msgs);
    }

    @Override
    public String getQuery(Request req, Response res) throws ClassNotFoundException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
