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
public class Review {
    private String UID;
    private String TO_UID;
    private String RID;
    private String rating;
    private String comments;

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

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

}
