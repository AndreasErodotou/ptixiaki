/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import hy499.ptixiaki.data.TimetableEvent;
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
                        .append(" DATE          DATE           NOT NULL, ")
                        .append(" DURATION      REAL           NOT NULL)");

                stmt.executeUpdate(createQuery.toString());
                System.out.println("#TimetableEventDB: Table Timetable Created");
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Map<String, TimetableEvent> getEvents() throws ClassNotFoundException {
        Map<String, TimetableEvent> events = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM TIMETABLE").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    TimetableEvent event = new TimetableEvent();
//                    ( LID, UID, WON_BID, DATE, DURATION )
                    event.setLID(res.getString("LID"));
                    event.setUID(res.getString("UID"));
                    event.setWonBID(res.getString("WON_BID"));
                    event.setDate(res.getDate("DATE"));
                    event.setDuration(res.getDouble("DURATION"));

                    events.put(event.getLID(), event);
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return events;
    }

    public void addEvent(TimetableEvent event) throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder insQuery = new StringBuilder();

                insQuery.append("INSERT INTO ")
                        .append(" TIMETABLE ( LID, UID, WON_BID, DATE, DURATION ) ")
                        .append(" VALUES (")
                        .append("'").append(event.getLID()).append("',")
                        .append("'").append(event.getUID()).append("',")
                        .append("'").append(event.getWonBID()).append("',")
                        .append("'").append(event.getDate()).append("',")
                        .append(event.getDuration()).append(");");

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#TimetableDB: Event added");

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
