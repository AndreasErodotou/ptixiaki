/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.data;

import java.text.SimpleDateFormat;
import java.util.Date;
/**
 *
 * @author Andreas
 */
public class TimetableEvent {
    private String UID;
    private String date;
    private String LID;

//    private int year;
//
//    private int week;
//
//    private Days day;

//
//    private String title;
//    private String Description;
    public TimetableEvent() {
        UID = "";
        date = null;
        LID = "";
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setDate(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("DD-MM-YYYY");
        this.date = formatter.format(date);
    }

//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getDescription() {
//        return Description;
//    }
//
//    public void setDescription(String Description) {
//        this.Description = Description;
//    }

    public String getLID() {
        return LID;
    }

    public void setLID(String LID) {
        this.LID = LID;
    }

//    public enum Days {
//        monday, tuesday, wednesday, thursday, friday, saturday, sunday
//    }
}
