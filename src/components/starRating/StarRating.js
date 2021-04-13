import React, { useState } from "react";
import FilledStar from "../../assets/filled-star.png";
import EmptyStar from "../../assets/empty-star.png";
import "./StarRating.css";

function StarRating({ onChange }) {
  const [rating, setRating] = useState();
  const [hover, setHover] = useState();

  return (
    <div className="star-container">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label>
            <input
              type="radio"
              name="rating"
              onClick={() => {
                setRating(ratingValue);
                onChange(ratingValue);
              }}
              style={{ display: "none" }}
            />
            <img
              alt=""
              src={ratingValue <= (hover || rating) ? FilledStar : EmptyStar}
              className="star"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
