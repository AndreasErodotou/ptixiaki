/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api;

import com.google.gson.Gson;
import hy499.ptixiaki.api.ServerResponseAPI.Status;
import hy499.ptixiaki.data.Professional;
import hy499.ptixiaki.data.Token;
import hy499.ptixiaki.data.User;
import hy499.ptixiaki.db.UserDB;
import java.sql.SQLException;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class AuthorizerApi {

    private final JwtAPI jwtApi;

    public AuthorizerApi() {
        jwtApi = new JwtAPI();
    }

    public Boolean isAuthorized(String token) {

        Token parsedToken = jwtApi.parseJWT(token);
        if (parsedToken != null) {
//            User user =
            System.out.println("is authorized");
            return true;
        }
        return false;
    }

    public String isAuthenticated(Request req, Response res) throws SQLException, ClassNotFoundException {
        User user = new Gson().fromJson(req.body(), Professional.class);
        User authUser = new UserDB().checkLogin(user.getEmail(), user.getPassword());
        if (authUser != null) {
            String token = jwtApi.createJwt(authUser.getUID(), authUser.getUsername(), User.AccountType.CUSTOMER);

            return new Gson().toJson(new ServerResponseAPI(Status.SUCCESS, "Login Success", token));
        }

        return new Gson().toJson(new ServerResponseAPI(Status.ERROR, "User Athentication Fail!!!"));
    }

    public enum authType {
        USER, LISTING, BID, REVIEW
    }
}
