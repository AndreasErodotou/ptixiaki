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

//    Connection connection;
//    String url = "jdbc:postgresql://localhost:5432/ptixiaki";
//    String username = "postgres";
//    String password = "AndHer123!";
//
//    public Connection databaseConnection() throws ClassNotFoundException, SQLException {
//        Class.forName("org.postgresql.Driver");
//        connection = DriverManager.getConnection(url, username, password);
//        return connection;
//    }
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
//        SparkMain spMain = new SparkMain();
//        if (spMain.databaseConnection() == null) {
//            System.out.println("connection failed");
//        } else {
//            System.out.println("connection succeded");
//        }
//        PreparedStatement stmt;
//        stmt = spMain.connection.prepareStatement("SELECT * FROM public.\"BID\"");
//        ResultSet result = stmt.executeQuery();
//        while (result.next()) {
//            System.out.println(result.getString(1) + "\t" + result.getDouble(2) + "\t" + result.getDate(3) + "\t" + result.getBoolean(4) + "\t" + result.getString(5) + "\t" + result.getString(6));
//        }

        UserAPI userApi = new UserAPI();
        ReviewAPI reviewApi = new ReviewAPI();
        BidAPI bidApi = new BidAPI();
        ListingAPI listingApi = new ListingAPI();
        TimetableAPI timetableApi = new TimetableAPI();

        path("/management", () -> {
            before("/*", (req, res) -> res.type("application/json"));
            path("/users", () -> {

                get("", (req, res) -> userApi.getAllUsers(req, res));
                get("/*", (req, res) -> {
                    String param = req.splat()[0];
                    if (param.equals("customers")) {
                        return userApi.getAllCustomers(req, res);
                    } else if (param.equals("professionals")) {
                        return userApi.getAllProfessionals(req, res);
                    }
                    return userApi.getUser(req, res);
                });

                post("", (req, res) -> userApi.addUser(req, res));

                put("/:user", (req, res) -> userApi.editUser(req, res));

                delete("/:user", (req, res) -> userApi.deleteUser(req, res));

            });

            path("/reviews", () -> {

                get("", (req, res) -> {
                    if (req.queryParams("RID") != null) {
                        return reviewApi.getAReview(req, res);
                    } else if (req.queryParams("UID") != null) {
                        if (req.queryParams("TO_UID") != null) {
                            return reviewApi.getAllUserReviewsToAUser(req, res);
                        }
                        return reviewApi.getAllUserReviews(req, res);
                    } else if (req.queryParams("TO_UID") != null) {
                        return reviewApi.getAllReviewsMadeForAUser(req, res);
                    }
                    return reviewApi.getAllReviews(req, res);
                });

//                get("", (req, res) -> reviewApi.getAllReviews(req, res));
//
//                get("/:RID", (req, res) -> reviewApi.getAReview(req, res));
//
//                get("/from/:UID", (req, res) -> reviewApi.getAllUserReviews(req, res));
//
//                get("/to/:TO_UID", (req, res) -> reviewApi.getAllReviewsMadeForAUser(req, res));

                post("", (req, res) -> reviewApi.addAReview(req, res));

                put("/:RID", (req, res) -> reviewApi.editAReview(req, res));

                delete("/:RID", (req, res) -> reviewApi.deleteAReview(req, res));

            });

            path("/listings", () -> {

                get("", (req, res) -> listingApi.getAllListings(req, res));

                get("/:LID", (req, res) -> listingApi.getAListing(req, res));

                get("/from/:UID", (req, res) -> listingApi.getAllUserListings(req, res));

                post("", (req, res) -> listingApi.addAListing(req, res));

                put("/:LID", (req, res) -> listingApi.editAListing(req, res));

                delete("/:LID", (req, res) -> listingApi.deleteAListing(req, res));

            });

            path("/bids", () -> {

                get("", (req, res) -> bidApi.getAllBids(req, res));

                get("/:BID", (req, res) -> bidApi.getABid(req, res));

                get("/for/:LID", (req, res) -> bidApi.getAllBidsForAListing(req, res));

                get("/from/:UID", (req, res) -> bidApi.getAllUserBids(req, res));

                post("", (req, res) -> bidApi.addABid(req, res));

                put("/:BID", (req, res) -> bidApi.editABid(req, res));

                delete("/:BID", (req, res) -> bidApi.deleteABid(req, res));

            });

            path("/timetable_events", () -> {

                get("", (req, res) -> timetableApi.getAllTimetableEvents(req, res));

                get("/:UID", (req, res) -> timetableApi.getAllUserEvents(req, res));

                get("/:LID", (req, res) -> timetableApi.getATimetableEvent(req, res));

                post("", (req, res) -> timetableApi.addATimetableEvent(req, res));

                put("/:LID", (req, res) -> timetableApi.editATimetableEvent(req, res));

                delete("/:LID", (req, res) -> timetableApi.deleteATimetableEvent(req, res));

            });


        });

    }

}
