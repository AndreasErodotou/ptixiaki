/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Andreas
 */
public class Statistics {

    public Map<String, Integer> countListings(String UID) throws ClassNotFoundException {
        Map<String, Integer> data = new HashMap<>();

        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();
                getQuery.append("SELECT to_char(BID.created,'Month') as m, extract(year from BID.created) as y, COUNT(BID.created) as c ")
                        .append("FROM LISTING INNER JOIN BID ON LISTING.LID = BID.LID ")
                        .append("WHERE BID.UID = ").append("'").append(UID).append("'")
                        .append(" and selected = ").append("'true' ")
                        .append("group by 1,2;");
//                System.out.println(getQuery.toString());
                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
//                    System.out.println("year: " + res.getInt("y") + " month: " + res.getString("m") + "count: " + res.getInt("c"));
                    data.put(res.getString("m"), res.getInt("c"));
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return data;
    }

    public Map<String, Integer> countBids(String UID) throws ClassNotFoundException {
        Map<String, Integer> data = new HashMap<>();

        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();
                getQuery.append("SELECT to_char(created,'Month') as m, extract(year from created) as y, COUNT(created) as c ")
                        .append("FROM BID ")
                        .append("WHERE UID = ").append("'").append(UID).append("'")
                        .append("group by 1,2;");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
//                    System.out.println("year: " + res.getInt("y") + " month: " + res.getString("m") + "count: " + res.getInt("c"));
                    data.put(res.getString("m"), res.getInt("c"));
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return data;
    }

    public Map<String, Integer> countReviews(String UID) throws ClassNotFoundException {
        Map<String, Integer> data = new HashMap<>();

        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();
                getQuery.append("SELECT to_char(created,'Month') as m, extract(year from created) as y, COUNT(created) as c ")
                        .append("FROM REVIEW ")
                        .append("WHERE UID = ").append("'").append(UID).append("'")
                        .append("group by 1,2;");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
//                    System.out.println("year: " + res.getInt("y") + " month: " + res.getString("m") + "count: " + res.getInt("c"));
                    data.put(res.getString("m"), res.getInt("c"));
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return data;
    }

    public Map<String, Integer> sumMoney(String UID) throws ClassNotFoundException {
        Map<String, Integer> data = new HashMap<>();

        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();
                getQuery.append("SELECT to_char(created,'Month') as m, extract(year from created) as y, SUM(price) as s ")
                        .append("FROM BID ")
                        .append("WHERE UID = ").append("'").append(UID).append("'")
                        .append(" and ").append("selected = true ")
                        .append("group by 1,2;");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
//                    System.out.println("year: " + res.getInt("y") + " month: " + res.getString("m") + "count: " + res.getInt("s"));
                    data.put(res.getString("m"), res.getInt("s"));
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return data;
    }

}
