import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

import axios from "axios";

import LoadingScreen from "../common/LoadingScreen";

const SubmitRounds = ({ roundData, courseId }) => {
  const auth = useAuth();

  const [display, setDisplay] = useState(<LoadingScreen />);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (roundData.length === 0) {
      setRedirect(<Redirect to={`/courses/${courseId}`} />);
    } else {
      submitAllRounds();
    }
  }, []);

  function submitAllRounds() {
    let noSubmissionsFailed = true;
    roundData.forEach((golfer) => {
      axios
        .post(
          "/api/rounds",
          { round: golfer.round.round },
          { headers: { Authorization: auth.userToken } }
        )
        .catch((err) => {
          console.error(err);
          noSubmissionsFailed = false;
        });
    });
    noSubmissionsFailed
      ? setDisplay(successfulSubmission())
      : setDisplay(submissionFailed());
  }

  function successfulSubmission() {
    return (
      <div className={"has-text-centered"}>
        <h1 className={"title is-1 has-text-success"}>{"Success!"}</h1>
        <h4
          className={"subtitle is-5"}
        >{`Your scores were posted to the course's page. You can also check them out in your Dashboard.`}</h4>
      </div>
    );
  }

  function submissionFailed() {
    return (
      <div className={"has-text-centered"}>
        <h1 className={"title is-1 has-text-danger"}>
          {"Failed to Submit Round."}
        </h1>
        <h4 className={"subtitle is-5"}>
          {"For some reason, we were unable to submit your scores. Sorry."}
        </h4>
      </div>
    );
  }

  return (
    <span className={"submit-rounds"}>
      {display}
      <Link
        className={"button is-large is-info back-to-course-button"}
        to={`/courses/${courseId}`}
      >
        Back to Course
      </Link>
      {redirect}
    </span>
  );
};

export default SubmitRounds;
