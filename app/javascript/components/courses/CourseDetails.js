import React from "react";

import CourseDetail from "./CourseDetail";

const CourseDetails = ({
  availability,
  seasonality,
  petPolicy,
  teepads,
  baskets,
  established,
  designer,
  curatorName,
}) => {
  return (
    <div className={"course-details"}>
      <hr />
      <h1
        className={"subtitle is-4 has-text-centered uppercase"}
      >{`${availability} Disc Golf Course`}</h1>
      <br />
      <CourseDetail title={"Seasonality"} detail={seasonality} />
      <CourseDetail title={"Pets"} detail={petPolicy} />
      <CourseDetail title={"Teepads"} detail={teepads} />
      <CourseDetail title={"Baskets"} detail={baskets} />
      <CourseDetail title={"Established"} detail={established} />
      <CourseDetail title={"Course Designer"} detail={designer} />
      <CourseDetail title={"weThrow Course Curator"} detail={curatorName} />
      <hr />
    </div>
  );
};

export default CourseDetails;
