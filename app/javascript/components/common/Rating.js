import React from "react";

import { colorByRating, backgroundByRating } from "../common/color-by-rating";

const Rating = ({ grade }) => {
  const ratingStyle = {
    border: `4px solid ${colorByRating(grade)}`,
    color: colorByRating(grade),
    backgroundColor: backgroundByRating(grade),
  };

  return (
    <div className={"rating"} style={ratingStyle}>
      {grade === 10 ? grade : grade.toFixed(1)}
    </div>
  );
};

export default Rating;
