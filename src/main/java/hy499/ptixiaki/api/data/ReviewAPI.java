/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.api.data;

import com.google.gson.Gson;
import hy499.ptixiaki.data.Review;
import hy499.ptixiaki.db.ReviewDB;
import java.util.UUID;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class ReviewAPI implements DataApi {
    ReviewDB reviewDB;

    public ReviewAPI() throws ClassNotFoundException {
        reviewDB = new ReviewDB();
    }

//    public String getReqHandler(Request req, Response res) throws ClassNotFoundException {
//        if (req.queryParams("RID") != null) {
//            return getAReview(req, res);
//        } else if (req.queryParams("UID") != null) {
//            if (req.queryParams("TO_UID") != null) {
//                return getAllUserReviewsToAUser(req, res);
//            }
//            return getAllUserReviews(req, res);
//        } else if (req.queryParams("TO_UID") != null) {
//            return getAllReviewsMadeForAUser(req, res);
//        }
//        return new Gson().toJson(reviewDB.getAll());
//    }

//    public String getAllUserReviews(Request req, Response res) {
//        String UID = req.queryParams("UID");
//        return new Gson().toJson(reviewDB.get());
//    }

//    public String getAllUserReviewsToAUser(Request req, Response res) {
//        String UID = req.queryParams("UID");
//        String TO_UID = req.queryParams("TO_UID");
//        Map<String, Review> reviews = reviewService.getReviewsFromAUserToAnotherUser(UID, TO_UID);
//        return createResponse(res, reviews);
//    }

//    public String getAllReviewsMadeForAUser(Request req, Response res) {
//        String TO_UID = req.queryParams("TO_UID");
//        Map<String, Review> reviews = reviewService.getReviewsToAUser(TO_UID);
//        return createResponse(res, reviews);
//    }
    public String getListingReview(Request req, Response res) throws ClassNotFoundException {
        String LID = req.params(":LID");
        return new Gson().toJson(reviewDB.getListingReview(LID));
    }

    public String getUserRating(Request req, Response res) throws ClassNotFoundException {
        String UID = req.params(":UID");
        return new Gson().toJson(reviewDB.getUserRating(UID));
    }

    @Override
    public String get(Request req, Response res) throws ClassNotFoundException {
        String RID = req.params(":RID");
        return new Gson().toJson(reviewDB.get(RID));
    }

    @Override
    public String getQuery(Request req, Response res) throws ClassNotFoundException {
        String order = req.queryParams("order");

        String UID = req.params(":UID");
        String LID = req.params(":LID");
        String TO_UID = req.queryParams("TO_UID");
//        String query = "TO_UID = " + "'" + UID + "'";
        String query="";
        if(TO_UID != null){
            query += "TO_UID = " + "'" + TO_UID + "'";
        }else{
            if(UID != null){
                query += "UID = " + "'" + UID + "'";
            }
            if(LID != null){
                query += " and LID= " +"'"+LID+"'";
            }
        }
        System.out.println(order);
        if(order!=null){
            if(order.equals("positive-first")){
                query += " ORDER BY RATING DESC";
            }else{
                query += " ORDER BY RATING ASC";
            }
        }
        return new Gson().toJson(reviewDB.getQuery(query));
    }

    @Override
    public String getAll(Request req, Response res) throws ClassNotFoundException {
        return new Gson().toJson(reviewDB.getAll());
    }

    @Override
    public String add(Request req, Response res) throws ClassNotFoundException {
        Review review = new Gson().fromJson(req.body(), Review.class);
        review.setRID(UUID.randomUUID().toString());
        return new Gson().toJson(reviewDB.add(review));
    }

    @Override
    public String edit(Request req, Response res) throws ClassNotFoundException {
        String RID = req.params(":RID");
        Review review = new Gson().fromJson(req.body(), Review.class);
        review.setRID(RID);
        return new Gson().toJson(reviewDB.edit(review));
    }

    @Override
    public String delete(Request req, Response res) throws ClassNotFoundException {
        String RID = req.params(":RID");
        return new Gson().toJson(reviewDB.delete(RID));
    }
}
