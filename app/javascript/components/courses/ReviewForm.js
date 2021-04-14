import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";

import axios from "axios";

import TextArea from "../form_elements/TextArea";
import SubmitButton from "../form_elements/SubmitButton";
import RatingSlider from "../form_elements/RatingSlider";
import ErrorWindow from "../form_elements/ErrorWindow";

const ReviewForm = ({ courseId, courseName, refreshCourse }) => {
  const auth = useAuth();

  const [errorMsg, setErrorMsg] = useState("");

  function validateReview(assessment) {
    if (assessment.length > 360) {
      setErrorMsg("Reviews can only be 360 characters or less.");
    } else {
      setErrorMsg("");
      return true;
    }
  }

  async function submitReview(event) {
    event.preventDefault();

    const assessment = document.getElementById("assessment").value;
    const rating = document.getElementById("rating").value;

    if (validateReview(assessment)) {
      await axios
        .post(
          "/api/reviews/",
          {
            review: {
              course_id: courseId,
              assessment: assessment,
              rating: parseFloat(rating),
            },
          },
          {
            headers: {
              Authorization: auth.userToken,
            },
          }
        )
        .then(() => {
          refreshCourse();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className={"review-form"}>
      <h3 className={"title is-5"}>Leave a Review:</h3>
      <TextArea
        inputId={"assessment"}
        placeholder={`What did you think of ${courseName}?`}
      />
      <div className={"review-form-controls"}>
        <RatingSlider inputId={"rating"} testId={"rating-slider"} />
        <SubmitButton
          color={"is-primary"}
          displayText={"Weigh In"}
          clickFunction={submitReview}
        />
      </div>
      <ErrorWindow errorMsg={errorMsg} />
      <hr />
    </div>
  );
};

export default ReviewForm;
