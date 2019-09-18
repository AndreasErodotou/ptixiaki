/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.data;

import java.util.Date;

/**
 *
 * @author Andreas
 */
public class TimetableEvent {
    private String UID;
    private Date date;
    private String LID;
    private double duration;
    private String wonBID;

    public TimetableEvent() {
        UID = "";
        date = null;
        LID = "";
        wonBID = "";
    }

    public TimetableEvent(String UID, Date date, String LID, double duration, String wonBID) {
        this.UID = UID;
        this.date = date;
        this.LID = LID;
        this.duration = duration;
        this.wonBID = wonBID;
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

    public String getLID() {
        return LID;
    }

    public void setLID(String LID) {
        this.LID = LID;
    }

    public String getWonBID() {
        return wonBID;
    }

    public void setWonBID(String wonBID) {
        this.wonBID = wonBID;
    }

}
