import React, { useState, useEffect, Fragment } from "react";

const CurrentConditions = ({ courseConditions, courseView, conditionSize }) => {
  const [conditionColor, setConditionColor] = useState(null);

  useEffect(() => {
    switch (courseConditions) {
      case "Unknown":
        setConditionColor("has-background-grey has-text-light");
        break;
      case "Good":
        setConditionColor("is-success");
        break;
      case "Sketchy":
        setConditionColor("is-warning");
        break;
      case "Unplayable":
        setConditionColor("is-danger");
        break;
      case "Closed":
        setConditionColor("has-background-dark has-text-light");
        break;
    }
  }, [courseConditions]);

  return (
    <div className={"current-conditions has-text-centered"}>
      {courseView && (
        <Fragment>
          <hr />
          <span className={"subtitle is-6"}>{"Current Conditions:"}</span>
        </Fragment>
      )}
      <span
        className={`display-conditions tag is-${conditionSize} uppercase ${conditionColor}`}
      >
        {courseConditions}
      </span>
      {courseView && <hr />}
    </div>
  );
};

export default CurrentConditions;
