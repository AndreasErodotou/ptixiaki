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

    public Date getWhen() {
        return when;
    }

    public void setWhen(Date when) {
        this.when = when;
    }

    public Boolean getSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }

    public Boolean checkFieldsBeforeEdit(Bid bid) {
        String bidMsg = "";
        if (bid != null) {
            if (bid.getBID() == null) {
                bidMsg += "BID Cannot Be Blank\n";
            }
            if (bid.getUID() == null) {
                bidMsg += "UID Cannot Be Blank\n";
            }
            if (bid.getLID() == null) {
                bidMsg += "LID Cannot Be Blank\n";
            }
            return bidMsg.isEmpty();
        }
        bidMsg = "Bid Cannot Be Null";
        return false;
    }

    public Boolean checkFieldsBeforeAdd(Bid bid) {
        String bidMsg = "";
        if (bid != null) {
            if (bid.getUID() == null) {
                bidMsg += "UID Cannot Be Blank\n";
            }
            if (bid.getPrice() <= 0) {
                bidMsg += "Price Cannot Be Less Than 0\n";
            }
            if (bid.getSolution_decription() == null) {
                bidMsg += "Solution Decription Cannot Be Blank\n";
            }
            if (bid.getTime_to_fix() <= 0) {
                bidMsg += "Time To Fix Cannot Be Less Than 0\n";
            }
            if (bid.getSelected() == null) {
                bidMsg += "Selected Cannot Be Blank\n";
            }
            return bidMsg.isEmpty();
        }
        bidMsg = "Bid Cannot Be Null";
        return false;
    }

}
