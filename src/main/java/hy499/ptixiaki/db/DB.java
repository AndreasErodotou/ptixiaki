/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import hy499.ptixiaki.api.ServerResponseAPI;

/**
 *
 * @author Andreas
 * @param <Data>
 */
public interface DB<Data> {

    ServerResponseAPI get(String ID) throws ClassNotFoundException;

    ServerResponseAPI getQuery(String query) throws ClassNotFoundException;

    ServerResponseAPI getAll() throws ClassNotFoundException;

    ServerResponseAPI add(Data data) throws ClassNotFoundException;

    ServerResponseAPI edit(Data data) throws ClassNotFoundException;

    ServerResponseAPI delete(String ID) throws ClassNotFoundException;
}
