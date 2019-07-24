/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import hy499.ptixiaki.data.Bid;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Andreas
 */
public final class BidDB {

    public BidDB() {
        try {
            initBidDB();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(BidDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initBidDB() throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder createQuery = new StringBuilder();

                createQuery.append("CREATE TABLE IF NOT EXISTS BID (")
                        .append(" BID           VARCHAR(50)    PRIMARY KEY   NOT NULL, ")
                        .append(" UID           VARCHAR(50)    NOT NULL,")
                        .append(" LID           VARCHAR(50)    NOT NULL, ")
                        .append(" SOLUTION_DESCR  VARCHAR(50)  NOT NULL, ")
                        .append(" PRICE         REAL    NOT NULL, ")
                        .append(" TIME_TO_FIX   REAL   NOT NULL, ")
                        .append(" WHEN_P          DATE    NOT NULL, ")
                        .append(" SELECTED      BOOLEAN   NOT NULL, ")
                        .append(" CREATED       TIMESTAMP   NOT NULL)");
                stmt.executeUpdate(createQuery.toString());
                System.out.println("#BidDB: Table Bid Created");
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void addBID(Bid bid) throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                Date date = new Date();
                Timestamp timestamp = new Timestamp(date.getTime());
                StringBuilder insQuery = new StringBuilder();

                insQuery.append("INSERT INTO ")
                        .append(" BID ( BID, UID, LID, SOLUTION_DESCR, PRICE, TIME_TO_FIX, WHEN_P, SELECTED, CREATED) ")
                        .append(" VALUES (")
                        .append("'").append(bid.getBID()).append("',")
                        .append("'").append(bid.getUID()).append("',")
                        .append("'").append(bid.getLID()).append("',")
                        .append("'").append(bid.getSolution_decription()).append("',")
                        .append(bid.getPrice()).append(",")
                        .append(bid.getTime_to_fix()).append(",")
                        .append("'").append(bid.getWhen()).append("',")
                        .append(bid.getSelected()).append(",")
                        .append("'").append(timestamp).append("');");

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#BidDB: BID added");

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
