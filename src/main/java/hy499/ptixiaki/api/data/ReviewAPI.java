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

    @Override
    public String get(Request req, Response res) throws ClassNotFoundException {
        String RID = req.queryParams("RID");
        return new Gson().toJson(reviewDB.get(RID));
    }

    @Override
    public String getQuery(Request req, Response res) throws ClassNotFoundException {
        return getAll(req, res);
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
