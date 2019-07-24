/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hy499.ptixiaki.main;

import com.google.gson.Gson;
import hy499.ptixiaki.services.ReviewService;
import hy499.ptixiaki.data.Review;
import hy499.ptixiaki.response.ServerResponse;
import hy499.ptixiaki.response.ServerResponse.Status;
import java.util.Map;
import spark.Request;
import spark.Response;

/**
 *
 * @author Andreas
 */
public class ReviewAPI {
    ReviewService reviewService;

    public ReviewAPI() throws ClassNotFoundException {
        reviewService = new ReviewService();
    }

    public String createResponse(Response res, Map<String, Review> reviews) {
        if (!reviews.isEmpty()) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            reviewService.getReviewMsg(),
                            new Gson().toJsonTree(reviews)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.WARINING,
                        reviewService.getReviewMsg(),
                        new Gson().toJsonTree(null)));
    }

    public String createResponse(Response res, Review review, Boolean bool) {
        if (bool) {
            res.status(200);
            return new Gson()
                    .toJson(new ServerResponse(Status.SUCCESS,
                            reviewService.getReviewMsg(),
                            new Gson().toJsonTree(review)));
        }
        res.status(400);
        return new Gson()
                .toJson(new ServerResponse(Status.ERROR,
                        reviewService.getReviewMsg(),
                        new Gson().toJsonTree(null)));
    }

    public String getReqHandler(Request req, Response res) {
        if (req.queryParams("RID") != null) {
            return getAReview(req, res);
        } else if (req.queryParams("UID") != null) {
            if (req.queryParams("TO_UID") != null) {
                return getAllUserReviewsToAUser(req, res);
            }
            return getAllUserReviews(req, res);
        } else if (req.queryParams("TO_UID") != null) {
            return getAllReviewsMadeForAUser(req, res);
        }
        return getAllReviews(req, res);
    }

    public String getAllReviews(Request req, Response res) {

        Map<String, Review> reviews = reviewService.getReviews();
        return createResponse(res, reviews);
    }

    public String getAllUserReviews(Request req, Response res) {
        String UID = req.queryParams("UID");
        Map<String, Review> reviews = reviewService.getReviewsFromAUser(UID);
        return createResponse(res, reviews);
    }

    public String getAllUserReviewsToAUser(Request req, Response res) {
        String UID = req.queryParams("UID");
        String TO_UID = req.queryParams("TO_UID");
        Map<String, Review> reviews = reviewService.getReviewsFromAUserToAnotherUser(UID, TO_UID);
        return createResponse(res, reviews);
    }

    public String getAllReviewsMadeForAUser(Request req, Response res) {
        String TO_UID = req.queryParams("TO_UID");
        Map<String, Review> reviews = reviewService.getReviewsToAUser(TO_UID);
        return createResponse(res, reviews);
    }

    public String getAReview(Request req, Response res) {
        String RID = req.queryParams("RID");
        Review review = reviewService.getReview(RID);
        return createResponse(res, review, review != null);
    }

    public String addAReview(Request req, Response res) throws ClassNotFoundException {
        Review review = new Gson().fromJson(req.body(), Review.class);
        return createResponse(res, review, reviewService.addReview(review));
    }

    public String editAReview(Request req, Response res) {
        String RID = req.params(":RID");
        Review review = new Gson().fromJson(req.body(), Review.class);
        review.setRID(RID);
        Review editedReview = reviewService.editReview(review);
        return createResponse(res, editedReview, editedReview != null);
    }

    public String deleteAReview(Request req, Response res) {
        String RID = req.params(":RID");
        Review review = reviewService.deleteReview(RID);
        return createResponse(res, review, review != null);
    }
}
