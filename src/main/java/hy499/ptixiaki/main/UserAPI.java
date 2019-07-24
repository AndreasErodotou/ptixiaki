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
    public UserAPI() throws SQLException {
        userService = new UserService();
        gson = new GsonBuilder().setDateFormat("dd-MMM-yyyy").create();
    }

    public String createResponse(Response res, Map<String, User> users) {
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

    public String getReqHandler(Request req, Response res) {
        String param = req.splat()[0];
        if (param.equals("customers")) {
            return getAllCustomers(req, res);
        } else if (param.equals("professionals")) {
            return getAllProfessionals(req, res);
        }
        return getUser(req, res);
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

    public String editUser(Request req, Response res) throws ParseException {
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

    public String deleteUser(Request req, Response res) {
        String UID = req.params(":UID");
        User user = userService.deleteUser(UID);
        return createResponse(res, user, user != null);
    }
}
