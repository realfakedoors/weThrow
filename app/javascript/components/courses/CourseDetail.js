import React from "react";

const CourseDetail = ({ title, detail }) => {
  return (
    <div className={"course-detail block"}>
      <span className={"title is-6"}>{title}:</span>
      <span className={"detail subtitle is-6"}>{detail}</span>
    </div>
  );
};

export default CourseDetail;
