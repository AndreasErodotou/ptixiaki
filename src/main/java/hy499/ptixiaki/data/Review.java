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
public class Review {
    private String UID;
    private String TO_UID;
    private String LID;
    private String RID;
    private Double rating;
    private String comments;
    private Date created; //8imame na kanw tis allages kai stin vasi...

    public Review() {
        UID = "";
        TO_UID = "";
        RID = "";
        rating = -1.0;
        comments = "";
        LID = "";
    }

    public Review(String UID, String TO_UID, String RID, Double rating, String comments, String LID) {
        this.UID = UID;
        this.TO_UID = TO_UID;
        this.LID = LID;
        this.RID = RID;
        this.rating = rating;
        this.comments = comments;
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }

    public String getTO_UID() {
        return TO_UID;
    }

    public void setTO_UID(String TO_UID) {
        this.TO_UID = TO_UID;
    }

    public String getRID() {
        return RID;
    }

    public void setRID(String RID) {
        this.RID = RID;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getLID() {
        return LID;
    }

    public void setLID(String LID) {
        this.LID = LID;
    }

}
