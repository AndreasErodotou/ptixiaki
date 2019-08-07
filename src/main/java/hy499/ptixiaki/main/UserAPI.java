/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.main;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import hy499.ptixiaki.services.UserService;
import hy499.ptixiaki.data.Customer;
import hy499.ptixiaki.data.Professional;
import hy499.ptixiaki.data.User;
import hy499.ptixiaki.response.ServerResponse;
import hy499.ptixiaki.response.ServerResponse.Status;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Map;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class UserAPI {

    UserService userService;
    Gson gson;
    public UserAPI() throws SQLException, ClassNotFoundException {
        userService = new UserService();
        gson = new GsonBuilder().setDateFormat("dd-MMM-yyyy").create();
    }

    public void addHeaders(Response res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.header("Access-Control-Max-Age", "3600");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
    }

    public String createResponse(Response res, Map<String, User> users) {
        addHeaders(res);
        if (!users.isEmpty()) {

            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            userService.getUserMsg(),
                            new Gson().toJsonTree(users)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.WARINING,
                        userService.getUserMsg(),
                        new Gson().toJsonTree(null)));
    }

    public String createResponse(Response res, User user, Boolean bool) {
        addHeaders(res);
        if (bool) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            userService.getUserMsg(),
                            new Gson().toJsonTree(user)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.ERROR,
                        userService.getUserMsg(),
                        new Gson().toJsonTree(null)));
    }

    public String createResponse(Response res, Boolean isAvailable) {
        addHeaders(res);
        res.status(200);

        return new Gson()
                .toJson(new ServerResponse(Status.SUCCESS,
                        userService.getUserMsg(),
                        new Gson().toJsonTree(isAvailable)));
    }

    public String getReqQueryHandler(Request req, Response res) throws ClassNotFoundException {
        if (req.queryParams("email") != null) {
            return checkUserEmail(req, res);
        } else if (req.queryParams("username") != null) {
            return checkUserUsername(req, res);
        }
        return getAllUsers(req, res);
    }

    public String getReqPathHandler(Request req, Response res) throws ClassNotFoundException {
        String param = req.splat()[0];
        if (param.equals("customers")) {
            return getAllCustomers(req, res);
        } else if (param.equals("professionals")) {
            return getAllProfessionals(req, res);
        } else if (req.queryParams("email") != null) {
            return checkUserEmail(req, res);
        } else if (req.queryParams("username") != null) {
            return checkUserUsername(req, res);
        }
        return getUser(req, res);
    }

    public String checkUserEmail(Request req, Response res) throws ClassNotFoundException {
        String email = req.queryParams("email");
        Boolean isAvailable = userService.checkEmailAvail(email);
        return createResponse(res, isAvailable);
    }

    public String checkUserUsername(Request req, Response res) throws ClassNotFoundException {
        String username = req.queryParams("username");
        Boolean isAvailable = userService.checkUsernameAvail(username);
        return createResponse(res, isAvailable);
    }

    public String getAllUsers(Request req, Response res) {
        Map<String, User> users = userService.getUsers();
        return createResponse(res, users);
    }

    public String getAllCustomers(Request req, Response res) {
        Map<String, User> customers = userService.getCustomers();
        return createResponse(res, customers);
    }

    public String getAllProfessionals(Request req, Response res) {
        Map<String, User> professionals = userService.getProfessionals();
        return createResponse(res, professionals);
    }

    public String getUser(Request req, Response res) {
        String UID = req.splat()[0];
        User user = userService.getUser(UID);
        return createResponse(res, user, user != null);
    }

    public String addUser(Request req, Response res) throws ClassNotFoundException {
        User user;
        if (req.body().contains("CUSTOMER")) {
            user = gson.fromJson(req.body(), Customer.class);
        } else {
            user = gson.fromJson(req.body(), Professional.class);
        }
        return createResponse(res, user, userService.addUser(user));
    }

    public String editUser(Request req, Response res) throws ParseException, ClassNotFoundException {
        User user;
        String UID = req.params(":UID");
        if (req.body().contains("CUSTOMER")) {
            user = gson.fromJson(req.body(), Customer.class);
        } else {
            user = gson.fromJson(req.body(), Professional.class);
        }
        user.setUID(UID);
        User editedUser = userService.editUser(user);
        return createResponse(res, editedUser, editedUser != null);
    }

    public String deleteUser(Request req, Response res) throws ClassNotFoundException {
        String UID = req.params(":UID");
        User user = userService.deleteUser(UID);
        return createResponse(res, user, user != null);
    }
}
