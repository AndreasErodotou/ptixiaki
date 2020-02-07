/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import hy499.ptixiaki.db.Timetable;
import spark.Request;
import spark.Response;

import java.util.Date;

/**
 *
 * @author Andreas
 */
public class TimetableAPI {

    private final Timetable timetable;

    public TimetableAPI() throws ClassNotFoundException {
        timetable = new Timetable();
    }

    public String getAll(Request req, Response res) throws ClassNotFoundException {
        ServerResponseAPI serverRes;
        JsonArray data;

        data = new GsonBuilder().registerTypeAdapter(Date.class, new GsonUTCDateAdapter()).create().toJsonTree(timetable.getEvents(req.params(":UID")).values()).getAsJsonArray();

        serverRes = new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "get all user events", new Gson().toJsonTree(data));
        return new Gson().toJson(serverRes);
    }

}
