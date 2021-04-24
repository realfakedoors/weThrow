import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";

import littleTime from "little-time";
import axios from "axios";

import Rating from "../common/Rating";

const Review = ({ reviewData, refreshCourse }) => {
  const auth = useAuth();

  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (reviewData.user_id === parseInt(auth.userId) && auth.userLoggedIn) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  });

  function deleteReview() {
    axios
      .delete(`/api/reviews/${reviewData.id}`, {
        headers: { Authorization: auth.userToken },
      })
      .then(() => {
        refreshCourse();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className={"review media"}>
      <span className="media-left">
        <p className="image is-32x32">
          <img className={"is-rounded"} src={reviewData.user_profile_picture} />
        </p>
      </span>
      <div className={"media-content"}>
        <div className={"content"}>
          <span className={"title is-6"}>{reviewData.user_name}</span>
          <span className={"time subtitle is-7"}>
            {littleTime(reviewData.created_at).fromNow()}
          </span>
          <div className={"status"}>
            <span className={"rating"}>
              <Rating grade={reviewData.rating} />
            </span>
            <div className={"assessment subtitle is-6"}>
              {reviewData.assessment}
            </div>
          </div>
        </div>
      </div>
      <div className={"media-right"}>
        {showDelete && (
          <span
            className={"delete-button"}
            onClick={() => deleteReview()}
            data-testid={"delete-review"}
          >
            X
          </span>
        )}
      </div>
    </div>
  );
};

export default Review;
