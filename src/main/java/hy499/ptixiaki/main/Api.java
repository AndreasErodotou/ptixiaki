/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.main;

import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public interface Api {
//    String createResponse(Response res, Map<>);

    String get(Request req, Response res);

    String getQuery(Request req, Response res);

    String getAll(Request req, Response res);

    String add(Request req, Response res);

    String edit(Request req, Response res);

    String delete(Request req, Response res);

}
