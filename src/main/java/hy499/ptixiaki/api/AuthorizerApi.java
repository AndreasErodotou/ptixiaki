/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api;

import com.google.gson.Gson;
import hy499.ptixiaki.api.ServerResponseAPI.Status;
import hy499.ptixiaki.data.Bid;
import hy499.ptixiaki.data.Customer;
import hy499.ptixiaki.data.Listing;
import hy499.ptixiaki.data.Professional;
import hy499.ptixiaki.data.Review;
import hy499.ptixiaki.data.Token;
import hy499.ptixiaki.data.User;
import hy499.ptixiaki.db.BidDB;
import hy499.ptixiaki.db.ListingDB;
import hy499.ptixiaki.db.ReviewDB;
import hy499.ptixiaki.db.UserDB;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import static spark.Spark.halt;

/**
 *
 * @author Andreas
 */
public class AuthorizerApi {

    private final JwtAPI jwtApi;

    public AuthorizerApi() {
        jwtApi = new JwtAPI();
    }

    private Boolean isTokenValid(String token) {
        Token parsedToken = jwtApi.parseJWT(token);
        if (parsedToken != null) {
            System.out.println("The Token Is Valid");
            return true;
        }
        halt(403, "You Are Unauthorized: Invalid Token");
        return false;
    }

    public Boolean isAuthorized(Request req) throws SQLException, ClassNotFoundException {
        String jwtToken = req.headers("Authorization");
        System.out.println("jwtToken = " + jwtToken);
        System.out.println("request method:" + req.requestMethod());
        System.out.println("request contextPath:" + req.contextPath());
        System.out.println("request contextPath:" + req.pathInfo());
        if ("OPTIONS".equals(req.requestMethod())
                || "/api/login".equals(req.pathInfo()) && "POST".equals(req.requestMethod())
                || "/api/users".equals(req.pathInfo()) && "GET".equals(req.requestMethod())
                || "/api/users".equals(req.pathInfo()) && "POST".equals(req.requestMethod())) {
            System.out.println("ok");
            return true;
        }
        return isTokenValid(jwtToken);
    }

    public Boolean isAuthorized(Request req, Response res, AuthType authType) throws SQLException, ClassNotFoundException {
        String jwtToken = req.headers("Authorization");

        System.out.println("jwtToken = " + jwtToken);

        if (isTokenValid(jwtToken)) {
            Token parsedToken = jwtApi.parseJWT(jwtToken);
            String UID = new Gson().fromJson(req.body(), Customer.class).getUID();
            System.out.println("attribute UID: " + UID);
            if (authTypeDispatcher(req, parsedToken.getUserId(), authType)) {
                System.out.println("User is Authorized");
                return true;
            }
            halt(403, "You Are Unauthorized for this operation");
        }
        return false;
    }

    public Boolean authTypeDispatcher(Request req, String tokenUserID, AuthType type) throws SQLException, ClassNotFoundException {
        String ID;
        String UID;
        String reqMethod = req.requestMethod();
        if ("PUT".equals(reqMethod) || "DELETE".equals(reqMethod)) {
            switch (type) {
                case USER:
                    ID = new Gson().fromJson(req.body(), Customer.class).getUID();
                    return new UserDB().get(ID).getData().getAsString().contains(tokenUserID);
                case LISTING:
                    ID = new Gson().fromJson(req.body(), Listing.class).getLID();
                    return new ListingDB().get(ID).getData().getAsString().contains(tokenUserID);
                case BID:
                    ID = new Gson().fromJson(req.body(), Bid.class).getBID();
                    return new BidDB().get(ID).getData().getAsString().contains(tokenUserID);
                case REVIEW:
                    ID = new Gson().fromJson(req.body(), Review.class).getRID();
                    return new ReviewDB().get(ID).getData().getAsString().contains(tokenUserID);
                default:
                    return false;
            }
        }
        return true;
    }

    public String isAuthenticated(Request req, Response res) throws SQLException, ClassNotFoundException {
        System.out.println("request method:" + req.requestMethod());
        if ("OPTIONS".equals(req.requestMethod())) {
            System.out.println("ok");
            return "true";
        }
        User user = new Gson().fromJson(req.body(), Professional.class);
        User authUser = new UserDB().checkLogin(user.getEmail(), user.getPassword());
        if (authUser != null) {
            String token = jwtApi.createJwt(authUser.getUID(), authUser.getUsername(), authUser.getAccountType());
            Map<String, String> userDetails = new HashMap<>();
            userDetails.put("userId", authUser.getUID());
            userDetails.put("username", authUser.getUsername());
            userDetails.put("accountType", authUser.getAccountType().toString());
            return new Gson().toJson(new ServerResponseAPI(Status.SUCCESS, "Login Success", token, new Gson().toJsonTree(userDetails)));
        }
        return new Gson().toJson(new ServerResponseAPI(Status.ERROR, "User Athentication Fail!!!"));
    }

    public enum AuthType {
        USER, LISTING, BID, REVIEW
    }

    public enum AuthMethod {
        GET, POST, PUT, DELETE
    }
}
