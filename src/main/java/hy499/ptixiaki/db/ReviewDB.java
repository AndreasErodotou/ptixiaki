/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.db;

import com.google.gson.Gson;
import hy499.ptixiaki.api.ServerResponseAPI;
import hy499.ptixiaki.api.ServerResponseAPI.Status;
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
public final class ReviewDB implements DB<Review> {

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
                        .append(" LID       VARCHAR(50)    NOT NULL,")
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

    @Override
    public Review resToType(ResultSet res) {
        Review review = new Review();
        try {
            review.setRID(res.getString("RID"));
            review.setUID(res.getString("UID"));
            review.setTO_UID(res.getString("TO_UID"));
            review.setLID(res.getString("LID"));
            review.setRating(res.getDouble("RATING"));
            review.setComments(res.getString("COMMENTS"));
        } catch (SQLException ex) {
            Logger.getLogger(ReviewDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return review;
    }

    public ServerResponseAPI getUserRating(String UID) throws ClassNotFoundException {
        ServerResponseAPI serverRes = null;
        Map<String, Object> tmp = new HashMap<>();
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();
                getQuery.append("SELECT TO_UID, COUNT(RID) as c, SUM(rating) as s ")
                        .append("FROM REVIEW ")
                        .append("WHERE TO_UID = ").append("'").append(UID).append("'")
                        .append("group by 1;");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();
                while (res.next() == true) {
                    tmp.put("UID", res.getString("TO_UID"));
                    tmp.put("sum", res.getDouble("s"));
                    tmp.put("count", res.getInt("c"));
                    tmp.put("rating", (res.getDouble("s") / res.getInt("c")));
                }
                serverRes = new ServerResponseAPI(Status.SUCCESS, "User Reviews", new Gson().toJsonTree(tmp));
                System.out.println("#ReviewDB: Get User Rating, UID: " + UID);
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    @Override
    public ServerResponseAPI get(String ID) throws ClassNotFoundException {
        Review review = null;
        ServerResponseAPI serverRes = null;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM REVIEW").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    review = resToType(res);
                }
                serverRes = new ServerResponseAPI(Status.SUCCESS, "Reviews", new Gson().toJsonTree(review));
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    @Override
    public ServerResponseAPI getQuery(String query) throws ClassNotFoundException {
        Map<String, Review> reviews = new HashMap<>();
        ServerResponseAPI serverRes = null;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM REVIEW ")
                        .append("WHERE ").append(query).append(";");

                System.out.println("query: " + getQuery.toString());
                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Review review = resToType(res);
                    reviews.put(review.getRID(), review);
                }
                serverRes = new ServerResponseAPI(Status.SUCCESS, "All Reviews Made For This User", new Gson().toJsonTree(reviews.values()).getAsJsonArray());
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    @Override
    public ServerResponseAPI getAll() throws ClassNotFoundException {
        Map<String, Review> reviews = new HashMap<>();
        ServerResponseAPI serverRes = null;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection(); Statement stmt = con.createStatement()) {

                StringBuilder getQuery = new StringBuilder();

                getQuery.append("SELECT * FROM REVIEW").append(";");

                stmt.execute(getQuery.toString());

                ResultSet res = stmt.getResultSet();

                while (res.next() == true) {
                    Review review = resToType(res);
                    reviews.put(review.getRID(), review);
                }
                serverRes = new ServerResponseAPI(Status.SUCCESS, "All Reviews", new Gson().toJsonTree(reviews.values()).getAsJsonArray());
                stmt.close();
                con.close();
            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }

        return serverRes;
    }

    @Override
    public ServerResponseAPI add(Review review) throws ClassNotFoundException {
        ServerResponseAPI serverRes = null;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                Date date = new Date();
                Timestamp timestamp = new Timestamp(date.getTime());
                StringBuilder insQuery = new StringBuilder();

                insQuery.append("INSERT INTO ")
                        .append(" REVIEW ( RID, UID, TO_UID, LID, RATING, COMMENTS, CREATED) ")
                        .append(" VALUES (")
                        .append("'").append(review.getRID()).append("',")
                        .append("'").append(review.getUID()).append("',")
                        .append("'").append(review.getTO_UID()).append("',")
                        .append("'").append(review.getLID()).append("',")
                        .append(review.getRating()).append(",")
                        .append("'").append(review.getComments()).append("',")
                        .append("'").append(timestamp).append("');");

                stmt.executeUpdate(insQuery.toString());
                System.out.println("#ReviewDB: Review added, RID: " + review.getRID());

                serverRes = new ServerResponseAPI(Status.SUCCESS, "Review Added");
                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

    @Override
    public ServerResponseAPI edit(Review review) throws ClassNotFoundException {
        ServerResponseAPI serverRes = null;
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

                serverRes = new ServerResponseAPI(Status.SUCCESS, "Review Edited");
                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

    @Override
    public ServerResponseAPI delete(String RID) throws ClassNotFoundException {
        ServerResponseAPI serverRes = null;
        try {
            try (Connection con = ConnectionDB.getDatabaseConnection();
                    Statement stmt = con.createStatement()) {

                StringBuilder delQuery = new StringBuilder();

                delQuery.append("DELETE FROM REVIEW ")
                        .append(" WHERE RID = ").append("'").append(RID).append("';");

                stmt.executeUpdate(delQuery.toString());
                System.out.println("#ReviewDB: Review Deleted, RID: " + RID);

                serverRes = new ServerResponseAPI(Status.SUCCESS, "Review Deleted");
                stmt.close();
                con.close();

            }

        } catch (SQLException ex) {
            Logger.getLogger(UserDB.class.getName()).log(Level.SEVERE, null, ex);
        }
        return serverRes;
    }

}
