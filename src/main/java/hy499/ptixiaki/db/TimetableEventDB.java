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
public final class TimetableEventDB {

    public TimetableEventDB() {
        try {
            initTimetableEventDB();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(BidDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initTimetableEventDB() throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder createQuery = new StringBuilder();

                createQuery.append("CREATE TABLE IF NOT EXISTS TIMETABLE (")
                        .append(" LID           VARCHAR(50)    NOT NULL, ")
                        .append(" UID           VARCHAR(50)    NOT NULL,")
                        .append(" WON_BID       VARCHAR(50)    NOT NULL,")
                        .append(" date          DATE           NOT NULL, ")
                        .append(" duration      REAL           NOT NULL)");

                stmt.executeUpdate(createQuery.toString());
                System.out.println("#TimetableEventDB: Table Timetable Created");
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
