import React from "react";
import StarRatings from "react-star-ratings";

const Rating = props => {
  return (
    <StarRatings
      rating={props.rating}
      starDimension="19px"
      starSpacing="0px"
      starRatedColor="#FFC100"
      svgIconViewBox="10 5 30 55"
    />
  );
};

export default Rating;
