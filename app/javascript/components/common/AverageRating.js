import React from "react";

const AverageRating = () => {
  return (
    <div className={"average-rating has-background-success-light"}>
      <div className={"rating-text"}>
        <div className={"rating-average title is-1 has-text-success"}>7.6</div>
        <div className={"verdict title is-5 has-text-success"}>Great</div>
        <div className={"subtitle is-7"}>11 Ratings</div>
      </div>
      <progress
        className="rating-graphic progress is-success"
        value="76"
        max="100"
      >
        7.6/10
      </progress>
    </div>
  );
};

export default AverageRating;
