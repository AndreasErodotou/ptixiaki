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
public final class Timetable {

    public TimetableEvent bidToEvent(ResultSet res) {
        TimetableEvent event = new TimetableEvent();
        try {
            event.setDate(res.getDate("WHEN_P"));
            event.setDuration(res.getDouble("TIME_TO_FIX"));
            event.setLID(res.getString("LID"));
            event.setUID(res.getString("UID"));
            event.setWonBID(res.getString("BID"));
            event.setTitle(res.getString("TITLE"));
            event.setDescr(res.getString("DESCRIPTION"));
        } catch (SQLException ex) {
            Logger.getLogger(BidDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return event;
    }


    public Map<String, TimetableEvent> getEvents(String UID) throws ClassNotFoundException {
        Map<String, TimetableEvent> events = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * ")
                        .append("FROM bid INNER JOIN listing ON (bid.lid = listing.lid) ")
                        .append("WHERE bid.uid = ").append("'").append(UID).append("'")
                        .append(" and bid.selected = ").append("true").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    TimetableEvent event = bidToEvent(res);
                    events.put(event.getWonBID(), event);
                }
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return events;
    }

}
