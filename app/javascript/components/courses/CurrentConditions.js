import React from "react";
import { useAuth } from "../../hooks/use-auth";

import ChangeCurrentConditions from "./ChangeCurrentConditions";

const CurrentConditions = ({
  courseId,
  courseConditions,
  setConditions,
  curatorId,
}) => {
  const auth = useAuth();

  function userIsAuthorized() {
    if (curatorId === auth.userId || auth.adminStatus) {
      return true;
    } else {
      return false;
    }
  }

  let conditionColor;
  switch (courseConditions) {
    case "Good":
      conditionColor = "is-success";
      break;
    case "Sketchy":
      conditionColor = "is-warning";
      break;
    case "Unplayable":
      conditionColor = "is-danger";
      break;
    case "Closed":
      conditionColor = "has-background-dark has-text-light";
      break;
  }
  return (
    <div className={"current-conditions has-text-centered"}>
      <hr />
      <span className={"subtitle is-6"}>{"Current Conditions:"}</span>
      <span
        className={`display-conditions tag is-large uppercase ${conditionColor}`}
      >
        {courseConditions}
      </span>
      {userIsAuthorized() && (
        <div>
          <hr />
          <h3 className="subtitle is-5 has-text-centered set-current-conditions uppercase">
            Set Current Conditions
            <ChangeCurrentConditions
              courseId={courseId}
              courseConditions={courseConditions}
              setConditions={setConditions}
            />
          </h3>
        </div>
      )}
      <hr />
    </div>
  );
};

export default CurrentConditions;
