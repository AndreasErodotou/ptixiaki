/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.test_ptixiaki.data;

import java.util.Date;
/**
 *
 * @author Andreas
 */
public class Timetable {
    private String UID;

    private int year;

    private int week;

    private Days day;
    private Date time;

    private String title;
    private String Description;
    private String BID;
    private String LID;

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String Description) {
        this.Description = Description;
    }

    public String getBID() {
        return BID;
    }

    public void setBID(String BID) {
        this.BID = BID;
    }

    public String getLID() {
        return LID;
    }

    public void setLID(String LID) {
        this.LID = LID;
    }

    public enum Days {
        monday, tuesday, wednesday, thursday, friday, saturday, sunday
    }
}
