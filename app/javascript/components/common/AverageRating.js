import React, { Fragment } from "react";

import {
  colorByRating,
  backgroundByRating,
  adjectiveByRating,
} from "../common/color-by-rating";

const AverageRating = ({ mean, numberOfRatings }) => {
  const ratingStyle = {
    color: colorByRating(mean),
    backgroundColor: backgroundByRating(mean),
  };

  return (
    <div className={"average-rating"} style={ratingStyle}>
      {mean !== 0 ? (
        <Fragment>
          <div className={"rating-text"}>
            <div className={"rating-average title is-1"} style={ratingStyle}>
              {mean.toFixed(1)}
            </div>
            <div className={"verdict title is-5"} style={ratingStyle}>
              {adjectiveByRating(mean)}
            </div>
            <div className={"subtitle is-6"}>
              {numberOfRatings} Rating{numberOfRatings > 1 && "s"}
            </div>
          </div>
        </Fragment>
      ) : (
        <div className={"no-ratings-yet title is-5"}>No Ratings</div>
      )}
    </div>
  );
};

export default AverageRating;
