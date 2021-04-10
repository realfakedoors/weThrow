import React from "react";
import { Link } from "react-router-dom";

import CurrentConditions from "./CurrentConditions";

const CourseListing = ({
  courseId,
  name,
  city,
  state,
  photoUrl,
  currentConditions,
}) => {
  return (
    <Link to={`/courses/${courseId}`} className={"listing media"}>
      <span className={"media-left"}>
        <img className={"image course-photo is-64x64"} src={photoUrl} />
      </span>
      <div className="media-content">
        <div className="content">
          <span className={"basic-info"}>
            <strong className="is-size-4">{name}</strong>
            <div className={"uppercase"}>{`${city}, ${state}`}</div>
          </span>
          <CurrentConditions
            courseConditions={currentConditions}
            conditionSize={"small"}
          />
        </div>
      </div>
    </Link>
  );
};

export default CourseListing;
