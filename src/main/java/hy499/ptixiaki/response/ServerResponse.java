/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.response;

import com.google.gson.JsonElement;

/**
 *
 * @author Andreas
 */
public class ServerResponse {
    private Status status;
    private String msg;
    private JsonElement data;

    public ServerResponse(Status status) {
        this.status = status;
        this.msg = "";
        this.data = null;
    }

    public ServerResponse(Status status, String msg) {
        this.status = status;
        this.msg = msg;
        this.data = null;
    }

    public ServerResponse(Status status, String msg, JsonElement data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

//    public void addHeaders(Response res) {
//        res.header("Access-Control-Allow-Origin", "*");
//        res.header("Access-Control-Allow-Credentials", "true");
//        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
//        res.header("Access-Control-Max-Age", "3600");
//        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
//    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public JsonElement getData() {
        return data;
    }

    public void setData(JsonElement data) {
        this.data = data;
    }

    public enum Status {
        SUCCESS, ERROR, WARINING
    }
}
