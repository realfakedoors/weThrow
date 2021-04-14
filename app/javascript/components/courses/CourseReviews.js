import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/use-auth";

import ReviewForm from "./ReviewForm";
import Review from "./Review";

const CourseReviews = ({ reviews, courseId, courseName, getCourseData }) => {
  const auth = useAuth();

  const [showReviewForm, setShowReviewForm] = useState(true);

  useEffect(() => {
    const reviewedBy = reviews.map((review) => review.user_id);
    if (reviewedBy.includes(parseInt(auth.userId)) || !auth.userLoggedIn) {
      setShowReviewForm(false);
    } else {
      setShowReviewForm(true);
    }
  });

  return (
    <div className={"course-reviews"}>
      <h1 className={"subtitle is-4 has-text-centered uppercase"}>
        {reviews.length > 0 ? "Reviews" : "No reviews yet!"}
      </h1>
      {reviews.map((review, i) => {
        return (
          <Review key={i} reviewData={review} refreshCourse={getCourseData} />
        );
      })}
      {showReviewForm && (
        <ReviewForm
          courseId={courseId}
          courseName={courseName}
          refreshCourse={getCourseData}
        />
      )}
      <hr />
    </div>
  );
};

export default CourseReviews;
