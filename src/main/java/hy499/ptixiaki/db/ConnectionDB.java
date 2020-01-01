/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author Andreas
 */
public class ConnectionDB {

    private static Connection connection;
//    private final static String url = "jdbc:postgresql://localhost:5432/ptixiaki";
//    private final static String username = "postgres";
//    private final static String password = "AndHer123!";

    private final static String url = "DB:postgresql://localhost:5432/postgres";
    private final static String username = "postgres";
    private final static String password = "AndHer123!";
    
    public static Connection getDatabaseConnection() throws ClassNotFoundException, SQLException {
        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection(url, username, password);
        } catch (ClassNotFoundException | SQLException e) {
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
        }
        return connection;
    }
}
