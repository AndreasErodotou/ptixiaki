package hy499.ptixiaki.main;

//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
import java.sql.SQLException;
import static spark.Spark.*;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author Andreas
 */
public class SparkMain {

    public static void main(String[] args) throws ClassNotFoundException, SQLException {

        UserAPI userApi = new UserAPI();
        ReviewAPI reviewApi = new ReviewAPI();
        BidAPI bidApi = new BidAPI();
        ListingAPI listingApi = new ListingAPI();
        TimetableAPI timetableApi = new TimetableAPI();

        path("/management", () -> {
            before("/*", (req, res) -> res.type("application/json"));
            path("/users", () -> {

                get("", (req, res) -> userApi.getAllUsers(req, res));

                get("/*", (req, res) -> userApi.getReqHandler(req, res));

                post("", (req, res) -> userApi.addUser(req, res));

                put("/:UID", (req, res) -> userApi.editUser(req, res));

                delete("/:UID", (req, res) -> userApi.deleteUser(req, res));

            });

            path("/reviews", () -> {

                get("", (req, res) -> reviewApi.getReqHandler(req, res));

                post("", (req, res) -> reviewApi.addAReview(req, res));

                put("/:RID", (req, res) -> reviewApi.editAReview(req, res));

                delete("/:RID", (req, res) -> reviewApi.deleteAReview(req, res));

            });

            path("/listings", () -> {

                get("", (req, res) -> listingApi.getReqHandler(req, res));

                post("", (req, res) -> listingApi.addAListing(req, res));

                put("/:LID", (req, res) -> listingApi.editAListing(req, res));

                delete("/:LID", (req, res) -> listingApi.deleteAListing(req, res));

            });

            path("/bids", () -> {

                get("", (req, res) -> bidApi.getReqHandler(req, res));

                post("", (req, res) -> bidApi.addABid(req, res));

                put("/:BID", (req, res) -> bidApi.editABid(req, res));

                delete("/:BID", (req, res) -> bidApi.deleteABid(req, res));

            });

            path("/timetable_events", () -> {

                get("", (req, res) -> timetableApi.getReqHandler(req, res));

                post("", (req, res) -> timetableApi.addATimetableEvent(req, res));

                put("/:LID", (req, res) -> timetableApi.editATimetableEvent(req, res));

                delete("/:LID", (req, res) -> timetableApi.deleteATimetableEvent(req, res));

            });


        });

    }

}
