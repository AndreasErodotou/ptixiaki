/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import hy499.ptixiaki.db.Statistics;
import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class StatisticsAPI {

    private final Statistics statistics;

    public StatisticsAPI() throws ClassNotFoundException {
        statistics = new Statistics();
    }

    private JsonArray mapToJsonArray(Map<String, JsonElement> mapData) {
        JsonArray data = new JsonArray();
        for (String key : mapData.keySet()) {
            JsonObject tmpObj = new JsonObject();
            tmpObj.addProperty(key, new Gson().toJson(mapData.get(key)));
            data.add(tmpObj);
        }
        return data;
    }

    private JsonArray intMapToJsonArray(Map<String, Integer> mapData) {
        JsonArray data = new JsonArray();
        for (String key : mapData.keySet()) {
            JsonObject tmpObj = new JsonObject();
            tmpObj.addProperty(key, mapData.get(key));
            data.add(tmpObj);
        }
        return data;
    }

//    public String getAll(Request req, Response res) throws ClassNotFoundException {
//        ServerResponseAPI serverRes;
//        JsonArray data;
//        Map<String, JsonElement> tmpData = new HashMap<>();
//
//        tmpData.put("Listings", intMapToJsonArray(statistics.countListings(req.params(":UID"))));
//        tmpData.put("Bids", intMapToJsonArray(statistics.countBids(req.params(":UID"))));
//        tmpData.put("Reviews", intMapToJsonArray(statistics.countReviews(req.params(":UID"))));
//
//        data = mapToJsonArray(tmpData);
//        serverRes = new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "get all user statistics data", data);
//        return new Gson().toJson(serverRes);
//    }
//}
    public String getAll(Request req, Response res) throws ClassNotFoundException {
        ServerResponseAPI serverRes;
        Map<String, JsonElement> tmpData = new HashMap<>();

        tmpData.put("Listings", new Gson().toJsonTree(statistics.countListings(req.params(":UID"))));
        tmpData.put("Bids", new Gson().toJsonTree(statistics.countBids(req.params(":UID"))));
        tmpData.put("Reviews", new Gson().toJsonTree(statistics.countReviews(req.params(":UID"))));
        tmpData.put("Money", new Gson().toJsonTree(statistics.sumMoney(req.params(":UID"))));

        serverRes = new ServerResponseAPI(ServerResponseAPI.Status.SUCCESS, "get all user statistics data", new Gson().toJsonTree(tmpData));
        return new Gson().toJson(serverRes);
    }
}
