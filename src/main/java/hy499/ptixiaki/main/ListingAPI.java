/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.main;

import com.google.gson.Gson;
import hy499.ptixiaki.services.ListingService;
import hy499.ptixiaki.data.Listing;
import hy499.ptixiaki.response.ServerResponse;
import hy499.ptixiaki.response.ServerResponse.Status;
import java.sql.SQLException;
import java.util.Map;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class ListingAPI {
    private ListingService listingService;

    public ListingAPI() throws SQLException {
        this.listingService = new ListingService();
    }

    public String createResponse(Response res, Map<String, Listing> listings) {
        if (!listings.isEmpty()) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            listingService.getListingMsg(),
                            new Gson().toJsonTree(listings)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.WARINING,
                        listingService.getListingMsg(),
                        new Gson().toJsonTree(null)));
    }

    public String createResponse(Response res, Listing listing, Boolean bool) {
        if (bool) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            listingService.getListingMsg(),
                            new Gson().toJsonTree(listing)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.ERROR,
                        listingService.getListingMsg(),
                        new Gson().toJsonTree(null)));
    }

    public String getReqHandler(Request req, Response res) {
        if (req.queryParams("LID") != null) {
            return getAListing(req, res);
        } else if (req.queryParams("UID") != null) {
            return getAllUserListings(req, res);
        }
        return getAllListings(req, res);
    }

    public String getAllListings(Request req, Response res) {

        Map<String, Listing> listings = listingService.getListings();
        return createResponse(res, listings);
    }

    public String getAllUserListings(Request req, Response res) {
        String UID = req.queryParams("UID");
        Map<String, Listing> listings = listingService.getUserListings(UID);
        return createResponse(res, listings);
    }

    public String getAListing(Request req, Response res) {
        String LID = req.queryParams("LID");
        Listing listing = listingService.getListing(LID);
        return createResponse(res, listing, listing != null);
    }

    public String addAListing(Request req, Response res) {
        Listing listing = new Gson().fromJson(req.body(), Listing.class);
        return createResponse(res, listing, listingService.addListing(listing));
    }

    public String editAListing(Request req, Response res) {
        String LID = req.params(":LID");
        Listing listing = new Gson().fromJson(req.body(), Listing.class);
        listing.setLID(LID);
        Listing editedListing = listingService.editListing(listing);
        return createResponse(res, editedListing, editedListing != null);
    }

    public String deleteAListing(Request req, Response res) {
        String LID = req.params(":LID");
        Listing listing = listingService.deleteListing(LID);
        return createResponse(res, listing, listing != null);
    }

    public ListingService getListingService() {
        return listingService;
    }

    public void setListingService(ListingService listingService) {
        this.listingService = listingService;
    }
}
