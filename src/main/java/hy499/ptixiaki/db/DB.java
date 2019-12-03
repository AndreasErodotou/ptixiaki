/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import hy499.ptixiaki.api.ServerResponseAPI;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Andreas
 * @param <Data>
 */
public interface DB<Data> {

    public Data resToType(ResultSet res) throws SQLException;

    public ServerResponseAPI get(String ID) throws ClassNotFoundException;

    public ServerResponseAPI getQuery(String query) throws ClassNotFoundException;

    public ServerResponseAPI getAll() throws ClassNotFoundException;

    public ServerResponseAPI add(Data data) throws ClassNotFoundException;

    public ServerResponseAPI edit(Data data) throws ClassNotFoundException;

    public ServerResponseAPI delete(String ID) throws ClassNotFoundException;
}
