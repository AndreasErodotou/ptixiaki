/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import hy499.ptixiaki.data.Review;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Andreas
 */
public final class ReviewDB {

    public ReviewDB() {
        try {
            initReviewDB();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ReviewDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initReviewDB() throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder createQuery = new StringBuilder();
                createQuery.append("CREATE TABLE IF NOT EXISTS REVIEW (")
                        .append(" RID       VARCHAR(50)    PRIMARY KEY   NOT NULL, ")
                        .append(" UID       VARCHAR(50)    NOT NULL,")
                        .append(" TO_UID    VARCHAR(50)    NOT NULL, ")
                        .append(" COMMENTS  TEXT           NOT NULL, ")
                        .append(" RATING    REAL           NOT NULL, ")
                        .append(" CREATED   TIMESTAMP)");
                stmt.executeUpdate(createQuery.toString());
                System.out.println("#ReviewDB: Table Review Created");
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Map<String, Review> getReviews() throws ClassNotFoundException {
        Map<String, Review> reviews = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM REVIEW").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Review review = new Review();
                    review.setRID(res.getString("RID"));
                    review.setUID(res.getString("UID"));
                    review.setTO_UID(res.getString("TO_UID"));
                    review.setRating(res.getDouble("RATING"));
                    review.setComments(res.getString("COMMENTS"));

                    reviews.put(review.getRID(), review);
                }
            }


        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return reviews;
    }

    public void addReview(Review review) throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                Date date = new Date();
                Timestamp timestamp = new Timestamp(date.getTime());
                StringBuilder insQuery = new StringBuilder();

                insQuery.append("INSERT INTO ")
                        .append(" REVIEW ( RID, UID, TO_UID, RATING, COMMENTS, CREATED) ")
                        .append(" VALUES (")
                        .append("'").append(review.getRID()).append("',")
                        .append("'").append(review.getUID()).append("',")
                        .append("'").append(review.getTO_UID()).append("',")
                        .append(review.getRating()).append(",")
                        .append("'").append(review.getComments()).append("',")
                        .append("'").append(timestamp).append("');");

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#ReviewDB: Review added, RID: " + review.getRID());

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void updateReview(Review review) throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder updQuery = new StringBuilder();

                updQuery.append("UPDATE REVIEW ")
                        .append(" SET ")
                        .append(" RATING = ").append("'").append(review.getRating()).append("',")
                        .append(" COMMENTS = ").append("'").append(review.getComments()).append("'")
                        .append(" WHERE RID = ").append("'").append(review.getRID()).append("';");

                stmt.executeUpdate(updQuery.toString());
                System.out.println("#ReviewDB: Review Updated, RID: " + review.getRID());

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void deleteReview(String RID) throws ClassNotFoundException {
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder delQuery = new StringBuilder();

                delQuery.append("DELETE FROM REVIEW ")
                        .append(" WHERE RID = ").append("'").append(RID).append("';");

                stmt.executeUpdate(delQuery.toString());
                System.out.println("#ReviewDB: Review Deleted, RID: " + RID);

                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
