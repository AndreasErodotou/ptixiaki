package hy499.ptixiaki.servicelink;

import com.google.gson.Gson;
import hy499.ptixiaki.api.data.ListingAPI;
import hy499.ptixiaki.api.data.UserAPI;
import hy499.ptixiaki.api.data.BidAPI;
import hy499.ptixiaki.api.data.TimetableAPI;
import hy499.ptixiaki.api.data.ReviewAPI;
import hy499.ptixiaki.api.AuthorizerApi;
import hy499.ptixiaki.api.ServerResponseAPI;
import hy499.ptixiaki.api.StatisticsAPI;
import java.sql.SQLException;
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


    public static void addHeaders(Response res) {
        res.status(200);

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me, Authorization, token");
    }

    public static void main(String[] args) throws ClassNotFoundException, SQLException {

        UserAPI userApi = new UserAPI();
        ReviewAPI reviewApi = new ReviewAPI();
        BidAPI bidApi = new BidAPI();
        ListingAPI listingApi = new ListingAPI();
        TimetableAPI timetableApi = new TimetableAPI();
        StatisticsAPI statisticsApi = new StatisticsAPI();
        AuthorizerApi authApi = new AuthorizerApi();

        options("/*", (req, res) -> {
            return new Gson().toJson(new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "cors headers added"));
        });

        after("/*", (req, res) -> addHeaders(res));

//        before("/*", (req, res) -> {
//            addHeaders(res);
//            authApi.isAuthorized(req, res, AuthorizerApi.AuthType.LISTING);
//        });

        path("/api", () -> {


            post("/login", (req, res) -> authApi.isAuthenticated(req, res));

            path("/users", () -> {

//                before("/*", (req, res) -> {
//                    System.out.println(req.headers());
//                    new JwtAPI().parseJWT(req.headers("token"));
//                });

                path("/:UID/listings", () -> {

                    path(":LID/bids", () -> {

                        get("", (req, res) -> bidApi.getReqHandler(req, res));

                        post("", (req, res) -> bidApi.add(req, res));

                        put("/:BID", (req, res) -> bidApi.edit(req, res));

                        delete("/:BID", (req, res) -> bidApi.delete(req, res));


                    });

                    //Listings
                    get("", (req, res) -> listingApi.getQuery(req, res));

                    get("/:LID", (req, res) -> listingApi.get(req, res));

                    post("", (req, res) -> listingApi.add(req, res));

                    put("/:LID", (req, res) -> listingApi.edit(req, res));

                    delete("/:LID", (req, res) -> listingApi.delete(req, res));

                });

                path("/:UID/reviews", () -> {

                    get("", (req, res) -> reviewApi.getQuery(req, res));

                    post("", (req, res) -> reviewApi.add(req, res));

                    put("/:RID", (req, res) -> reviewApi.edit(req, res));

                    delete("/:RID", (req, res) -> reviewApi.delete(req, res));

                });

//                path("/:UID/timetable_events", () -> {
//
//                    get("", (req, res) -> timetableApi.getReqHandler(req, res));
//
//                    post("", (req, res) -> timetableApi.addATimetableEvent(req, res));
//
//                    put("/:LID", (req, res) -> timetableApi.editATimetableEvent(req, res));
//
//                    delete("/:LID", (req, res) -> timetableApi.deleteATimetableEvent(req, res));
//
//                    options("", (req, res) -> optionFunc(req, res));
//
//                });

                //Users
                get("", (req, res) -> userApi.getQuery(req, res));

                get("/:UID", (req, res) -> userApi.getReqPathHandler(req, res));

                post("", (req, res) -> userApi.add(req, res));

                put("/:UID", (req, res) -> userApi.edit(req, res));

                delete("/:UID", (req, res) -> userApi.delete(req, res));

            });

            path("/reviews", () -> {

                get("", (req, res) -> reviewApi.getQuery(req, res));

                post("", (req, res) -> reviewApi.add(req, res));

                put("/:RID", (req, res) -> reviewApi.edit(req, res));

                delete("/:RID", (req, res) -> reviewApi.delete(req, res));

            });

//            before("/listings", (req, res) -> {
//                authApi.isAuthorized(req, res, AuthorizerApi.AuthType.LISTING);
//                if (!authApi.isAuthorized(req, res, AuthorizerApi.AuthType.LISTING)) {
//                    System.out.println("halting...");
//                    res.body(new Gson().toJson(new ServerResponseAPI(ServerResponseAPI.Status.ERROR, "You Are Unauthorized")));
//                    halt(403, "You Are Unauthorized");
//                }
//            });

//            options("/listings", (req, res) -> {
//                return new Gson().toJson(new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "cors headers added"));
//            });

//            after("/listings", (req, res) -> {
//                System.out.println("listings: headers added");
//                addHeaders(res);
//            });

            path("/listings", () -> {


                path("/:LID/bids", () -> {
                    
                    get("", (req, res) -> bidApi.getReqHandler(req, res));

                    post("", (req, res) -> bidApi.add(req, res));

                    put("/:BID", (req, res) -> bidApi.edit(req, res));

                    delete("/:BID", (req, res) -> bidApi.delete(req, res));

                });

                get("", (req, res) -> listingApi.getQuery(req, res));

                get("/:LID", (req, res) -> listingApi.get(req, res));

                post("", (req, res) -> listingApi.add(req, res));

                put("/:LID", (req, res) -> listingApi.edit(req, res));

                delete("/:LID", (req, res) -> listingApi.delete(req, res));


            });

            path("/bids", () -> {

                get("", (req, res) -> bidApi.getReqHandler(req, res));

                post("", (req, res) -> bidApi.add(req, res));

                put("/:BID", (req, res) -> bidApi.edit(req, res));

                delete("/:BID", (req, res) -> bidApi.delete(req, res));


            });

            path("/statistics", () -> {

                get("/:UID", (req, res) -> statisticsApi.getAll(req, res));

            });
        });

    }

}
