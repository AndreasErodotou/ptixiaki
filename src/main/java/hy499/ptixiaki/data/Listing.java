/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.data;

import hy499.ptixiaki.data.Professional.Locations;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author Andreas
 */
public class Listing {
    private String UID;
    private String LID;
    private String title;
    private String description;
    private ArrayList<String> pics;
    private Date available_from;
    private Date available_until;

    private Locations location;
    private String jobCategory;
    private double max_price;
//    private int total_bids;
    private Date created;

    public Listing() {
        UID = "";
        LID = "";
        title = "";
        description = "";
        pics = new ArrayList<>();
        available_from = null;
        available_until = null;
        location = null;
        jobCategory = "";
        max_price = -1;
    }

    public Listing(String UID, String LID, String title, String description, ArrayList<String> pics, Date available_from, Date available_until, Locations location, String jobCategory, double max_price, Date expiration) {
        this.UID = UID;
        this.LID = LID;
        this.title = title;
        this.description = description;
        this.pics = pics;
        this.available_from = available_from;
        this.available_until = available_until;
        this.location = location;
        this.jobCategory = jobCategory;
        this.max_price = max_price;
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }

    public String getLID() {
        return LID;
    }

    public void setLID(String LID) {
        this.LID = LID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArrayList<String> getPics() {
        return pics;
    }

    public void setPics(ArrayList<String> pics) {
        this.pics = pics;
    }

    public Date getAvailable_from() {
        return available_from;
    }

    public void setAvailable_from(Date available_from) {
        this.available_from = available_from;
    }

    public Date getAvailable_until() {
        return available_until;
    }

    public void setAvailable_until(Date available_until) {
        this.available_until = available_until;
    }

    public Locations getLocation() {
        return location;
    }

    public void setLocation(Locations location) {
        this.location = location;
    }

    public String getJobCategory() {
        return jobCategory;
    }

    public void setJobCategory(String job_for) {
        this.jobCategory = job_for;
    }

    public double getMax_price() {
        return max_price;
    }

    public void setMax_price(double max_price) {
        this.max_price = max_price;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

}
