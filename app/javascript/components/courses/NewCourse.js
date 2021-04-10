import React, { useState } from "react";

import CourseForm from "./CourseForm";

const NewCourse = () => {
  const [termsAccepted, setAccepted] = useState(false);

  let display;
  if (termsAccepted) {
    display = (
      <CourseForm title={"Add a Course"} buttonText={"Create Course"} />
    );
  } else {
    display = (
      <div className={"terms-of-curatorship has-text-centered"}>
        <h2 className={"title is-3"}>
          {"Thanks for adding a course to weThrow!"}
        </h2>
        <div className={"block is-size-5"}>
          {"You are a shining example to us all."}
        </div>
        <div className={"block is-size-5"}>
          {
            "We should let you know up front, this carries a bit of responsibility. As a weThrow course curator, you'll be in charge of a few things related to your course, namely:"
          }
        </div>
        <div className={"block title is-5"}>
          <ul>
            <li>{"Uploading photos."}</li>
            <li>{"Updating current course conditions."}</li>
            <li>{"Maintaining Hole Layouts."}</li>
          </ul>
        </div>
        <div className={"block is-size-5"}>
          {
            "Other golfers will be expecting you to keep this information updated regularly, so if you're not directly involved with the course, it might be better to leave the responsibility to someone more enmeshed in the course's upkeep and regular changes."
          }
        </div>
        <div className={"block is-size-5"}>
          {
            "Again, thank you for helping us out by adding and maintaining courses. We appreciate you SO much."
          }
        </div>
        <button
          className={"button is-info is-large"}
          onClick={() => setAccepted(true)}
        >
          {"Let's do it!"}
        </button>
      </div>
    );
  }
  return <div className={"new-course box"}>{display}</div>;
};

export default NewCourse;
