/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api.data;

import com.google.gson.Gson;
import hy499.ptixiaki.data.Listing;
import hy499.ptixiaki.db.ListingDB;
import hy499.ptixiaki.api.ServerResponseAPI;
import java.sql.SQLException;
import java.util.UUID;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class ListingAPI implements DataApi {

    private final ListingDB listingDB;

    public ListingAPI() throws ClassNotFoundException, SQLException {
        listingDB = new ListingDB();
    }

    private String getAllUserListings(Request req, Response res) throws ClassNotFoundException {
        String UID = req.queryParams("UID");
        return new Gson().toJson(listingDB.get(UID)); //todo: ilopiw to swsto function sto DB
    }

    @Override
    public String get(Request req, Response res) throws ClassNotFoundException {
        String LID = req.queryParams("LID");
        return new Gson().toJson(listingDB.get(LID));
    }

    @Override
    public String getQuery(Request req, Response res) throws ClassNotFoundException {
        if (req.queryParams("LID") != null) {
            return get(req, res);
        } else if (req.queryParams("UID") != null) {
            return getAllUserListings(req, res);
        }
        return getAll(req, res);
    }

    @Override
    public String getAll(Request req, Response res) throws ClassNotFoundException {
        return new Gson().toJson(listingDB.getAll());
    }

    @Override
    public String add(Request req, Response res) throws ClassNotFoundException {
        Listing listing = new Gson().fromJson(req.body(), Listing.class);
        listing.setLID(UUID.randomUUID().toString());
        ServerResponseAPI serverRes = listingDB.add(listing);
        return new Gson().toJson(serverRes);
    }

    @Override
    public String edit(Request req, Response res) throws ClassNotFoundException {
        String LID = req.params(":LID");
        Listing listing = new Gson().fromJson(req.body(), Listing.class);
        listing.setLID(LID);
        return new Gson().toJson(listingDB.edit(listing));
    }

    @Override
    public String delete(Request req, Response res) throws ClassNotFoundException {
        String LID = req.params(":LID");
        return new Gson().toJson(listingDB.delete(LID));
    }
}
