/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api.data;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import hy499.ptixiaki.data.Customer;
import hy499.ptixiaki.data.Professional;
import hy499.ptixiaki.data.User;
import hy499.ptixiaki.db.UserDB;
import java.sql.SQLException;
import java.util.Arrays;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class UserAPI implements DataApi {

    UserDB userDB;
    public UserAPI() throws SQLException, ClassNotFoundException {
        userDB = new UserDB();
    }

    public String getReqPathHandler(Request req, Response res) throws ClassNotFoundException {
        System.out.println("req splat: " + Arrays.toString(req.splat()));
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
        return get(req, res);
    }

    public String postReqHandler(Request req, Response res) throws ClassNotFoundException {
        // einai la8os prp na pane sto body ta dedomena...
        // opote prp na elenxo me vasi ta dedomena pou exw sto body an 8a kanw apla check
        // i an 8a prp na kanw apla add ena user...

//        String param = req.splat()[0];
//        if (req.queryParams("email") != null) {
//            return checkUserEmail(req, res);
//        } else if (req.queryParams("username") != null) {
//            return checkUserUsername(req, res);
//        }
//        return addUser(req, res);
        return "";
    }

    public String checkUserEmail(Request req, Response res) throws ClassNotFoundException {
        String email = req.queryParams("email");
        return new Gson().toJson(userDB.checkEmail(email));
    }

    public String checkUserUsername(Request req, Response res) throws ClassNotFoundException {
        String username = req.queryParams("username");
        return new Gson().toJson(userDB.checkUsername(username));
    }

    public String getAllCustomers(Request req, Response res) throws ClassNotFoundException {
        return new Gson().toJson(userDB.getCustomers());
    }

    public String getAllProfessionals(Request req, Response res) throws ClassNotFoundException {
        return new Gson().toJson(userDB.getProfessionals());
    }

    @Override
    public String get(Request req, Response res) throws ClassNotFoundException {
        String UID = req.params(":UID");
        return new Gson().toJson(userDB.get(UID));
    }

    @Override
    public String getQuery(Request req, Response res) throws ClassNotFoundException {
        if (req.queryParams("email") != null) {
            return checkUserEmail(req, res);
        } else if (req.queryParams("username") != null) {
            return checkUserUsername(req, res);
        }
        return getAll(req, res);
    }

    @Override
    public String getAll(Request req, Response res) throws ClassNotFoundException {
        return new Gson().toJson(userDB.getAll());
    }

    @Override
    public String add(Request req, Response res) throws ClassNotFoundException {
        Gson gson = new GsonBuilder().setDateFormat("dd-MMM-yyyy").create();
        User user;
        if (req.body().contains("CUSTOMER")) {
            user = gson.fromJson(req.body(), Customer.class);
        } else {
            user = gson.fromJson(req.body(), Professional.class);
        }
//        user.setUID(UUID.randomUUID().toString());
        user.setUID(user.getUsername());
        return new Gson().toJson(userDB.add(user));
    }

    @Override
    public String edit(Request req, Response res) throws ClassNotFoundException {
        Gson gson = new GsonBuilder().setDateFormat("dd-MMM-yyyy").create();
        User user;
        String UID = req.params(":UID");
        if (req.body().contains("CUSTOMER")) {
            user = gson.fromJson(req.body(), Customer.class);
        } else {
            user = gson.fromJson(req.body(), Professional.class);
        }
        user.setUID(UID);
        return new Gson().toJson(userDB.edit(user));
    }

    @Override
    public String delete(Request req, Response res) throws ClassNotFoundException {
        String UID = req.params(":UID");
        return new Gson().toJson(userDB.delete(UID));
    }
}
