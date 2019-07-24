package hy499.ptixiaki.services;

import hy499.ptixiaki.data.Review;
import hy499.ptixiaki.db.ReviewDB;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Andreas
 */
public class ReviewService {
    private Map<String, Review> reviews;
    private String reviewMsg;
    private final ReviewDB reviewDB;

    public ReviewService() throws ClassNotFoundException {
        reviewMsg = "";
        reviewDB = new ReviewDB();
        reviews = reviewDB.getReviews();
    }

    public Boolean addReview(Review review) throws ClassNotFoundException {
        if (checkFieldsBeforeAdd(review)) {
            String uniqueRID = UUID.randomUUID().toString();
            review.setRID(uniqueRID);
            reviews.put(uniqueRID, review);
            reviewMsg = "Review Added";
            reviewDB.addReview(review);
            return true;
        }
        return false;
    }

    public Review editReview(Review review) {
        if (checkFieldsBeforeEdit(review)) {
            Review preExistReview = getReview(review.getRID());
            if (preExistReview != null) {
//                if (review.getUID() != null && !review.getUID().equals(preExistReview.getUID())) {
//                    preExistReview.setUID(review.getUID());
//                }
//                if (review.getTO_UID() != null && !review.getTO_UID().equals(preExistReview.getTO_UID())) {
//                    preExistReview.setTO_UID(review.getTO_UID());
//                }
                if (review.getRating() != null && !review.getRating().equals(preExistReview.getRating())) {
                    preExistReview.setRating(review.getRating());
                }
                if (review.getComments() != null && !review.getComments().equals(preExistReview.getComments())) {
                    preExistReview.setComments(review.getComments());
                }

                reviewMsg = "Review Edited";
                return preExistReview;
            }
            reviewMsg = "Review Does Not Exist!!";
        }
        return null;
    }

    public Review deleteReview(String RID) {
        Review review = reviews.remove(RID);
        if (review != null) {
            reviewMsg = "Review Removed!!";
            return review;
        } else {
            reviewMsg = "Review Does Not Exist!!";
        }
        return null;
    }

    public Boolean checkFieldsBeforeAdd(Review review) {
        reviewMsg = "";
        if (review != null) {
            if (review.getUID() == null) {
                reviewMsg += "UID Cannot Be Blank\n";
            }
            if (review.getTO_UID() == null) {
                reviewMsg += "TO_UID Cannot Be Blank\n";
            }
            if (review.getRating() == null) {
                reviewMsg += "Rating Cannot Be Blank\n";
            }
            if (review.getComments() == null) {
                reviewMsg += "Comments Cannot Be Blank\n";
            }
            return reviewMsg.isEmpty();
        }
        reviewMsg = "Review Cannot Be Null";
        return false;
    }

    private Boolean checkFieldsBeforeEdit(Review review) {
        reviewMsg = "";
        if (review != null) {
            if (review.getRID() == null) {
                reviewMsg = "RID Cannot Be Blank\n";
            }
            return reviewMsg.isEmpty();
        }
        reviewMsg = "Review Cannot Be Null";
        return false;
    }

    public Map<String, Review> getReviewsFromAUser(String UID) {
        Map<String, Review> userReviews = new HashMap<>();
        Set<String> ReviewsKeys = reviews.keySet();
        for (String key : ReviewsKeys) {
            if (reviews.get(key).getUID().equals(UID)) {
                userReviews.put(key, reviews.get(key));
            }
        }
        if (userReviews.isEmpty()) {
            reviewMsg = "There Are No Reviews From This User";
        } else {
            reviewMsg = "User Reviews";
        }
        return userReviews;
    }

    public Map<String, Review> getReviewsToAUser(String TO_UID) {
        Map<String, Review> userReviews = new HashMap<>();
        Set<String> ReviewsKeys = reviews.keySet();
        for (String key : ReviewsKeys) {
            if (reviews.get(key).getTO_UID().equals(TO_UID)) {
                userReviews.put(key, reviews.get(key));
            }
        }
        if (userReviews.isEmpty()) {
            reviewMsg = "There Are No Reviews Made For This User";
        } else {
            reviewMsg = "Reviews Made For This User";
        }
        return userReviews;
    }

    public Map<String, Review> getReviewsFromAUserToAnotherUser(String UID, String TO_UID) {
        Map<String, Review> userToUserReviews = new HashMap<>();
        Set<String> ReviewsKeys = reviews.keySet();
        for (String key : ReviewsKeys) {
            if (reviews.get(key).getUID().equals(UID) && reviews.get(key).getTO_UID().equals(TO_UID)) {
                userToUserReviews.put(key, reviews.get(key));
            }
        }
        if (userToUserReviews.isEmpty()) {
            reviewMsg = "There Are No Reviews Made For This User";
        } else {
            reviewMsg = "Reviews Made For This User";
        }
        return userToUserReviews;
    }

    public double UserAverageReviewScore(String UID) {
        double sum = 0;
        int count = 0;
        Map<String, Review> userReviews = getReviewsFromAUser(UID);
        Set<String> ReviewsKeys = reviews.keySet();
        for (String key : ReviewsKeys) {
            Review review = reviews.get(key);
            if (review.getUID().equals(UID)) {
                sum += review.getRating();
                count++;
            }
        }

        if (count == 0) {
            reviewMsg = "There Are No Ratings From This User";
        } else {
            reviewMsg = "Average Rating From This User";
        }
        return sum / count;
    }

    public double AverageReviewScoreForAUser(String TO_UID) {
        double sum = 0;
        int count = 0;
        Map<String, Review> userReviews = getReviewsToAUser(TO_UID);
        Set<String> ReviewsKeys = reviews.keySet();
        for (String key : ReviewsKeys) {
            Review review = reviews.get(key);
            if (review.getTO_UID().equals(TO_UID)) {
                sum += review.getRating();
                count++;
            }
        }

        if (count == 0) {
            reviewMsg = "There Are No Ratings For This User";
        } else {
            reviewMsg = "Average Rating For This User";
        }
        return sum / count;
    }


    public Review getReview(String RID) {

        Review review = reviews.get(RID);
        if (review == null) {
            reviewMsg = "There Are No Review With RID = " + RID;
        } else {
            reviewMsg = "Review With RID = " + RID;
        }
        return review;
    }

    public Map<String, Review> getReviews() {
        return reviews;
    }

    public void setReviews(Map<String, Review> reviews) {
        this.reviews = reviews;
    }

    public String getReviewMsg() {
        return reviewMsg;
    }

    public void setReviewMsg(String reviewMsg) {
        this.reviewMsg = reviewMsg;
    }

}
