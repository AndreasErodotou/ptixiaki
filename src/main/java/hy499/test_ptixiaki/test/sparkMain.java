package hy499.test_ptixiaki.test;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Andreas
 */
public class sparkMain {

    Connection connection;
    String url = "jdbc:postgresql://localhost:5432/ptixiaki";
    String username = "postgres";
    String password = "AndHer123!";

    public Connection databaseConnection() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        connection = DriverManager.getConnection(url, username, password);
        return connection;
    }

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        sparkMain spMain = new sparkMain();
        if (spMain.databaseConnection() == null) {
            System.out.println("connection failed");
        } else {
            System.out.println("connection succeded");
        }
        PreparedStatement stmt;
        stmt = spMain.connection.prepareStatement("SELECT * FROM public.\"BID\"");
        ResultSet res = stmt.executeQuery();
        while (res.next()) {
            System.out.println(res.getString(1) + "\t" + res.getDouble(2) + "\t" + res.getDate(3) + "\t" + res.getBoolean(4) + "\t" + res.getString(5) + "\t" + res.getString(6));
        }
//        path("/api", () -> {
//            before("/*", (q, a) -> log.info("Received api call"));
//            path("/email", () -> {
//                post("/add", EmailApi.addEmail);
//                put("/change", EmailApi.changeEmail);
//                delete("/remove", EmailApi.deleteEmail);
//            });
//            path("/username", () -> {
//                post("/add", UserApi.addUsername);
//                put("/change", UserApi.changeUsername);
//                delete("/remove", UserApi.deleteUsername);
//            });
//        });
    }

}
