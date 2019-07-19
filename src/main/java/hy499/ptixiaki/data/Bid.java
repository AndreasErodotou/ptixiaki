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
public class Bid {
    private String UID;
    private String BID;
    private String LID;
    private String solution_decription;
    private double price;
    private double time_to_fix;
    private Date when;
    private Boolean selected;

    public Bid() {
        UID = "";
        BID = "";
        LID = "";
        solution_decription = "";
        price = -1;
        time_to_fix = -1;
        selected = false;
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
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

    public String getSolution_decription() {
        return solution_decription;
    }

    public void setSolution_decription(String solution_decription) {
        this.solution_decription = solution_decription;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getTime_to_fix() {
        return time_to_fix;
    }

    public void setTime_to_fix(double time_to_fix) {
        this.time_to_fix = time_to_fix;
    }

    public Boolean getSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }

}
