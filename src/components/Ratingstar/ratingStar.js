import React from "react";
import Rating from "react-star-ratings";
import "./ratingStar.css";

function StarRatings(props) {
  return (
    <div className="starRating">
      <Rating
        rating={props.rating}
        starDimension="17px"
        starSpacing="5px"
        starRatedColor=" #5267ff"
      />
    </div>

  )
}
export default StarRatings;
