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
    private String resourceId;

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

    public ServerResponse(Status status, String msg, JsonElement data, String resourceId) {
        this.status = status;
        this.msg = msg;
        this.data = data;
        this.resourceId = resourceId;
    }

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

    public String getResourceId() {
        return resourceId;
    }

    public void setResourceId(String resourceId) {
        this.resourceId = resourceId;
    }

    public enum Status {
        SUCCESS, ERROR, WARINING
    }
}
