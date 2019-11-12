/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api.data;

import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public interface DataApi {
//    String createResponse(Response res, Map<>);

    String get(Request req, Response res) throws ClassNotFoundException;

    String getQuery(Request req, Response res) throws ClassNotFoundException;

    String getAll(Request req, Response res) throws ClassNotFoundException;

    String add(Request req, Response res) throws ClassNotFoundException;

    String edit(Request req, Response res) throws ClassNotFoundException;

    String delete(Request req, Response res) throws ClassNotFoundException;

}
