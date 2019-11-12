package hy499.ptixiaki.servicelink;

//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
import hy499.ptixiaki.api.data.ListingAPI;
import hy499.ptixiaki.api.data.UserAPI;
import hy499.ptixiaki.api.data.BidAPI;
import hy499.ptixiaki.api.data.TimetableAPI;
import hy499.ptixiaki.api.data.ReviewAPI;
import com.google.gson.Gson;
import hy499.ptixiaki.api.AuthorizerApi;
import hy499.ptixiaki.api.JwtAPI;
import hy499.ptixiaki.api.ServerResponseAPI;
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
public class ServiceLinkMain {


    public static String optionFunc(Request req, Response res) {
        res.status(200);

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.header("Access-Control-Max-Age", "3600");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");

        return new Gson()
                .toJson(new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS,
                        "",
                        new Gson().toJsonTree("")));

    }



    public static void main(String[] args) throws ClassNotFoundException, SQLException {

        UserAPI userApi = new UserAPI();
        ReviewAPI reviewApi = new ReviewAPI();
        BidAPI bidApi = new BidAPI();
        ListingAPI listingApi = new ListingAPI();
        TimetableAPI timetableApi = new TimetableAPI();
        AuthorizerApi authApi = new AuthorizerApi();

        path("/api", () -> {
            before("/*", (req, res) -> res.type("application/json"));

            // /users/:UID/listings/:LID/bids/:BID
            // diaforetika:
            // /users/*/listings/*/bids/*

            // skeftome pou kai pos 8a mpoun oi elenxoi gia to authorization
            // isos xriasti na ftia3w kenourgio class gia tin diaxirisis
            // isos ftiaxti akoma kai gia to jwt ena class

            post("/login", (req, res) -> {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Credentials", "true");
                res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
                res.header("Access-Control-Max-Age", "3600");
                res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
                return authApi.isAuthenticated(req, res);
            });

            options("", (req, res) -> optionFunc(req, res));

            path("/users", () -> {

                before("/*", (req, res) -> {
                    System.out.println(req.headers());
                    new JwtAPI().parseJWT(req.headers("test"));
                });

                path("/:UID/listings", () -> {

                    path(":LID/bids", () -> {

                        get("", (req, res) -> bidApi.getReqHandler(req, res));

                        post("", (req, res) -> bidApi.addABid(req, res));

                        put("/:BID", (req, res) -> bidApi.editABid(req, res));

                        delete("/:BID", (req, res) -> bidApi.deleteABid(req, res));

                        options("", (req, res) -> optionFunc(req, res));

                    });

                    //Listings
                    get("", (req, res) -> listingApi.getQuery(req, res));

                    get("/:LID", (req, res) -> listingApi.get(req, res));

                    post("", (req, res) -> listingApi.add(req, res));

                    put("/:LID", (req, res) -> listingApi.edit(req, res));

                    delete("/:LID", (req, res) -> listingApi.delete(req, res));

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

            before("/listings", (req, res) -> {
                System.out.println(req.headers());
                authApi.isAuthorized(req.headers("test"));
            });

            path("/listings", () -> {


                path("/:LID/bids", () -> {
                    
                    get("", (req, res) -> bidApi.getReqHandler(req, res));

                    post("", (req, res) -> bidApi.addABid(req, res));

                    put("/:BID", (req, res) -> bidApi.editABid(req, res));

                    delete("/:BID", (req, res) -> bidApi.deleteABid(req, res));

                    options("", (req, res) -> optionFunc(req, res));

                });

                get("", (req, res) -> listingApi.getQuery(req, res));

                get("/:LID", (req, res) -> listingApi.get(req, res));

                post("", (req, res) -> listingApi.add(req, res));

                put("/:LID", (req, res) -> listingApi.edit(req, res));

                delete("/:LID", (req, res) -> listingApi.delete(req, res));

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
