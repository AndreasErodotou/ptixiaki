/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.test_ptixiaki.data;

/**
 *
 * @author Andreas
 */
public class Bid {
    private String UID;
    private String BID;
    private String solution_decription;
    private int price;
    private String time_to_fix;
    private Boolean selected;

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

    public String getSolution_decription() {
        return solution_decription;
    }

    public void setSolution_decription(String solution_decription) {
        this.solution_decription = solution_decription;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getTime_to_fix() {
        return time_to_fix;
    }

    public void setTime_to_fix(String time_to_fix) {
        this.time_to_fix = time_to_fix;
    }

    public Boolean getSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }

}
