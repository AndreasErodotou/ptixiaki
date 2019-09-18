package hy499.ptixiaki.main;

//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
import com.google.gson.Gson;
import hy499.ptixiaki.response.ServerResponse;
import java.sql.SQLException;
import spark.Request;
import spark.Response;
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

    public static String optionFunc(Request req, Response res) {
        res.status(200);

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.header("Access-Control-Max-Age", "3600");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");

        return new Gson()
                .toJson(new ServerResponse(ServerResponse.Status.SUCCESS,
                        "",
                        new Gson().toJsonTree("")));

    }

    public static void main(String[] args) throws ClassNotFoundException, SQLException {

        UserAPI userApi = new UserAPI();
        ReviewAPI reviewApi = new ReviewAPI();
        BidAPI bidApi = new BidAPI();
        ListingAPI listingApi = new ListingAPI();
        TimetableAPI timetableApi = new TimetableAPI();

        path("/api", () -> {
            before("/*", (req, res) -> res.type("application/json"));
            // /users/:UID/listings/:LID/bids/:BID
            // diaforetika:
            // /users/*/listings/*/bids/*
            path("/users", () -> {

                path("/:UID/listings", () -> {

                    path(":LID/bids", () -> {

                        get("", (req, res) -> bidApi.getReqHandler(req, res));

                        post("", (req, res) -> bidApi.addABid(req, res));

                        put("/:BID", (req, res) -> bidApi.editABid(req, res));

                        delete("/:BID", (req, res) -> bidApi.deleteABid(req, res));

                        options("", (req, res) -> optionFunc(req, res));

                    });

                    //Listings
                    get("", (req, res) -> listingApi.getReqHandler(req, res));

                    post("", (req, res) -> listingApi.addAListing(req, res));

                    put("/:LID", (req, res) -> listingApi.editAListing(req, res));

                    delete("/:LID", (req, res) -> listingApi.deleteAListing(req, res));

                    options("", (req, res) -> optionFunc(req, res));

                });

                path("/:UID/reviews", () -> {

                    get("", (req, res) -> reviewApi.getReqHandler(req, res));

                    post("", (req, res) -> reviewApi.addAReview(req, res));

                    put("/:RID", (req, res) -> reviewApi.editAReview(req, res));

                    delete("/:RID", (req, res) -> reviewApi.deleteAReview(req, res));

                    options("", (req, res) -> optionFunc(req, res));

                });

                path("/:UID/timetable_events", () -> {

                    get("", (req, res) -> timetableApi.getReqHandler(req, res));

                    post("", (req, res) -> timetableApi.addATimetableEvent(req, res));

                    put("/:LID", (req, res) -> timetableApi.editATimetableEvent(req, res));

                    delete("/:LID", (req, res) -> timetableApi.deleteATimetableEvent(req, res));

                    options("", (req, res) -> optionFunc(req, res));

                });

                //Users
                get("", (req, res) -> userApi.getReqQueryHandler(req, res));

                get("/:UID", (req, res) -> userApi.getReqPathHandler(req, res));

                post("", (req, res) -> userApi.addUser(req, res));

                put("/:UID", (req, res) -> userApi.editUser(req, res));

                delete("/:UID", (req, res) -> userApi.deleteUser(req, res));

                options("", (req, res) -> optionFunc(req, res));

            });

            path("/reviews", () -> {

                get("", (req, res) -> reviewApi.getReqHandler(req, res));

                post("", (req, res) -> reviewApi.addAReview(req, res));

                put("/:RID", (req, res) -> reviewApi.editAReview(req, res));

                delete("/:RID", (req, res) -> reviewApi.deleteAReview(req, res));

                options("", (req, res) -> optionFunc(req, res));

            });

            path("/listings", () -> {

                path("/:LID/bids", () -> {

                    get("", (req, res) -> bidApi.getReqHandler(req, res));

                    post("", (req, res) -> bidApi.addABid(req, res));

                    put("/:BID", (req, res) -> bidApi.editABid(req, res));

                    delete("/:BID", (req, res) -> bidApi.deleteABid(req, res));

                    options("", (req, res) -> optionFunc(req, res));

                });

                get("", (req, res) -> listingApi.getReqHandler(req, res));

                post("", (req, res) -> listingApi.addAListing(req, res));

                put("/:LID", (req, res) -> listingApi.editAListing(req, res));

                delete("/:LID", (req, res) -> listingApi.deleteAListing(req, res));

                options("", (req, res) -> optionFunc(req, res));

            });

            path("/bids", () -> {

                get("", (req, res) -> bidApi.getReqHandler(req, res));

                post("", (req, res) -> bidApi.addABid(req, res));

                put("/:BID", (req, res) -> bidApi.editABid(req, res));

                delete("/:BID", (req, res) -> bidApi.deleteABid(req, res));

                options("", (req, res) -> optionFunc(req, res));

            });

            path("/timetable_events", () -> {

                get("", (req, res) -> timetableApi.getReqHandler(req, res));

                post("", (req, res) -> timetableApi.addATimetableEvent(req, res));

                put("/:LID", (req, res) -> timetableApi.editATimetableEvent(req, res));

                delete("/:LID", (req, res) -> timetableApi.deleteATimetableEvent(req, res));

                options("", (req, res) -> optionFunc(req, res));

            });

        });

    }

}
