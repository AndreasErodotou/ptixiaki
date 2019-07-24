/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Andreas
 */
public final class ListingDB {

    public ListingDB() throws SQLException {
        try {
            initListingDB();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ReviewDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initListingDB() throws ClassNotFoundException, SQLException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder createQuery = new StringBuilder();
                createQuery.append("CREATE TABLE IF NOT EXISTS LISTING (")
                        .append(" LID       VARCHAR(50)    PRIMARY KEY   NOT NULL, ")
                        .append(" UID       VARCHAR(50)    NOT NULL,")
                        .append(" TITLE    VARCHAR(100)    NOT NULL, ")
                        .append(" DESCRIPTION  TEXT, ")
                        //TEXT[]      =       '{"value 1", "value 2", "value 3"}';
                        .append(" PICS  TEXT[], ")
                        .append(" START  DATE   NOT NULL, ")
                        .append(" EXPIRE  DATE  NOT NULL, ")
                        .append(" LOCATION  VARCHAR(50) NOT NULL, ")
                        .append(" CATEGORY  VARCHAR(50) NOT NULL, ")
                        .append(" MAX_PRICE    REAL NOT NULL, ")
                        .append(" CREATED   TIMESTAMP)");
                stmt.executeUpdate(createQuery.toString());
                System.out.println("#ListingDB: Table Listing Created");
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
